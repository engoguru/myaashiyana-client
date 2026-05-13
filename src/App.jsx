import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Hompage from "./components/homepage/Hompage";
import ServiceMainpage from "./components/servicepage/ServiceMainpage";
import Gallery from "./components/gallery/Gallery";
import Team from "./components/team/Team";
import Contactus from "./components/contactus/Contactus";
import DonateNow from "./components/donation/Donatepage";
import AllAnimalsPage from "./components/transform/Allanimals";
import ScrollToTop from "./components/ui/Scrolltotop";
import AnimalDetails from "./components/transform/Animaldetails";
import RescueStoriesPage from "./components/rescuestories/Rescuestorypage";
import Aboutmainpage from "./components/Aboutpage/Aboutmainpage";
import RescueStoryDetails from "./components/rescuestories/RescueDetailsPage";
import NeedsAllPage from "./components/needs/NeedsAllPage";
import NeedsSinglepage from "./components/needs/NeedsSinglepage";
import PrivacyPolicy from "./components/policies/PrivacyPolicy";
import TermsAndConditions from "./components/policies/Termsandcondition";
import CookiesPolicy from "./components/policies/CookiesAndpolicy";
import ServiceDetailPage from "./components/ourservices/Servicedetailpage";
import BlogPage from "./components/blog/BlogPage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hompage />} />
          <Route path="service" element={<ServiceMainpage />} />
          <Route path="rescue-story" element={<RescueStoriesPage />} />
          <Route path="about" element={<Aboutmainpage />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="animals" element={<AllAnimalsPage />} />
          <Route path="team" element={<Team />} />
          <Route path="contactus" element={<Contactus />} />
          <Route path="/animals/:id" element={<AnimalDetails />} />
          <Route path="/donate" element={<DonateNow />} />
          <Route path="/needs" element={<NeedsAllPage />} />
          <Route path="/rescue-story/:id" element={<RescueStoryDetails />} />
          <Route path="/needs/:id" element={<NeedsSinglepage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/termsAndconditions" element={<TermsAndConditions />} />
          <Route path="/cookiespolicy" element={<CookiesPolicy />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
