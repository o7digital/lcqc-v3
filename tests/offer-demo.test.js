import test from 'node:test';
import assert from 'node:assert/strict';
import seed from '../src/data/monthly-offers.json' with {type:'json'};
import {createDemo,DEMO_STORAGE_KEY} from '../src/lib/offer-demo.js';
test('demo opens without credentials and saves only to its browser store',()=>{
 const entries=new Map(),storage={getItem:key=>entries.get(key),setItem:(key,value)=>entries.set(key,value)};
 const now=()=>new Date('2026-10-08T18:00:00Z');
 const request=createDemo(seed,storage,now);const data=request('/api/offers?admin=1');
 assert.equal(data.period.month,'2026-10');assert.equal(data.offers.length,seed.length);
 const changed=structuredClone(data.offers);changed[0].es.title='Oferta demo';
 request('/api/offers',{method:'PUT',body:JSON.stringify({month:'2026-11',offers:changed})});
 assert.ok(entries.has(DEMO_STORAGE_KEY));
 assert.notEqual(request('/api/offers').offers[0].es.title,'Oferta demo');
 assert.equal(createDemo(seed,storage,now)('/api/offers?month=2026-11').offers[0].es.title,'Oferta demo');
 assert.notEqual(seed[0].es.title,'Oferta demo');
 assert.match(request('/api/offers?month=2028-02').period.es,/29 de febrero/);
 assert.throws(()=>request('/api/offers',{method:'PUT',body:JSON.stringify({month:'2028-02',offers:changed})}));
});
