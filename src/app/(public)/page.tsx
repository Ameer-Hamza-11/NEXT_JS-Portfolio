"use client";

import React from "react";

import HeroSection from "@/features/users/components/Hero-Section";
import About from "@/features/users/components/About";
import ExperienceSection from "@/features/users/components/Experience";
import ProjectsSection from "@/features/users/components/ProjectsSection";
import SkillsSection from "@/features/users/components/SkillsSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <About/>
      <SkillsSection/>
      <ExperienceSection/>
      <ProjectsSection/>
    </>
  );
};

export default Home;
