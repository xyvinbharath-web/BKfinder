import React from 'react';

function PartnersSection() {
  const partners = [
    {
      id: 1,
      name: "Business Kerala",
      logo: "https://via.placeholder.com/200x100/1e40af/ffffff?text=Business+Kerala",
      category: "Organizing Partner",
      website: "#"
    },
    {
      id: 2,
      name: "1000 Brand Owners",
      logo: "https://via.placeholder.com/200x100/059669/ffffff?text=1000+Brand+Owners",
      category: "Community Partner",
      website: "#"
    },
    {
      id: 3,
      name: "EPIC",
      logo: "https://via.placeholder.com/200x100/7c3aed/ffffff?text=EPIC",
      category: "Incubation Partner",
      website: "#"
    },
    {
      id: 4,
      name: "CAPKON",
      logo: "https://via.placeholder.com/200x100/dc2626/ffffff?text=CAPKON",
      category: "Venue Partner",
      website: "#"
    }
  ];

  const categories = ["Organizing Partner", "Community Partner", "Incubation Partner", "Venue Partner"];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Our Partners
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We're proud to collaborate with leading organizations that support entrepreneurship, 
            innovation, and business growth in Kerala and beyond.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-emerald-300 group"
            >
              {/* Partner Logo */}
              <div className="aspect-w-16 aspect-h-8 mb-4 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Partner Info */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {partner.name}
                </h3>
                <p className="text-sm text-emerald-600 font-medium">
                  {partner.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="mt-16 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Become a Partner
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Join us in making the 1000 Brand Owners Business Summit 2026 a landmark event. 
              We offer various partnership opportunities to suit your organization's goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-200">
                Download Partnership Kit
              </button>
              <button className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-200">
                Contact Partnership Team
              </button>
            </div>
          </div>
        </div>

        {/* Partner Benefits */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Why Partner With Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Brand Visibility</h4>
              <p className="text-slate-600 text-sm">
                Showcase your brand to 1000+ business owners and entrepreneurs
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Business Growth</h4>
              <p className="text-slate-600 text-sm">
                Generate leads and build valuable business connections
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Community Impact</h4>
              <p className="text-slate-600 text-sm">
                Support the entrepreneurial ecosystem in Kerala
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;
