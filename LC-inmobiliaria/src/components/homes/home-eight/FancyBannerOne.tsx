const FancyBannerOne = () => {
   return (
      <div className="fancy-banner-nine mt-110 lg-mt-80">
         <div className="container container-large">
            <div className="row align-items-center">
               <div className="col-lg-4">
                  <div className="d-flex align-items-center md-mb-30">
                     <div
                        className="rounded-circle avatar flex-shrink-0"
                        style={{ width: 100, height: 100, border: "2px solid #e0e0e0" }}
                        aria-hidden="true"
                     />
                     <div className="ps-3 text">
                        <h6 className="fs-22">Lourdes Cazares</h6>
                        <span className="fs-20">Fundadora y CEO de LC Inmobiliaria</span>
                     </div>
                  </div>
               </div>
               <div className="col-xxl-7 col-lg-8">
                  <blockquote>&quot;Seguimos un proceso para ofrecer a nuestros inversionistas las mejores oportunidades.&quot;</blockquote>
               </div>
            </div>

            <div className="fact-wrapper d-flex flex-wrap mt-60 md-mt-40">
               <div className="fact-box">
                  <div className="text-meta text-sm-start d-inline-block">
                     <div className="numb">300</div>
                     <span>Terrenos Analizados</span>
                  </div>
               </div>
               <div className="fact-box">
                  <div className="text-meta text-sm-start d-inline-block">
                     <div className="numb">0.2%</div>
                     <span>Pasaron la evaluacion inicial</span>
                  </div>
               </div>
               <div className="fact-box">
                  <div className="text-meta text-sm-start d-inline-block">
                     <div className="numb">15%</div>
                     <span>Aprobados por el Comite</span>
                  </div>
               </div>
               <div className="fact-box">
                  <div className="text-meta text-sm-start d-inline-block">
                     <div className="numb">5%</div>
                     <span>Adquiridos</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FancyBannerOne
