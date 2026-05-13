import React from "react";

const FixedUi = () => {
  return (
    <section
      className="relative w-full min-h-[40vh] flex items-center justify-center px-4 text-center font-Lora"
      style={{
        backgroundImage: "url('/assets/image/aashiyana.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <h1
          className="
            text-white 
            text-2xl sm:text-3xl md:text-5xl lg:text-6xl 
            leading-snug md:leading-tight 
            font-semibold
          "
        >
          <span className="text-[#BEFD95] relative inline-block">
            Every animal deserves a loving home
            <span className="block h-[3px] w-full bg-[#BEFD95] mt-1 rounded-full opacity-80"></span>
          </span>

          <br className="hidden sm:block" />

          <span className="block mt-3">
            and our shelter charity is making that a reality.
          </span>
        </h1>
      </div>
    </section>
  );
};

export default FixedUi;
