import React from "react";
import { useNavigate } from "react-router-dom";

const NeedCard = ({ need }) => {
  const navigate = useNavigate();

  const raised = Number(need.amountRaised) || 0;
  const goal = Number(need.fundingGoal) || 0;

  const progress = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

  return (
    <div
      className="bg-white border-2 border-[#BEFD95] rounded-xl shadow-xl hover:shadow-2xl w-full h-full flex flex-col overflow-hidden cursor-pointer"
      onClick={() => navigate(`/needs/${need._id}`)}
    >
      {/* Image */}
      <div className="w-full h-[220px] bg-[#BEFD95] overflow-hidden">
        <img
          src={need.images?.[0]?.url || ""}
          alt={need.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-[#072724] mb-2 uppercase">
          {need.title}
        </h3>

        {/* Description */}
        <p className="text-[#072724]/80 text-sm mb-4 line-clamp-2">
          {need.description}
        </p>

        {/* Donation Box */}
        <div className="bg-[#f9fafb] rounded-xl p-4 mb-4">
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Donation
            </span>
            <span className="text-sm font-bold text-[#072724]">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
            <div
              className="bg-[#facc15] h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-sm text-[#072724] font-semibold space-y-1">
            <p>Raised: ₹{raised.toLocaleString()}</p>
            <p>Goal: ₹{goal.toLocaleString()}</p>
          </div>
        </div>

        {/* Button pinned bottom */}
        <div className="mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/needs/${need._id}`);
            }}
            className="w-full bg-[#072724] text-[#BEFD95] font-black px-6 py-3 rounded-full shadow-lg hover:bg-[#BEFD95] hover:text-[#072724] transition-all duration-300 uppercase tracking-widest border-2 border-[#072724]"
          >
            Support Mission
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeedCard;