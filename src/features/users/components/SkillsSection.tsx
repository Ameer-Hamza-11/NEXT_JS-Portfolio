"use client";

import React from "react";
import { motion } from "framer-motion";

const skills = [
  {
    title: "Programming & Markup",
    items: ["JavaScript", "TypeScript", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
      "WordPress (Basic)",
    ],
  },
  {
    title: "Backend & Databases",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "Drizzle ORM",
      "REST APIs",
    ],
  },
  {
    title: "Version Control & CI/CD",
    items: ["Git", "GitHub", "GitHub Actions"],
  },
  {
    title: "Deployment",
    items: ["Netlify", "Vercel"],
  },
  {
    title: "Tools",
    items: ["Postman", "VS Code", "Cursor"],
  },
];

const SkillsSection = () => {
  return (
    <section className="relative py-28">
      {/* subtle background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="mx-auto max-w-6xl px-4">
        {/* ===== Heading ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Skills & Tools
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            A focused stack I use to build fast, scalable and production-ready
            web applications.
          </p>
        </motion.div>

        {/* ===== Grid ===== */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl border bg-background p-6 md:p-7 hover:shadow-lg transition"
            >
              {/* top accent */}
              <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-foreground/10 group-hover:bg-foreground transition" />

              <h3 className="mb-5 text-base font-semibold tracking-tight">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border px-3.5 py-1.5 text-xs font-medium
                               text-muted-foreground
                               transition
                               group-hover:border-foreground/30
                               group-hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
