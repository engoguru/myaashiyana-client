import React from "react";
import Header from "../ui/Header";
import Meetaashiyana from "../Meetaashiyana";
import Aboutsection from "../transform/Aboutsection";
import Countup from "../countup/Countup";
import Joinmisson from "../transform/Joinmisson";
import Testimonials from "../testimonials/Testimonials";
import Team from "../team/Team";
const Aboutmainpage = () => {
  return (
    <div>
      <Header
        title={"About us "}
        subheading={"Promoting Animal Welfare Together"}
        description={
          "At our shelter charity, we believe that compassion has the power to change lives. Every animal deserves a loving home, and our shelter charity is committed to making that a reality."
        }
      />
      <Aboutsection />
      <Countup />
      <Team />
      <Testimonials />
      <Joinmisson />
    </div>
  );
};

export default Aboutmainpage;
