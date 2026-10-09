import {localDay,nextMonth,monthPeriod,reminderDay,offersForMonth,validateOffers,validMonth} from './offer-calendar.js';
export const DEMO_STORAGE_KEY='lcqc-offers-demo-v1';
export function createDemo(seed,storage,now=()=>new Date()) {
  let months={};
  try{months=JSON.parse(storage.getItem(DEMO_STORAGE_KEY)||'{}');if(!months || Array.isArray(months) || typeof months!=='object')months={};}catch{}
  const state={baseOffers:structuredClone(seed),months};
  return function request(path,options={}) {
    const current=localDay(now()).slice(0,7),url=new URL(path,'https://demo.invalid');
    const body=options.body ? JSON.parse(options.body) : {};
    const month=body.month || url.searchParams.get('month') || current;
    if(!validMonth(month))throw Error('Mes inválido.');
    if(options.method==='PUT'){
      if(![current,nextMonth(current)].includes(month))throw Error('Seleccione el mes actual o siguiente.');
      const offers=validateOffers(body.offers);
      const next={...state.months,[month]:{offers,updatedAt:now().toISOString()}};
      // Save before updating memory so storage failures never appear successful.
      storage.setItem(DEMO_STORAGE_KEY,JSON.stringify(next));state.months=next;
      return {saved:true};
    }
    const target=nextMonth(month),period=monthPeriod(target);
    const titles=offersForMonth(state,target).filter(o=>o.active).map(o=>`• ${o.es.title}`).join('\n');
    return {
      offers:offersForMonth(state,month),period:monthPeriod(month),currentMonth:current,nextMonth:nextMonth(current),allowedMonths:[current,nextMonth(current)],
      preview:true,catalogStatus:'demo',catalogCount:seed.length,savedAt:state.months[month]?.updatedAt||null,
      reminder:{to:'sales.reservations@lacasaquecanta.com',cc:['director@lacasaquecanta.com','olivier.steineur@gmail.com'],scheduled:reminderDay(month),
        subject:`La Casa Que Canta · Actualización de promociones · ${period.es}`,
        message:`Estimada Yuridia:\n\nLas fechas de las promociones se renovarán para el siguiente periodo: ${period.es}.\n\nPromociones previstas:\n${titles || 'Sin promociones activas.'}\n\n¿Desean mantenerlas o realizar algún cambio, agregar o retirar una promoción?\n\nSi no hay cambios, se mantienen las promociones con las fechas del mes siguiente.\n\nAtentamente,\nOlivier\n\nDEMO: este correo no se envía.`},
    };
  };
}
