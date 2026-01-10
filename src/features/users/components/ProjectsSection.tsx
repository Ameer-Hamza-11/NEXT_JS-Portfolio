"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "MERN Portfolio",
    description:
      "A full-stack MERN portfolio showcasing authentication, dashboards, and clean UI architecture.",
    image: "/mern_portfolio.png",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    liveLink: "https://mern-portfolio-by-hamza.netlify.app/",
    githubLink: "https://github.com/Ameer-Hamza-11/MERN-stack-portfolio-server",
  },
  {
    title: "React Portfolio",
    description:
      "A fast, responsive personal portfolio built with React and Tailwind CSS.",
    image: "/react_portfolio.png",
    tech: ["React", "Tailwind CSS"],
    liveLink: "https://react-portfolio-by-ameer-hamza.netlify.app/",
    githubLink: "https://github.com/Ameer-Hamza-11/React-Portfolio",
  },
  {
    title: "Job Portal Application",
    description:
      "A production-level job portal built with Next.js, role-based access and server actions.",
    image: "/job_portal_under_development.png",
    tech: ["Next.js", "TypeScript", "Drizzle ORM"],
    liveLink: "#",
    githubLink: "https://github.com/Ameer-Hamza-11/Nextjs-JobPortal",
  },
];

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // ✅ Reset mobile state on mount (fix desktop ↔ mobile glitch)
  useEffect(() => {
    setActiveIndex(null);
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Projects
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Selected projects demonstrating my full-stack and frontend expertise
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              onClick={() =>
                setActiveIndex(activeIndex === idx ? null : idx)
              }
              className="group relative overflow-hidden rounded-xl border bg-background"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden border-b">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 md:group-hover:scale-105"
                />

                {/* Overlay */}
                <div
                  className={`
                    absolute inset-0 z-10
                    flex items-center justify-center gap-3
                    bg-background/90 backdrop-blur-sm
                    transition-opacity duration-300
                    opacity-0
                    md:group-hover:opacity-100
                    ${activeIndex === idx ? "opacity-100 md:opacity-0" : ""}
                  `}
                >
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                      Live Preview
                    </a>
                  )}

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-full border p-2 hover:bg-muted"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-base font-semibold flex items-center gap-1">
                    {project.title}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
