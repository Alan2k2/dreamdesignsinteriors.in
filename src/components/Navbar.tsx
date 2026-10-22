"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isLightMode = !isHome || scrolled;

  let navBackgroundClass = "";
  if (scrolled) {
    navBackgroundClass = "bg-white shadow-md border-b border-slate-200";
  } else {
    navBackgroundClass = isHome ? "bg-transparent" : "bg-white shadow-sm border-b border-slate-100";
  }

  const linkColorClass = isLightMode
    ? "text-slate-900 hover:text-primary"
    : "text-slate-200 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]";

  const ctaClass = isLightMode
    ? "bg-transparent border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
    : "bg-primary/20 border-primary text-white hover:bg-primary hover:text-white";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackgroundClass} ${scrolled ? 'h-[72px]' : 'h-[96px]'}`}
    >
      <div className="w-full pl-0 pr-6 lg:pr-12 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center h-full bg-primary px-6 md:px-10 lg:px-16 transition-all duration-300">
          <Image src="/Dream Designs Logo white.png" alt="Dream Designs Interiors Logo" width={180} height={40} className="object-contain w-[140px] md:w-[180px]" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-base lg:text-lg font-semibold transition-all relative group uppercase tracking-wider ${linkColorClass}`}
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={() => setIsModalOpen(true)}
            className={`px-6 py-2.5 border font-medium text-sm uppercase tracking-wider transition-all duration-300 rounded-sm ${ctaClass}`}
          >
            Consultation
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden z-50 transition-colors duration-300 ${mobileMenuOpen || isLightMode ? 'text-slate-900' : 'text-slate-200'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 bg-slate-50 z-40 flex flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-display uppercase tracking-widest text-slate-900 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="px-8 py-3 bg-primary text-white font-medium uppercase tracking-wider rounded-sm shadow-lg shadow-primary/30"
                >
                  Get a Free Consultation
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.header>
  );
}
