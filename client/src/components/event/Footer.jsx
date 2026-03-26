import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import xyvinLogo from "../../logos/Xyvin_logo.png";
import skybertechLogo from "../../logos/skybertech_logo.png";

function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const footerLinks = [
    { name: "About Summit", href: "#about" },
    { name: "Highlights", href: "#highlights" },
    { name: "Visitor Packages", href: "#packages" },
    { name: "Business Opportunities", href: "#opportunities" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${href}`);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "Capkon Convention Centre, NH66, Calicut"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: "+91 98765 43210"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      text: "businesskeralaorg@gmail.com"
    }
  ];

  return (
    <footer className="bg-slate-50 text-slate-600">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Logo and Description */}
          <div className="lg:col-span-5">
            <div className="mb-6">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                1000 Brand Owners
              </h3>
              <p className="text-emerald-600 font-bold tracking-widest uppercase text-sm">
                Business Summit 2026
              </p>
            </div>
            <p className="text-slate-600 leading-relaxed max-w-md">
              Join the most anticipated business ecosystem event of 2026. Bringing together
              visionary brand owners, entrepreneurs, and industry leaders for unmatched
              networking and growth opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-slate-600 hover:text-emerald-600 font-medium transition-colors duration-200 flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-emerald-500 transition-colors"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold text-slate-900 mb-6 uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-6">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 border border-emerald-100">
                    {info.icon}
                  </div>
                  <span className="text-slate-600 font-medium text-sm leading-relaxed pt-1.5">
                    {info.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-white border-t border-slate-200 relative">
        <div className="w-full px-4 sm:px-12 lg:px-24 py-6">
          <div className="flex flex-col items-center justify-center gap-2">

            {/* Minimal Legal Links */}
            <div className="flex items-center gap-4 sm:gap-6 text-sm font-medium">
              <a href="/terms" className="text-slate-500 hover:text-emerald-600 transition-colors duration-200">
                Terms & Conditions
              </a>
              <span className="w-px h-4 bg-slate-300"></span>
              <a href="/privacy" className="text-slate-500 hover:text-emerald-600 transition-colors duration-200">
                Privacy Policy
              </a>
            </div>

            {/* Partners & Associations - Centered */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 w-full mt-1">

              {/* Technology Partner */}
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-sm font-medium">Technology Partner</span>
                <img
                  src={skybertechLogo}
                  alt="Skybertech"
                  className="h-6 sm:h-8 object-contain"
                />
              </div>

              {/* Association */}
              <div className="flex items-center gap-3">
                <span className="text-slate-500 text-sm font-medium">in association with</span>
                <a
                  href="https://www.xyvin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <img
                    src={xyvinLogo}
                    alt="Xyvin"
                    className="h-5 sm:h-6 object-contain"
                  />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-emerald-600 text-white rounded-xl shadow-[0_4px_20px_rgba(5,150,105,0.3)] hover:bg-emerald-500 hover:-translate-y-[60%] transition-all duration-300 flex items-center justify-center z-40 group hidden md:flex"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
