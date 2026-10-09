import { BlobPreconditionFailedError } from '@vercel/blob';
import { readState, writeState, accessFrom, permittedMonth, currentMonth, isEnabled, reminderPreview } from '../src/lib/offer-service.js';
import { localDay, validMonth, monthPeriod, offersForMonth, nextMonth } from '../src/lib/offer-calendar.js';
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (!isEnabled()) return res.status(404).json({error: 'Sistema no activado.'});
  const admin = req.query?.admin === '1';
  const claims = accessFrom(req);
  if ((admin || req.method === 'PUT') && !claims) return res.status(401).json({error: 'Enlace de acceso inválido o vencido. Solicite un enlace nuevo.'});
  if (!['GET', 'PUT'].includes(req.method)) {
    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({error: 'Método no permitido.'});
  }
  try {
    const current = currentMonth();
    const month = req.method === 'PUT' ? req.body?.month : (req.query?.month || current);
    if (!validMonth(month)) return res.status(400).json({error: 'Mes inválido.'});
    const simulation = process.env.VERCEL_ENV === 'preview' && claims?.month === '*';
    if (month !== current && !(simulation || permittedMonth(claims, month, current))) return res.status(403).json({error: 'No tiene acceso a este mes.'});
    const {state, etag, catalogStatus} = await readState();
    if (req.method === 'PUT') {
      if (!permittedMonth(claims, month, current)) return res.status(403).json({error: 'Solo puede editar el mes actual o el siguiente.'});
      if (req.body?.revision !== state.revision) return res.status(409).json({error: 'Otra persona actualizó las ofertas. Recargue antes de guardar.'});
      const {validateOffers} = await import('../src/lib/offer-calendar.js');
      let offers;
      try { offers = validateOffers(req.body.offers); }
      catch (e) { return res.status(400).json({error: e.message}); }
      state.months[month] = {offers, updatedAt: new Date().toISOString()};
      await writeState(state, etag);
      return res.status(200).json({saved: true, revision: state.revision, period: monthPeriod(month)});
    }
    const offers = offersForMonth(state, month);
    if (!admin) return res.status(200).json({period: monthPeriod(month), offers: offers.filter(o => o.active)});
    if (!(simulation || permittedMonth(claims, month, current))) return res.status(403).json({error: 'No tiene acceso a este mes.'});
    return res.status(200).json({
      offers, catalogStatus, catalogSource: state.catalogSource || 'Copia local', catalogCount: state.baseOffers.length, revision: state.revision, currentMonth: current, nextMonth: nextMonth(current),
      allowedMonths: claims.month === '*' ? [current, nextMonth(current)] : [claims.month],
      period: monthPeriod(month), savedAt: state.months[month]?.updatedAt || null,
      preview: process.env.VERCEL_ENV !== 'production',
      mailConfigured: Boolean(process.env.OFFERS_FORMSPREE_ENDPOINT),
      mailEnabled: process.env.OFFERS_REMINDERS_ENABLED === 'true',
      reminder: reminderPreview(state, month, process.env.OFFERS_SITE_URL || `https://${req.headers.host}`),
      today: localDay(),
    });
  } catch (e) {
    if (e instanceof BlobPreconditionFailedError || e.name === 'BlobAlreadyExistsError') return res.status(409).json({error: 'Las ofertas acaban de cambiar. Recargue la página.'});
    console.error('Offers storage request failed', e.name);
    return res.status(503).json({error: 'No se pudo acceder a las ofertas. Sus cambios no se han guardado. Inténtelo de nuevo.'});
  }
}
