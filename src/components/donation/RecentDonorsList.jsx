import React from "react";
import { FaHeart, FaTrophy, FaMedal } from "react-icons/fa";

const rankStyles = [
  { bg: "bg-yellow-50", border: "border-yellow-300", text: "text-yellow-600", icon: <FaTrophy className="text-yellow-500" />, label: "1st" },
  { bg: "bg-gray-50",   border: "border-gray-300",   text: "text-gray-500",   icon: <FaMedal className="text-gray-400" />,   label: "2nd" },
  { bg: "bg-orange-50", border: "border-orange-300", text: "text-orange-500", icon: <FaMedal className="text-orange-400" />, label: "3rd" },
  { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-400",   icon: <FaMedal className="text-blue-300" />,   label: "4th" },
];

const RecentDonorsList = ({ donations, fetchingDonors }) => {
  // Top 4 donors by total amount donated
  const topDonors = Object.values(
    (donations || []).reduce((acc, d) => {
      const key = d.name?.trim().toLowerCase();
      if (!key) return acc;
      if (!acc[key]) acc[key] = { name: d.name, total: 0 };
      acc[key].total += d.amount || 0;
      return acc;
    }, {})
  )
    .sort((a, b) => b.total - a.total)
    .slice(0, 4);
  return (
    <div className="w-full xl:w-[30%] space-y-6 md:space-y-8 sticky top-4 self-start">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="h-2 bg-[#333]"></div>
        <div className="p-5 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-[#333] mb-4 md:mb-6 flex items-center gap-2">
            <FaHeart className="text-[#D89D55]" />
            Recent Donors
          </h3>

          {fetchingDonors ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D89D55]"></div>
            </div>
          ) : donations && donations.length > 0 ? (
            <div className="bg-gray-50 rounded-2xl p-2 border border-blue-50 max-h-[500px] md:max-h-[600px] overflow-y-auto custom-scrollbar">
              <ul className="divide-y divide-gray-200/60">
                {donations.slice(0, 5).map((d, index) => (
                  <li
                    key={d._id || index}
                    className="p-3 flex justify-between items-center bg-white mb-2 rounded-xl shadow-sm hover:shadow-md transition-all last:mb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[#D89D55] font-bold text-sm border border-orange-200">
                        {d.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800 text-sm line-clamp-1">
                          {d.name}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(d.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-[#D89D55] text-sm">
                      ₹{d.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center text-gray-500 italic py-6 md:py-8 text-sm">
              Be the first to donate online!
            </p>
          )}

          {donations && donations.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-[10px] md:text-xs text-gray-400">
                Thank you for your support ❤️
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Top Donors Card ── */}
      {topDonors.length > 0 && (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400"></div>
          <div className="p-5 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-[#333] mb-4 flex items-center gap-2">
              <FaTrophy className="text-yellow-500" />
              Top Donors
            </h3>

            <ul className="space-y-3">
              {topDonors.map((donor, index) => {
                const style = rankStyles[index];
                return (
                  <li
                    key={donor.name}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${style.bg} ${style.border}`}
                  >
                    {/* Rank badge */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${style.border} ${style.bg} ${style.text} shrink-0`}>
                      {style.label}
                    </div>

                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[#D89D55] font-bold text-sm border border-orange-200 shrink-0">
                      {donor.name?.charAt(0).toUpperCase()}
                    </div>

                    {/* Name */}
                    <span className="flex-1 font-semibold text-gray-800 text-sm line-clamp-1">
                      {donor.name}
                    </span>

                    {/* Amount */}
                    <span className={`font-bold text-sm ${style.text}`}>
                      ₹{donor.total.toLocaleString("en-IN")}
                    </span>

                    {/* Trophy/Medal icon */}
                    <span className="text-base">{style.icon}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentDonorsList;
