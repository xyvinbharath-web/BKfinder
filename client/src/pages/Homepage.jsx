import React from "react";

// Import event components
import HeroSection from "../components/event/HeroSection";
import AboutEvent from "../components/event/AboutEvent";
import ExpoHighlights from "../components/event/ExpoHighlights";
import BusinessOpportunities from "../components/event/BusinessOpportunities";
import VisitorPackages from "../components/event/VisitorPackages";

import Footer from "../components/event/Footer";

// Import existing components
import BrandPartners from "../components/brandpartners";

function Homepage() {
  return (
    <div className="w-full">
      {/* Event Landing Page Sections */}
      <HeroSection />
      <AboutEvent />
      <VisitorPackages />
      <ExpoHighlights />
      <BusinessOpportunities />

      
      {/* Existing Brand Partners Section */}
      <BrandPartners />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Homepage;
