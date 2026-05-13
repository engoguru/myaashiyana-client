import React from "react";
import CountUp from "react-countup";

const stats = [
  {
    label: "Animals Rescued",
    value: 5000,
    image: "/assets/image/rescue.jpg",
  },
  {
    label: "Spay Neuter",
    value: 2000,
    image: "/assets/image/Neuter.webp",
  },
  {
    label: "Lives Changed",
    value: 3000,
    image: "/assets/image/livesChange.webp",
  },
  {
    label: "Donation",
    value: 1000000,
    image: "/assets/image/donation.webp",
  },
  {
    label: "Wild Life Impact",
    value: 2000,
    image: "/assets/image/happy1.jpg",
  },
];

const Countup = () => (
  <section className="relative w-full flex justify-center items-center py-24 px-4">
    {/* Background Image */}
    <div
      className="absolute inset-0 w-full h-full z-0"
      style={{
        backgroundImage: "url('/assets/image/aashiyana.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(0.65)",
      }}
      aria-hidden="true"
    />
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#0B4B43] via-[#f3ffe6cc] to-[#0B4B43] z-10" />

    {/* Main Content - Engineered Grid for Perfect Alignment */}
    <div className="relative z-20 w-full max-w-7xl mx-auto rounded-3xl shadow-2xl p-6 md:p-10 bg-white/30 backdrop-blur-3xl border border-[#BEFD95]/60">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
        {stats.slice(0, 4).map((stat, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col items-center justify-center min-h-[160px] xs:min-h-[200px] md:min-h-[250px] rounded-2xl shadow-xl border border-[#BEFD95]/40 hover:scale-[1.02] transition-all duration-500 overflow-hidden px-2 sm:px-4"
          >
            {/* Cinematic Background Image */}
            <div
              className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage: `url(${stat.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Multi-layered Premium Overlays */}
            <div className="absolute inset-0 bg-black/40 z-10 transition-colors duration-500 group-hover:bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

            {/* Content Container */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center">
              <span className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-[#BEFD95] drop-shadow-2xl mb-1 sm:mb-3 tracking-tighter leading-none">
                <CountUp
                  end={stat.value}
                  duration={3}
                  separator=","
                  formattingFn={(val) => {
                    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
                    if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
                    return val;
                  }}
                />
                +
              </span>
              <span className="text-xs xs:text-sm sm:text-lg lg:text-xl font-black text-white uppercase tracking-widest leading-tight">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Countup;
