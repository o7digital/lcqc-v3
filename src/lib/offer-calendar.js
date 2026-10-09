export const TIME_ZONE = 'America/Mexico_City';
export function localDay(now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now).map(p => [p.type, p.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}
export function validMonth(month) {
  return typeof month === 'string' && /^20\d{2}-(0[1-9]|1[0-2])$/.test(month);
}
export function nextMonth(month) {
  if (!validMonth(month)) throw new Error('Mes inválido.');
  const [y, m] = month.split('-').map(Number);
  return `${m === 12 ? y + 1 : y}-${String(m === 12 ? 1 : m + 1).padStart(2, '0')}`;
}
export function monthPeriod(month) {
  if (!validMonth(month)) throw new Error('Mes inválido.');
  const [year, m] = month.split('-').map(Number);
  const end = new Date(Date.UTC(year, m, 0)).getUTCDate();
  const date = new Date(Date.UTC(year, m - 1, 1));
  const en = new Intl.DateTimeFormat('en-US', {month: 'long', timeZone: 'UTC'}).format(date);
  const es = new Intl.DateTimeFormat('es-MX', {month: 'long', timeZone: 'UTC'}).format(date);
  const suffix = end === 31 ? 'st' : end === 22 ? 'nd' : 'th';
  return {month, start: `${month}-01`, end: `${month}-${end}`, en: `${en} 1st to ${en} ${end}${suffix}, ${year}`, es: `Del 1 al ${end} de ${es} de ${year}`};
}
// Last Monday of the calendar month, at 09:00 Mexico City time.
export function reminderDay(month) {
  const date = new Date(`${monthPeriod(month).end}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7);
  return date.toISOString().slice(0, 10);
}
export function offersForMonth(state, month) {
  if (!validMonth(month)) throw new Error('Mes inválido.');
  const latest = Object.keys(state.months).filter(m => m <= month).sort().at(-1);
  return structuredClone(latest ? state.months[latest].offers : state.baseOffers);
}
export function validateOffers(offers) {
  if (!Array.isArray(offers) || offers.length < 1 || offers.length > 12) throw new Error('Incluya entre 1 y 12 promociones.');
  const ids = new Set();
  return offers.map(o => {
    if (!o || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(o.id) || o.id.length > 70 || ids.has(o.id)) throw new Error('Identificador de promoción inválido o duplicado.');
    ids.add(o.id);
    if (typeof o.active !== 'boolean') throw new Error('Estado de promoción inválido.');
    if (typeof o.image !== 'string' || !/^\/offers\/[a-zA-Z0-9._/-]+\.(?:jpg|jpeg|png|webp)$/.test(o.image) || o.image.includes('..')) throw new Error('Seleccione una imagen válida.');
    const result = {id: o.id, active: o.active, image: o.image};
    for (const lang of ['en', 'es']) {
      result[lang] = {};
      for (const key of ['title', 'subtitle', 'description', 'terms']) {
        const text = o[lang]?.[key];
        if (typeof text !== 'string' || text.length > (key === 'title' ? 160 : 10000) || !text.trim()) throw new Error(`Complete ${key} (${lang.toUpperCase()}) de ${o.id}.`);
        result[lang][key] = text.trim();
      }
    }
    return result;
  });
}
