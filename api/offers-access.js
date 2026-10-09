import {isEnabled,signAccess} from '../src/lib/offer-service.js';
import {ACCESS_EMAILS,ACCESS_RESPONSE,normalizeAccessEmail,claimAccessEmail,finishAccessEmail} from '../src/lib/offer-access.js';
export function createAccessHandler({claim=claimAccessEmail,finish=finishAccessEmail,send=(...args)=>fetch(...args),mint=signAccess}={}) {
  return async function handler(req,res){
    res.setHeader('Cache-Control','no-store');
    res.setHeader('X-Robots-Tag','noindex, nofollow');
    if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Método no permitido.'});}
    if(!isEnabled())return res.status(404).json({error:'Acceso no disponible.'});
    // Formspree notification rules, not an arbitrary request parameter, control delivery.
    const endpoint=process.env.OFFERS_FORMSPREE_ENDPOINT||'';
    if(process.env.OFFERS_ACCESS_EMAIL_ENABLED!=='true' || !/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint))return res.status(503).json({error:'El acceso por correo todavía no está configurado. Utilice su enlace privado o contacte a Olivier.'});
    try {
      const origin=new URL(req.headers.origin||'');
      if(origin.host!==req.headers.host || (origin.protocol!=='https:' && process.env.VERCEL_ENV!=='development'))return res.status(403).json({error:'Solicitud no permitida.'});
    }catch{return res.status(403).json({error:'Solicitud no permitida.'});}
    const email=normalizeAccessEmail(req.body?.email);
    if(!email)return res.status(400).json({error:'Introduzca un correo válido.'});
    if(req.body?._gotcha || !ACCESS_EMAILS.has(email))return res.status(202).json({message:ACCESS_RESPONSE});
    let receipt,accepted=false;
    try {
      receipt=await claim(email);
      if(receipt===false || receipt?.allowed===false){
        const retryAfter=receipt?.retryAfter||60;
        res.setHeader('Retry-After',String(retryAfter));
        if(receipt?.accepted)return res.status(202).json({message:'Formspree ya aceptó la solicitud anterior. Revise su correo y la carpeta de no deseados. Si no llega, contacte a Olivier para verificar la entrega.',retryAfter});
        return res.status(429).json({error:'Hay una solicitud en curso o se alcanzó el límite diario. Espere antes de volver a solicitar el enlace.',retryAfter});
      }
      const token=mint('*',Date.now()+30*60000);
      // Never trust the request host to choose where an access token is delivered.
      const link=`https://lcqc-offers.o7digitalgroup.com/gestion-ofertas/#access=${token}`;
      const response=await send(endpoint,{
        method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},signal:AbortSignal.timeout(15000),
        body:JSON.stringify({email,notification:'offers_access',_subject:'La Casa Que Canta · Enlace privado de acceso',
          message:`Se solicitó acceso a la gestión de promociones para ${email}.\n\nEnlace privado (válido durante 30 minutos):\n${link}\n\nPermite revisar el mes actual y preparar el siguiente. No comparta este enlace fuera del equipo autorizado.\n\nSi no solicitó el acceso, puede ignorar este correo.`,access_link:link}),
      });
      const result=await response.json();
      if(!response.ok || result.ok!==true){
        console.error('Offers access provider rejected request',response.status);
        throw new Error('Formspree rejected access request');
      }
      accepted=true;
      return res.status(202).json({message:'Formspree aceptó la solicitud. Revise su correo y la carpeta de no deseados. La aceptación no confirma la entrega al buzón.',retryAfter:60});
    }catch(e){console.error('Offers access email failed',e.name);return res.status(503).json({error:'No se pudo enviar la solicitud. Inténtelo más tarde o utilice su enlace privado.'});}
    finally{if(receipt && receipt.allowed!==false){try{await finish(receipt,accepted);}catch(e){console.error('Offers access receipt update failed',e.name);}}}
  };
}
export default createAccessHandler();
