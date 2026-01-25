"use client";

import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* ===== Brand ===== */}
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Ameer Hamza
            </h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-sm">
              Full-stack developer focused on building clean, scalable and
              user-friendly web applications.
            </p>
          </div>

          {/* ===== Socials ===== */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Ameer-Hamza-11/"
              target="_blank"
              className="rounded-full border p-2 transition hover:bg-muted"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/ameer-hamza-jameel-556717332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              className="rounded-full border p-2 transition hover:bg-muted"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <a
              href="ameerhamza.saati@gmail.com"
              className="rounded-full border p-2 transition hover:bg-muted"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* ===== Bottom ===== */}
        <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Ameer Hamza. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
