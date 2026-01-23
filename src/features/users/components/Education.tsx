"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const educationData = [
  {
    degree: "Intermediate (Computer Science)",
    institute: "Govt. Degree College",
    period: "Aug 2025 – Present",
    details: [
      "1st Year / Intermediate",
      "Major Subjects: Computer Science, Mathematics, Physics, English",
    ],
  },
  {
    degree: "Matriculation (Science)",
    institute: "Pride Zone Academy",
    period: "2022 – 2024",
    details: ["Science Group"],
  },
];

const Education = () => {
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
            Education
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Academic background and qualifications
          </p>
        </motion.div>

        {/* ================= LIST ================= */}
        <div className="space-y-10">
          {educationData.map((edu, index) => (
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
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* HEADER */}
              <div className="mb-4 pt-4">
                <h3 className="text-lg font-semibold">
                  {edu.degree}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {edu.institute} · {edu.period}
                </p>
              </div>

              {/* DETAILS */}
              <ul className="space-y-2 text-sm text-muted-foreground">
                {edu.details.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-foreground/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
