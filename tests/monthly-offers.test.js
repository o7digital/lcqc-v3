import test from 'node:test';
import assert from 'node:assert/strict';
import {localDay, monthPeriod, nextMonth, reminderDay, offersForMonth, validateOffers} from '../src/lib/offer-calendar.js';
import {initialState, signAccess, verifyAccess, permittedMonth, reminderPreview} from '../src/lib/offer-service.js';
import handler from '../api/offers-reminder.js';
process.env.OFFERS_SIGNING_SECRET = 'test-only-secret-not-used-in-deployments';
test('calendar handles short months, leap years and December rollover', () => {
  assert.equal(monthPeriod('2026-10').end, '2026-10-31');
  assert.equal(monthPeriod('2026-11').end, '2026-11-30');
  assert.equal(monthPeriod('2027-02').end, '2027-02-28');
  assert.equal(monthPeriod('2028-02').end, '2028-02-29');
  assert.equal(nextMonth('2026-12'), '2027-01');
  assert.equal(monthPeriod('2026-11').en, 'November 1st to November 30th, 2026');
  assert.equal(monthPeriod('2028-02').es, 'Del 1 al 29 de febrero de 2028');
  assert.throws(() => monthPeriod('2026-13'));
});
test('month changes at Mexico midnight rather than visitor timezone or UTC', () => {
  assert.equal(localDay(new Date('2026-11-01T05:59:59Z')), '2026-10-31');
  assert.equal(localDay(new Date('2026-11-01T06:00:00Z')), '2026-11-01');
});
test('reminder is the final Monday for every month, including October 26', () => {
  assert.equal(reminderDay('2026-10'), '2026-10-26');
  for (let m=1;m<=12;m++) {
    const month=`2026-${String(m).padStart(2,'0')}`;
    const d=new Date(`${reminderDay(month)}T12:00:00Z`);
    assert.equal(d.getUTCDay(),1);
    assert.ok(new Date(`${monthPeriod(month).end}T12:00:00Z`) - d < 7*86400000);
  }
});
test('future edits wait until the selected month, and then carry forward', () => {
  const state=initialState();
  const offers=structuredClone(state.baseOffers);offers[0].active=false;
  state.months['2026-11']={offers};
  assert.equal(offersForMonth(state,'2026-10')[0].active,true);
  assert.equal(offersForMonth(state,'2026-11')[0].active,false);
  assert.equal(offersForMonth(state,'2027-01')[0].active,false);
  const read=offersForMonth(state,'2026-11');read[0].active=true;
  assert.equal(state.months['2026-11'].offers[0].active,false);
});
test('access links reject forgery, expiration and unauthorized months', () => {
  const token=signAccess('2026-11',Date.now()+60000);
  assert.equal(verifyAccess(token).month,'2026-11');
  assert.equal(verifyAccess(token+'a'),null);
  assert.equal(verifyAccess(signAccess('2026-11',1)),null);
  const claims=verifyAccess(token);
  assert.equal(permittedMonth(claims,'2026-11','2026-10'),true);
  assert.equal(permittedMonth(claims,'2026-10','2026-10'),false);
  assert.equal(permittedMonth({month:'*'},'2026-12','2026-10'),false);
});
test('form validation covers both languages, duplicate IDs, URLs and traversal', () => {
  const offers=initialState().baseOffers;
  assert.equal(validateOffers(offers).length,3);
  assert.throws(()=>validateOffers([...offers,offers[0]]));
  let bad=structuredClone(offers);bad[0].en.title='';assert.throws(()=>validateOffers(bad));
  bad=structuredClone(offers);bad[0].image='https://evil.example/image.jpg';assert.throws(()=>validateOffers(bad));
  bad=structuredClone(offers);bad[0].image='/offers/../../private.jpg';assert.throws(()=>validateOffers(bad));
});
test('reminder contains requested recipients, next-month range and scoped link', () => {
  const mail=reminderPreview(initialState(),'2026-12','https://example.com',{withAccess:true});
  assert.equal(mail.to,'sales.reservations@lacasaquecanta.com');
  assert.deepEqual(mail.cc,['director@lacasaquecanta.com','olivier.steineur@gmail.com']);
  assert.match(mail.message,/Del 1 al 31 de enero de 2027/);
  const token=mail.message.match(/#access=([^\s]+)/)[1];
  assert.equal(verifyAccess(token, Date.parse('2026-12-01T00:00:00Z')).month,'2027-01');
});
test('preview cron can never send email, even if reminder flag is enabled', async () => {
  process.env.CRON_SECRET='test-cron';process.env.OFFERS_AUTOMATION_ENABLED='true';
  process.env.OFFERS_REMINDERS_ENABLED='true';process.env.VERCEL_ENV='preview';
  const res={code:0,body:null,setHeader(){},status(code){this.code=code;return this;},json(body){this.body=body;return this;}};
  await handler({method:'GET',headers:{authorization:'Bearer test-cron'}},res);
  assert.equal(res.code,200);assert.match(res.body.skipped,/desactivados/);
  await handler({method:'GET',headers:{}},res);assert.equal(res.code,401);
});

test('catalog imports active and disabled offers, joining translations by CMS ID', async () => {
  const {normalizeCatalog}=await import('../src/lib/offer-catalog.js');
  const result=normalizeCatalog([
    {id:'cms-a',slug:'Nacionales',title:' Nationals ',active:false,imagefront:{url:'https://www.datocms-assets.com/165228/image.jpg'}},
    {id:'cms-b',slug:'discover-us',title:'Discover',active:true},
  ],[{id:'cms-b',title:'Descúbrenos'},{id:'cms-a',title:'Nacionales'}]);
  assert.equal(result.length,2);assert.equal(result[0].id,'nacionales');assert.equal(result[0].active,false);
  assert.equal(result[0].es.title,'Nacionales');assert.equal(result[1].es.title,'Descúbrenos');
});
test('catalog sync refreshes source fields and adds offers without erasing monthly edits', async () => {
  const {reconcileCatalog}=await import('../src/lib/offer-catalog.js');
  const state=initialState();
  const saved=structuredClone(state.baseOffers);
  saved[0].es.title='Nombre guardado';saved[1].active=false;
  const custom={...structuredClone(saved[2]),id:'created-in-form'};
  saved.push(custom);state.months['2026-11']={offers:saved};
  const catalog=structuredClone(state.baseOffers);
  catalog[0].es.title='Nombre CMS';catalog[0].en.terms='Updated source conditions';
  catalog.push({...structuredClone(catalog[2]),id:'new-cms-offer',active:false});
  const merged=reconcileCatalog(state,catalog);
  const offers=offersForMonth(merged,'2026-11');
  assert.equal(offers[0].es.title,'Nombre guardado');
  assert.equal(offers[0].en.terms,'Updated source conditions');
  assert.equal(offers[1].active,false);
  assert.ok(offers.some(o=>o.id==='new-cms-offer' && !o.active));
  assert.ok(offers.some(o=>o.id==='created-in-form'));
  assert.equal(merged.baseOffers[0].es.title,'Nombre CMS');
  assert.deepEqual(reconcileCatalog(merged,catalog),merged);
});
test('disabled incomplete CMS records can be retained, but activation requires bilingual text', () => {
  const offers=initialState().baseOffers;
  offers[0].active=false;offers[0].es.terms='';offers[0].image='https://www.datocms-assets.com/165228/image.jpg';
  assert.equal(validateOffers(offers).length,3);
  offers[0].active=true;assert.throws(()=>validateOffers(offers));
});
test('CMS catalog paginates beyond 100 offers without filtering inactive records', async () => {
  const {fetchCatalog}=await import('../src/lib/offer-catalog.js');
  const originalFetch=globalThis.fetch, originalToken=process.env.DATOCMS_API_TOKEN;
  process.env.DATOCMS_API_TOKEN='unit-test-cms-token';
  const skips=[];
  globalThis.fetch=async (_url,options) => {
    const body=JSON.parse(options.body);
    assert.match(body.query,/\$skip:IntType!/);
    assert.doesNotMatch(body.query,/filter:/);
    skips.push(body.variables.skip);
    const count=body.variables.skip===0 ? 100 : 1;
    const records=Array.from({length:count},(_,i)=>({id:`cms-${body.variables.skip+i}`,slug:`offer-${body.variables.skip+i}`,active:false,title:'Archived offer'}));
    return new Response(JSON.stringify({data:{en:records,es:records}}));
  };
  try {const offers=await fetchCatalog();assert.equal(offers.length,101);assert.deepEqual(skips,[0,100]);assert.ok(offers.every(o=>o.active===false));}
  finally {globalThis.fetch=originalFetch;if(originalToken===undefined)delete process.env.DATOCMS_API_TOKEN;else process.env.DATOCMS_API_TOKEN=originalToken;}
});
