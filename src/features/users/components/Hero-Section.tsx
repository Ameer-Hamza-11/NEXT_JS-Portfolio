"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-5xl mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* ===== Role ===== */}
          <p className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">
            Full Stack Developer
          </p>

          {/* ===== Heading ===== */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Hi, I’m{" "}
            <span className="underline underline-offset-4 decoration-black">
              Ameer Hamza
            </span>
          </h1>

          {/* ===== Description ===== */}
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
            I build modern, scalable, and performant web applications using
            modern JavaScript technologies. I focus on clean architecture,
            maintainable code, and user-centric design.
          </p>

          {/* ===== CTA Buttons ===== */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* View Resume */}
            <Link
              href="/Ameer_Hamza-Resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg bg-black text-white px-5 py-2.5 text-sm hover:opacity-90 transition"
            >
              View Resume
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Download Resume */}
            <a
              href="/Ameer_Hamza-Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm hover:bg-muted transition"
            >
              Download Resume
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* ===== Social Links ===== */}
          <div className="flex items-center gap-5 pt-4">
            <a
            target="_blank"

              href="https://github.com/Ameer-Hamza-11/"
              className="text-muted-foreground hover:text-black transition"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
            target="_blank"
              href="https://www.linkedin.com/in/ameer-hamza-jameel-556717332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="text-muted-foreground hover:text-black transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
