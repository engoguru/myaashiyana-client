import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";

const DonatePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [donated, setDonated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const popupCount = parseInt(localStorage.getItem('donatePopupCount')) || 0;

    if (popupCount < 3) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('donatePopupCount', popupCount + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);


  const handleDonate = () => {
    setDonated(true);
    setTimeout(() => {
      setIsOpen(false);
      navigate('/donate');
    }, 900);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 font-Lora z-40 bg-black/60 flex items-center justify-center">
          <div
            className="bg-white rounded-xl shadow-2xl p-8  text-center relative"
          >
            <img src='assets/image/overlay.png' className='w-full h-full opacity-60 absolute inset-0 ' /> 
            <button
              onClick={() => {
                setIsOpen(false);
                setDonated(false);
              }}
              className="absolute top-2 right-3 w-6 h-6 rounded-full cursor-pointer grid place-items-center bg-[#072724] text-white text-xl"
            >
           <IoClose/>
            </button>

            {/* Dog Image */}
            <img
              src={
                donated
                  ? 'assets/image/happy.png'
                  : 'assets/image/saddog.png'
              }
              alt="Dog"
              className="w-48 h-48 object-contain mx-auto mb-4 transition-all duration-500"
            />

            {/* Message */}
            <h2 className="text-xl font-semibold mb-2">
              {donated ? 'Thank you for your kindness!' : 'This pup needs your help!'}
            </h2>
            <p className="text-gray-600 mb-4">
              {donated
                ? 'Redirecting you to donation page...'
                : 'Even a small donation can make a big difference.'}
            </p>

            {/* Donate Button */}
            {!donated && (
              <button
                onClick={handleDonate}
                className="bg-[#072724] relative hover:bg-[#072724d3] cursor-pointer text-white px-6 py-2 rounded-full"
              >
                Donate Now
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DonatePopup;
