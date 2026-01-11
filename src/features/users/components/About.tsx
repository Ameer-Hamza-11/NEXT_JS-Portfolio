"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Layers,
  Server,
  GitBranch,
  Rocket,
  Globe,
  Repeat,
  Sparkles,
} from "lucide-react";

const About = () => {
  return (
    <section className="relative py-28">
      {/* subtle background depth */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="max-w-6xl mx-auto px-4">
        {/* ================= Header ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            About Me
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            I design and build modern full-stack web applications with a strong
            focus on performance, clean architecture, and user experience.
          </p>
        </motion.div>

        {/* ================= Main Grid ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* ================= Bio ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 text-sm md:text-base leading-relaxed text-muted-foreground"
          >
            <p>
              Hi, I’m{" "}
              <span className="font-semibold text-foreground">
                Ameer Hamza
              </span>
              , a <strong>Full Stack JavaScript Developer</strong> who enjoys
              transforming ideas into reliable, scalable, and visually clean
              web products.
            </p>

            <p>
              My core stack includes{" "}
              <strong>
                React, Next.js, Node.js, Express, MongoDB, and MySQL
              </strong>
              , allowing me to build complete end-to-end solutions.
            </p>

            <p>
              I care deeply about clean UI, reusable components, and smooth
              interactions using{" "}
              <strong>
                Tailwind CSS, shadcn/ui, and Framer Motion
              </strong>
              .
            </p>

            <p>
              I also work with <strong>WordPress customization</strong> for
              lightweight websites, themes, and plugin setups when needed.
            </p>

            <p className="font-medium text-foreground">
              Always learning, improving, and shipping better software 🚀
            </p>
          </motion.div>

          {/* ================= Skills / Capabilities ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              {
                icon: <Code2 className="h-5 w-5" />,
                title: "Programming & Markup",
                desc: "JavaScript, TypeScript, HTML5, CSS3",
              },
              {
                icon: <Layers className="h-5 w-5" />,
                title: "Frontend Development",
                desc: "React, Next.js, Tailwind CSS, shadcn/ui",
              },
              {
                icon: <Server className="h-5 w-5" />,
                title: "Backend & APIs",
                desc: "Node.js, Express.js, REST APIs",
              },
              {
                icon: <Database className="h-5 w-5" />,
                title: "Databases",
                desc: "MongoDB, MySQL, Drizzle ORM",
              },
              {
                icon: <GitBranch className="h-5 w-5" />,
                title: "Version Control",
                desc: "Git, GitHub, GitHub Actions",
              },
              {
                icon: <Rocket className="h-5 w-5" />,
                title: "Deployment",
                desc: "Vercel, Netlify",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group rounded-2xl border p-6 transition hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border bg-muted/40">
                  {item.icon}
                </div>
                <h4 className="text-sm font-semibold mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ================= Strengths / Expertise ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-28"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-10">
            What I Do Best
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Globe className="h-5 w-5" />,
                title: "Next.js Applications",
                desc: "SEO-friendly, fast and scalable production apps.",
              },
              {
                icon: <Repeat className="h-5 w-5" />,
                title: "Reusable Components",
                desc: "Clean, maintainable and DRY component systems.",
              },
              {
                icon: <Sparkles className="h-5 w-5" />,
                title: "Motion & UX",
                desc: "Smooth animations and micro-interactions.",
              },
              {
                icon: <Layers className="h-5 w-5" />,
                title: "Frontend Architecture",
                desc: "Scalable UI patterns and clean layouts.",
              },
              {
                icon: <Database className="h-5 w-5" />,
                title: "Relational Databases",
                desc: "Schema design, queries and performance tuning.",
              },
              {
                icon: <Code2 className="h-5 w-5" />,
                title: "WordPress Setup",
                desc: "Themes, plugins and basic customization.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="rounded-2xl border p-6 hover:bg-muted transition"
              >
                <div className="flex items-center gap-2 font-medium mb-2">
                  {item.icon}
                  {item.title}
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
