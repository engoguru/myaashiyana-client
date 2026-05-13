import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fecthNeeds } from "../reasctquery/api";
import Header from "../ui/Header";
import NeedCard from "./Needscard";
import { Heart, PawPrint } from "lucide-react";

const NeedsAllPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["needs-all"],
    queryFn: fecthNeeds,
  });

  const needs = data?.allneeds || [];

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(needs.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNeeds = needs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Header
        title={"Our Causes"}
        subheading={"Help Us Make a Difference"}
        description={
          "Every contribution counts. Support our rescue operations and help us provide care, shelter, and love to animals in need."
        }
      />

      <div className="min-h-screen bg-gradient-to-br from-[#fffbe9] via-[#f3ffe6] to-[#eafffa] font-Lora">
        <div className="container mx-auto px-4 py-12 md:py-20">
          
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#072724] flex items-center justify-center gap-3 mb-4">
              <PawPrint className="w-10 h-10 text-[#072724] animate-bounce" />
              Current Needs
              <Heart className="w-10 h-10 text-[#f67280] animate-pulse" />
            </h1>

            <p className="text-lg text-gray-700 font-SourceSans max-w-2xl mx-auto">
              Browse our active campaigns and choose how you can help. Your
              support saves lives.
            </p>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#072724]" />
              <p className="mt-4 text-gray-600">Loading needs...</p>
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="text-center py-12">
              <p className="text-red-600">
                Failed to load needs. Please try again later.
              </p>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && needs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No active needs at the moment. Check back soon!
              </p>
            </div>
          )}

          {/* Grid */}
          {!isLoading && !isError && needs.length > 0 && (
            <>
              <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                  {currentNeeds.map((need) => (
                    <div key={need._id} className="h-full flex">
                      <NeedCard need={need} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">
                
                {/* Prev */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border bg-white text-[#072724] disabled:opacity-50"
                >
                  Prev
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg border ${
                      currentPage === i + 1
                        ? "bg-[#072724] text-white"
                        : "bg-white text-[#072724]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border bg-white text-[#072724] disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NeedsAllPage;