import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Base_url } from "../BAseUrl";
const getEmbedUrl = (url) => {
  if (!url) return "";
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/,
  );
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
};

const RescueStoryDetails = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${Base_url}/rescue-story/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStory(data.story);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!story) return <div className="text-center py-20">Story not found.</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Area */}
      <div className="bg-[#072724] w-full pt-12 pb-10 md:pt-20 md:pb-16 lg:pt-32 lg:pb-24 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute left-[-140px] bottom-[-40px] opacity-20 hidden lg:block w-80 h-96 pointer-events-none">
          <img
            src="/assets/image/decorated/hand.png"
            className="w-full h-full object-contain"
            alt=""
          />
        </div>
        <div className="absolute right-[-120px] bottom-[10%] opacity-20 hidden lg:block w-72 pointer-events-none">
          <img
            src="/assets/image/decorated/leaf.png"
            className="w-full h-full object-contain"
            alt=""
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 space-y-4">
          <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white text-[11px] font-semibold tracking-[0.15em] uppercase mb-2">
            Rescue Story Detail
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold text-white w-full max-w-[95%] mx-auto leading-[1.2] px-2">
            {story.title}
          </h1>
        </div>
      </div>

      <section className="relative w-full py-12 px-2 sm:px-4 font-Lora bg-[#FDF8F3] overflow-hidden">
        {/* Low Opacity Background Texture */}
        <div
          className="absolute inset-0 z-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: "url('/assets/image/99.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="max-w-8xl mx-auto bg-transparent relative z-10 rounded-3xl p-2 sm:p-8 lg:p-12 flex flex-col lg:flex-row gap-12">
          {/* Media Section: Horizontal on Tablet, Vertical Stack on Mobile/Desktop-Side */}
          <div className="w-full lg:w-2/5 xl:w-[45%] flex flex-col md:flex-row lg:flex-col gap-6 items-stretch">
            {story.images?.[0]?.url && (
              <div className="w-full md:w-1/2 lg:w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={story.images[0].url}
                  alt="Rescue"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {story.video && (
              <div className="w-full md:w-1/2 lg:w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
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
          <div className="flex-1 flex flex-col justify-between py-2">
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#072724] mb-3 tracking-tight">
                    {story.title}
                  </h1>
                  <div className="flex items-center gap-2 text-[#54b36b] text-base md:text-lg font-bold">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      Rescued on{" "}
                      {new Date(story.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <article className="prose prose-lg max-w-none text-[#072724] mb-10">
                {story.journey?.map((para, idx) => (
                  <p
                    key={idx}
                    className="mb-6 leading-relaxed text-justify text-sm sm:text-lg lg:text-xl xl:text-2xl text-[#072724]/90 whitespace-pre-line"
                  >
                    {para}
                  </p>
                ))}
              </article>
            </div>

            <div className="flex flex-wrap min-[425px]:flex-nowrap items-center justify-center lg:justify-start gap-3 sm:gap-6 mt-10">
              <Link
                to="/donate"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#f67280] text-white font-black px-6 sm:px-10 py-3 sm:py-4 rounded-full shadow-xl hover:bg-[#d64d5c] transition-all duration-300 text-xs sm:text-base lg:text-lg uppercase tracking-widest active:scale-95 whitespace-nowrap"
              >
                <span>Support Mission</span>
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 006.364-6.364l-4.5-4.5a4.5 4.5 0 00-6.364 0l-4.5 4.5z"
                  />
                </svg>
              </Link>
              <Link
                to="/rescue-story"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#072724] text-[#BEFD95] font-black px-6 sm:px-10 py-3 sm:py-4 rounded-full shadow-xl hover:bg-[#BEFD95] hover:text-[#072724] transition-all duration-500 text-xs sm:text-base lg:text-lg uppercase tracking-widest border-2 border-[#072724] active:scale-95 whitespace-nowrap"
              >
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:-translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                <span>Back to All</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RescueStoryDetails;
