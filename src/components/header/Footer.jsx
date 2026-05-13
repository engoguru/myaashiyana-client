import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {
  fetchEmail,
  fetchAddress,
  fetchPhonenumber,
  fetchSocialmedia,
} from "../reasctquery/api";

const iconMap = {
  instagram: (
    <FaInstagram className="text-2xl text-[#0B4B43] hover:text-[#D89D55] transition-colors duration-200" />
  ),
  facebook: (
    <FaFacebook className="text-2xl text-[#0B4B43] hover:text-[#D89D55] transition-colors duration-200" />
  ),
  twitter: (
    <FaTwitter className="text-2xl text-[#0B4B43] hover:text-[#D89D55] transition-colors duration-200" />
  ),
  youtube: (
    <FaYoutube className="text-2xl text-[#0B4B43] hover:text-[#D89D55] transition-colors duration-200" />
  ),
};

export default function Footer() {
  const emailsQuery = useQuery({ queryKey: ["emails"], queryFn: fetchEmail });
  const addressesQuery = useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAddress,
  });
  const phonesQuery = useQuery({
    queryKey: ["phones"],
    queryFn: fetchPhonenumber,
  });
  const socialQuery = useQuery({
    queryKey: ["socialmedia"],
    queryFn: fetchSocialmedia,
  });

  const emailTitles = emailsQuery.data?.map((e) => e.title) || [];
  const addressTitles = addressesQuery.data?.map((a) => a.title) || [];
console.log(addressTitles,"kk")
  const phoneTitles =
    phonesQuery.data?.map((p) => {
      const phone = String(p.title);
      return phone.startsWith("+91") ? phone : `+91 ${phone}`;
    }) || [];

  const contactDetails = [
    {
      icon: <FaPhone className="text-[#0B4B43] text-2xl sm:text-3xl" />,
      title:
        phoneTitles.length > 0
          ? phoneTitles.join(", ")
          : "(+91) 12345-67890",
    },
    {
      icon: <FaEnvelope className="text-[#0B4B43] text-2xl sm:text-3xl" />,
      title:
        emailTitles.length > 0
          ? emailTitles.join(", ")
          : "support@example.com",
    },
    {
      icon: <FaMapMarkerAlt className="text-[#0B4B43] text-2xl sm:text-3xl" />,
      title:
        addressTitles.length > 0
          ? addressTitles.join(", ")
          : "Mon - Fri 9:00 AM - 5:00 PM",
    },
  ];

  let socialLinks = [];
  if (socialQuery.data && socialQuery.data.length > 0) {
    const social = socialQuery.data[0];
    socialLinks = Object.keys(iconMap)
      .map((platform) =>
        social[platform] ? (
          <a
            key={platform}
            href={social[platform]}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-3 last:mr-0"
            aria-label={platform}
          >
            {iconMap[platform]}
          </a>
        ) : null
      )
      .filter(Boolean);
  }

  return (
    <footer className="bg-[#F7F1EA] text-gray-800 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8 md:gap-12">
        {/* Column 1 */}
        <div className="flex-1 min-w-[220px]">
          <h2 className="text-lg font-semibold">About Us</h2>
          <p className="mt-2 text-sm leading-relaxed font-medium">
            We rescue, protect, and care for animals with compassion and
            innovative solutions that improve their lives.
          </p>

          {/* Social media links */}
          <div className="flex items-center mt-4">
            {socialLinks.length > 0 ? (
              socialLinks
            ) : (
              <span className="text-gray-500">No social links</span>
            )}
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="flex-1 min-w-[180px]">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 text-sm space-y-2 font-medium">
            <li>
              <Link to="/" className="hover:underline transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/service" className="hover:underline transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="hover:underline transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/rescue-story" className="hover:underline transition-colors">
                Rescue Stories
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/termsAndconditions" className="hover:underline transition-colors">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link to="/cookiespolicy" className="hover:underline transition-colors">
                Cookies Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div className="flex-1 min-w-[220px] space-y-4">
          <h2 className="text-lg font-semibold">Contact</h2>

          {contactDetails?.map((item, index) => {
            const title = item.title || "";
            let content;
            if (title.includes("@")) {
              // Email
              content = title.split(",").map((email, i) => (
                <a
                  key={i}
                  href={`mailto:${email.trim()}`}
                  className="block hover:underline text-[#404E4D] font-medium"
                >
                  {email.trim()}
                </a>
              ));
            } else if (title.match(/\d{6,}/) && !title.toLowerCase().includes("whatsapp")) {
              // Phone
              content = title.split(",").map((num, i) => (
                <a
                  key={i}
                  href={`tel:${num.trim()}`}
                  className="block hover:underline text-[#404E4D] font-medium"
                >
                  {num.trim()}
                </a>
              ));
            } else if (title.toLowerCase().includes("whatsapp")) {
              // WhatsApp
              const match = title.match(/\d{6,}/);
              const whatsappNumber = match ? match[0] : "919873995395";
              content = (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#404E4D] font-medium"
                >
                  {title}
                </a>
              );
            } else {
              // Address
              content = (
                
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-[#404E4D] font-medium text-sm"
                >
                  {title}
                </a>
              );
            }

            return (
              <div key={index} className="flex items-start gap-4 ">
                <div className="pt-1 text-[#0B4B43] text-sm">{item.icon}</div>
                <div className="break-words text-sm">{content}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center text-xs sm:text-sm text-gray-600 mt-8 px-2">
        &copy; {new Date().getFullYear()} myaashiyana. All rights reserved. Powered by{" "}
        <a
          href="https://thengoguru.com/"
          className="underline font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Thengoguru.com
        </a>
      </div>
    </footer>
  );
}
