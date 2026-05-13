import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Heart, PawPrint } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../reasctquery/api";
import Header from "../ui/Header";
const BlogPage = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const {
    data: blogsData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToBlogs = () => {
    setSelectedBlog(null);
  };

  return (
    <>
      <Header
        title={"Our Blog "}
        subheading={"Promoting Animal Welfare Together"}
        description={
          "At our shelter charity, we believe that compassion has the power to change lives. Every animal deserves a loving home, and our shelter charity is committed to making that a reality."
        }
      />
      <div className="min-h-screen bg-gradient-to-br from-[#fffbe9] via-[#f3ffe6] to-[#eafffa] font-Lora">
        <div className="container mx-auto px-4 py-12 md:py-20">
          {!selectedBlog ? (
            // Blog List View
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-secondary flex items-center justify-center gap-3 mb-4">
                  <PawPrint className="w-10 h-10 text-secondary animate-bounce" />
                  Our Blog
                  <Heart className="w-10 h-10 text-[#f67280] animate-pulse" />
                </h1>
                <p className="text-lg text-gray-700 font-SourceSans max-w-2xl mx-auto">
                  Stories of hope, rescue, and transformation. Read about our
                  journey in saving innocent lives.
                </p>
              </div>

              {isLoading && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
                  <p className="mt-4 text-gray-600">Loading blogs...</p>
                </div>
              )}

              {isError && (
                <div className="text-center py-12">
                  <p className="text-red-600">
                    Failed to load blogs. Please try again later.
                  </p>
                </div>
              )}

              {!isLoading && !isError && blogsData.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    No blogs available at the moment.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogsData.map((blog) => (
                  <div
                    key={blog._id || blog.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={
                          blog.images?.[0]?.url ||
                          blog.image ||
                          "/assets/image/banner1.jpg"
                        }
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                        {blog.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 font-SourceSans">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {blog.author || "Admin"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {blog.date ||
                            new Date(blog.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                        </span>
                      </div>
                      <p className="text-gray-700 font-SourceSans mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <button
                        onClick={() => handleReadMore(blog)}
                        className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all duration-300 group"
                      >
                        Read More
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Single Blog View
            <div className="max-w-4xl mx-auto">
              <button
                onClick={handleBackToBlogs}
                className="mb-6 inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
                Back to Blogs
              </button>

              <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <img
                    src={
                      selectedBlog.images?.[0]?.url ||
                      selectedBlog.image ||
                      "/assets/image/banner1.jpg"
                    }
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 md:p-10">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    {selectedBlog.title}
                  </h1>

                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 font-SourceSans border-b pb-4">
                    <span className="flex items-center gap-2">
                      <User className="w-5 h-5 text-secondary" />
                      {selectedBlog.author || "Admin"}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-secondary" />
                      {selectedBlog.date ||
                        new Date(selectedBlog.createdAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" },
                        )}
                    </span>
                  </div>

                  <div
                    className="prose prose-lg max-w-none font-SourceSans text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: selectedBlog.content || "",
                    }}
                  />

                  {selectedBlog.quote && (
                    <div className="mt-8 p-6 bg-gradient-to-r from-[#BEFD95]/30 to-[#eafffa] border-l-4 border-secondary rounded-r-lg">
                      <p className="text-xl italic text-gray-800 font-semibold flex items-start gap-3">
                        <Heart className="w-6 h-6 text-[#f67280] flex-shrink-0 mt-1" />
                        "{selectedBlog.quote}"
                      </p>
                    </div>
                  )}

                  <div className="mt-10 pt-6 border-t">
                    <Link
                      to="/donate"
                      className="inline-flex items-center gap-2 bg-[#BEFD95] text-gray-800 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-[#a9f58c] hover:scale-105 transition-all duration-300 group"
                    >
                      <PawPrint className="w-6 h-6 text-secondary group-hover:animate-bounce" />
                      Support Our Mission
                      <Heart className="w-6 h-6 text-[#f67280] group-hover:animate-pulse" />
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
