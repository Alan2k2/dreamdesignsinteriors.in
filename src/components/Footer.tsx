"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PinIcon } from "lucide-react";
import axios from "axios";

export default function Footer() {
  const [globalSettings, setGlobalSettings] = useState<any>(null);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}`}/global-settings`)
      .then(res => setGlobalSettings(res.data))
      .catch(err => console.log("Backend not available, using fallback footer data."));
  }, []);

  return (
    <footer className="bg-slate-950 pt-16 md:pt-20 pb-8 md:pb-10 border-t border-slate-900 relative z-10 text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 mb-12 md:mb-16">
          {/* Brand Col */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link href="/" className="inline-block mb-6">
              <Image src="/Dream Designs Logo white.png" alt="Dream Designs Interiors Logo" width={160} height={40} className="object-contain" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Award-winning design. Uncompromising craftsmanship. Spaces built to last a lifetime. Transforming ordinary spaces into extraordinary experiences.
            </p>
            {globalSettings?.social_links && globalSettings.social_links.length > 0 ? (
              <div className="flex gap-4 justify-center sm:justify-start">
                {globalSettings.social_links.map((link: any, idx: number) => (
                   <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-colors text-xs font-bold uppercase">
                     {link.platform.substring(0,2)}
                   </a>
                ))}
              </div>
            ) : (
              <div className="flex gap-4 justify-center sm:justify-start">
                <a href="https://www.instagram.com/dreamdesignsinteriorsofficial/?hl=en" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61591849332777&sk=directory_communities" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.youtube.com/@dreamdesignsinteriorsofficial" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </a>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-outfit uppercase tracking-[0.2em] font-semibold mb-6 text-sm">Explore</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Projects', 'Portfolio', 'Contact'].map(link => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`} className="text-slate-400 hover:text-primary text-sm transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-outfit uppercase tracking-[0.2em] font-semibold mb-6 text-sm">Our Services</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Residential Design</li>
              <li>Commercial Fit-Out</li>
              <li>Turnkey Solutions</li>
              <li>Renovation & Remodelling</li>
              <li>3D Visualisation</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
            <h4 className="text-white font-outfit uppercase tracking-[0.2em] font-semibold mb-6 text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400 max-w-xs">
              <li className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <PinIcon className="text-primary shrink-0 mt-1" size={18} />
                <span className="leading-relaxed">{globalSettings?.company_address || "V699, Bldg No. 60/44, JC Chambers Opp. Kairali Apartments, Panampilly Nagar, Kochi, Pin-682036"}</span>
              </li>
              <li className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <span className="text-primary shrink-0 font-bold mt-0.5">T</span>
                <span>{globalSettings?.contact_phone || "+91 8714054763"}</span>
              </li>
              <li className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <span className="text-primary shrink-0 font-bold mt-0.5">E</span>
                <span>{globalSettings?.contact_email || "info@dreamdesignsinteriors.in"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Dream Designs Interiors. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
