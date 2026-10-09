// Runtime DatoCMS reads use server environment variables; no delivery token reaches the browser.
let cached;
let pending;
export function catalogText(value) {
  return String(value || '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<li\b[^>]*>/gi, '\n• ')
    .replace(/<br\s*\/?>|<\/(?:p|div|ul|li)>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
export function normalizeCatalog(en, es) {
  const translations = new Map(es.map(o => [o.id, o]));
  return en.map(record => {
    const translated = translations.get(record.id) || {};
    const id = String(record.slug || `offer-${record.id}`).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const result = {id, active: record.active === true, image: record.imagefront?.url || '/offers/lcqc-discover.jpg'};
    for (const [lang, source] of [['en', record], ['es', translated]]) {
      result[lang] = {
        title: catalogText(source.title), subtitle: catalogText(source.subtitle),
        description: catalogText(source.description), terms: catalogText(source.termsYCondicions ?? source.termsYCondiciones),
      };
    }
    return result;
  });
}
async function requestCatalog() {
  const token = process.env.DATOCMS_API_TOKEN;
  if (!token) throw new Error('DatoCMS delivery token missing');
  // Match the existing site's selected CMS environment and preview mode.
  const preview = process.env.DATOCMS_USE_PREVIEW === 'true';
  const endpoint = `https://graphql.datocms.com/${preview ? 'preview' : ''}`;
  const headers = {'Content-Type':'application/json', Authorization:`Bearer ${preview ? process.env.DATOCMS_PREVIEW_TOKEN || token : token}`,
    ...(preview ? {'X-Include-Drafts':'true'} : {}), ...(process.env.DATOCMS_ENVIRONMENT ? {'X-Environment':process.env.DATOCMS_ENVIRONMENT} : {})};
  const en = [], es = [];
  for (let skip = 0; ; skip += 100) {
    const fields = 'id slug title subtitle description active imagefront {url} termsYCondicions';
    const response = await fetch(endpoint, {method:'POST', headers, signal:AbortSignal.timeout(10000),
      body:JSON.stringify({query:`query Catalog($skip:IntType!) { en:allOffers(first:100,skip:$skip,locale:en,orderBy:order_ASC){${fields}} es:allOffers(first:100,skip:$skip,locale:es,orderBy:order_ASC){${fields}} }`,variables:{skip}})});
    const result = await response.json();
    if (!response.ok || result.errors || !Array.isArray(result.data?.en) || !Array.isArray(result.data?.es)) throw new Error('DatoCMS offers unavailable');
    en.push(...result.data.en); es.push(...result.data.es);
    if (result.data.en.length < 100 && result.data.es.length < 100) break;
  }
  if (!en.length) throw new Error('DatoCMS offers empty; keeping last successful catalog');
  return normalizeCatalog(en, es);
}
export async function fetchCatalog() {
  if (cached && Date.now() - cached.at < 60000) return structuredClone(cached.offers);
  if (!pending) pending = requestCatalog().then(offers => {cached={at:Date.now(),offers};return offers;}).finally(()=>{pending=null;});
  return structuredClone(await pending);
}
// Refresh unchanged CMS fields while preserving edits saved for each month.
export function reconcileCatalog(state, catalog) {
  const result = structuredClone(state);
  const before = new Map(state.baseOffers.map(o=>[o.id,o]));
  const after = new Map(catalog.map(o=>[o.id,o]));
  for (const entry of Object.values(result.months)) {
    const saved = new Map(entry.offers.map(o=>[o.id,o]));
    entry.offers = catalog.map(source => {
      const old = before.get(source.id), edited = saved.get(source.id);
      if (!edited) return structuredClone(source);
      if (!old) return edited;
      const merged=structuredClone(source);
      for(const key of ['active','image']) if(edited[key]!==old[key]) merged[key]=edited[key];
      for(const lang of ['en','es']) for(const key of ['title','subtitle','description','terms']) {
        if(edited[lang]?.[key]!==old[lang]?.[key]) merged[lang][key]=edited[lang]?.[key] || '';
      }
      return merged;
    });
    for(const edited of saved.values()) {
      if(after.has(edited.id)) continue;
      const old=before.get(edited.id);
      // Preserve form-created offers, and customized offers removed from the CMS.
      if(!old || JSON.stringify(edited)!==JSON.stringify(old)) entry.offers.push(edited);
    }
  }
  result.baseOffers=structuredClone(catalog);
  result.catalogSource='DatoCMS';
  return result;
}
