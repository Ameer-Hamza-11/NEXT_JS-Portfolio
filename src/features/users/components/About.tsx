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
  Repeat,
  Globe,
  Sparkles,
} from "lucide-react";

const About = () => {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* ================= Heading ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14 max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            About Me
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            A quick introduction and the skills I use to build
            high-quality web applications.
          </p>
        </motion.div>

        {/* ================= Main Grid ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* ================= Bio ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5 text-muted-foreground leading-relaxed text-sm md:text-base"
          >
            <p>
              Hi! I’m{" "}
              <span className="font-semibold text-foreground">
                Ameer Hamza
              </span>
              , a passionate{" "}
              <strong>Full Stack JavaScript Developer</strong>{" "}
              focused on building modern, fast, and scalable web
              applications.
            </p>

            <p>
              I specialize in technologies like{" "}
              <strong>
                React, Next.js, Node.js, Express, MongoDB, and MySQL
              </strong>{" "}
              to deliver complete end-to-end solutions.
            </p>

            <p>
              I enjoy crafting clean UI, reusable components, and smooth
              interactions using{" "}
              <strong>
                Tailwind CSS, shadcn/ui, and Framer Motion
              </strong>
              .
            </p>

            <p>
              I also have hands-on experience with{" "}
              <strong>WordPress customization</strong>, including theme
              setup and plugin configuration.
            </p>

            <p>
              Always learning, improving, and turning ideas into real
              digital products 🚀
            </p>
          </motion.div>

          {/* ================= Skills ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {[
              {
                icon: <Code2 className="w-5 h-5" />,
                title: "Programming & Markup",
                desc: "JavaScript, TypeScript, HTML5, CSS3",
              },
              {
                icon: <Layers className="w-5 h-5" />,
                title: "Frontend Development",
                desc: "React, Next.js, Tailwind CSS, shadcn/ui",
              },
              {
                icon: <Server className="w-5 h-5" />,
                title: "Backend Development",
                desc: "Node.js, Express.js, REST APIs",
              },
              {
                icon: <Database className="w-5 h-5" />,
                title: "Databases",
                desc: "MongoDB, MySQL, Drizzle ORM",
              },
              {
                icon: <GitBranch className="w-5 h-5" />,
                title: "Version Control & CI/CD",
                desc: "Git, GitHub, GitHub Actions",
              },
              {
                icon: <Rocket className="w-5 h-5" />,
                title: "Deployment",
                desc: "Vercel, Netlify, GitHub Pages",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border rounded-2xl p-5 hover:bg-muted transition-all"
              >
                <div className="flex items-center gap-2 font-medium mb-2">
                  {item.icon}
                  {item.title}
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ================= Expertise / Highlights ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-8">
            What I Do Best
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Globe />,
                title: "Next.js Expertise",
                desc: "SEO-friendly, fast & scalable Next.js applications.",
              },
              {
                icon: <Repeat />,
                title: "Component Reusability",
                desc: "Write once, reuse everywhere with clean DRY components.",
              },
              {
                icon: <Sparkles />,
                title: "Framer Motion",
                desc: "Smooth animations & micro-interactions.",
              },
              {
                icon: <Layers />,
                title: "Frontend Architecture",
                desc: "Clean UI systems & reusable design patterns.",
              },
              {
                icon: <Database />,
                title: "MySQL Databases",
                desc: "Relational design, queries & schema management.",
              },
              {
                icon: <Code2 />,
                title: "WordPress Customization",
                desc: "Themes, plugins & basic custom setups.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border rounded-2xl p-5 hover:bg-muted transition"
              >
                <div className="flex items-center gap-2 font-medium mb-2">
                  {item.icon}
                  {item.title}
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
