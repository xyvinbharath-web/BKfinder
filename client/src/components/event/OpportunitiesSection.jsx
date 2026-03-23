import React from 'react';

function OpportunitiesSection() {
  const opportunities = [
    {
      id: 1,
      title: "Brand Honoring",
      description: "Get your brand recognized and honored among industry leaders. Showcase your achievements and gain visibility.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
        </svg>
      ),
      color: "emerald"
    },
    {
      id: 2,
      title: "Business Stall",
      description: "Exhibit your products and services to a targeted audience of 1000+ brand owners and entrepreneurs.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      ),
      color: "blue"
    },
    {
      id: 3,
      title: "Business Presentation",
      description: "Present your business ideas, products, or services to potential investors and partners.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4"></path>
        </svg>
      ),
      color: "purple"
    },
    {
      id: 4,
      title: "Panel Discussion",
      description: "Participate in industry discussions and share your expertise with fellow business leaders.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
        </svg>
      ),
      color: "orange"
    },
    {
      id: 5,
      title: "Product Launch",
      description: "Launch your new products or services to a captive audience of potential customers and partners.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      ),
      color: "red"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      emerald: {
        bg: "bg-emerald-100",
        text: "text-emerald-600",
        border: "border-emerald-200",
        hover: "hover:bg-emerald-50"
      },
      blue: {
        bg: "bg-blue-100",
        text: "text-blue-600",
        border: "border-blue-200",
        hover: "hover:bg-blue-50"
      },
      purple: {
        bg: "bg-purple-100",
        text: "text-purple-600",
        border: "border-purple-200",
        hover: "hover:bg-purple-50"
      },
      orange: {
        bg: "bg-orange-100",
        text: "text-orange-600",
        border: "border-orange-200",
        hover: "hover:bg-orange-50"
      },
      red: {
        bg: "bg-red-100",
        text: "text-red-600",
        border: "border-red-200",
        hover: "hover:bg-red-50"
      }
    };
    return colorMap[color] || colorMap.emerald;
  };

  return (
    <section id="opportunities-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Event Opportunities
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore various opportunities to showcase your brand, connect with potential partners, 
            and grow your business network.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity) => {
            const colors = getColorClasses(opportunity.color);
            return (
              <div
                key={opportunity.id}
                className={`bg-white border-2 ${colors.border} rounded-xl p-6 ${colors.hover} transition-all duration-300 hover:shadow-lg`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${colors.bg} rounded-lg flex items-center justify-center ${colors.text} mb-4`}>
                  {opportunity.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {opportunity.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {opportunity.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Want to Participate?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Contact us to learn more about these opportunities and how you can make the most 
              of your participation in the 1000 Brand Owners Business Summit 2026.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-200">
                Contact Us
              </button>
              <button className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-200">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OpportunitiesSection;
