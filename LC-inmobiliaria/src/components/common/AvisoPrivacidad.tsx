"use client"
import Link from "next/link"

const AvisoPrivacidad = () => {
   return (
      <>
         {/* Bouton flottant qui redirige vers la page complète */}
         <Link
            href="/aviso-privacidad"
            className="btn btn-primary position-fixed"
            style={{
               bottom: '20px',
               right: '20px',
               borderRadius: '20px',
               padding: '8px 16px',
               fontSize: '12px',
               zIndex: 1000,
               boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
               textDecoration: 'none'
            }}
         >
            🔒 Aviso de Privacidad
         </Link>
      </>
   )
}

export default AvisoPrivacidad