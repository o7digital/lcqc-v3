import {createHash} from 'node:crypto';
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
export function accessCooldown(record, now = Date.now()) {
  const day=new Date(now).toISOString().slice(0,10);
  if(record?.lastAttempt && now-record.lastAttempt < 300000) return true;
  return record?.day===day && record.count>=5;
}
// Private durable limits prevent anonymous requests from repeatedly emailing the team.
export async function claimAccessEmail(email, now=Date.now()) {
  const key=`monthly-offers/access/${createHash('sha256').update(email).digest('hex')}.json`;
  let record=null,etag=null;
  try {
    const blob=await get(key,{access:'private',useCache:false,headers:{'Accept-Encoding':'identity'}});
    if(blob){record=await new Response(blob.stream).json();etag=blob.blob.etag;}
  }catch(e){if(!(e instanceof BlobNotFoundError))throw e;}
  if(accessCooldown(record,now))return false;
  const day=new Date(now).toISOString().slice(0,10);
  const next={day,count:record?.day===day?record.count+1:1,lastAttempt:now};
  try {
    await put(key,JSON.stringify(next),{access:'private',addRandomSuffix:false,contentType:'application/json',...(etag?{ifMatch:etag}:{allowOverwrite:false})});
    return true;
  }catch(e){if(e.name==='BlobPreconditionFailedError'||e.name==='BlobAlreadyExistsError')return false;throw e;}
}
