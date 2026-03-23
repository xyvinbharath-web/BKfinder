import React from 'react';
import { useNavigate } from 'react-router-dom';

function PackagesSection() {
  const navigate = useNavigate();

  const packages = [
    {
      id: 1,
      title: "Full Day Package",
      price: "₹2000",
      description: "Complete access to all sessions, exhibitions, and networking events throughout the day.",
      features: [
        "All conference sessions",
        "Exhibition area access",
        "Networking lunch",
        "Evening networking session",
        "Conference materials",
        "Certificate of participation"
      ],
      popular: true,
      color: "emerald"
    },
    {
      id: 2,
      title: "Half Day Package",
      price: "₹999",
      description: "Morning sessions and exhibitions access - perfect for busy professionals.",
      features: [
        "Morning conference sessions",
        "Exhibition area access",
        "Networking tea break",
        "Conference materials",
        "Certificate of participation"
      ],
      popular: false,
      color: "blue"
    }
  ];

  const handleRegisterClick = (packageType) => {
    // Navigate to registration page with package pre-selected
    navigate('/register', { state: { packageType } });
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Registration Packages
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the package that best suits your schedule and networking needs. 
            Both packages offer excellent value and opportunities.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                pkg.popular ? 'ring-2 ring-emerald-500 scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Package Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {pkg.title}
                  </h3>
                  <div className="text-4xl font-bold text-emerald-600 mb-2">
                    {pkg.price}
                  </div>
                  <p className="text-slate-600">
                    {pkg.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="mb-8">
                  <h4 className="font-semibold text-slate-900 mb-4">What's Included:</h4>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Register Button */}
                <button
                  onClick={() => handleRegisterClick(pkg.id === 1 ? 'full_day' : 'half_day')}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-600 hover:bg-slate-700 text-white'
                  }`}
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Need Group Registration?
            </h3>
            <p className="text-slate-600 mb-6">
              Special discounts available for groups of 5 or more. Contact our team for 
              group registration packages and customized solutions.
            </p>
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-200">
              Inquiry About Group Rates
            </button>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Multiple payment options available. Secure online payment processing.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PackagesSection;
