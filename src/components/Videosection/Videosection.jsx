import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import {
  PawPrint,
  HandHeart,
  HeartHandshake,
  Dog,
  Cat,
  Bone,
  Heart,
  Smile,
  Sun,
  Leaf,
} from "lucide-react";
import fon from "../../../public/assets/image/foun.png";

const statsData = [
  {
    id: 1,
    title: "Animals Rescued",
    value: 5000,
    icon: <Dog className="w-8 h-8" />,
  },
  {
    id: 2,
    title: "Spay Neuter",
    value: 2000,
    icon: <Bone className="w-8 h-8" />,
  },
  {
    id: 3,
    title: "Lives Changed",
    value: 3000,
    icon: <HeartHandshake className="w-8 h-8" />,
  },
  {
    id: 4,
    title: "Wild Life Impact",
    value: 2000,
    icon: <Dog className="w-8 h-8" />,
  },
];

const founder = {
  name: "Naman Sharma",
  // photo: "https://res.cloudinary.com/dyrdh6vug/image/upload/v1746424291/ngvawrswoon7qtig7gcv.webp",
  photo: fon,
  journey: (
    <>
      <span className="font-semibold text-[#54b36b]">
        The Journey of Naman :–
      </span>{" "}
      <br />
      From a Sensitive Child to an Animal Rescuer This didn’t happen in a day.
      Since childhood, I always felt something different for animals. Whenever I
      saw an injured puppy, a bird, or any helpless animal, my heart would
      instantly say — “Take them home. Protect them.” Animals were never just
      animals to me; they felt like family. Maybe that feeling came from home.
      My parents were animal lovers too, and we always had pets growing up.
      Compassion wasn’t taught to me — it was lived every day. But everything
      changed when I was in 6th standard. One day, I found a sick baby pigeon. I
      ran here and there searching for help. I didn’t know where to go, whom to
      ask. There was no guidance, no system I could access. I tried… but I
      failed. That little pigeon didn’t survive. Its death left a deep scar on
      my heart. For many people, it was “just a bird.” For me, it was a turning
      point. That loss gave me a silent trauma — but also a mission. From that
      day, I decided: “I will never feel this helpless again.” I started
      learning on my own — Google, YouTube, articles — anything I could find
      about animal care and rescue. Academically, I was always strong — a KV
      student with 98% in 12th (Science stream). Because of that, my parents
      trusted me and never stopped me from following my passion. I completed my
      graduation from Delhi University, but by then, I was already deeply
      involved in animal welfare. Rescue operations had started. Treatments had
      started. The dream had started growing. And then came the birth of
      Aashiyana by Naman & Welfare Trust. What started as one emotional child’s
      pain slowly became: An operational animal ambulance A rescue and
      rehabilitation system A growing shelter, especially for paralyzed and
      critical animals And now, a developing surgical unit Today, Aashiyana is
      not just an NGO. It’s a promise — that no animal will suffer alone if we
      can help. This journey wasn’t built in a day. It was built with pain,
      learning, sleepless nights, sacrifices… and unconditional love. And this
      is just the beginning
    </>
  ),
};

const VideoSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [showFullJourney, setShowFullJourney] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const videoRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 0.3, once: true, easing: "ease-in-out" });
  }, []);

  useEffect(() => {
    if (inView) {
      setVideoLoaded(true);
      setStatsVisible(true);
    }
  }, [inView]);

  useEffect(() => {
    if (videoLoaded && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, [videoLoaded]);

  const [counts, setCounts] = useState([0, 0, 0]);
  useEffect(() => {
    if (statsVisible) {
      const intervals = statsData.map((stat, idx) =>
        setInterval(() => {
          setCounts((prev) => {
            const next = [...prev];
            if (next[idx] < stat.value) {
              next[idx] = Math.min(
                next[idx] + Math.ceil(stat.value / 60),
                stat.value,
              );
            }
            return next;
          });
        }, 20),
      );
      return () => intervals.forEach(clearInterval);
    }
  }, [statsVisible]);

  return (
    <div
      ref={ref}
      className="relative w-full min-h-screen bg-gradient-to-br from-[#fffbe9] via-[#f3ffe6] to-[#eafffa] text-[#2d3a2c] px-4 md:px-20 lg:px-32 py-10 md:py-36 font-Lora overflow-hidden"
      style={{
        backgroundImage: `url('/assets/image/paws-bg.png'), url('/assets/image/grass-bg.png')`,
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "top left, bottom right",
        backgroundSize: "120px, 250px",
      }}
    >
      {/* Decorative floating icons */}
      <div className="absolute pointer-events-none z-0 w-full h-full">
        <Leaf className="absolute left-4 top-6 w-10 h-10 text-[#b9e9c2] opacity-30 animate-spin-slow" />
        <Sun className="absolute right-8 top-12 w-12 h-12 text-[#ffe066] opacity-20 animate-pulse" />
        <Heart className="absolute left-1/2 bottom-10 w-12 h-12 text-[#f67280] opacity-20 animate-bounce" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        {/* Left Column */}
        <div className="w-full md:w-1/2 space-y-8" data-aos="fade-right">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary flex items-center gap-2">
            <HandHeart className="w-8 h-8 text-secondary animate-pulse" />
            Feed Hope, Change Lives
            <PawPrint className="w-7 h-7 text-secondary ml-2 animate-bounce" />
          </h2>
          <p className="text-base sm:text-lg leading-relaxed font-SourceSans border-l-4 border-secondary pl-4 bg-white/60 rounded shadow flex items-center gap-2">
            <Bone className="w-6 h-6 text-secondary" />
            Every bowl you help fill is a story of hope. Your kindness gives
            abandoned and injured animals not just food, but a future—one where
            they are safe, loved, and never alone again. Together, we can turn
            hunger into healing.
            <Heart className="w-6 h-6 text-[#f67280]" />
          </p>
          {/* Stats */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-4">
            {statsData.map((stat, idx) => (
              <div
                key={stat.id}
                className="p-2 rounded-lg border bg-[#0B4B43] border-[#b9e9c2] flex flex-col items-center shadow-md"
                data-aos="zoom-in"
                data-aos-delay={idx * 150}
              >
                <div className="mb-2 text-white">{stat.icon}</div>

                <span className="text-xl sm:text-2xl font-bold text-white">
                  {statsVisible ? `${stat.value.toLocaleString()}+` : "0"}
                </span>

                <span className="text-xs sm:text-sm font-SourceSans text-white">
                  {stat.title}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/donate"
            className="relative inline-flex items-center gap-2 text-gray-700 font-semibold px-6 py-3 rounded-full bg-[#BEFD95] border-2 border-[#54b36b] shadow-lg hover:bg-[#a9f58c] hover:scale-105 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#54b36b]/40"
          >
            {/* Left Icon: Animated paw */}
            <span className="flex items-center justify-center bg-white rounded-full w-8 h-8 shadow mr-2 border border-[#54b36b]">
              <PawPrint className="w-5 h-5 text-[#54b36b] group-hover:animate-bounce" />
            </span>
            {/* Button Text */}
            <span className="flex flex-col items-start leading-tight">
              <span className="font-bold text-base sm:text-lg">
                Donate a Meal
              </span>
              <span className="text-xs text-[#54b36b] font-medium flex items-center gap-1">
                <Heart className="w-3 h-3 text-[#f67280] animate-pulse" />
                Make a Difference
              </span>
            </span>
          </Link>
        </div>

        {/* Right Column - Video & Founder */}
        <div className="w-full md:w-1/2 flex flex-col gap-8 items-center">
          {/* Video */}
          <div
            className="relative w-full h-[200px] sm:h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-lg bg-[#eafffa] border border-[#b9e9c2] flex items-center justify-center"
            data-aos="fade-left"
          >
            {videoLoaded ? (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster="/assets/image/aashiyana.webp"
              >
                <source
                  src="https://res.cloudinary.com/dmxcnjwuw/video/upload/f_auto:video,q_auto/mh9afelgz9h5wrdikjam.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                className="absolute inset-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage: `url('/assets/image/aashiyana.webp')`,
                }}
              />
            )}
            <PawPrint className="absolute z-10 right-4 bottom-4 w-10 h-10 text-secondary opacity-60 animate-bounce" />
          </div>
          {/* Founder Section */}
          <div
            className="flex flex-col sm:flex-row items-center bg-white/30 rounded-xl shadow-lg border border-[#b9e9c2] p-4 sm:p-6 gap-4 w-full"
            data-aos="fade-up"
          >
            <img
              src={founder.photo}
              alt="Founder"
              className="w-48 h-40 sm:w-32 sm:h-40 md:w-36 rounded-sm object-contain border-0 shadow"
            />
            <div className="text-xs sm:text-sm text-[#2d3a2c] font-SourceSans">
              {showFullJourney ? (
                <>
                  {founder.journey}
                  <button
                    onClick={() => setShowFullJourney(false)}
                    className="text-secondary font-semibold hover:underline ml-1 focus:outline-none"
                  >
                    Read Less
                  </button>
                </>
              ) : (
                <>
                  <span className="font-semibold text-[#54b36b]">
                    The Journey of Naman :–
                  </span>{" "}
                  <br />
                  From a Sensitive Child to an Animal Rescuer. Since childhood,
                  I always felt something different for animals. Whenever I saw
                  an injured puppy, a bird, or any helpless animal, my heart
                  would instantly say — "Take them home. Protect them."...
                  <button
                    onClick={() => setShowFullJourney(true)}
                    className="text-secondary font-semibold hover:underline ml-1 focus:outline-none"
                  >
                    Read More
                  </button>
                </>
              )}
              <div className="mt-2 font-semibold text-secondary flex items-center gap-1">
                <Smile className="w-4 h-4 text-secondary" /> {founder.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
