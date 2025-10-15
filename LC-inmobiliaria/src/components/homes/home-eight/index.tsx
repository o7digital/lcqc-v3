import HeaderFive from "@/layouts/headers/HeaderFive";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import ConsultoriaSection from "./ConsultoriaSection";
import BLockFeatureOne from "./BLockFeatureOne";
import PropertyListingOne from "./PropertyListingOne";
import FancyBannerOne from "./FancyBannerOne";
import BLockFeatureTwo from "./BLockFeatureTwo"; // ← Servicios original del template
import BLockFeatureFour from "../home-one/BLockFeatureFour";
import FancyBannerTwo from "../home-two/FancyBannerTwo";
import FooterThree from "@/layouts/footers/FooterThree";
import AvisoPrivacidad from "@/components/common/AvisoPrivacidad";

const HomeEight = () => {
  return (
    <div className="main-page-wrapper">
      <HeaderFive />
      <Hero />

      {/* 🔥 Bloques añadidos */}
      <AboutSection />
      <ConsultoriaSection />

      <BLockFeatureOne />
      <PropertyListingOne />
      <FancyBannerOne />
      <BLockFeatureTwo />   {/* 👈 Mantiene el bloque de Servicios original */}
      <BLockFeatureFour />
      <FancyBannerTwo />
      <AvisoPrivacidad />
      <FooterThree />
    </div>
  );
};

export default HomeEight;
