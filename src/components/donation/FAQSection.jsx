import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Where is my donated money used?",
    a: "Your donation is used for rescuing abandoned animals, medical treatments, vaccinations, food, shelter maintenance, and rehabilitation of injured and sick animals.",
  },
  {
    q: "When is the donated money utilized?",
    a: "Donations are used immediately or within a short period to meet urgent needs such as emergency medical care, daily feeding, and rescue operations.",
  },
  {
    q: "How do you ensure transparency of funds?",
    a: "We maintain detailed records of all expenses and regularly share updates, rescue stories, and impact reports through our website and social media channels.",
  },
  {
    q: "Is my donation eligible for a receipt?",
    a: "Yes, donations made through the payment gateway automatically generate a receipt. For bank transfers, you can contact us with transaction details.",
  },
  {
    q: "Can I donate items instead of money?",
    a: "Absolutely! We accept food, medicines, blankets, and other essentials. Please reach out to us to coordinate item donations.",
  },
  {
    q: "Can I visit the shelter to see the impact of my donation?",
    a: "Yes, we welcome visitors! You can visit our shelter during visiting hours to meet our rescues and see how your contributions are making a difference. Please contact us in advance to schedule a visit.",
  },
  {
    q: "How can I get involved as a volunteer?",
    a: "We are always looking for passionate animal lovers! You can help with feeding, grooming, rescue operations, or administrative tasks. Contact us through our volunteer form to get started.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full lg:w-1/2">
      <h2 className="text-2xl font-bold mb-8 text-[#333] flex items-center gap-3">
        <div className="w-1.5 h-6 bg-[#D89D55] rounded-full"></div>
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs?.map((item, index) => (
          <div
            key={index}
            className="bg-white/80 rounded-xl shadow-md p-4 cursor-pointer hover:bg-white transition-colors border border-gray-100"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-lg text-[#333]">{item.q}</h4>
              <ChevronDown
                className={`transition-transform text-[#D89D55] ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            {openIndex === index && (
              <p className="mt-3 text-gray-700 text-sm leading-relaxed border-t border-gray-100 pt-3">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
