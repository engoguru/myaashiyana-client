import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

/* ================= NEED CARD FOR CAROUSEL ================= */
const NeedCarouselCard = ({ need }) => {
  const navigate = useNavigate();

  const raised = Number(need.amountRaised) || 0;
  const goal = Number(need.fundingGoal) || 0;

  const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

  return (
    <div
      className="h-full flex flex-col bg-white border-2 border-[#BEFD95] rounded-xl shadow-xl overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
      onClick={() => navigate(`/needs/${need._id}`)}
    >
      {/* IMAGE */}
      <div className="w-full h-[200px] bg-[#BEFD95] overflow-hidden shrink-0">
        <img
          src={need.images?.[0]?.url || ""}
          alt={need.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-4">
        {/* TITLE */}
        <h4 className="text-lg font-black text-[#072724] mb-2 uppercase line-clamp-1 min-h-[24px]">
          {need.title}
        </h4>

        {/* DESCRIPTION */}
        <p className="text-[#072724]/80 text-xs mb-3 line-clamp-2 min-h-[32px]">
          {need.description}
        </p>

        {/* DONATION BOX */}
        <div className="bg-[#f9fafb] rounded-lg p-3 mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-gray-700">
              Donation
            </span>
            <span className="text-xs font-bold text-[#072724]">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2 overflow-hidden">
            <div
              className="bg-[#facc15] h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-xs text-[#072724] font-semibold space-y-0.5">
            <p>Raised: ₹{raised.toLocaleString()}</p>
            <p>Goal: ₹{goal.toLocaleString()}</p>
          </div>
        </div>

        {/* BUTTON */}
        <div className="mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/needs/${need._id}`);
            }}
            className="w-full bg-[#072724] text-[#BEFD95] font-black px-4 py-2.5 rounded-full shadow-lg hover:bg-[#BEFD95] hover:text-[#072724] transition-all duration-300 uppercase tracking-widest border-2 border-[#072724] text-xs"
          >
            Support Mission
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN NEEDS CAROUSEL ================= */
const NeedsCarousel = () => {
  const [needs, setNeeds] = useState([]);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const { data } = await axios.get(`${base_url}/needs/all`);
        const allNeeds = data?.allneeds || [];
        // Filter only active needs with campaigns
        const campaignNeeds = allNeeds.filter(
          (need) => need.isCampaign === true && need.fundingGoal > 0
        );
        setNeeds(campaignNeeds);
      } catch (err) {
        console.error("Error fetching needs:", err);
      }
    };

    fetchNeeds();
  }, []);

  if (!needs.length) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-[22px] md:text-[32px] font-[500] text-[#27325C]">
          Urgent Causes
        </h2>
        <p className="text-[#7A8B9E] text-[13px] md:text-[15px] mt-1">
          Support our active campaigns and help us make a difference in animal
          lives.
        </p>
      </div>

      {/* SWIPER */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        speed={600}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {needs.map((need) => (
          <SwiperSlide key={need._id} className="h-full">
            <NeedCarouselCard need={need} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NeedsCarousel;
