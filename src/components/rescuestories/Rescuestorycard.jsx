import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Base_url } from "../BAseUrl";

const getEmbedUrl = (url) => {
  // Converts YouTube watch or short URLs to embed format
  if (!url) return "";
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/,
  );
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url; // Return as-is for non-YouTube or already-embed URLs
};

const RescueStoryCard = ({ story }) => {
  const navigate = useNavigate();
  return (
    <div className="block group px-2">
      <div className="bg-white/90 border-[#072724] border rounded-2xl shadow-xl flex flex-col lg:flex-row overflow-hidden max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">
        {/* Images & Video Section */}
        <div className="flex flex-col md:flex-row lg:flex-col items-stretch justify-center gap-4 bg-[#f9f3eb] p-4 sm:p-6 rounded-2xl lg:w-2/5 xl:w-[45%]">
          <div className="w-full md:w-1/2 lg:w-full aspect-video rounded-xl overflow-hidden shadow-md border-2 border-[#f67280]">
            <img
              src={story.images?.[0]?.url}
              alt=" rescue"
              className="w-full h-full object-cover"
            />
          </div>
          {story.video && (
            <div className="w-full md:w-1/2 lg:w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-black/5">
              <iframe
                src={getEmbedUrl(story.video)}
                title={story.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 justify-between p-5 sm:p-8 lg:p-12">
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#072724] mb-5 font-heading tracking-tight">
              {story.title}
            </h3>
            <div className="text-[#072724]/90 text-sm sm:text-base lg:text-xl xl:text-2xl mb-8 font-medium text-justify leading-relaxed font-SourceSans space-y-4">
              <p>{story.journey[0]}</p>
              <p className="block mt-4">{story.journey[1]}</p>
            </div>
          </div>
          <div className="mt-auto">
            <button
              onClick={() => navigate(`/rescue-story/${story._id}`)}
              className="inline-flex items-center gap-2 bg-[#BEFD95] hover:bg-[#072724] hover:text-[#BEFD95] text-[#072724] font-bold px-10 py-4 rounded-full shadow-lg transition-all duration-300 text-sm sm:text-lg lg:text-xl cursor-pointer group/btn"
            >
              <span>Read Full Story</span>
              <svg
                className="w-5 h-5 transition-transform group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescueStoryCard;
