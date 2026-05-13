import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { base_url } from "../../utils/base_url";

// Child Components
import BankQRSection from "./BankQRSection";
import DonationForm from "./DonationForm";
import RecentDonorsList from "./RecentDonorsList";
import ThankYouCarousel from "./ThankYouCarousel";
import FAQSection from "./FAQSection";
import DonationProductsCarousel from "./DonationProductsCarousel";
import NeedsCarousel from "./NeedsCarousel";

const DonateNow = () => {
  const [donations, setDonations] = useState([]);
  const [fetchingDonors, setFetchingDonors] = useState(true);

  /* ================= PRODUCT STATE ================= */
  const [productQuantities, setProductQuantities] = useState({});
  const [donationAmount, setDonationAmount] = useState(0); // ✅ single source

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRecentDonors();
  }, []);

  const fetchRecentDonors = async () => {
    try {
      const { data } = await axios.get(`${base_url}/donation/`);
      setDonations(data || []);
      setFetchingDonors(false);
    } catch (error) {
      console.error("Error fetching donors:", error);
      setFetchingDonors(false);
    }
  };

  /* ================= PRODUCT UPDATE LOGIC ================= */
  const updateProductQuantity = (productId, price, newQty) => {
    const prevQty = productQuantities[productId] || 0;
    const diff = newQty - prevQty;

    // update qty map
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: newQty,
    }));

    // 🔥 directly update donation amount (same as Needs page)
    setDonationAmount((prev) => {
      const updated = Math.max(0, prev + diff * price);
      return isNaN(updated) ? 0 : updated; // safety
    });
  };

  return (
    <div className="w-full bg-[#b87a3763] pb-10 px-0 md:pb-16 font-[Poppins]">
      <Toaster position="top-center" />

      {/* ================= DONATION BANNER ================= */}
      <div className="relative w-full overflow-hidden bg-[#072724] min-h-[450px] md:min-h-[520px] flex items-center justify-center">
        {/* Background dog image */}
        <div className="absolute inset-0 z-0">
          <img src="/assets/image/banner/dog.jpg" alt="" className="w-full h-full object-cover opacity-90" />
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-[#072724]/60"></div>

        {/* Decorative circles */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white opacity-5 z-[2]"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white opacity-5 z-[2]"></div>
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white opacity-5 z-[2]"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-16 md:py-20 max-w-3xl mx-auto">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
            Apna Dil Kholo,{" "}
            <span className="text-yellow-200">Kisi Ki Zindagi Badlo</span>
          </h1>

          {/* Subheading */}
          {/* <p className="mt-4 text-base md:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
            Aapka ek chota sa yogdan kisi ke jeevan mein badi roshni la sakta
            hai. Aaj hi donate karein aur badlaav ka hissa banein.
          </p> */}

          {/* Stats strip */}
          {/* <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-yellow-200">
                5000+
              </p>
              <p className="text-sm text-white/80 mt-1">Donors</p>
            </div>
            <div className="w-px bg-white/30 hidden md:block"></div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-yellow-200">
                ₹10L+
              </p>
              <p className="text-sm text-white/80 mt-1">Raised</p>
            </div>
            <div className="w-px bg-white/30 hidden md:block"></div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-yellow-200">
                1200+
              </p>
              <p className="text-sm text-white/80 mt-1">Lives Impacted</p>
            </div>
          </div> */}
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 60"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill="#b87a3763"
            />
          </svg>
        </div>
      </div>

      {/* Main content wrapper with top padding */}
      <div className="px-4 md:px-6 lg:px-8 pt-10">

      {/* ================= TOP SECTION ================= */}
      <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-8 lg:gap-10 items-start">
        {/* LEFT - Donation Form Only */}
        <div className="w-full xl:w-[70%] bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
          <div className="h-2 bg-gradient-to-r from-[#D89D55] via-[#e5b57d] to-[#D89D55]"></div>

          <div className="py-5 md:py-8 lg:py-10 px-0">
            {/* Donation Form */}
            <DonationForm
              onDonationSuccess={fetchRecentDonors}
              externalAmount={donationAmount}
            />
          </div>
        </div>

        {/* RIGHT */}
        <RecentDonorsList
          donations={donations}
          fetchingDonors={fetchingDonors}
        />
      </div>

      {/* ================= PRODUCTS CAROUSEL ================= */}
      <DonationProductsCarousel
        productQuantities={productQuantities}
        updateProductQuantity={updateProductQuantity}
      />

      {/* ================= NEEDS CAROUSEL ================= */}
      <NeedsCarousel />

      {/* ================= BANK QR SECTION ================= */}
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <BankQRSection />
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="max-w-[1400px] mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
        <ThankYouCarousel />
        <FAQSection />
      </div>

      </div>{/* end main content wrapper */}

      {/* ================= STYLES ================= */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }

        .swiper-pagination-bullet-active {
          background-color: #D89D55 !important;
          width: 24px !important;
          border-radius: 4px !important;
        }

        .swiper-pagination-bullet {
          background-color: white;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default DonateNow;
