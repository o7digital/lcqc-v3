"use client"
import Link from "next/link"
import HeaderFour from "@/layouts/headers/HeaderFour"
import FooterFour from "@/layouts/footers/FooterFour"

export default function AvisoPrivacidad() {
  return (
    <>
      <HeaderFour />
      <div className="pt-200 xl-pt-150 pb-200 xl-pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="privacy-policy-content">
                <h1 className="text-center mb-40 text-primary" style={{fontSize: '2.5rem', fontWeight: '600'}}>Aviso de Privacidad</h1>
                <p className="text-center mb-30" style={{fontSize: '16px'}}>
                  <strong>Última actualización: Octubre 2025</strong>
                </p>

                <div className="alert alert-info mb-40">
                  <h5 className="text-primary">Este aviso cumple con:</h5>
                  <ul className="mb-0">
                    <li>🇲🇽 Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP - México)</li>
                    <li>🇪🇺 Règlement Général sur la Protection des Données (RGPD - Europe)</li>
                    <li>🇺🇸 California Consumer Privacy Act (CCPA - Californie, USA)</li>
                  </ul>
                </div>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{fontSize: '1.75rem', fontWeight: '500'}}>Responsable del tratamiento de datos</h2>
                  <p><strong>Denominación:</strong> LC INMOBILIARIA</p>
                  <p><strong>Email:</strong> info@lc-inmobiliaria.com.mx</p>
                </section>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{fontSize: '1.75rem', fontWeight: '500'}}>Finalidad del tratamiento de los datos personales</h2>
                  <p>Los datos personales que usted proporcione serán utilizados para las siguientes finalidades primarias:</p>
                  <ul>
                    <li>Contactarlo en relación con los servicios inmobiliarios ofrecidos</li>
                    <li>Elaborar, gestionar o celebrar contratos de arrendamiento, compraventa o intermediación</li>
                    <li>Brindar asesoría personalizada en materia de inversión, compraventa o renta de inmuebles</li>
                    <li>Cumplir con obligaciones legales, fiscales o contractuales derivadas de las operaciones</li>
                    <li>Mantener actualizada la base de datos de clientes, proveedores y colaboradores</li>
                  </ul>

                  <div className="alert alert-warning mt-30">
                    <h5>Finalidades secundarias (opcionales):</h5>
                    <ul className="mb-0">
                      <li>Envío de boletines, promociones o información comercial</li>
                      <li>Evaluar la satisfacción del cliente y mejorar la calidad del servicio</li>
                    </ul>
                    <p className="mb-0 mt-10">Si no desea que sus datos sean utilizados para estas finalidades secundarias, puede manifestarlo enviando un correo a <strong>privacidad@lc-inmobiliaria.com.mx</strong></p>
                  </div>
                </section>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{fontSize: '1.75rem', fontWeight: '500'}}>Datos personales recabados</h2>
                  <p>LC INMOBILIARIA podrá recopilar los siguientes datos personales:</p>
                  
                  <div className="row mt-30">
                    <div className="col-md-6 mb-20">
                      <strong>Identificación:</strong> nombre, apellidos, fecha de nacimiento, nacionalidad
                    </div>
                    <div className="col-md-6 mb-20">
                      <strong>Datos financieros:</strong> información bancaria o fiscal
                    </div>
                    <div className="col-md-6 mb-20">
                      <strong>Contacto:</strong> teléfono, correo electrónico, dirección
                    </div>
                    <div className="col-md-6 mb-20">
                      <strong>Datos patrimoniales:</strong> información sobre inmuebles, contratos, escrituras
                    </div>
                  </div>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Transferencia y almacenamiento de datos</h2>
                  <p>Sus datos personales <strong>no serán transferidos a terceros</strong> sin su consentimiento expreso, salvo en los siguientes casos:</p>
                  <ul>
                    <li>Autoridades competentes en cumplimiento de la legislación mexicana</li>
                    <li>Notarios, corredores públicos o instituciones financieras que participen en las operaciones</li>
                    <li>Plataformas tecnológicas contratadas para la gestión de clientes y seguridad de información</li>
                  </ul>

                  <div className="alert alert-success mt-30">
                    <p className="mb-0">🔒 Todos los terceros con los que se comparten datos cumplen con las normas de confidencialidad establecidas por la LFPDPPP y el RGPD.</p>
                  </div>
                </section>

                <section className="mb-40">
                  <h2 className="text-primary mb-25" style={{fontSize: '1.75rem', fontWeight: '500'}}>Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</h2>
                  <p>Usted tiene derecho a:</p>
                  
                  <div className="row mt-30">
                    <div className="col-md-3 text-center mb-30">
                      <div className="p-15 border rounded">
                        <div style={{fontSize: '30px', color: '#007bff'}} className="mb-10">👁</div>
                        <h6>Acceder</h6>
                        <small>A sus datos personales</small>
                      </div>
                    </div>
                    <div className="col-md-3 text-center mb-30">
                      <div className="p-15 border rounded">
                        <div style={{fontSize: '30px', color: '#007bff'}} className="mb-10">✏️</div>
                        <h6>Rectificar</h6>
                        <small>Datos inexactos</small>
                      </div>
                    </div>
                    <div className="col-md-3 text-center mb-30">
                      <div className="p-15 border rounded">
                        <div style={{fontSize: '30px', color: '#007bff'}} className="mb-10">🗑</div>
                        <h6>Cancelar</h6>
                        <small>Sus datos</small>
                      </div>
                    </div>
                    <div className="col-md-3 text-center mb-30">
                      <div className="p-15 border rounded">
                        <div style={{fontSize: '30px', color: '#007bff'}} className="mb-10">🚫</div>
                        <h6>Oponerse</h6>
                        <small>Al tratamiento</small>
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-info">
                    <h6 className="text-primary">Para ejercer estos derechos:</h6>
                    <p>Envíe una solicitud a: <strong>privacidad@lc-inmobiliaria.com.mx</strong></p>
                    <p><strong>Su solicitud debe contener:</strong></p>
                    <ul className="mb-0">
                      <li>Nombre completo y medio de contacto</li>
                      <li>Documentos que acrediten su identidad</li>
                      <li>Descripción clara de los datos sobre los que desea ejercer derechos</li>
                    </ul>
                    <p className="mb-0 mt-10"><strong>Plazo de respuesta:</strong> 20 días hábiles. Efectividad: 15 días hábiles adicionales.</p>
                  </div>

                  <div className="text-center mt-30">
                    <Link 
                      href="mailto:privacidad@lc-inmobiliaria.com.mx" 
                      className="btn btn-primary"
                      style={{padding: '12px 30px', fontSize: '16px'}}
                    >
                      🔒 Ejercer mis Derechos ARCO
                    </Link>
                  </div>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Medidas de seguridad</h2>
                  <div className="alert alert-success">
                    <p><strong>🔒 LC INMOBILIARIA</strong> implementa medidas administrativas, técnicas y físicas necesarias para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado.</p>
                  </div>
                  
                  <p>Los datos se almacenan en sistemas protegidos mediante:</p>
                  <ul>
                    <li>Autenticación segura</li>
                    <li>Encriptación de datos</li>
                    <li>Protocolos HTTPS certificados</li>
                  </ul>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Conservación de los datos</h2>
                  <p>Los datos personales se conservarán por el tiempo que sea necesario para cumplir con las finalidades antes descritas y conforme a los plazos previstos por la legislación aplicable.</p>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Cumplimiento internacional (RGPD / CCPA)</h2>
                  <div className="row">
                    <div className="col-md-6 mb-30">
                      <div className="bg-primary text-white p-20 rounded">
                        <h5>🇪🇺 Unión Europea (RGPD)</h5>
                        <p className="mb-0">Si usted reside en la UE, trataremos sus datos conforme al artículo 6 del RGPD:</p>
                        <ul className="mt-10 mb-0">
                          <li>Consentimiento explícito</li>
                          <li>Ejecución de contrato</li>
                          <li>Cumplimiento legal</li>
                          <li>Interés legítimo</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6 mb-30">
                      <div className="bg-success text-white p-20 rounded">
                        <h5>🇺🇸 California (CCPA)</h5>
                        <p className="mb-0">Los usuarios en California pueden ejercer derechos CCPA:</p>
                        <ul className="mt-10 mb-0">
                          <li>Derecho a conocer</li>
                          <li>Derecho a eliminar</li>
                          <li>Derecho a limitar uso</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Cambios en el Aviso de Privacidad</h2>
                  <div className="alert alert-warning">
                    <p className="mb-0">⚠️ Este Aviso puede ser modificado o actualizado en cualquier momento. Cualquier <strong>cambio será publicado en:</strong><br/>
                    <strong>www.lc-inmobiliaria.com.mx/aviso-privacidad</strong></p>
                  </div>
                </section>

                <section className="mb-50">
                  <h2 className="color-primary mb-30">Contacto de privacidad</h2>
                  <div className="bg-light p-30 rounded">
                    <p className="mb-20"><strong>Para cualquier duda o solicitud relacionada con este Aviso:</strong></p>
                    <p className="mb-10">👤 <strong>Responsable:</strong> LC INMOBILIARIA</p>
                    <p className="mb-10">📧 <strong>Email:</strong> privacidad@lc-inmobiliaria.com.mx</p>
                  </div>
                </section>

                <div className="text-center pt-40 border-top">
                  <p className="fs-16">
                    <strong>LC INMOBILIARIA</strong> - Aviso de Privacidad actualizado en Octubre 2025<br/>
                    <small>Cumple con LFPDPPP (México), RGPD (Europa) y CCPA (California, USA)</small>
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