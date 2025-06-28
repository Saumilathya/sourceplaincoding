"use client";
import React, { useState } from "react";
import Navbar from "./components/header/Navbar";
import HeroSection from "./components/herosection/HeroSection";
import CohortSection from "./components/cohorts/Cohorts";
import Footer from "./components/footer/FooterSection";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] =  useState("Sign-up");

  return (
    <>
      <Navbar
        open={open}
        setOpen={setOpen}
        activeItem={0}
        route={route}
        setRoute={setRoute}
      />
      <HeroSection />
      <CohortSection/>
      <Footer/>
    </>
  );
};

export default Page;
