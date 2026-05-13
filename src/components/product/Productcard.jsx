import React, { useState, useEffect } from "react";
import { Base_url } from "../BAseUrl";

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

const ProductCard = ({ product }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(product);

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  useEffect(() => {
    setCurrentProduct(product);
  }, [product]);

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${Base_url}/product/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, productId: currentProduct._id }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Order creation failed");

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: currentProduct.name,
        description: currentProduct.description,
        order_id: data.order.id,
        handler: async function () {
          alert(
            "Payment successful! Your donation will be reflected after confirmation.",
          );
          const updatedRes = await fetch(
            `${Base_url}/product/${currentProduct._id}`,
          );
          const updatedData = await updatedRes.json();
          setCurrentProduct(updatedData.product);
        },
        prefill: {
          name: "",
          email: "",
        },
        notes: {
          product_id: currentProduct._id,
        },
        theme: {
          color: "#072724",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const progress = Math.min(
    (currentProduct.amountRaised / currentProduct.fundingGoal) * 100,
    100,
  );

  return (
    <div className="max-w-md mx-auto my-8 rounded-3xl shadow-lg border border-[#BEFD95] bg-white flex flex-col overflow-hidden transition-transform hover:scale-[1.02]">
      {/* Impactful image block */}
      <div className="relative bg-[#BEFD95]">
        <img
          src={currentProduct.images?.[0]?.url || ""}
          alt={currentProduct.name}
          className="w-full h-56 object-cover object-center rounded-t-3xl"
        />
        {/* Overlay badge */}
        <div className="absolute bottom-3 left-3 bg-[#072724] px-5 py-2 rounded-full shadow text-[#BEFD95] font-bold text-base">
          {currentProduct.name}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        {/* Storytelling */}
        <p className="text-[#072724] mb-4 text-base min-h-[50px] italic font-medium">
          {currentProduct.description}
        </p>
        {/* Stats block */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col items-start">
            <span className="text-xs text-[#072724] font-semibold">Raised</span>
            <span className="text-lg font-bold text-[#072724]">
              ₹{currentProduct.amountRaised?.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-[#072724] font-semibold">Goal</span>
            <span className="text-lg font-bold text-[#072724]">
              ₹{currentProduct.fundingGoal?.toLocaleString()}
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-[#072724] h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-xs text-[#072724]">
            {progress.toFixed(0)}% funded
          </span>
          <span className="text-xs text-[#072724] opacity-60">
            Thank you for caring!
          </span>
        </div>
        {/* Donate CTA */}
        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          <input
            type="number"
            min="1"
            className="border border-[#072724] rounded-full px-5 py-2 flex-1 text-lg focus:outline-none focus:ring-2 focus:ring-[#BEFD95] bg-white"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={handlePayment}
            className="hover:bg-[#072724] hover:text-[#BEFD95] px-8 py-2 rounded-full font-bold shadow-lg bg-[#BEFD95] text-[#072724] transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Donate"}
          </button>
        </div>
        <div className="mt-4 text-xs text-[#072724] text-center opacity-60">
          100% of your donation goes to the cause.
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
