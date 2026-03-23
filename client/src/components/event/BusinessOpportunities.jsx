import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Store, Presentation, Mic, Rocket, Ticket, CheckCircle2, ArrowRight } from 'lucide-react';

function BusinessOpportunities() {
  const navigate = useNavigate();

  const opportunities = [
    {
      id: 6,
      title: "Visitor Pass",
      description: "Connect with angel investors and venture capitalists",
      icon: Ticket,
      features: [
        "One-on-one meetings",
        "Pitch sessions",
        "Funding opportunities",
        "Mentorship programs"
      ],
      colorTheme: "amber"
    },
    {
      id: 2,
      title: "Business Stall",
      description: "Exhibit your products and services to 1000+ potential customers",
      icon: Store,
      features: [
        "3x3 meter exhibition space",
        "Company branding",
        "Product showcase",
        "Direct customer interaction"
      ],
      colorTheme: "blue"
    },
    {
      id: 1,
      title: "Brand Honoring",
      description: "Get your brand recognized and honored among the top 1000 brand owners",
      icon: Trophy,
      features: [
        "Brand recognition ceremony",
        "Media coverage",
        "Award certificate",
        "Networking opportunities"
      ],
      colorTheme: "emerald"
    },
    {
      id: 3,
      title: "Business Presentation",
      description: "Present your business model to investors and potential partners",
      icon: Presentation,
      features: [
        "15-minute presentation slot",
        "Q&A session",
        "Investor networking",
        "Feedback from experts"
      ],
      colorTheme: "indigo"
    },
    {
      id: 4,
      title: "Panel Discussion",
      description: "Share your expertise as a panelist in industry discussions",
      icon: Mic,
      features: [
        "Panelist position",
        "Industry recognition",
        "Thought leadership",
        "Media exposure"
      ],
      colorTheme: "orange"
    },
    {
      id: 5,
      title: "Product Launch",
      description: "Launch your new product to a targeted business audience",
      icon: Rocket,
      features: [
        "Launch ceremony",
        "Product demonstration",
        "Press coverage",
        "Customer feedback"
      ],
      colorTheme: "rose"
    }
  ];

  const getColorStyles = (theme) => {
    const styles = {
      emerald: {
        text: "text-emerald-600",
        border: "border-emerald-100",
        hoverBorder: "group-hover:border-emerald-400",
        button: "bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white",
        iconBg: "bg-emerald-100",
      },
      blue: {
        text: "text-blue-600",
        border: "border-blue-100",
        hoverBorder: "group-hover:border-blue-400",
        button: "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white",
        iconBg: "bg-blue-100",
      },
      indigo: {
        text: "text-indigo-600",
        border: "border-indigo-100",
        hoverBorder: "group-hover:border-indigo-400",
        button: "bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white",
        iconBg: "bg-indigo-100",
      },
      orange: {
        text: "text-orange-600",
        border: "border-orange-100",
        hoverBorder: "group-hover:border-orange-400",
        button: "bg-orange-50 text-orange-700 hover:bg-orange-600 hover:text-white",
        iconBg: "bg-orange-100",
      },
      rose: {
        text: "text-rose-600",
        border: "border-rose-100",
        hoverBorder: "group-hover:border-rose-400",
        button: "bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white",
        iconBg: "bg-rose-100",
      },
      amber: {
        text: "text-amber-600",
        border: "border-amber-100",
        hoverBorder: "group-hover:border-amber-400",
        button: "bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white",
        iconBg: "bg-amber-100",
      }
    };
    return styles[theme] || styles.emerald;
  };

  return (
    <section id="opportunities-section" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-100/30 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/30 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-4 block">
            Grow With Us
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Business Opportunities
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Explore various opportunities to propel your business forward, connect with visionary investors, 
            and showcase your brand to the right audience.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {opportunities.map((opportunity) => {
            const Icon = opportunity.icon;
            const theme = getColorStyles(opportunity.colorTheme);

            const categoryMap = {
              "Brand Honoring": "brand_honoring",
              "Business Stall": "business_stall",
              "Business Presentation": "business_presentation",
              "Panel Discussion": "panel_discussion",
              "Product Launch": "product_launch",
              "Visitor Pass": "visitor",
            };

            const handleApplyNow = () => {
              const category = categoryMap[opportunity.title] || "";
              navigate("/register", { state: category ? { category } : undefined });
            };

            return (
              <div
                key={opportunity.id}
                className={`group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl border ${theme.border} ${theme.hoverBorder} transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2`}
              >
                {/* Card Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div className={`w-16 h-16 rounded-2xl ${theme.iconBg} flex items-center justify-center ${theme.text} transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon strokeWidth={1.5} size={32} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors">
                  {opportunity.title}
                </h3>
                
                <p className="text-slate-600 mb-8 leading-relaxed flex-grow">
                  {opportunity.description}
                </p>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {opportunity.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className={`w-5 h-5 ${theme.text} mr-3 mt-0.5 flex-shrink-0 opacity-80`} />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleApplyNow}
                  className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${theme.button}`}
                >
                  Apply Now
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BusinessOpportunities;
