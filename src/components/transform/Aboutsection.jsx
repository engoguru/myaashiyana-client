import React, { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Aboutsection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className="w-full relative py-20 lg:py-32 px-5 md:px-10 lg:px-20 font-Lora overflow-hidden bg-white"
    >
      {/* Background Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(/assets/image/overlay.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left: Foundation Image with Decorative Frame */}
        <div className="relative" data-aos="fade-right">
          {/* Decorative Back-frame */}
          <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-[#D89D55] rounded-2xl z-0 hidden md:block"></div>
          
          <div className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl relative z-10">
            <img
              src="/assets/image/AboutUs.jpg"
              alt="Aashiyana Foundation Rescue"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* Soft inner shadow on image */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] pointer-events-none"></div>
          </div>

          {/* Experience Badge */}
          <div className="absolute -bottom-4 right-4 md:-right-8 bg-[#072724] text-white p-6 rounded-xl shadow-xl z-20 text-center border-b-4 border-[#D89D55]">
            <p className="text-[#D89D55] font-bold text-3xl">7+</p>
            <p className="text-xs uppercase tracking-widest font-medium">Years of<br/>Compassion</p>
          </div>
        </div>

        {/* Right: Emotional Foundation Story */}
        <div className="flex flex-col space-y-8" data-aos="fade-left">
          <div className="space-y-3">
            <p className="text-[#D89D55] font-bold text-sm tracking-[0.3em] uppercase">
              Our Origin Story
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#072724] leading-[1.1]">
              About <span className="text-[#D89D55]">Aashiyana</span> Foundation
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed border-l-4 border-[#D89D55] pl-6 py-2">
              Aashiyana began with a single promise on a stormy night: 
              <span className="italic text-[#072724] font-medium ml-1">"no animal should ever feel alone or unloved."</span> 
              What started as a rescue for one wounded soul has grown into a sanctuary for hundreds.
            </p>

            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Our founder, <span className="text-[#072724] font-bold">Naman Sharma</span>, left behind a world of comfort to build a family for those who had none. Every animal that enters our gates receives more than shelter—they find healing, dignity, and a chance to trust again.
            </p>

            <div className="bg-[#f7fdf9] p-8 rounded-2xl border border-[#e8f5ed] relative">
              <span className="absolute top-4 left-4 text-6xl text-[#D89D55] opacity-20 font-serif">“</span>
              <p className="text-[#444] text-xl italic relative z-10 leading-relaxed">
                With every meal served, every paw bandaged, and every gentle touch, we renew our promise: 
                <span className="block mt-4 font-bold text-[#072724] not-italic text-2xl">
                  To be the voice for those who cannot ask for help.
                </span>
              </p>
            </div>
          </div>
          
          {/* Optional Action Hint */}
          <div className="pt-4">
            <div className="h-1 w-24 bg-[#D89D55] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutsection;