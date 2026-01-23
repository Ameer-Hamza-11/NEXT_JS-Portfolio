import React from "react";

import HeroSection from "@/features/users/components/Hero-Section";
import About from "@/features/users/components/About";
import SkillsSection from "@/features/users/components/SkillsSection";
import ProjectsSection from "@/features/users/components/ProjectsSection";
import ExperienceSection from "@/features/users/components/Experience";
import Education from "@/features/users/components/Education";
import Contact from "@/features/users/components/Contact";

import { getCurrentUser } from "@/features/auth/server/auth.queries";

const Home = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <HeroSection />
      <About />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <Education />
      {user && <Contact user={user} />}
    </>
  );
};

export default Home;
