import { request } from 'graphql-request';

const DATOCMS_API_URL = 'https://graphql.datocms.com/';
const API_TOKEN = import.meta.env.DATOCMS_API_TOKEN;

console.log("🔑 Token DatoCMS detectado por Astro:", API_TOKEN);

export async function fetchDatoCMS(query, variables = {}) {
  if (!API_TOKEN) {
    throw new Error('⚠️ No se encontró el token de DatoCMS en .env');
  }
  return request(DATOCMS_API_URL, query, variables, {
    Authorization: `Bearer ${API_TOKEN}`,
  });
}
