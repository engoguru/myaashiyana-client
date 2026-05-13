import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Image imports
import happy1 from "../../../public/assets/image/happy1.jpg";
import happy2 from "../../../public/assets/image/happy2.jpg";
import happy3 from "../../../public/assets/image/happy3.jpg";

const carouselImages = [happy1, happy2, happy3];

const ThankYouCarousel = () => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center text-center p-6 bg-white/30 rounded-3xl backdrop-blur-sm border border-white/20 shadow-lg">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#333] mb-4 flex items-center justify-center gap-2">
        Thank You for Choosing to Help!
        <span className="text-purple-600">🐾</span>
      </h2>
      <p className="text-gray-700 text-base md:text-lg max-w-md mx-auto leading-relaxed mb-2">
        Every small act of kindness creates a ripple of hope. Your donation
        directly supports rescue, care, and rehabilitation.
      </p>
      <p className="text-[#e91e63] font-bold text-lg md:text-xl mb-6">
        Together, we give them a second chance!
      </p>

      <div className="w-full max-w-lg overflow-hidden rounded-2xl shadow-xl aspect-video relative group">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {carouselImages.map((src, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={src}
                alt={`Happy animal ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThankYouCarousel;
