import { request } from 'graphql-request';

// Modes:
// - Delivery (published content): https://graphql.datocms.com/
// - Preview (drafts):           https://graphql.datocms.com/preview
const USE_PREVIEW = String(import.meta.env.DATOCMS_USE_PREVIEW || '').toLowerCase() === 'true';
const DATOCMS_ENVIRONMENT = import.meta.env.DATOCMS_ENVIRONMENT; // optional: dev/approve/main

const DATOCMS_API_URL = USE_PREVIEW
  ? 'https://graphql.datocms.com/preview'
  : 'https://graphql.datocms.com/';

const DELIVERY_TOKEN = import.meta.env.DATOCMS_API_TOKEN;
const PREVIEW_TOKEN = import.meta.env.DATOCMS_PREVIEW_TOKEN;
const API_TOKEN = USE_PREVIEW ? (PREVIEW_TOKEN || DELIVERY_TOKEN) : DELIVERY_TOKEN;

export async function fetchDatoCMS(query, variables = {}) {
  if (!API_TOKEN) {
    throw new Error('⚠️ No se encontró el token de DatoCMS en .env');
  }
  const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
    ...(USE_PREVIEW ? { 'X-Include-Drafts': 'true' } : {}),
    ...(DATOCMS_ENVIRONMENT ? { 'X-Environment': DATOCMS_ENVIRONMENT } : {}),
  };
  return request(DATOCMS_API_URL, query, variables, headers);
}
