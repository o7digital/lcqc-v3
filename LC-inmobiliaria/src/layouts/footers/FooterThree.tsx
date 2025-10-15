"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import footerLogo from "@/assets/images/logo/logo_06.svg"

const FooterThree = () => {
   const [showCookies, setShowCookies] = useState(true);

   return (
      <>
         <div className="footer-three">
            <div className="container container-large">
               <div className="bg-wrapper position-relative z-1">
                  <div className="row">
                     {/* Logo seul */}
                     <div className="col-lg-6 mb-40 lg-mb-60">
                        <div className="footer-intro pe-xxl-5 pe-xl-3">
                           <div className="logo mb-20">
                              <Link href="/">
                                 <Image src={footerLogo} alt="LC Inmobiliaria" />
                              </Link>
                           </div>
                           <ul className="style-none d-flex align-items-center social-icon">
                              <li>
                                 <Link href="https://www.facebook.com/share/194twPujV3/?mibextid=wwXIfr" target="_blank">
                                    <i className="fa-brands fa-facebook-f"></i>
                                 </Link>
                              </li>
                              <li>
                                 <Link href="https://www.instagram.com/lcinmobiliaria.mx?igsh=MW82MG5qc29jaHNmOA==" target="_blank">
                                    <i className="fa-brands fa-instagram"></i>
                                 </Link>
                              </li>
                           </ul>
                        </div>
                     </div>

                     {/* Boletín */}
                     <div className="col-lg-6 mb-40 lg-mb-60">
                        <div className="footer-newsletter">
                           <h5 className="footer-title text-primary mb-15" style={{fontSize: '16px', fontWeight: '500'}}>Boletín</h5>
                           <p className="mb-15" style={{fontSize: '14px'}}>Suscríbete y recibe noticias importantes regularmente</p>
                           <form onSubmit={(e) => e.preventDefault()} className="newsletter-form position-relative">
                              <div className="d-flex align-items-stretch">
                                 <input 
                                    type="email" 
                                    placeholder="Ingresa tu correo electrónico" 
                                    className="form-control"
                                    style={{
                                       height: '35px',
                                       border: '1px solid #ddd',
                                       borderRadius: '4px 0 0 4px',
                                       paddingLeft: '12px',
                                       fontSize: '13px'
                                    }}
                                 />
                                 <button 
                                    type="submit" 
                                    className="btn text-white fw-500"
                                    style={{
                                       height: '35px',
                                       backgroundColor: '#000',
                                       border: 'none',
                                       borderRadius: '0 4px 4px 0',
                                       padding: '0 15px',
                                       fontSize: '12px'
                                    }}
                                 >
                                    ENVIAR
                                 </button>
                              </div>
                           </form>
                           <p className="mt-10 opacity-75" style={{fontSize: '11px'}}>Solo enviamos correos interesantes y relevantes.</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Bottom Footer */}
               <div className="bottom-footer">
                  <p className="m0 text-center" style={{fontSize: '14px'}}>
                     Copyright ©2025 LC INMOBILIARIA. Todos los derechos reservados.
                  </p>
               </div>
            </div>
         </div>

         {/* Banner Cookies */}
         {showCookies && (
            <div 
               className="position-fixed w-100 bg-dark text-white p-3"
               style={{
                  bottom: 0,
                  left: 0,
                  zIndex: 1040
               }}
            >
               <div className="container">
                  <div className="row align-items-center">
                     <div className="col-md-8">
                        <div className="d-flex align-items-center">
                           <span className="me-2" style={{fontSize: '18px'}}>🍪</span>
                           <div>
                              <strong style={{fontSize: '16px'}}>Uso de Cookies</strong>
                              <p className="mb-0" style={{fontSize: '14px'}}>
                                 Utilizamos cookies para mejorar su experiencia en nuestro sitio web, analizar el tráfico y personalizar el contenido. Al continuar navegando, acepta nuestro uso de cookies según nuestra{' '}
                                 <Link href="/cookies" className="text-decoration-underline text-warning">Política de Cookies</Link>.
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="col-md-4 text-end">
                        <div className="d-flex gap-2 justify-content-end">
                           <button 
                              onClick={() => setShowCookies(false)}
                              className="btn btn-outline-light btn-sm"
                              style={{fontSize: '12px'}}
                           >
                              ✕ Rechazar
                           </button>
                           <button 
                              onClick={() => setShowCookies(false)}
                              className="btn btn-outline-warning btn-sm"
                              style={{fontSize: '12px'}}
                           >
                              ⚙️ Personalizar
                           </button>
                           <button 
                              onClick={() => setShowCookies(false)}
                              className="btn btn-warning btn-sm text-dark"
                              style={{fontSize: '12px'}}
                           >
                              ✓ Aceptar Todo
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   )
}

export default FooterThree