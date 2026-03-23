import React from "react";
import venuePartnerLogo from "../assets/partners/C1.png";
import associatePartnerLogo from "../assets/partners/epic.png";

function BrandPartners() {
  const partners = [
    {
      title: "Venue Partner",
      img: venuePartnerLogo,
      alt: "Venue Partner"
    },
    {
      title: "Associate Partner",
      img: associatePartnerLogo,
      alt: "Associate Partner"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden relative border-y border-slate-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Partners</span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 sm:gap-20 lg:gap-32">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center group cursor-default"
            >
              {/* Image Container - smaller size */}
              <div className="relative h-12 sm:h-16 md:h-20 flex items-center justify-center transition-transform duration-500 transform group-hover:scale-105">
                {/* brightness-0 makes all logos perfectly black so that white logos won't disappear on white backgrounds */}
                <img 
                  src={partner.img} 
                  alt={partner.alt} 
                  className="max-h-full max-w-full object-contain brightness-0 opacity-60 group-hover:opacity-100 transition-all duration-300 drop-shadow-sm" 
                />
              </div>

              {/* Minimal Label Below Logo */}
              <div className="mt-6 flex flex-col items-center gap-2">
                <span className="h-0.5 w-6 bg-slate-200 group-hover:bg-emerald-500/50 transition-colors duration-500 rounded-full"></span>
                <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 tracking-[0.25em] uppercase group-hover:text-amber-500 transition-colors duration-500 text-center">
                  {partner.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandPartners;
