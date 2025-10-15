"use client"
import Image from "next/image"
import Link from "next/link"

import footerLogo from "@/assets/images/logo/logo_07.svg"

const FooterFive = () => {
   return (
      <div className="footer-four dark-bg position-relative z-1">
         {/* Newsletter */}
         <div className="news-letter-area">
            <div className="container container-large">
               <div className="line-wrapper">
                  <div className="row align-items-center">
                     <div className="col-lg-6">
                        <div className="text-center text-lg-start md-mb-40">
                           <h2 className="text-white">Boletín</h2>
                           <p className="fs-24 text-white opacity-75 m0">
                              Suscríbete y recibe noticias importantes regularmente
                           </p>
                        </div>
                     </div>
                     <div className="col-lg-6">
                        <div className="form-wrapper me-auto ms-auto me-lg-0">
                           <form onSubmit={(e) => e.preventDefault()}>
                              <input type="email" placeholder="Ingresa tu correo electrónico" className="rounded-0" />
                              <button className="rounded-0">Enviar</button>
                           </form>
                           <div className="fs-16 mt-10 text-white">
                              <span className="fw-light opacity-75">Solo enviamos correos interesantes y relevantes.</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Footer */}
         <div className="container container-large">
            <div className="bg-wrapper position-relative z-1">
               <div className="row">
                  {/* Logo + Redes Sociales */}
                  <div className="col-xl-3 col-lg-4 mb-60">
                     <div className="footer-intro">
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
                           {/* TikTok pendiente */}
                        </ul>
                     </div>
                  </div>

                  {/* Links */}
                  <div className="col-md-4 mb-30">
                     <div className="footer-nav">
                        <h5 className="footer-title text-white">Links</h5>
                        <ul className="footer-nav-link style-none">
                           <li><Link href="/">Inicio</Link></li>
                        </ul>
                     </div>
                  </div>

                  {/* Propiedades */}
                  <div className="col-md-4 mb-30">
                     <div className="footer-nav">
                        <h5 className="footer-title text-white">Propiedades</h5>
                        <ul className="footer-nav-link style-none">
                           <li><Link href="/properties">Ver Propiedades</Link></li>
                        </ul>
                     </div>
                  </div>

                  {/* Legal */}
                  <div className="col-md-4 mb-30">
                     <div className="footer-nav">
                        <h5 className="footer-title text-white">Legal</h5>
                        <ul className="footer-nav-link style-none">
                           <li><Link href="/terms">Términos & Condiciones</Link></li>
                           <li><Link href="/cookie">Cookie</Link></li>
                           <li><Link href="/privacy">Política de Privacidad</Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom */}
            <div className="bottom-footer">
               <p className="m0 text-center fs-16">
                  Copyright ©2025 LC Inmobiliaria. Todos los derechos reservados.
               </p>
            </div>
         </div>
      </div>
   )
}

export default FooterFive
