import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Ticket, Clock, Phone, ArrowRight, Star } from 'lucide-react';

function VisitorPackages() {
  const navigate = useNavigate();

  const packages = [
    {
      id: 1,
      name: "Full Day Package",
      price: 2000,
      badge: "Most Popular",
      description: "Complete access to all sessions, exhibitions, and networking events throughout the day",
      features: [
        "All conference sessions access",
        "Exhibition area entry",
        "Networking lunch",
        "Evening networking session",
        "Conference materials",
        "Certificate of participation",
        "Coffee & tea breaks",
        "Business card exchange"
      ],
      type: "premium",
      colorTheme: "emerald",
      icon: Star
    },
    {
      id: 2,
      name: "Half Day Package",
      price: 999,
      badge: null,
      description: "Morning sessions and exhibitions access - perfect for busy professionals",
      features: [
        "Morning conference sessions",
        "Exhibition area entry",
        "Networking tea break",
        "Conference materials",
        "Certificate of participation",
        "Business card exchange"
      ],
      type: "standard",
      colorTheme: "blue",
      icon: Clock
    }
  ];

  const handleRegisterClick = (packageType) => {
    navigate('/register', { state: { packageType } });
  };

  const getThemeStyles = (theme, type) => {
    const isPremium = type === 'premium';
    const themes = {
      emerald: {
        ring: isPremium ? "ring-2 ring-emerald-500 bg-emerald-50/10" : "border border-slate-200",
        badge: "bg-emerald-500 text-white",
        headerText: "text-emerald-700",
        priceText: "text-emerald-600",
        buttonText: "text-white",
        buttonBg: "bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-200 shadow-sm",
        iconBg: "bg-emerald-100/50",
        iconColor: "text-emerald-600",
        check: "text-emerald-500",
      },
      blue: {
        ring: isPremium ? "ring-2 ring-blue-500" : "border border-slate-200 hover:border-blue-300",
        badge: "bg-blue-500 text-white",
        headerText: "text-blue-700",
        priceText: "text-blue-600",
        buttonText: "text-slate-700 group-hover:text-white",
        buttonBg: "bg-slate-100 hover:bg-slate-800 shadow-sm", 
        iconBg: "bg-blue-100/50",
        iconColor: "text-blue-600",
        check: "text-blue-500",
      }
    };
    return themes[theme] || themes.blue;
  };

  return (
    <section id="packages" className="py-16 md:py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-emerald-200/10 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/10 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-2.5 bg-emerald-100/50 rounded-xl mb-4">
            <Ticket className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Visitor Packages
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Choose the perfect package for your schedule. Both packages offer exceptional value.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto items-start">
          {packages.map((pkg) => {
            const theme = getThemeStyles(pkg.colorTheme, pkg.type);
            const Icon = pkg.icon;

            return (
              <div
                key={pkg.id}
                className={`group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-6 sm:p-8 ${theme.ring} ${pkg.type === 'premium' ? 'md:-translate-y-2' : ''}`}
              >
                {/* Popular Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`${theme.badge} px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 uppercase tracking-wide whitespace-nowrap`}>
                      <Star size={12} fill="currentColor" />
                      {pkg.badge}
                    </div>
                  </div>
                )}

                {/* Package Header */}
                <div className="mb-6 text-center flex-shrink-0">
                  <div className={`w-12 h-12 mx-auto rounded-xl ${theme.iconBg} flex items-center justify-center ${theme.iconColor} mb-4 transform group-hover:scale-105 transition-transform duration-300`}>
                    <Icon strokeWidth={2} size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                  <p className="text-slate-500 text-sm mb-4 max-w-[240px] mx-auto min-h-[40px] leading-relaxed">{pkg.description}</p>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-2xl font-bold text-slate-400">₹</span>
                    <span className={`text-4xl font-extrabold tracking-tight ${theme.priceText}`}>{pkg.price}</span>
                  </div>
                  <div className="text-slate-500 text-sm font-medium mt-1">per person</div>
                </div>

                {/* Divider */}
                <div className="w-16 h-1 bg-slate-100 mx-auto rounded-full mb-6 flex-shrink-0"></div>

                {/* Features List */}
                <div className="flex-grow flex flex-col mb-8">
                  <ul className="space-y-3 flex-grow">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className={`w-4 h-4 ${theme.check} mr-2.5 mt-0.5 flex-shrink-0 opacity-80`} />
                        <span className="text-sm text-slate-700 leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-2 mt-auto">
                  <button
                    onClick={() => handleRegisterClick(pkg.id === 1 ? 'full_day' : 'half_day')}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${theme.buttonBg} ${theme.buttonText} hover:-translate-y-0.5`}
                  >
                    Select Package
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400"></div>
            
            <div className="text-center sm:text-left flex-grow pl-2">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Need Help Choosing?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                Our team can help you select the perfect package based on your goals.
              </p>
            </div>
            
            <div className="flex-shrink-0 w-full sm:w-auto">
              <a
                href="tel:+919876543210"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white text-sm font-semibold rounded-xl transition-all duration-300"
              >
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisitorPackages;
