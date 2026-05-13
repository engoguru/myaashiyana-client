import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { fecthSingleNeeds } from "../reasctquery/api";
import { Base_url } from "../BAseUrl";

// Helper for Razorpay
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Helper function to extract YouTube ID
const getYouTubeID = (url) => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Sub-component: Payment Icon
const PaymentIcon = ({ src, label }) => (
  <div className="flex flex-col items-center gap-3 group pointer-events-none">
    <div className="w-14 h-14 flex items-center justify-center transition-all p-1">
      <img
        src={src}
        className="w-full h-full object-contain"
        alt={label}
        onError={(e) => (e.target.src = "/assets/image/placeholder.png")}
      />
    </div>
    <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter text-center">
      {label}
    </span>
  </div>
);

// Sub-component: Donation Payment Card
const DonationPaymentSection = ({
  donorAmount,
  setDonorAmount,
  loadingPayment,
  handleDonation,
  needTitle,
}) => (
  <div className="space-y-8">
    {/* Enter Amount Card */}
    <div className="bg-white rounded-[16px] shadow-[0px_4px_20px_rgba(0,0,0,0.06)] p-7 border border-gray-100">
      <h4 className="text-[15px] font-medium text-[#555555] mb-5">
        Enter Amount
      </h4>
      <div className="space-y-5">
        <div className="relative">
          <input
            type="number"
            placeholder="Enter Amount"
            className="w-full px-6 py-4 rounded-full bg-[#f9f9f9] border border-gray-200 outline-none font-normal text-[16px] text-[#333333] focus:border-[#e6bc4a] transition-all placeholder:text-[#BBBBBB]"
            value={donorAmount || ""}
            onChange={(e) => setDonorAmount(Number(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[2000, 6000, 4000].map((amt) => (
            <button
              key={amt}
              onClick={() => setDonorAmount(amt)}
              className="cursor-pointer py-2.5 rounded-full border border-[#e6bc4a] bg-transparent text-[#e6bc4a] font-medium text-[14px] hover:bg-[#e6bc4a] hover:text-white transition-all"
            >
              ₹{amt}
            </button>
          ))}
        </div>

        <button
          disabled={loadingPayment}
          onClick={() => handleDonation()}
          className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 w-full bg-[#e6bc4a] hover:bg-[#d4a93d] text-white py-4 rounded-full font-semibold text-[17px] shadow-md transform active:scale-95 transition-all"
        >
          {loadingPayment ? "Processing..." : "Donate"}
        </button>
      </div>
    </div>

    {/* Donate Via Card */}
    <div className="bg-white rounded-[16px] shadow-[0px_4px_20px_rgba(0,0,0,0.06)] p-7 border border-gray-100">
      <h4 className="text-[18px] font-semibold text-[#1A2A47] mb-7">
        Donate Via
      </h4>
      <div className="space-y-8">
        <div>
          <span className="text-[12px] font-medium text-[#999999] uppercase tracking-[0.18em] block mb-5">
            UPI
          </span>
          <div className="grid grid-cols-3 gap-4">
            <PaymentIcon
              src="/assets/image/decorated/Phonpe.png"
              label="PhonePe"
            />
            <PaymentIcon src="/assets/image/decorated/Gpay.png" label="Gpay" />
            <PaymentIcon
              src="/assets/image/decorated/Paytm.png"
              label="Paytm"
            />
          </div>
        </div>
        <div className="pt-6 border-t border-gray-100">
          <span className="text-[12px] font-medium text-[#999999] tracking-[0.18em] block mb-5">
            Other Options
          </span>
          <div className="flex gap-10 px-4">
            <PaymentIcon
              src="/assets/image/decorated/CreditCard.png"
              label="Dr/Cr Cards"
            />
            <PaymentIcon
              src="/assets/image/decorated/NetBanking.png"
              label="NetBanking"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Sub-component: Festive Banner
const FestiveBanner = ({ isMobile = false }) => (
  <div
    className={`${isMobile ? "flex lg:hidden" : "hidden lg:flex"} relative rounded-[12px] py-10 px-6 md:py-14 md:px-24 text-center overflow-hidden items-center justify-center min-h-[180px] md:min-h-[200px] shadow-sm`}
    style={{
      backgroundColor: "#f8f9fa",
      backgroundImage:
        'url("https://www.transparenttextures.com/patterns/clean-gray-paper.png")',
    }}
  >
    <img
      src="/assets/image/decorated/leaf.png"
      onError={(e) => {
        e.target.style.display = "none";
      }}
      className="absolute left-[-20px] md:left-0 bottom-0 h-[80px] md:h-[180px] w-auto object-contain pointer-events-none drop-shadow-sm z-0 opacity-80 md:opacity-100"
      alt=""
    />
    <img
      src="/assets/image/decorated/hearthand.png"
      onError={(e) => {
        e.target.style.display = "none";
      }}
      className="absolute right-[-10px] md:right-0 bottom-0 h-[85px] md:h-[190px] w-auto object-contain pointer-events-none drop-shadow-sm z-0 opacity-80 md:opacity-100"
      alt=""
    />
    <div
      className="relative z-10 max-w-[800px] mx-auto space-y-5 md:space-y-6"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <p className="text-[14px] md:text-[18px] font-[500] text-[#27325C] leading-[1.6]">
        Please donate today to help us prepare for the festive season and
        provide the best possible care for the increasing number of dogs who
        will need us this Diwali. Thank you for your generosity and support.
      </p>
      <div className="pt-2">
        <button className="cursor-pointer bg-[#2D3561] text-white px-8 md:px-10 py-3 md:py-3.5 rounded-full font-[500] text-[15px] md:text-[16px] hover:bg-[#1A203C] transition-all shadow-[0px_4px_12px_rgba(45,53,97,0.2)]">
          Donate Now
        </button>
      </div>
    </div>
  </div>
);

const ImpactCard = ({ product, qty, onUpdate }) => {
  return (
    <div className="bg-white border border-[#EBEBEB] rounded-[16px] overflow-hidden shadow-[0px_4px_16px_rgba(0,0,0,0.02)] h-full flex flex-col p-4 pb-5 pt-[14px]">
      <div className="bg-[#fcfaf5] rounded-[10px] flex justify-center items-center h-[190px] w-full p-4 mb-5">
        <img
          src={product.images?.[0]?.url}
          className="max-h-full max-w-full object-contain drop-shadow-sm mix-blend-multiply"
          alt=""
        />
      </div>
      <div
        className="flex-1 flex flex-col justify-between px-1"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div>
          <h4 className="font-[500] text-[#1A2D5C] text-[18px] leading-snug mb-[6px]">
            {product.name}
          </h4>
          <p className="text-[#8494A9] text-[13.5px] font-normal leading-[1.5] line-clamp-3">
            {product.description ||
              "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form"}
          </p>
        </div>
        <div className="pt-[14px] border-t border-[#DEDFE4] mt-5 flex items-center justify-between">
          <div className="text-[#1B2749] font-[600] text-[18px]">
            ₹{product.price}
            <span className="text-[15px] text-[#7A8B9E] font-[400] ml-0.5">
              /1
            </span>
          </div>
          <div className="flex items-center bg-white border border-[#C5CFDC] rounded-full px-[18px] py-[6px] gap-4 shadow-sm">
            <button
              onClick={() => onUpdate(Math.max(0, qty - 1))}
              className="cursor-pointer text-[#1A2D5C] hover:text-black font-medium text-[16px] leading-none"
            >
              −
            </button>
            <span className="font-[500] text-[15px] min-w-[14px] text-center text-[#1A2D5C]">
              {qty}
            </span>
            <button
              onClick={() => onUpdate(qty + 1)}
              className="cursor-pointer text-[#1A2D5C] hover:text-black font-medium text-[16px] leading-none"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NeedsSinglepage = () => {
  const { id } = useParams();
  const [donorAmount, setDonorAmount] = useState(0);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [productQuantities, setProductQuantities] = useState({});

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["need", id],
    queryFn: () => fecthSingleNeeds(id),
  });

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#185a9d]"></div>
      </div>
    );

  if (isError || !data?.getsingle)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-2xl text-red-500">
        Could not load need details.
      </div>
    );

  const need = data.getsingle;
  const images = need.images || [];

  const progressPercent =
    need.isCampaign && need.fundingGoal > 0
      ? Math.min(Math.round((need.amountRaised / need.fundingGoal) * 100), 100)
      : 0;

  const handleDonation = async (amount) => {
    const finalAmount = amount || donorAmount;
    if (!finalAmount || finalAmount <= 0) {
      alert("Please select or enter a valid amount");
      return;
    }

    setLoadingPayment(true);
    try {
      const res = await fetch(`${Base_url}/needs/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          needId: need._id,
        }),
      });
      const orderData = await res.json();
      if (!orderData.success)
        throw new Error(orderData.error || "Order creation failed");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "My Aashiyana Naman",
        description: `Donation for ${need.title}`,
        order_id: orderData.order.id,
        handler: async function (response) {
          alert("Thank you for your generous donation!");
          refetch();
        },
        prefill: { name: "", email: "" },
        theme: { color: "#185a9d" },
        notes: { needId: need._id },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingPayment(false);
    }
  };

  const updateQuantity = (productId, price, newQty) => {
    const prevQty = productQuantities[productId] || 0;
    const diff = newQty - prevQty;

    setProductQuantities((prev) => ({ ...prev, [productId]: newQty }));
    setDonorAmount((prev) => Math.max(0, prev + diff * price));
  };

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
            Needs
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold text-white w-full max-w-[95%] mx-auto leading-[1.2] px-2">
            {need.title}
          </h1>
        </div>
      </div>

      <div className="w-full px-4 md:px-6 lg:px-10 xl:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 max-w-[1536px] mx-auto">
          {/* Main Area (Left) */}
          <div className="flex-1 space-y-7 min-w-0">
            <div className="rounded-[16px] overflow-hidden shadow-md bg-white border border-[#E6E6E6]">
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={0}
                slidesPerView={1}
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img.url}
                      alt=""
                      className="w-full aspect-[4/3] md:aspect-[21/9] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Goal/Raised/Remaining Highlights (Matched to Screenshot) */}
            <div className="bg-[#fefcf4] border-2 border-[#f3d97f]/70 rounded-xl p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.02)] mx-1">
              <div className="flex justify-between gap-2 sm:gap-16 md:gap-24 mb-8 px-1 sm:px-2">
                <div className="space-y-1">
                  <span className="text-[#202020] font-semibold text-[11px] sm:text-[13px]">
                    Goal:
                  </span>
                  <div className="text-[13px] sm:text-[15px] font-bold text-[#ddaf4b]">
                    ₹{(need.fundingGoal / 100000).toFixed(1)} L
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <span className="text-[#202020] font-semibold text-[11px] sm:text-[13px]">
                    Raised:
                  </span>
                  <div className="text-[13px] sm:text-[15px] font-bold text-[#ddaf4b]">
                    ₹{(need.amountRaised / 100000).toFixed(2)} L
                  </div>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-[#202020] font-semibold text-[11px] sm:text-[13px]">
                    Remaining:
                  </span>
                  <div className="text-[13px] sm:text-[15px] font-bold text-[#ddaf4b]">
                    ₹
                    {((need.fundingGoal - need.amountRaised) / 100000).toFixed(
                      2,
                    )}{" "}
                    L
                  </div>
                </div>
              </div>
              <div className="relative h-[6px] bg-[#f8efd0] rounded-full overflow-visible mx-2">
                <div
                  className="absolute left-0 top-0 h-full bg-[#ddaf4b] rounded-full"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#fefcf4] border-[4px] border-[#ddaf4b] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="bg-[#f0f2f6] rounded-[8px] py-6 px-5 md:py-8 md:px-8 pr-6 md:pr-56 relative flex items-center min-h-[140px] md:min-h-[180px] border-none">
              <div
                className="space-y-[6px] relative z-10 w-full"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <h3 className="text-[15px] md:text-[22px] font-[600] text-[#1B2749] leading-[1.4] tracking-normal">
                  Your Donation Will Help Us Move Our Dogs To A Permanent
                  Shelter So They Can Receive The Love And Medical Attention
                  They Require.
                </h3>
                <p className="text-[#77859A] font-[500] text-[12px] md:text-[15px] leading-snug">
                  (This Donation Is Under 80G Exempted) Donate Via Card, UPI, &
                  Wallet (INR Only)
                </p>
              </div>
              <img
                src="/assets/image/decorated/CampainDog.png"
                onError={(e) => {
                  e.target.src = "/assets/image/placeholder.png";
                }}
                className="hidden md:block absolute right-[-10px] md:right-8 bottom-0 h-[100px] md:h-[160px] w-auto object-contain pointer-events-none z-20"
                alt="Shelter Pup"
              />
            </div>

            <div>
              <div
                className="mb-8 md:mb-10"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <div>
                  <h2 className="text-[22px] md:text-[32px] font-[500] text-[#27325C] leading-snug">
                    Essential Products
                  </h2>
                  <p className="text-[#7A8B9E] text-[13px] md:text-[15px] font-normal mt-1 leading-relaxed max-w-3xl">
                    Support our rescue operations by sponsoring these essential
                    supplies.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {need.neededProducts?.map((product) => (
                  <ImpactCard
                    key={product._id}
                    product={product}
                    qty={productQuantities[product._id] || 0}
                    onUpdate={(newQty) =>
                      updateQuantity(product._id, product.price, newQty)
                    }
                  />
                ))}
              </div>
            </div>

            {/* Mobile/Tablet View: Payment & Festive Banner (Between Products and About) */}
            <div className="block lg:hidden space-y-12 my-12">
              <DonationPaymentSection
                donorAmount={donorAmount}
                setDonorAmount={setDonorAmount}
                loadingPayment={loadingPayment}
                handleDonation={handleDonation}
                needTitle={need.title}
              />
              <FestiveBanner isMobile={true} />
            </div>

            {/* Festive Bottom Banner (Desktop Only - Left Column) */}
            <FestiveBanner isMobile={false} />

            {/* Campaign About & YouTube Video Section (Inside Left Column) */}
            <div className="space-y-6">
              <div className="px-1">
                <h2
                  className="text-[22px] md:text-[32px] font-[500] text-[#27325C] mb-2"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  About
                </h2>
                <div
                  className="text-[#27325C] text-[15px] md:text-[16px] leading-[1.8] whitespace-pre-line opacity-90"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {need.description}
                </div>
              </div>

              {need.youtubeUrl && (
                <div className="bg-white rounded-[20px] shadow-[0px_4px_30px_rgba(0,0,0,0.05)] overflow-hidden">
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${getYouTubeID(need.youtubeUrl)}`}
                      title="Campaign Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Detailed Rich Text Content Section */}
              {need.content && (
                <div
                  className="campaign-rich-content pt-4"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <div
                    className="prose max-w-none text-[#27325C] leading-[1.8] text-[15px] md:text-[16px] opacity-90 text-justify"
                    dangerouslySetInnerHTML={{ __html: need.content }}
                  />
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
                    .campaign-rich-content h1, .campaign-rich-content h2, .campaign-rich-content h3 {
                      color: #27325C !important;
                      font-weight: 600 !important;
                      margin-top: 1.5em !important;
                      margin-bottom: 0.5em !important;
                    }
                    .campaign-rich-content h1 { font-size: 28px !important; }
                    .campaign-rich-content h2 { font-size: 24px !important; }
                    .campaign-rich-content h3 { font-size: 20px !important; }
                    .campaign-rich-content p {
                      margin-bottom: 1.2em !important;
                    }
                    .campaign-rich-content strong {
                      color: #1A2D5C !important;
                      font-weight: 600 !important;
                    }
                    .campaign-rich-content blockquote {
                      border-left: 4px solid #ddaf4b !important;
                      padding-left: 20px !important;
                      font-style: italic !important;
                      margin: 2em 0 !important;
                      color: #444 !important;
                    }
                    .campaign-rich-content ul, .campaign-rich-content ol {
                      margin-bottom: 1.5em !important;
                      padding-left: 1.5em !important;
                    }
                    .campaign-rich-content li {
                      margin-bottom: 0.5em !important;
                    }
                    .campaign-rich-content img {
                      border-radius: 12px !important;
                      margin: 2em 0 !important;
                      box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important;
                    }
                  `,
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Column (Right) */}
          <div className="lg:w-[420px] shrink-0">
            <div className="sticky top-[100px] self-start space-y-8">
              <div className="hidden lg:block">
                <DonationPaymentSection
                  donorAmount={donorAmount}
                  setDonorAmount={setDonorAmount}
                  loadingPayment={loadingPayment}
                  handleDonation={handleDonation}
                  needTitle={need.title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedsSinglepage;
