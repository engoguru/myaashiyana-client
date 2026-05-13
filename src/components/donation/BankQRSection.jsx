import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import qrImg from "../../../public/assets/image/QR.jpeg";

const Detail = ({ label, value, onCopy }) => (
  <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-3 last:border-0 border-dashed gap-2 sm:gap-0 group">
    <span className="font-semibold text-[#D89D55] sm:w-32 md:w-40 shrink-0 text-sm md:text-base">
      {label}:
    </span>
    <div className="flex items-center gap-2 flex-1">
      <span className="text-gray-700 font-medium text-sm md:text-base break-all leading-tight md:leading-normal flex-1">
        {value}
      </span>
      <button
        onClick={() => onCopy(value, label)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-[#D89D55]/10 rounded-lg cursor-pointer shrink-0"
        title={`Copy ${label}`}
      >
        <Copy className="w-4 h-4 text-[#D89D55]" />
      </button>
    </div>
  </div>
);

const bank = {
  accountHolder: "Aashiyana By Naman And Welfare Trust",
  accountNumber: "051888700000348",
  ifsc: "YESB0000518",
  bankName: "Yes Bank",
  accountType: "Current Account",
  branch: "Hudson Lane",
};

const BankQRSection = () => {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(label);
      toast.success(`${label} copied to clipboard!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4">
      {/* Single Unified Container */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Top Accent Line */}
        <div className="h-2 bg-gradient-to-r from-[#D89D55] via-[#e5b57d] to-[#D89D55]"></div>

        <div className="p-6 md:p-8 lg:p-10">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#333] mb-8 text-center">
            Support Through Bank Transfer or QR
          </h2>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: QR Code */}
            <div className="w-full lg:w-5/12">
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-[#D89D55] text-center h-full flex flex-col justify-center">
                <h3 className="text-xl font-bold text-[#333] mb-3">
                  Donate Instantly via QR
                </h3>
                <div className="flex justify-center">
                  <div className="relative inline-block overflow-hidden rounded-xl border-2 border-pink-200 p-2 bg-white shadow-md">
                    <img
                      src={qrImg}
                      alt="Donation QR Code"
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                  Scan with any UPI app (GPay, PhonePe, Paytm) to contribute
                  immediately.
                </p>
                <p className="text-[10px] text-[#D89D55] font-bold mt-2 uppercase tracking-widest">
                  Thank you for your generosity!
                </p>
              </div>
            </div>

            {/* Right: Bank Details */}
            <div className="w-full lg:w-7/12">
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold text-[#333] mb-5 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-[#D89D55] rounded-full"></div>
                  Bank Transfer Details
                </h3>

                <div className="space-y-1 md:space-y-2 text-gray-700 bg-gray-50 p-5 md:p-6 rounded-xl border border-gray-100 text-sm md:text-base">
                  <Detail
                    label="Account Holder"
                    value={bank.accountHolder}
                    onCopy={handleCopy}
                  />
                  <Detail
                    label="Account Number"
                    value={bank.accountNumber}
                    onCopy={handleCopy}
                  />
                  <Detail
                    label="IFSC Code"
                    value={bank.ifsc}
                    onCopy={handleCopy}
                  />
                  <Detail
                    label="Bank Name"
                    value={bank.bankName}
                    onCopy={handleCopy}
                  />
                  <Detail
                    label="Account Type"
                    value={bank.accountType}
                    onCopy={handleCopy}
                  />
                  <Detail
                    label="Branch"
                    value={bank.branch}
                    onCopy={handleCopy}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                  <Copy className="w-3 h-3" />
                  Hover over any detail and click the copy icon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankQRSection;
