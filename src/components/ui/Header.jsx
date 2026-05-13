import React from "react";

const Header = ({ title, subheading, description, height = "h-[50vh] md:h-[60vh]" }) => {
  return (
    <div
      className={`bg-[#072724] w-full font-Lora ${height} p-4 md:p-6 lg:p-8 relative overflow-hidden`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/assets/image/overlay.png" alt="" className="w-full h-full object-cover opacity-20" />
      </div>

      {/* Content */}
      <div className="relative h-full py-8 md:py-12 lg:py-16 text-white flex items-center justify-center text-center z-10">
        <div className="max-w-3xl px-2 md:px-4 space-y-3 md:space-y-4">
          <h1 className="text-xs sm:text-sm md:text-base lg:text-lg text-[#D89D55] font-bold uppercase tracking-widest sm:tracking-[0.2em]">
            {title}
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            {subheading}
          </h2>
          <p className="mt-2 md:mt-4 font-SourceSans text-sm sm:text-base md:text-lg text-white/80 max-w-xl mx-auto">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
