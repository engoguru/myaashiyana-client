import React, { Suspense, lazy } from "react";
import DogLoader from "../ui/Dogloader";
import OurServices from "../transform/Ourservices";
import VideoSection from "../Videosection/Videosection";
import RescueStoriesCarousel from "../rescuestories/RescueStories";
import Countup from "../countup/Countup";
import WishlistSection from "../Wishlist/Whislist";
import Needs from "../needs/Needs";
import ProductContainer from "../product/ProductContainer";

// Lazy load all components
const Hero = lazy(() => import("../herosection/Hero"));
const Joinmisson = lazy(() => import("../transform/Joinmisson"));
const FixedUi = lazy(() => import("../transform/FixedUi"));
const Testimmonials = lazy(() => import("../testimonials/Testimonials"));
const AnimalsSection = lazy(() => import("../transform/Animalcard"));

const Homepage = () => {
  return (
    <Suspense fallback={<DogLoader />}>
      <div>
        <Hero />
        <VideoSection />
        <Countup />
        <RescueStoriesCarousel />
        <AnimalsSection />
        <Needs />
        <WishlistSection />
        <FixedUi />
        <OurServices />
        <Testimmonials />
        <Joinmisson />
      </div>
    </Suspense>
  );
};

export default Homepage;
