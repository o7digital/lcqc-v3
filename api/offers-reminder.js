import { timingSafeEqual } from 'node:crypto';
import { readState, writeState, reminderPreview, isEnabled } from '../src/lib/offer-service.js';
import { localDay, reminderDay } from '../src/lib/offer-calendar.js';
function cronAuthorized(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const actual = Buffer.from(req.headers.authorization || '');
  const expected = Buffer.from(`Bearer ${secret}`);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({error: 'Método no permitido.'});
  if (!cronAuthorized(req)) return res.status(401).json({error: 'No autorizado.'});
  // Preview deployments can never send real email, even if a flag is enabled accidentally.
  if (!isEnabled() || process.env.VERCEL_ENV !== 'production' || process.env.OFFERS_REMINDERS_ENABLED !== 'true') return res.status(200).json({skipped: 'Recordatorios desactivados. No se envió ningún correo.'});
  const endpoint = process.env.OFFERS_FORMSPREE_ENDPOINT || '';
  const baseUrl = process.env.OFFERS_SITE_URL || '';
  if (!/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint) || !/^https:\/\//.test(baseUrl)) return res.status(503).json({error: 'Configure Formspree y la URL del sitio.'});
  const today = localDay();
  const month = today.slice(0, 7);
  if (today < reminderDay(month)) return res.status(200).json({skipped: 'Aún no corresponde enviar el recordatorio.'});
  try {
    let {state, etag} = await readState();
    const previous = state.reminders[month];
    if (previous?.sentAt || (previous?.leaseUntil && previous.leaseUntil > Date.now())) return res.status(200).json({skipped: 'Recordatorio enviado o en proceso.'});
    state.reminders[month] = {leaseUntil: Date.now() + 300000};
    await writeState(state, etag);
    const mail = reminderPreview(state, month, baseUrl, {withAccess: true});
    // Recipients MUST be configured/verified in Formspree. Payload fields do not set recipients.
    const response = await fetch(endpoint, {
      method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({_subject: mail.subject, message: mail.message, notification: 'monthly_offers'}),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error('Formspree rejected notification');
    ({state, etag} = await readState());
    state.reminders[month] = {sentAt: new Date().toISOString()};
    await writeState(state, etag);
    return res.status(200).json({sent: true, month});
  } catch (e) {
    console.error('Monthly reminder failed', e.name);
    return res.status(503).json({error: 'No se pudo completar el recordatorio. Se reintentará en la próxima ejecución.'});
  }
}
