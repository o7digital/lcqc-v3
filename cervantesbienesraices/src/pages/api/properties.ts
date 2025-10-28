import type { NextApiRequest, NextApiResponse } from "next";

const EASY_BROKER_URL = "https://api.easybroker.com/v1/properties";
const MAX_LIMIT = 50;

// Normaliza texto para comparaciones robustas (acentos/mayúsculas/espacios)
const normalize = (value?: string) =>
  (value || "")
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

// Verifica si un item coincide con el estatus solicitado (p.ej. "No publicada")
const matchesStatus = (item: any, statusFilter: string) => {
  const target = normalize(statusFilter);
  const targets = new Set([target, target.replace(/\s+/g, "_")]); // p.ej. no_publicada

  const candidates: Array<string | undefined> = [
    typeof item?.publication_status === "string" ? item.publication_status : item?.publication_status?.name,
    typeof item?.status === "string" ? item.status : item?.status?.name,
  ];

  if (typeof item?.publicly_visible === "boolean") {
    if (targets.has("no publicada") || targets.has("no_publicada") || targets.has("unpublished")) {
      if (item.publicly_visible === false) return true;
    }
    if (targets.has("publicada") || targets.has("published")) {
      if (item.publicly_visible === true) return true;
    }
  }

  return candidates.some((c) => {
    const n = normalize(c as string);
    if (!n) return false;
    if (targets.has(n)) return true;
    if ((targets.has("no publicada") || targets.has("no_publicada")) && (n === "unpublished" || n === "not published")) return true;
    if ((targets.has("publicada") || targets.has("published")) && n === "published") return true;
    return false;
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pageParam = Number(req.query.page);
    const limitParam = Number(req.query.limit);
    const statusParam = (req.query.status as string | undefined) || (req.query.publication_status as string | undefined);
    const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, MAX_LIMIT) : MAX_LIMIT;
    const headers = {
      accept: "application/json",
      "X-Authorization": process.env.EB_API_KEY!, // usamos la API Key guardada en .env.local
    };

    // Si el cliente solicita una página concreta, devolvemos esa página únicamente.
    if (Number.isFinite(pageParam) && pageParam > 0) {
      const response = await fetch(`${EASY_BROKER_URL}?page=${pageParam}&limit=${limit}`, { headers });

      if (!response.ok) {
        throw new Error("Error al consultar EasyBroker");
      }

      const pageData = await response.json();

      if (statusParam && Array.isArray(pageData?.content)) {
        const filtered = pageData.content.filter((item: any) => matchesStatus(item, statusParam));
        return res.status(200).json({ ...pageData, content: filtered, pagination: { ...(pageData.pagination || {}), total_returned: filtered.length } });
      }

      return res.status(200).json(pageData);
    }

    // Por defecto, agregamos todas las páginas disponibles (hasta agotar next_page).
    let page = 1;
    const allContent: any[] = [];
    let lastPagination: any = null;

    while (true) {
      const response = await fetch(`${EASY_BROKER_URL}?page=${page}&limit=${limit}`, { headers });

      if (!response.ok) {
        throw new Error("Error al consultar EasyBroker");
      }

      const data = await response.json();
      if (Array.isArray(data.content)) {
        allContent.push(...data.content);
      }

      lastPagination = data.pagination ?? null;

      const nextPage = data.pagination?.next_page;
      if (!nextPage || nextPage === page) {
        break;
      }

      page = nextPage;
    }

    const resultContent = statusParam ? allContent.filter((item) => matchesStatus(item, statusParam)) : allContent;

    res.status(200).json({
      content: resultContent,
      pagination: {
        ...lastPagination,
        total_returned: resultContent.length,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
