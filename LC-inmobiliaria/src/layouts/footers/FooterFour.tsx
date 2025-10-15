"use client"
import Image from "next/image"

import footerLogo from "@/assets/images/logo/logo_06.svg"
import footerShape from "@/assets/images/assets/ils_06.svg"
import Link from "next/link"
import footer_data from "@/data/home-data/FooterData"

const FooterFour = () => {
   return (
      <div className="footer-four position-relative z-1">
         <div className="container container-large">
            <div className="bg-wrapper position-relative z-1">
               <div className="row">
                  <div className="col-lg-6 mb-60">
                     <div className="footer-intro">
                        <div className="logo mb-20">
                           <Link href="/">
                              <Image src={footerLogo} alt="LC Inmobiliaria" />
                           </Link>
                        </div>
                        <div className="contact-info mb-30">
                           <p className="mb-10">Cerrada de Bezares 133, Col. Lomas</p>
                           <p className="mb-10">de Bezares,</p>
                           <p className="mb-20">CP 11910, Miguel Hidalgo, CDMX.</p>
                        </div>
                        <ul className="style-none d-flex align-items-center social-icon">
                           <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                           <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
                           <li><Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link></li>
                        </ul>
                     </div>
                  </div>

                  <div className="col-lg-6 mb-60">
                     <div className="footer-newsletter">
                        <h5 className="footer-title mb-20">Boletín</h5>
                        <p className="mb-20">Suscríbete y recibe noticias importantes regularmente</p>
                        <form className="newsletter-form">
                           <div className="d-flex">
                              <input type="email" placeholder="Ingresa tu correo electrónico" className="form-control me-2" />
                              <button type="submit" className="btn-one">ENVIAR</button>
                           </div>
                        </form>
                        <p className="mt-10 fs-14">Solo enviamos correos interesantes y relevantes.</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="bottom-footer">
               <p className="m0 text-center fs-16">
                  Copyright ©2025 LC INMOBILIARIA. Todos los derechos reservados.
                  <span className="ms-3">
                     <Link href="/aviso-privacidad" className="text-decoration-underline">Aviso de Privacidad</Link>
                  </span>
               </p>
            </div>
         </div>
         <Image src={footerShape} alt="" className="lazy-img shapes shape_01" />
      </div>
   )
}

export default FooterFour
