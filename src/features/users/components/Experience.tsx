"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    role: "Software Development Intern",
    company: "Cykube",
    period: "Aug 2025 – Nov 2025",
    details: [
      "Built RESTful APIs with CRUD operations using Express.js",
      "Integrated MySQL with Drizzle ORM",
      "Implemented role-based access control",
      "Added JWT authentication and protected routes",
      "Worked closely with senior developers in a team environment",
    ],
    icon: Briefcase,
  },
  {
    role: "Web App Development",
    company: "BMJ Digital Institute",
    period: "Sep 2024 – Jun 2025",
    details: [
      "Completed a 10-month hands-on full-stack program",
      "Built responsive UIs with React.js",
      "Developed REST APIs with Node & Express",
      "Worked with MongoDB & modern dev practices",
    ],
    icon: BookOpen,
  },
];



const ExperienceSection = () => {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-4">
        {/* ===== Heading ===== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Experience
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            A timeline of my professional experience and technical training
          </p>
        </motion.div>

        {/* ===== Timeline ===== */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-14">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={cn(
                    "relative flex flex-col md:flex-row",
                    isLeft
                      ? "md:justify-start"
                      : "md:justify-end"
                  )}
                >
                  {/* Icon */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-background">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={cn(
                      "mt-6 w-full max-w-md rounded-xl border bg-background p-6",
                      "transition hover:bg-muted/30",
                      isLeft ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
                    )}
                  >
                    <h3 className="text-base font-semibold">
                      {exp.role}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {exp.company} · {exp.period}
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {exp.details.map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground/60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

