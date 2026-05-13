import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from "react-router-dom"
const AnimalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const res = await axios.get(`https://api.myaashiyana.org/api/v1/programe/single/${id}`);
        setAnimal(res.data);
      } catch (error) {
        console.error('Error fetching animal:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimal();
  }, [id]);

  const handleDonate = () => {
    if (!donorName.trim()) {
      alert('Please enter your name 🙏');
      return;
    }
    if (!donationAmount || isNaN(donationAmount) || Number(donationAmount) <= 0) {
      alert('Please enter a valid donation amount 💸');
      return;
    }
    alert(`Thank you, ${donorName}, for donating ₹${donationAmount} to ${animal.name}! 🐶❤️`);
    setDonorName('');
    setDonationAmount('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#072724] text-white flex items-center justify-center text-2xl">
        Loading animal details...
      </div>
    );
  }
  if (!animal) {
    return (
      <div className=" bg-[#072724] text-white flex flex-col items-center justify-center p-10">
        <h2 className="text-4xl font-bold mb-6 text-[#FFD9A0]">Animal Not Found 🐾</h2>
        <button
          className="px-6 py-3 bg-[#FFD9A0] text-[#072724] rounded-lg font-semibold shadow-md hover:bg-[#ffc56c] transition"
          onClick={() => navigate('/animals')}
        >
          ← Back to Animal Gallery
        </button>
      </div>
    );
  }
  return (
    <section className=" bg-gradient-to-b from-[#072724] to-[#0A3D32] text-white px-6 py-16 md:px-20 font-Lora">
      <button
        onClick={() => navigate('/animals')}
        className="text-lg text-[#FFD9A0] mt-10 hover:underline mb-10 block"
      >
        ← Back to Animal Gallery
      </button>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[#FFD9A0] tracking-tight">
            {animal.name}'s Journey 🐾
          </h1>
          {/* Large Screen: Grid */}
          <div className="grid grid-cols-1  md:grid-cols-3 gap-5 ">
            {(animal.images?.length > 0 ? animal.images : [{ url: '/fallback-image.jpg' }]).map(
              (img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`animal ${idx}`}
                  className="md:h-64 w-full object-cover  py-5  rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                  loading="lazy"

                />
              )
            )}
          </div>
          {/* Info Table */}
          <div className="bg-[#0e4236] p-6 rounded-2xl border border-[#ffd9a061] grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
            <p><span className="text-[#FFD9A0] font-semibold">🐾 Species:</span> {animal.species}</p>
            <p><span className="text-[#FFD9A0] font-semibold">🐕 Breed:</span> {animal.breed}</p>
            <p><span className="text-[#FFD9A0] font-semibold">🎂 Age:</span> {animal.age} years</p>
            <p><span className="text-[#FFD9A0] font-semibold">🔖 Status:</span> {animal.status}</p>
            <p><span className="text-[#FFD9A0] font-semibold">🩺 Medical:</span> {animal.medicalCondition}</p>
            <p><span className="text-[#FFD9A0] font-semibold">💰 Monthly Cost:</span> ₹{animal.monthlyCareCost}</p>
          </div>

          {/* Story Content */}
          <div
            className="bg-[#0e4236] p-6 rounded-2xl border border-[#ffd9a061] text-[#E1EDE1] text-xl leading-relaxed shadow-inner"
            dangerouslySetInnerHTML={{ __html: animal.content }}
          />
        </motion.div>

        {/* RIGHT SIDE: DONATION BOX */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="bg-[#ffffff0a] backdrop-blur-lg border border-[#ffd9a028] shadow-2xl rounded-2xl p-10 relative"
        >
          <h2 className="text-4xl font-bold text-[#FFD9A0] mb-4">
            Help {animal.name} Thrive 💖
          </h2>

          <p className="text-[#D4E2D4] mb-6 text-lg leading-relaxed">
            Your love and ₹ can give {animal.name} the warmth of home, healing, and a happy heart.
            Be the reason their tail wags today!
          </p>

          {/* <label htmlFor="donorName" className="block mb-2 text-lg font-medium text-[#FFD9A0]">
            Your Name
          </label>
          <input
            type="text"
            id="donorName"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            placeholder="e.g., Priya Sharma"
            className="w-full px-5 py-3 mb-6 rounded-lg border border-[#FFD9A0] bg-transparent text-white placeholder-[#C7D2C7] focus:outline-none focus:ring-2 focus:ring-[#FFD9A0] text-lg"
          /> */}

          {/* <label htmlFor="donation" className="block mb-2 text-lg font-medium text-[#FFD9A0]">
            Enter Donation Amount (₹)
          </label>
          <input
            type="number"
            id="donation"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="e.g., 500"
            min="1"
            className="w-full px-5 py-3 mb-6 rounded-lg border border-[#FFD9A0] bg-transparent text-white placeholder-[#C7D2C7] focus:outline-none focus:ring-2 focus:ring-[#FFD9A0] text-lg"
          /> */}

          <Link to="https://pages.razorpay.com/pl_QVxiRGo5RqWtBu/view"
            // onClick={handleDonate}
            className="w-full bg-[#FFD9A0] cursor-pointer hover:bg-[#ffc56c] text-[#072724] font-bold py-3 md:p-5 whitespace-nowrap px-2 rounded-full shadow-md transition text-lg"
          >
            🐶 Virtually Adopt Me
          </Link>

          <p className="mt-5 text-md text-[#C7D2C7] italic">
            Even ₹100 can feed and comfort {animal.name} for 2 days 🧡
          </p>

          <div
            className="absolute bottom-4 right-4 opacity-10 text-[4rem] select-none pointer-events-none"
            style={{ color: '#BEFD95' }}
          >
            🐾
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimalDetails;
