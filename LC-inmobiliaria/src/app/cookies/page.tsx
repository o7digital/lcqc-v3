"use client"
import Link from "next/link"
import HeaderFour from "@/layouts/headers/HeaderFour"
import FooterFour from "@/layouts/footers/FooterFour"

export default function Cookies() {
  return (
    <>
      <HeaderFour />
      <div className="pt-200 xl-pt-150 pb-200 xl-pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="cookies-policy-content">
                <h1 className="text-center mb-60 color-primary">Política de Cookies</h1>
                <p className="text-center mb-40 fs-18">
                  <strong>Última actualización: Octubre 2025</strong>
                </p>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">¿Qué son las cookies?</h2>
                  <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos ayudan a mejorar su experiencia de navegación y a entender cómo utiliza nuestros servicios.</p>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">¿Qué cookies utilizamos?</h2>
                  
                  <div className="row">
                    <div className="col-md-6 mb-30">
                      <div className="bg-light p-20 rounded">
                        <h5 className="color-primary">🔧 Cookies técnicas</h5>
                        <p className="mb-0">Necesarias para el funcionamiento del sitio web. No se pueden desactivar.</p>
                        <small><strong>Duración:</strong> Sesión</small>
                      </div>
                    </div>
                    <div className="col-md-6 mb-30">
                      <div className="bg-light p-20 rounded">
                        <h5 className="color-primary">📊 Cookies analíticas</h5>
                        <p className="mb-0">Nos ayudan a entender cómo los visitantes interactúan con el sitio web.</p>
                        <small><strong>Duración:</strong> 2 años</small>
                      </div>
                    </div>
                    <div className="col-md-6 mb-30">
                      <div className="bg-light p-20 rounded">
                        <h5 className="color-primary">⚙️ Cookies funcionales</h5>
                        <p className="mb-0">Permiten recordar sus preferencias y personalizar su experiencia.</p>
                        <small><strong>Duración:</strong> 1 año</small>
                      </div>
                    </div>
                    <div className="col-md-6 mb-30">
                      <div className="bg-light p-20 rounded">
                        <h5 className="color-primary">📢 Cookies publicitarias</h5>
                        <p className="mb-0">Utilizadas para mostrar anuncios relevantes para usted.</p>
                        <small><strong>Duración:</strong> Variable</small>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Cookies de terceros</h2>
                  <p>Nuestro sitio web puede utilizar cookies de terceros para mejorar la funcionalidad y analizar el tráfico:</p>
                  
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Servicio</th>
                          <th>Propósito</th>
                          <th>Más información</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Google Analytics</td>
                          <td>Análisis de tráfico web</td>
                          <td><a href="https://policies.google.com/privacy" target="_blank">Política de Google</a></td>
                        </tr>
                        <tr>
                          <td>Facebook Pixel</td>
                          <td>Publicidad y remarketing</td>
                          <td><a href="https://www.facebook.com/privacy/policy/" target="_blank">Política de Facebook</a></td>
                        </tr>
                        <tr>
                          <td>WhatsApp Business</td>
                          <td>Chat y comunicación</td>
                          <td><a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank">Política de WhatsApp</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">¿Cómo gestionar las cookies?</h2>
                  
                  <div className="alert alert-info mb-30">
                    <h5>Configuración del navegador</h5>
                    <p className="mb-0">Puede controlar y eliminar las cookies a través de la configuración de su navegador. Tenga en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio web.</p>
                  </div>

                  <div className="row">
                    <div className="col-md-3 mb-20 text-center">
                      <strong>Chrome</strong><br/>
                      <small>Configuración {`>`} Privacidad y seguridad {`>`} Cookies</small>
                    </div>
                    <div className="col-md-3 mb-20 text-center">
                      <strong>Firefox</strong><br/>
                      <small>Opciones {`>`} Privacidad y seguridad</small>
                    </div>
                    <div className="col-md-3 mb-20 text-center">
                      <strong>Safari</strong><br/>
                      <small>Preferencias {`>`} Privacidad</small>
                    </div>
                    <div className="col-md-3 mb-20 text-center">
                      <strong>Edge</strong><br/>
                      <small>Configuración {`>`} Privacidad, búsqueda y servicios</small>
                    </div>
                  </div>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Consentimiento y derechos</h2>
                  <div className="alert alert-warning">
                    <p><strong>Su consentimiento:</strong> Al continuar navegando en nuestro sitio web, usted acepta el uso de cookies según se describe en esta política.</p>
                    <p className="mb-0"><strong>Sus derechos:</strong> Puede retirar su consentimiento en cualquier momento modificando la configuración de su navegador o contactándonos.</p>
                  </div>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Actualización de la política</h2>
                  <p>Esta política de cookies puede actualizarse periódicamente. La fecha de la última actualización se indica al inicio de este documento.</p>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Contacto</h2>
                  <div className="bg-light p-30 rounded">
                    <p className="mb-20"><strong>Para cualquier consulta sobre nuestra política de cookies:</strong></p>
                    <p className="mb-10">📧 <strong>Email:</strong> info@lc-inmobiliaria.com.mx</p>
                    <p className="mb-10">🔒 <strong>Privacidad:</strong> privacidad@lc-inmobiliaria.com.mx</p>
                    <p className="mb-0">📄 <strong>Aviso de Privacidad:</strong> <Link href="/aviso-privacidad">Ver aviso completo</Link></p>
                  </div>
                </section>

                <div className="text-center pt-40 border-top">
                  <p className="fs-16">
                    <strong>LC INMOBILIARIA</strong> - Política de Cookies actualizada en Octubre 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterFour />
    </>
  )
}