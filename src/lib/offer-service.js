import { createHmac, timingSafeEqual } from 'node:crypto';
import { get, put, BlobNotFoundError } from '@vercel/blob';
import defaults from '../data/monthly-offers.json' with { type: 'json' };
import { localDay, nextMonth, monthPeriod, reminderDay, offersForMonth } from './offer-calendar.js';
const PATH = 'monthly-offers/state.json';
export function initialState() {
  return {revision: 0, baseOffers: structuredClone(defaults), months: {}, reminders: {}};
}
export async function readState() {
  try {
    // Avoid gzip's weak W/ ETag: conditional writes need the strong origin ETag.
    const blob = await get(PATH, {access: 'private', useCache: false, headers: {'Accept-Encoding': 'identity'}});
    if (!blob) return {state: initialState(), etag: null};
    const state = await new Response(blob.stream).json();
    return {state, etag: blob.blob.etag};
  } catch (e) {
    if (e instanceof BlobNotFoundError) return {state: initialState(), etag: null};
    throw e;
  }
}
export async function writeState(state, etag) {
  state.revision += 1;
  await put(PATH, JSON.stringify(state), {
    access: 'private', addRandomSuffix: false, contentType: 'application/json',
    ...(etag ? {ifMatch: etag} : {allowOverwrite: false}),
  });
}
export function signAccess(month, expires) {
  if (!process.env.OFFERS_SIGNING_SECRET) throw new Error('Falta configurar el acceso seguro.');
  const payload = Buffer.from(JSON.stringify({month, expires})).toString('base64url');
  const signature = createHmac('sha256', process.env.OFFERS_SIGNING_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}
export function verifyAccess(token, now = Date.now()) {
  try {
    if (!process.env.OFFERS_SIGNING_SECRET || typeof token !== 'string' || token.length > 1000) return null;
    const [payload, signature, extra] = token.split('.');
    if (extra || !payload || !signature) return null;
    const expected = createHmac('sha256', process.env.OFFERS_SIGNING_SECRET).update(payload).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return Number.isFinite(claims.expires) && claims.expires > now ? claims : null;
  } catch { return null; }
}
export function accessFrom(req) {
  return verifyAccess((req.headers.authorization || '').replace(/^Bearer /, ''));
}
export function permittedMonth(claims, month, currentMonth) {
  return claims && month >= currentMonth && month <= nextMonth(currentMonth) && (claims.month === '*' || claims.month === month);
}
export function reminderPreview(state, month, baseUrl, {withAccess = false} = {}) {
  const target = nextMonth(month);
  const period = monthPeriod(target);
  const expires = Date.parse(`${nextMonth(target)}-01T06:00:00Z`);
  const link = `${baseUrl}/gestion-ofertas/?month=${target}${withAccess ? `#access=${signAccess(target, expires)}` : ''}`;
  const titles = offersForMonth(state, target).filter(o => o.active).map(o => `• ${o.es.title}`).join('\n');
  return {
    to: 'sales.reservations@lacasaquecanta.com',
    cc: ['director@lacasaquecanta.com', 'olivier.steineur@gmail.com'],
    scheduled: reminderDay(month), month: target,
    subject: `La Casa Que Canta · Actualización de promociones · ${period.es}`,
    message: `Estimada Yuridia:\n\nLas fechas de las promociones vigentes se renovarán automáticamente para el siguiente periodo: ${period.es}.\n\nPromociones previstas:\n${titles || 'Sin promociones activas.'}\n\n¿Desean mantenerlas o realizar algún cambio, agregar o retirar una promoción? Pueden revisar y guardar los cambios en el siguiente formulario seguro:\n${link}\n\nSi no realizan cambios, se mantendrán las promociones y solo se actualizarán sus fechas al iniciar el mes, según el calendario de Zihuatanejo.\n\nLos cambios para el próximo mes entrarán en vigor el día 1.\n\nAtentamente,\nOlivier`,
  };
}
export function currentMonth() { return localDay().slice(0, 7); }
export function isEnabled() { return process.env.OFFERS_AUTOMATION_ENABLED === 'true'; }
