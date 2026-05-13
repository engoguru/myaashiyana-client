import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchServices } from "../reasctquery/api";
import GallerySlider from "../gallery/GallerySlider";

const OurServices = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 2000, once: false, offset: 100 });
  }, []);

  const {
    data: services = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  return (
    <div className="bg-[#072724] font-Lora w-full h-full md:px-5 py-10 overflow-hidden relative flex flex-col">
      {/* Background Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/assets/image/overlay.png"
          alt="overlay"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Header */}
      <div className="relative text-white w-full flex flex-col justify-center items-center text-center md:px-2 md:py-20 pt-2">
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="leading-tight md:max-w-5xl space-y-4"
        >
          <h2 className="text-lg text-[#D89D55] md:text-2xl font-semibold">
            Our <span className="text-white">Services</span>
          </h2>

          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
            Dedicated to <span className="text-[#D89D55]">Animal Welfare</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#8FA5A3] max-w-3xl mx-auto">
            We offer a range of services that promote the{" "}
            <span className="text-[#D89D55] font-semibold">health</span>,{" "}
            <span className="text-[#D89D55] font-semibold">safety</span>, and{" "}
            <span className="text-[#D89D55] font-semibold">happiness</span> of
            animals in need.
          </p>
        </div>
      </div>

      {/* Loading / Error */}
      {isLoading && (
        <div className="text-white text-center mt-10">Loading services...</div>
      )}

      {isError && (
        <div className="text-red-500 text-center mt-10">
          Failed to load services.
        </div>
      )}

      {/* ✅ SERVICES GRID (FIXED RESPONSIVENESS) */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4  gap-4 2xl:gap-8 w-full mt-10 md:px-10 px-3">
          {services.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 w-full flex flex-col h-full overflow-hidden
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={item?.images?.[0]?.url || "/fallback-image.jpg"}
                alt={item.heading}
                className="w-full h-56 md:h-64 object-cover"
              />

              <div className="p-6 flex flex-col items-center text-center flex-grow">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  {item.heading}
                </h3>

                <div
                  className="text-gray-600 text-sm md:text-base mb-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      item.content.slice(0, 120) +
                      (item.content.length > 120 ? "..." : ""),
                  }}
                />

                <button
                  onClick={() => navigate(`/services/${item._id}`)}
                  className="mt-auto px-6 py-2 bg-[#D89D55] text-white cursor-pointer rounded-full font-semibold hover:bg-[#b87a37] transition"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MEDIA SECTION - Gallery Slider */}
      <GallerySlider />
    </div>
  );
};

export default OurServices;
