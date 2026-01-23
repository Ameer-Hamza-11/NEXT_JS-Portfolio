"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    role: "Software Development Intern",
    company: "Cykube",
    period: "Aug 2025 – Nov 2025",
    points: [
      "Built RESTful APIs with CRUD operations using Express.js",
      "Integrated MySQL with Drizzle ORM",
      "Implemented role-based access control",
      "Added JWT authentication and protected routes",
      "Collaborated with senior developers in an agile team",
    ],
    icon: Briefcase,
  },
  {
    role: "Full-Stack Web Development",
    company: "BMJ Digital Institute",
    period: "Sep 2024 – Jun 2025",
    points: [
      "Completed a 10-month hands-on full-stack program",
      "Built responsive UIs using React.js",
      "Developed REST APIs with Node.js & Express",
      "Worked with MongoDB and modern dev workflows",
    ],
    icon: GraduationCap,
  },
];

const ExperienceSection = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4">
        {/* ================= HEADING ================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight">
            Experience
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Professional experience & technical training
          </p>
        </motion.div>

        {/* ================= LIST ================= */}
        <div className="space-y-10">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="relative rounded-2xl border bg-background p-6 sm:p-8"
              >
                {/* ICON */}
                <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full border bg-background">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>

                {/* HEADER */}
                <div className="mb-4 pt-4">
                  <h3 className="text-lg font-semibold">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {exp.company} · {exp.period}
                  </p>
                </div>

                {/* POINTS */}
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {exp.points.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/70" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
