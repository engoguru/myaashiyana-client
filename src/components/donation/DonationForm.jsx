import React, { useRef, useState, useEffect } from "react";
import { FaHeart, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";
import { base_url } from "../../utils/base_url";

const InputIcon = React.forwardRef(({ icon, ...props }, ref) => (
  <div className="relative group">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D89D55] transition-colors text-base md:text-lg">
      {icon}
    </div>
    <input
      {...props}
      ref={ref}
      className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#D89D55] focus:ring-4 focus:ring-[#D89D55]/10 outline-none transition-all duration-300 placeholder:text-gray-400 text-gray-700 text-sm md:text-base"
    />
  </div>
));

const DonationForm = ({ onDonationSuccess, externalAmount }) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const nameInputRef = useRef(null);

  const [amount, setAmount] = useState("");

  const [donor, setDonor] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (externalAmount !== undefined) {
      setAmount(externalAmount > 0 ? externalAmount : "");
    }
  }, [externalAmount]);

  const handleDonorChange = (field, value) => {
    setDonor((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const finalAmount = parseFloat(amount);

    if (!finalAmount || finalAmount <= 0) {
      toast.error("Please select or enter a valid donation amount (minimum ₹1)");
      return false;
    }

    if (!donor.name || donor.name.length < 3) {
      toast.error("Please enter a valid Name (min 3 characters)");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!donor.email || !emailRegex.test(donor.email)) {
      toast.error("Please enter a valid Email address");
      return false;
    }

    if (!donor.phone || donor.phone.length < 10) {
      toast.error("Please enter a valid Phone number (min 10 digits)");
      return false;
    }

    return true;
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    const finalAmount = amount;
    setLoading(true);

    try {
      const { data: order } = await axios.post(
        `${base_url}/donation/create-order`,
        { amount: finalAmount, donor: donor }
      );

      if (!order.id) {
        toast.error("Order Creation Failed");
        setLoading(false);
        return;
      }

      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error("Razorpay failed to load");
        setLoading(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Aashiyana By Naman",
        description: "Donation for Animal Welfare",
        order_id: order.id,
        prefill: {
          name: donor.name,
          email: donor.email,
          contact: donor.phone,
        },
        handler: async function () {
          toast.success("Donation Successful! Thank You ❤️");
          setAmount("");
          setDonor({ name: "", email: "", phone: "" });
          if (onDonationSuccess) onDonationSuccess();
          setLoading(false);
        },
        theme: { color: "#D89D55" },
        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled");
            setLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error("Failed to initiate payment");
      setLoading(false);
    }
  };

  return (
    <div ref={formRef} className="max-w-2xl mx-auto animate-fadeIn px-4 md:px-8">
      <div className="text-center mb-8 md:mb-10">
        <h3 className="text-2xl md:text-3xl font-bold text-[#333] mb-2 md:mb-3">
          Contribute to Our Vision
        </h3>
        <p className="text-gray-500 text-sm md:text-base">
          Your support can change lives. Choose an amount to donate securely.
        </p>
      </div>

      {/* ── Amount Section ── */}
      <div className="mb-8">
        <label className="block text-gray-700 font-semibold mb-3 text-sm md:text-base">
          Select Donation Amount
        </label>

        <div className="mt-2 mb-4 animate-fadeIn">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">
              ₹
            </span>
            <input
              type="number"
              min="1"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#D89D55] focus:ring-0 outline-none transition-colors font-semibold text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[100, 250, 500, 1000, 1500, 2100].map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              className={`
                py-2.5 md:py-3 px-2 md:px-4 rounded-xl font-semibold transition-all duration-300 border-2 cursor-pointer text-sm md:text-base
                ${
                  amount == amt
                    ? "border-[#D89D55] bg-[#D89D55] text-white shadow-md -translate-y-1"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#D89D55] hover:text-[#D89D55]"
                }
              `}
            >
              ₹{amt}
            </button>
          ))}
        </div>
      </div>

      {/* ── Donor Details ── */}
      <div className="mb-8 md:mb-10">
        <label className="block text-gray-700 font-semibold mb-3 md:mb-4 text-sm md:text-base">
          Your Details
        </label>

        <div className="flex flex-col gap-4 md:gap-5">
          {/* Name — full width */}
          <InputIcon
            icon={<FaUser />}
            placeholder="Your Name *"
            value={donor.name}
            onChange={(e) => handleDonorChange("name", e.target.value)}
            ref={nameInputRef}
          />

          {/* Email & Phone — side by side on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <InputIcon
              icon={<FaEnvelope />}
              placeholder="Email Address *"
              type="email"
              value={donor.email}
              onChange={(e) => handleDonorChange("email", e.target.value)}
            />
            <InputIcon
              icon={<FaPhone />}
              placeholder="Phone Number *"
              type="tel"
              value={donor.phone}
              onChange={(e) => handleDonorChange("phone", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── Pay Button ── */}
      <button
        onClick={handlePayment}
        disabled={loading}
        className="
          w-full py-3 md:py-4 rounded-xl bg-gradient-to-r from-[#D89D55] to-[#b87a37]
          text-white font-bold text-lg md:text-xl tracking-wide shadow-lg
          hover:shadow-[#D89D55]/40 hover:scale-[1.01] active:scale-[0.99]
          transition-all duration-300 flex justify-center items-center gap-2 md:gap-3 cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        <span>
          {loading
            ? "Processing..."
            : amount > 0
            ? `Donate Now ₹${amount}`
            : "Enter Amount to Donate"}
        </span>
        <FaHeart className="text-red-100 animate-pulse text-base md:text-lg" />
      </button>

      <div className="text-center mt-4 text-gray-400 text-xs md:text-sm flex items-center justify-center gap-2">
        <i className="fas fa-lock"></i> Secured by Razorpay
      </div>
    </div>
  );
};

export default DonationForm;
