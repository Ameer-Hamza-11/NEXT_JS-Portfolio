"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Crown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUserAction } from "@/features/auth/server/auth.actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface UserProps {
  user: {
    id: number;
    name: string;
    userName: string;
    email: string;
    role: "user" | "admin";
    avatarUrl: string | null;
    phoneNumber: string | null;
    createdAt: Date;
    updatedAt: Date;
    session: {
      id: string;
      expiresAt: Date;
      userAgent: string;
      ip: string;
    };
  } | null; // Allow null in case the user isn't logged in
}

const Navbar = ({ user }: UserProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const navItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About", path: "/about" },
    { id: 3, name: "Project", path: "/projects" },
    { id: 4, name: "Services", path: "/services" },
    { id: 5, name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logoutUserAction();
    router.replace("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-0 w-full h-[8ch] z-50 flex items-center justify-between
        md:px-16 sm:px-10 px-4 backdrop-blur-md border-b
        transition-colors duration-300
        ${
          isScrolled
            ? "bg-white/70 border-neutral-200 shadow-sm"
            : "bg-transparent border-transparent"
        }
        `}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-neutral-700"
        >
          <Crown size={24} className="text-neutral-800" />
          DevHub
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8 text-neutral-700">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className="relative hover:text-black transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="px-6 py-2 rounded-full text-neutral-700 hover:bg-neutral-100 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <Button onClick={handleLogout}>Logout</Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-neutral-700"
        >
          <Menu size={26} />
        </button>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-60 bg-white flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 h-[8ch] border-b">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Crown size={24} />
                DevHub
              </Link>

              <button onClick={() => setIsOpen(false)}>
                <X size={28} />
              </button>
            </div>

            {/* Links */}
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="flex flex-col items-center gap-6 mt-10 text-lg"
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-sky-600 transition"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            {/* Buttons */}
            <div className="mt-auto p-6 flex flex-col gap-4">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-3 rounded-full border border-neutral-300
        text-neutral-700 hover:bg-neutral-100 transition"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-3 rounded-lg
        bg-neutral-900 text-white hover:bg-neutral-800 transition"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full py-3 rounded-lg bg-neutral-900
      text-white hover:bg-neutral-800 transition"
                >
                  Logout
                </Button>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
