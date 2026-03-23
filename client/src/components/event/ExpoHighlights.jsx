import React from 'react';
import b2bTradeImage from '../../assets/B2B-trade-shows-1792x896.webp';
import id2Image from '../../assets/istockphoto-1452621722-612x612.jpg';
import businessClubImage from '../../assets/Business-Clubs-in-Bangalore_-Where-Professionals-Build-Real-Connections.png';
import brandLaunchImage from '../../assets/Gemini_Generated_Image_57nb2r57nb2r57nb.png';

function ExpoHighlights() {
  const fallbackImage = "https://placehold.co/200x200/png?text=BK";

  const highlights = [
    {
      id: 1,
      title: "1000 Business Owners Meetup & Networking",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      title: "New Startup Business Presentation & Investment Opportunities",
      image: id2Image,
    },
    {
      id: 3,
      title: "Business Training",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop",
    },
    {
      id: 4,
      title: "Learn From Real Exporters & High-Value Business Connections",
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=200&h=200&fit=crop",
    },
    {
      id: 5,
      title: "Panel Discussion",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=200&fit=crop",
    },
    {
      id: 6,
      title: "B2B Business Stall",
      image: b2bTradeImage,
    },
    {
      id: 7,
      title: "Business Presentation & Discussion",
      image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=200&h=200&fit=crop",
    },
    {
      id: 8,
      title: "New Business Club Opportunities & Joining",
      image: businessClubImage,
    },
    {
      id: 9,
      title: "Brand Excellence Award",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=200&h=200&fit=crop",
    },
    {
      id: 10,
      title: "Magazine Articles & Advertisement",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=200&fit=crop",
    },
    {
      id: 11,
      title: "Brand or Product Launching",
      image: brandLaunchImage,
    },
    {
      id: 12,
      title: "Exporter & Industry Networking, Networking Lunch",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=200&h=200&fit=crop",
    }
  ];

  return (
    <section id="highlights" className="relative py-20 sm:py-28 overflow-hidden bg-slate-50">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-amber-100/50 via-amber-50/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-slate-200/50 via-slate-100/20 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 sm:mb-24">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 text-center tracking-tight">
            EXPO HIGHLIGHTS
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600">
              & ATTRACTIONS
            </span>
          </h2>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
          {highlights.map((item) => {
            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:scale-[1.02] cursor-pointer shadow-sm border border-slate-100 hover:border-amber-200 hover:shadow-[inset_0_0_40px_rgba(245,158,11,0.08),0_10px_30px_-10px_rgba(245,158,11,0.15)] overflow-hidden"
              >
                {/* Custom Top Border fading to transparent */}
                <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Bottom Right Yellow Triangle Accent */}
                <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                  <div className="w-full h-full bg-gradient-to-br from-transparent 50% to-amber-500 50%" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    {/* Image with Gold Ring */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-300 blur-xl rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                      <div className="relative h-20 w-20 rounded-full p-[3px] bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 group-hover:from-amber-300 group-hover:via-yellow-400 group-hover:to-amber-600 shadow-sm group-hover:shadow-amber-500/40 transition-all duration-500 group-hover:scale-110">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full rounded-full object-cover border-[3px] border-white"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallbackImage;
                          }}
                        />
                      </div>
                    </div>

                    {/* Number Watermark */}
                    <div className="text-5xl font-black text-slate-200 group-hover:text-amber-100 transition-colors duration-500 select-none">
                      {item.id < 10 ? `0${item.id}` : item.id}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-amber-600 transition-colors duration-300 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ExpoHighlights;
