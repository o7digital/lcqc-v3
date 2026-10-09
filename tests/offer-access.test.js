import test from 'node:test';
import assert from 'node:assert/strict';
import {createAccessHandler} from '../api/offers-access.js';
import {normalizeAccessEmail,accessCooldown,accessRetryAfter} from '../src/lib/offer-access.js';
process.env.OFFERS_AUTOMATION_ENABLED='true';
process.env.OFFERS_ACCESS_EMAIL_ENABLED='true';
process.env.OFFERS_FORMSPREE_ENDPOINT='https://formspree.io/f/xkjorkgl';
function request(email){return {method:'POST',headers:{origin:'https://lcqc-offers.o7digitalgroup.com',host:'lcqc-offers.o7digitalgroup.com'},body:{email}};}
function response(){return {code:0,body:null,setHeader(){},status(code){this.code=code;return this},json(body){this.body=body;return this}};}
test('access email is normalized; unknown addresses never receive tokens or trigger email',async()=>{
 assert.equal(normalizeAccessEmail('  OLIVIER.STEINEUR@GMAIL.COM '),'olivier.steineur@gmail.com');
 assert.equal(normalizeAccessEmail('invalid'),null);
 let sent=false;
 const handler=createAccessHandler({claim:async()=>{throw new Error('Unexpected claim')},send:async()=>{sent=true}});
 const res=response();await handler(request('unknown@example.com'),res);
 assert.equal(res.code,202);assert.equal(sent,false);assert.equal(res.body.access_link,undefined);
});
test('authorized requests send an expiring link to Formspree, never to the browser',async()=>{
 let payload,expires;
 const handler=createAccessHandler({claim:async()=>true,mint:(_month,exp)=>{expires=exp;return 'test-signed-link'},send:async(url,opts)=>{assert.equal(url,'https://formspree.io/f/xkjorkgl');payload=JSON.parse(opts.body);return {ok:true,json:async()=>({ok:true})}}});
 const res=response();await handler(request('sales.reservations@lacasaquecanta.com'),res);
 assert.equal(res.code,202);assert.equal(payload.notification,'offers_access');
 assert.match(payload.access_link,/^https:\/\/lcqc-offers.o7digitalgroup.com\/gestion-ofertas\/#access=test-signed-link$/);
 assert.ok(expires>Date.now()+29*60000 && expires<=Date.now()+30*60000);
 assert.doesNotMatch(JSON.stringify(res.body),/test-signed-link/);
});
test('cross-origin submissions and excessive requests are blocked without sending',async()=>{
 let sent=false;
 const handler=createAccessHandler({claim:async()=>false,send:async()=>{sent=true}});
 const req=request('director@lacasaquecanta.com');req.headers.origin='https://evil.example';
 let res=response();await handler(req,res);assert.equal(res.code,403);
 res=response();await handler(request('director@lacasaquecanta.com'),res);assert.equal(res.code,429);
 assert.equal(sent,false);
 const now=Date.now(),day=new Date(now).toISOString().slice(0,10);
 assert.equal(accessCooldown({lastAttempt:now-1000,count:1,day},now),true);
 assert.equal(accessCooldown({lastAttempt:now-600000,count:5,day},now),true);
 assert.equal(accessCooldown({lastAttempt:now-600000,count:1,day},now),false);
});
test('upstream rejection is reported honestly rather than claiming delivery',async()=>{
 const handler=createAccessHandler({claim:async()=>true,mint:()=> 'test',send:async()=>({ok:false,json:async()=>({ok:false})})});
 const res=response();await handler(request('director@lacasaquecanta.com'),res);
 assert.equal(res.code,503);assert.match(res.body.error,/No se pudo enviar/);
});

test('accepted requests remain successful on repeated clicks and expose a resend delay',async()=>{
 const handler=createAccessHandler({claim:async()=>({allowed:false,accepted:true,retryAfter:42}),send:async()=>{throw Error('Duplicate send')}});
 const res=response();await handler(request('olivier.steineur@gmail.com'),res);
 assert.equal(res.code,202);assert.equal(res.body.retryAfter,42);
});
test('provider success body is required; failures release the reserved request',async()=>{
 let finished;
 const handler=createAccessHandler({claim:async()=>({allowed:true,id:'fake'}),finish:async(_claim,accepted)=>{finished=accepted},mint:()=> 'test',send:async()=>({ok:true,status:200,json:async()=>({ok:false})})});
 const res=response();await handler(request('olivier.steineur@gmail.com'),res);
 assert.equal(res.code,503);assert.equal(finished,false);
});

test('resend delay is one minute and expires without blocking for five minutes',()=>{
 const now=Date.now(),day=new Date(now).toISOString().slice(0,10);
 assert.equal(accessRetryAfter({lastAttempt:now-10000,day,count:1},now),50);
 assert.equal(accessCooldown({lastAttempt:now-61000,day,count:1},now),false);
});
