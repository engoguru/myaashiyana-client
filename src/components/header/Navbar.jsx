import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const isActive = (path) =>
    location.pathname === path ? "text-[#BEFD95] font-semibold" : "text-white";

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[60] transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`
                    w-full fixed top-0 left-0 z-50 border-b transition-all duration-300
                    ${
                      scrolled
                        ? "bg-black/60 backdrop-blur-md border-white/10 py-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] shadow-[#072724]/20"
                        : "bg-transparent border-transparent py-4 text-white"
                    }
                `}
      >
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <Link
              to="/"
              onClick={() =>
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
              }
              className="cursor-pointer group flex items-center gap-2"
            >
              <img
                className="w-16 h-16 md:w-20 md:h-20 object-cover transition-transform duration-300 group-hover:scale-105"
                src="/assets/image/logo.png"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex flex-[2] justify-center ">
            <ul className="flex gap-6 text-[15px] font-medium tracking-wide">
              <Link
                to="/"
                className={`${isActive("/")} cursor-pointer hover:text-[#BEFD95] transition-colors`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`${isActive("/aboutpage")} cursor-pointer  hover:text-[#BEFD95] transition-colors`}
              >
                About Us
              </Link>
              <Link
                to="/service"
                className={`${isActive("/service")} cursor-pointer hover:text-[#BEFD95] transition-colors`}
              >
                Service
              </Link>
              {/* Added Needs Item */}
              <Link
                to="/needs"
                className={`${isActive("/needs")} cursor-pointer hover:text-[#BEFD95] transition-colors`}
              >
                Needs
              </Link>
              <Link
                to="/rescue-story"
                className={`${isActive("/rescue-story")} cursor-pointer hover:text-[#BEFD95] transition-colors`}
              >
                Rescue Stories
              </Link>
              <Link
                to="/blog"
                className={`${isActive("/blog")} cursor-pointer hover:text-[#BEFD95] transition-colors`}
              >
                Blog
              </Link>
              <Link
                to="/gallery"
                className={`${isActive("/gallery")} hover:text-[#BEFD95] cursor-pointer transition-colors`}
              >
                Gallery
              </Link>
              <Link
                to="/contactus"
                className={`${isActive("/contactus")} cursor-pointer hover:text-[#BEFD95] transition-colors`}
              >
                Contact
              </Link>
            </ul>
          </div>

          {/* Right: Actions */}
          <div className="flex-1 flex justify-end items-center gap-5">
            <div className="hidden lg:block">
              <Button item="Donate now" color="#BEFD95" textColor="black" />
            </div>

            {/* Mobile Actions Overlay */}
            <div className="lg:hidden">
              <button
                className="text-white w-11 h-11 flex items-center justify-center bg-white/10 border border-white/20 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] sm:w-[400px] bg-[#072724] text-white transform transition-transform duration-500 ease-in-out z-[100] shadow-2xl border-l border-white/10 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Inner Close Button for visibility */}
        <button
          className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-start gap-7 p-8 pt-24 text-xl font-medium">
          <Link
            onClick={() => setIsOpen(false)}
            to="/"
            className={`${isActive("/")} cursor-pointer hover:text-[#BEFD95] transition-all hover:translate-x-2`}
          >
            Home
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/about"
            className={`${isActive("/aboutpage")} cursor-pointer hover:text-[#BEFD95] transition-all hover:translate-x-2`}
          >
            About Us
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/service"
            className={`${isActive("/service")} cursor-pointer hover:text-[#BEFD95] transition-all hover:translate-x-2`}
          >
            Service
          </Link>
          {/* Added Needs Item for Mobile */}
          <Link
            onClick={() => setIsOpen(false)}
            to="/needs"
            className={`${isActive("/needs")} cursor-pointer hover:text-[#BEFD95] transition-all hover:translate-x-2`}
          >
            Needs
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/rescue-story"
            className={`${isActive("/rescue-story")} cursor-pointer hover:text-[#BEFD95] transition-all hover:translate-x-2`}
          >
            Rescue Stories
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/blog"
            className={`${isActive("/blog")} cursor-pointer hover:text-[#BEFD95] transition-all hover:translate-x-2`}
          >
            Blog
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/gallery"
            className={`${isActive("/gallery")} cursor-pointer hover:text-[#BEFD95] transition-all hover:translate-x-2`}
          >
            Gallery
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/contactus"
            className={`${isActive("/contactus")} cursor-pointer hover:text-[#BEFD95] transition-all hover:translate-x-2`}
          >
            Contact
          </Link>
          <div className="pt-4" onClick={() => setIsOpen(false)}>
            <Button item="Donate now" color="#BEFD95" textColor="black" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;