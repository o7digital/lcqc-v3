import {createHash,randomUUID} from 'node:crypto';
import {get,put,BlobNotFoundError} from '@vercel/blob';
export const ACCESS_EMAILS = new Set([
  'sales.reservations@lacasaquecanta.com',
  'director@lacasaquecanta.com',
  'olivier.steineur@gmail.com',
]);
export const ACCESS_RESPONSE = 'Si su correo está autorizado, la solicitud se enviará al equipo de acceso. Revise los buzones configurados y la carpeta de correo no deseado.';
export function normalizeAccessEmail(value) {
  if(typeof value!=='string' || value.length>254) return null;
  const email=value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?email:null;
}
export function accessRetryAfter(record, now = Date.now()) {
  if(!record)return 0;
  const day=new Date(now).toISOString().slice(0,10);
  if(record.day===day && record.count>=5)return Math.ceil((Date.parse(day+'T00:00:00Z')+86400000-now)/1000);
  return Math.max(0,Math.ceil(((record.lastAttempt||0)+60000-now)/1000));
}
export function accessCooldown(record, now = Date.now()) {
  return accessRetryAfter(record,now)>0;
}
// Private durable limits prevent anonymous requests from repeatedly emailing the team.
export async function claimAccessEmail(email, now=Date.now()) {
  const key=`monthly-offers/access/${createHash('sha256').update(email).digest('hex')}.json`;
  let record=null,etag=null;
  try {
    const blob=await get(key,{access:'private',useCache:false,headers:{'Accept-Encoding':'identity'}});
    if(blob){record=await new Response(blob.stream).json();etag=blob.blob.etag;}
  }catch(e){if(!(e instanceof BlobNotFoundError))throw e;}
  if(accessCooldown(record,now))return {allowed:false,retryAfter:accessRetryAfter(record,now),accepted:record.accepted===true};
  const day=new Date(now).toISOString().slice(0,10);
  const next={id:randomUUID(),accepted:false,day,count:record?.day===day?record.count+1:1,lastAttempt:now};
  try {
    await put(key,JSON.stringify(next),{access:'private',addRandomSuffix:false,contentType:'application/json',...(etag?{ifMatch:etag}:{allowOverwrite:false})});
    return {allowed:true,id:next.id,key};
  }catch(e){if(e.name==='BlobPreconditionFailedError'||e.name==='BlobAlreadyExistsError')return {allowed:false,retryAfter:60,accepted:false};throw e;}
}

// Finalize only our own claim; a failed send must not consume the daily quota.
export async function finishAccessEmail(claim, accepted) {
  if(!claim?.key || !claim.id)return;
  const blob=await get(claim.key,{access:'private',useCache:false,headers:{'Accept-Encoding':'identity'}});
  if(!blob)return;
  const record=await new Response(blob.stream).json();
  if(record.id!==claim.id)return;
  record.accepted=accepted;
  if(!accepted){record.count=Math.max(0,record.count-1);record.lastAttempt=0;}
  await put(claim.key,JSON.stringify(record),{access:'private',addRandomSuffix:false,contentType:'application/json',ifMatch:blob.blob.etag});
}
