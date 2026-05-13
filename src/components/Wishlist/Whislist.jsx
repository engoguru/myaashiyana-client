import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useQuery } from "@tanstack/react-query";
import { fetchWishlist } from "../reasctquery/api";

const WishlistSection = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  const {
    data: items = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchWishlist,
  });

  const [copied, setCopied] = useState(false);
  const address = "Basti Narial Wali Manakpura New Delhi – 110005, Delhi India";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-40">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-[#54b36b] border-t-transparent"></div>
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 font-semibold text-xl mt-20">
        Something went wrong while fetching wishlist items.
      </p>
    );

  return (
    <section className="relative w-full py-20 sm:py-24 px-4 flex justify-center items-center overflow-hidden">
      {/* Main Card */}
      <div
        className="relative w-full max-w-7xl mx-auto bg-white/90 rounded-3xl shadow-2xl
        backdrop-blur-2xl border border-[#BEFD95]/60 p-6 sm:p-10 md:p-14 overflow-hidden"
        data-aos="fade-up"
      >
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-[#072724] mb-4">
          Our Needs{" "}
          <span className="text-lg sm:text-xl text-[#54b36b]">(Wishlist)</span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-700 text-center mb-10 max-w-3xl mx-auto">
          Help us care for rescued animals by donating essentials or sponsoring
          their needs.{" "}
          <span className="text-[#f67280] font-semibold">
            Every small act creates a big change!
          </span>
        </p>

        {/* Scroll Container */}
        <div className="max-h-[500px] overflow-y-auto wishlist-scroll pr-2 mb-10">
          {/* Desktop Table */}
          <div className="hidden sm:block">
            <table className="w-full border-separate border-spacing-y-3 table-fixed">
              <thead className="sticky top-0 bg-white z-10">
                <tr>
                  <th className="w-[30%] py-3 px-4 text-left text-[#0B4B43] font-bold">
                    Item
                  </th>
                  <th className="w-[30%] py-3 px-4 text-left text-[#0B4B43] font-bold">
                    Per Month
                  </th>
                  <th className="w-[20%] py-3 px-4 text-left text-[#0B4B43] font-bold">
                    Cost
                  </th>
                  <th className="w-[20%] py-3 px-4 text-center text-[#0B4B43] font-bold">
                    Donate
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((w, idx) => (
                  <tr
                    key={idx}
                    className="bg-[#f9fff8] hover:shadow-md transition rounded-xl"
                  >
                    <td className="py-4 px-4 font-semibold text-[#072724]">
                      {w.item}
                    </td>

                    <td className="py-4 px-4 text-gray-600">{w.need}</td>

                    <td className="py-4 px-4 font-bold text-[#f67280]">
                      ₹{w.cost}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <a
                        href={w.amazon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer inline-block bg-gradient-to-r from-[#54b36b] to-[#a7f59c]
                        text-white font-bold px-5 py-2 rounded-full hover:scale-105 transition"
                      >
                        Donate
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {items.map((w, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl shadow border border-[#beffd6]"
              >
                <h4 className="text-[#072724] font-bold">{w.item}</h4>
                <p className="text-gray-500 text-sm">{w.need}</p>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-[#f67280] font-bold">₹{w.cost}</span>

                  <a
                    href={w.amazon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer bg-[#54b36b] text-white px-4 py-2 rounded-full text-sm"
                  >
                    Donate
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address + Copy */}
        <p className="text-center mt-6">
          Delivery Address: <span className="text-gray-500">{address}</span>
          <button
            onClick={handleCopy}
            className="ml-2 px-3 py-1 text-sm bg-[#54b36b] text-white rounded cursor-pointer hover:bg-green-600 transition"
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </p>
      </div>

      {/* Scrollbar Fix */}
      <style>
        {`
          .wishlist-scroll::-webkit-scrollbar {
            display: none;
          }
          .wishlist-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </section>
  );
};

export default WishlistSection;
