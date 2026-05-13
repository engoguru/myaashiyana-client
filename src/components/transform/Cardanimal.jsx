import React from "react";

const stripHTML = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const CardAnimal = ({ animal, onReadMoreClick }) => {
  const plainTextContent = stripHTML(animal.content);
  const previewContent =
    plainTextContent.split(" ").slice(0, 30).join(" ") + "...";

  return (
    <div className="relative bg-[#0D3028] rounded-2xl shadow-xl overflow-hidden group transition-all duration-500 ease-in-out flex flex-col h-full border border-white/5 w-full hover:shadow-[0_20px_50px_rgba(190,253,149,0.1)]">
      {/* status badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-[#BEFD95] text-[#072724] px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider shadow-lg flex items-center gap-1.5 border border-white/10">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          🐾 Adopt Now
        </div>
      </div>

      {/* Image Wrap */}
      <div className="relative h-[200px] sm:h-[240px] overflow-hidden">
        <img
          src={animal?.images?.[0]?.url || "/fallback-image.jpg"}
          alt={animal.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D3028] via-transparent to-transparent opacity-80" />
      </div>

      {/* Info Container */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 min-h-[340px]">
        <div className="mb-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-1 group-hover:text-[#BEFD95] transition-colors leading-tight truncate">
            {animal.name}
          </h3>
          <p className="text-[#D1E9D1]/85 text-[13px] sm:text-[15px] font-SourceSans font-light italic mb-4 line-clamp-2 h-[40px] sm:h-[45px]">
            "{plainTextContent}"
          </p>

          {/* Dense Details Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 py-4 border-y border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#BEFD95]/50 font-bold mb-0.5">
                Breed
              </span>
              <span className="text-sm text-white/95 font-medium truncate">
                {animal.breed}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#BEFD95]/50 font-bold mb-0.5">
                Species
              </span>
              <span className="text-sm text-white/95 font-medium truncate">
                {animal.species}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#BEFD95]/50 font-bold mb-0.5">
                Age
              </span>
              <span className="text-sm text-white/95 font-medium">
                {animal.age} Years
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-[#BEFD95]/50 font-bold mb-0.5">
                Condition
              </span>
              <span className="text-sm text-[#f67280] font-medium truncate">
                {animal.medicalCondition}
              </span>
            </div>
            <div className="flex flex-col col-span-2 mt-1 px-4 py-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-[11px] uppercase tracking-widest text-[#BEFD95] font-black">
                  Monthly Care
                </span>
                <span className="text-lg font-black text-white tracking-tight">
                  ₹{animal.monthlyCareCost}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 space-y-3">
          <button
            onClick={() => onReadMoreClick(animal._id)}
            className="w-full py-3.5 rounded-full bg-[#BEFD95] text-[#072724] font-black text-sm uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group-hover:shadow-[#BEFD95]/20 cursor-pointer"
          >
            Sponsor Me
          </button>
          <div className="flex justify-center">
            <span className="text-[11px] text-white/30 uppercase tracking-[0.3em] font-bold">
              Availability: {animal.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAnimal;
