import { NextApiRequest, NextApiResponse } from 'next';

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_STATIC_TOKEN = process.env.DIRECTUS_TOKEN;
const DIRECTUS_SERVICE_EMAIL = process.env.DIRECTUS_SERVICE_EMAIL;
const DIRECTUS_SERVICE_PASSWORD = process.env.DIRECTUS_SERVICE_PASSWORD;

let cachedToken: string | null = null;
let cachedTokenExpiry = 0;

const getDirectusAuthUrl = () => {
  if (!DIRECTUS_URL) {
    throw new Error("Missing NEXT_PUBLIC_DIRECTUS_URL environment variable");
  }
  return `${DIRECTUS_URL.replace(/\/$/, "")}/auth/login`;
};

const shouldUseStaticToken = () => {
  return !DIRECTUS_SERVICE_EMAIL || !DIRECTUS_SERVICE_PASSWORD;
};

const getDirectusToken = async () => {
  console.log('Directus credentials present:', {
    serviceEmail: Boolean(DIRECTUS_SERVICE_EMAIL),
    servicePassword: Boolean(DIRECTUS_SERVICE_PASSWORD),
    staticToken: Boolean(DIRECTUS_STATIC_TOKEN),
  });

  if (shouldUseStaticToken()) {
    if (!DIRECTUS_STATIC_TOKEN) {
      console.error('Directus auth configuration error: missing both service credentials and DIRECTUS_TOKEN');
      throw new Error("DIRECTUS_TOKEN is not defined");
    }
    console.log('Directus auth: using static token');
    return DIRECTUS_STATIC_TOKEN;
  }

  const now = Date.now();
  if (cachedToken && now < cachedTokenExpiry - 60_000) {
    return cachedToken;
  }

  const response = await fetch(getDirectusAuthUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: DIRECTUS_SERVICE_EMAIL,
      password: DIRECTUS_SERVICE_PASSWORD,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Directus login failed: ${response.status} ${response.statusText} - ${errorText}`);
    throw new Error(`Failed to authenticate with Directus: ${response.statusText}`);
  }

  const data = await response.json();
  const accessToken = data?.data?.access_token;
  const expiresIn = data?.data?.expires;

  if (!accessToken) {
    throw new Error("Directus authentication response missing access_token");
  }

  cachedToken = accessToken;
  cachedTokenExpiry = now + (typeof expiresIn === "number" ? expiresIn * 1000 : 10 * 60 * 1000);

  return accessToken;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const useStaticToken = shouldUseStaticToken();
    console.log(`Directus auth mode: ${useStaticToken ? 'static-token' : 'service-credentials'}`);

    // Construction des paramètres de requête pour Directus
    const searchParams = new URLSearchParams({
      fields: 'id,Title,Slug,Address,City,State,Country,Price,Currency,Bedrooms,Bathrooms,Parking_spaces,Featured,Image,Operation_type,Property_type',
      // Afficher toutes les propriétés (pas de filtre sur status pour le moment)
    });

    // Ajouter des filtres optionnels basés sur les paramètres de requête
    if (req.query.featured === 'true') {
      searchParams.append('filter[featured][_eq]', 'true');
    }

    if (req.query.operation_type) {
      searchParams.append('filter[operation_type][_eq]', req.query.operation_type as string);
    }

    if (req.query.property_type) {
      searchParams.append('filter[property_type][_eq]', req.query.property_type as string);
    }

    if (req.query.city) {
      searchParams.append('filter[city][_icontains]', req.query.city as string);
    }

    if (req.query.min_price) {
      searchParams.append('filter[price][_gte]', req.query.min_price as string);
    }

    if (req.query.max_price) {
      searchParams.append('filter[price][_lte]', req.query.max_price as string);
    }

    // Pagination
    if (req.query.limit) {
      searchParams.append('limit', req.query.limit as string);
    }

    if (req.query.offset) {
      searchParams.append('offset', req.query.offset as string);
    }

    const directusToken = await getDirectusToken();
    if (!DIRECTUS_URL) {
      throw new Error('NEXT_PUBLIC_DIRECTUS_URL is not defined');
    }

    const directusUrl = `${DIRECTUS_URL}/items/propriedades?${searchParams.toString()}`;

    const makeRequest = async (token: string) => fetch(directusUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    let response = await makeRequest(directusToken);

    if (response.status === 401 && !shouldUseStaticToken()) {
      cachedToken = null;
      cachedTokenExpiry = 0;
      const refreshedToken = await getDirectusToken();
      response = await makeRequest(refreshedToken);
    }

    if (!response.ok) {
      throw new Error(`Directus API error: ${response.status}`);
    }

    const directusData = await response.json();
    
    // Retourner seulement les données, pas l'enveloppe Directus
    res.status(200).json(directusData.data || []);

  } catch (error) {
    console.error('Error fetching Directus properties:', error);
    res.status(500).json({ 
      message: 'Error fetching properties',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
