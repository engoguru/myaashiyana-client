import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/base_url";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

/* ================= IMPACT CARD (FIXED HEIGHT VERSION) ================= */
const ProductCard = ({ product, qty, onUpdate }) => {
  return (
    <div className="h-full flex flex-col bg-white border border-[#EBEBEB] rounded-[16px] shadow-[0px_4px_16px_rgba(0,0,0,0.02)] p-4 pb-5 pt-[14px] transition-shadow duration-300 hover:shadow-lg">
      {/* IMAGE */}
      <div className="bg-[#fcfaf5] rounded-[10px] flex justify-center items-center h-[180px] w-full p-4 mb-5 shrink-0">
        <img
          src={product.images?.[0]?.url}
          className="max-h-full max-w-full object-contain drop-shadow-sm mix-blend-multiply"
          alt={product.name}
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col justify-between px-1">
        {/* TEXT */}
        <div>
          <h4 className="font-[500] text-[#1A2D5C] text-[18px] leading-snug mb-[6px] line-clamp-1 min-h-[24px]">
            {product.name}
          </h4>

          <p className="text-[#8494A9] text-[13.5px] leading-[1.5] line-clamp-2 min-h-[40px]">
            {product.description ||
              "Support this essential item to help our rescue operations."}
          </p>
        </div>

        {/* BOTTOM */}
        <div className="pt-[14px] border-t border-[#DEDFE4] mt-5 flex items-center justify-between shrink-0">
          {/* PRICE */}
          <div className="text-[#1B2749] font-[600] text-[18px]">
            ₹{product.price}
            <span className="text-[15px] text-[#7A8B9E] ml-1">/1</span>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center bg-white border border-[#C5CFDC] rounded-full px-[18px] py-[6px] gap-4 shadow-sm">
            <button
              onClick={() => onUpdate(Math.max(0, qty - 1))}
              className="cursor-pointer text-[#1A2D5C] hover:text-black"
            >
              −
            </button>

            <span className="text-[15px] min-w-[14px] text-center text-[#1A2D5C]">
              {qty}
            </span>

            <button
              onClick={() => onUpdate(qty + 1)}
              className="cursor-pointer text-[#1A2D5C] hover:text-black"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN CAROUSEL ================= */
const DonationProductsCarousel = ({
  productQuantities,
  updateProductQuantity,
  setProductsRef,
}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${base_url}/product`);
        const prods = data?.products || [];
        setProducts(prods);

        if (setProductsRef) {
          setProductsRef(prods); // 🔥 important
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  if (!products.length) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-[22px] md:text-[32px] font-[500] text-[#27325C]">
          Essential Products
        </h2>
        <p className="text-[#7A8B9E] text-[13px] md:text-[15px] mt-1">
          Support our rescue operations by sponsoring these essential supplies.
        </p>
      </div>

      {/* SWIPER */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        loop={true}
        speed={600}
        autoplay={{
          delay: 2000, // step movement
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 }, // 👈 EXACT REQUIREMENT
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id} className="h-full">
            <ProductCard
              product={product}
              qty={productQuantities[product._id] || 0}
              onUpdate={(newQty) =>
                updateProductQuantity(product._id, product.price, newQty)
              }
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DonationProductsCarousel;
