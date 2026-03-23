import React from 'react';

function AboutEvent() {
  const highlights = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      title: "1000 Brand Owners",
      description: "Network with a premium community of top entrepreneurs"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      ),
      title: "Expert Learning",
      description: "Gain critical insights from global industry leaders"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: "Startup Funding",
      description: "Discover massive investment opportunities directly"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
        </svg>
      ),
      title: "Global Export Ties",
      description: "Build rapid connections with international traders"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      title: "High Value Collabs",
      description: "Forge meaningful B2B partnerships immediately"
    }
  ];

  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden bg-white">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-100/40 via-yellow-50/20 to-transparent rounded-full blur-3xl translate-x-1/4" />
        <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-slate-200/40 via-slate-100/10 to-transparent rounded-full blur-3xl -translate-x-1/3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 sm:mb-24 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-amber-500"></div>
            <span className="text-amber-600 font-bold tracking-[0.2em] text-xs sm:text-sm uppercase">About the Summit</span>
            <div className="h-px w-12 bg-amber-500"></div>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Thousand Brand Owners
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600">
              Business Summit '26
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-bold tracking-[0.2em] uppercase">
            Connect &bull; Learn &bull; Grow &bull; Together
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch mb-20 sm:mb-24">
          
          {/* Main About Us Block */}
          <div className="lg:col-span-7 h-full">
            <div className="h-full relative rounded-3xl bg-slate-50 border border-slate-100 p-8 sm:p-12 transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.1)] group">
              {/* Subtle hover accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-900 text-amber-400 text-xs font-bold tracking-widest mb-6">
                ABOUT US
              </div>
              <p className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug mb-6">
                The 1000 Brand Owners Business Summit 2026 is designed to foster meaningful connections and create massive opportunities.
              </p>
              <div className="space-y-4">
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  Whether you're a startup founder or an established brand owner, our summit brings you into an exclusive environment dedicated to high-value networking and rapid collaboration.
                </p>
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                  Established in 2017, Business Kerala is a powerful, fastest-growing community pushing the boundaries of export-driven innovation.
                </p>
              </div>
            </div>
          </div>

          {/* Vision & Mission Stack */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="flex-1 relative rounded-3xl bg-white border border-slate-100 p-8 sm:p-10 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg group">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-amber-500"></span>
                <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Our Vision</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Empowering Founders</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To unite 1,000 visionary brand owners under one roof, creating a globally collaborative movement advancing sustainable business solutions.
              </p>
            </div>

            <div className="flex-1 relative rounded-3xl bg-white border border-slate-100 p-8 sm:p-10 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg group">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-amber-500"></span>
                <span className="text-amber-600 text-xs font-bold tracking-widest uppercase">Our Mission</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Global Expansion</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                To empower entrepreneurs through elite mentorship, crucial market insights, and immense global exposure.
              </p>
            </div>

          </div>
        </div>

        {/* 5 Highlights Grid */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white border border-slate-100 p-6 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-amber-200 hover:shadow-[0_15px_30px_-5px_rgba(245,158,11,0.15)] overflow-hidden"
            >
              {/* Card Top Border fading to transparent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex flex-col items-start gap-4 h-full relative z-10">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 transition-all duration-300 group-hover:bg-amber-50 group-hover:border-amber-200 group-hover:text-amber-600 group-hover:rotate-6">
                  {highlight.icon}
                </div>
                <div className="mt-auto">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-amber-600 transition-colors duration-300">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call To Action Block */}
        <div className="max-w-3xl mx-auto rounded-3xl p-[2px] bg-gradient-to-r from-amber-400 to-yellow-600 shadow-lg shadow-amber-500/10">
          <div className="bg-slate-900 rounded-[22px] px-6 py-8 sm:px-8 sm:py-10 text-center relative overflow-hidden">
            {/* Subtle background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
                Be Part of Something <span className="text-amber-400">Extraordinary</span>
              </h3>
              <p className="text-slate-300 max-w-lg mx-auto leading-relaxed text-sm mb-6">
                Connect directly with industry leaders, gain explosive market insights, and scale your business to completely new heights.
              </p>
              <button
                onClick={() => window.location.href = '/register'}
                className="inline-flex items-center justify-center px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-amber-500/20"
              >
                Secure Your Spot
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutEvent;
