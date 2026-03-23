import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import page1DesktopImage from "../../assets/Desktop.jpg";
import whatsappImage from "../../assets/mobile.jpg";

function HeroSection() {
  const navigate = useNavigate();
  const [isRegisterNav, setIsRegisterNav] = useState(false);

  const handleRegisterClick = () => {
    if (isRegisterNav) return;
    setIsRegisterNav(true);
    window.setTimeout(() => {
      navigate("/register", { state: { fromHero: true } });
    }, 180);
  };

  const handleOpportunitiesClick = () => {
    const element = document.getElementById("opportunities-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-hidden text-white">

      {/* Responsive Banner Images */}
      <img
        src={whatsappImage}
        alt="Event Background"
        className="sm:hidden w-full h-auto object-contain bg-white"
      />

      <img
        src={page1DesktopImage}
        alt="Event Background"
        className="hidden sm:block w-full h-auto"
      />

      {/* MOBILE BUTTONS (below banner) */}
      <div className="sm:hidden w-full bg-white py-6 px-6">
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
          <button
            onClick={handleRegisterClick}
            className={`w-full py-3 bg-emerald-600 text-white font-semibold rounded-full shadow-lg transition-all duration-200 ease-out hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 ${
              isRegisterNav ? "scale-[0.98] opacity-90" : ""
            }`}
          >
            Register Now
          </button>

          <button
            onClick={handleOpportunitiesClick}
            className="w-full py-3 bg-slate-700 text-white font-semibold rounded-full shadow-md transition-all duration-200 ease-out hover:bg-slate-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            View Opportunities
          </button>
        </div>
      </div>

      {/* DESKTOP BUTTONS */}
      <div className="hidden sm:flex absolute bottom-24 left-0 right-0 justify-center z-20">

        <div className="flex gap-4">

          <button
            onClick={handleRegisterClick}
            className={`px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 ease-out hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 ${
              isRegisterNav ? "scale-[0.98] opacity-90" : ""
            }`}
          >
            Register Now
          </button>

          <button
            onClick={handleOpportunitiesClick}
            className="px-8 py-3 bg-slate-700 text-white font-semibold rounded-lg border border-slate-600 shadow-md transition-all duration-200 ease-out hover:bg-slate-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            View Opportunities
          </button>

        </div>
      </div>

    </section>
  );
}

export default HeroSection;