import React, { useState } from "react";
import RescueStoryCard from "./Rescuestorycard";
import { useQuery } from "@tanstack/react-query";
import { fetchRescuestories } from "../reasctquery/api";
import Header from "../ui/Header";

const STORIES_PER_PAGE = 4;

const RescueStoriesPage = () => {
  const { data, isLoading, ieError } = useQuery({
    queryKey: ["data"],
    queryFn: fetchRescuestories,
  });
  const stories = data?.stories || [];

  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(stories.length / STORIES_PER_PAGE);

  const paginatedStories = stories.slice(
    (page - 1) * STORIES_PER_PAGE,
    page * STORIES_PER_PAGE,
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Using shared Header component for consistency */}
      <Header
        title="Rescue Stories"
        subheading="All Rescue Stories"
        description="Read heartwarming stories of animals we have rescued and rehabilitated. Each story represents a life saved and a journey toward healing."
      />

      <section
        style={{
          backgroundImage: "url('/assets/image/99.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full py-16 px-2 sm:px-10 lg:px-20 font-Lora bg-[#FDF8F3]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="space-y-14 md:space-y-20">
            {paginatedStories.map((story) => (
              <RescueStoryCard key={story._id} story={story} />
            ))}
          </div>

          {/* Pagination Controls - Premium Styling */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-20">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                page === 1
                  ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed"
                  : "bg-[#072724] text-[#BEFD95] border-[#072724] hover:bg-[#BEFD95] hover:text-[#072724] cursor-pointer shadow-lg active:scale-95"
              }`}
            >
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-3 px-6 py-3 bg-[#072724]/5 rounded-full border border-[#072724]/10">
              <span className="text-xs uppercase tracking-tighter text-[#072724]/60 font-bold">Page</span>
              <span className="text-xl font-black text-[#072724]">{page}</span>
              <span className="text-xs uppercase tracking-tighter text-[#072724]/60 font-bold">of {totalPages}</span>
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-black uppercase tracking-widest transition-all duration-300 border-2 ${
                page === totalPages
                  ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed"
                  : "bg-[#072724] text-[#BEFD95] border-[#072724] hover:bg-[#BEFD95] hover:text-[#072724] cursor-pointer shadow-lg active:scale-95"
              }`}
            >
              <span>Next</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RescueStoriesPage;
