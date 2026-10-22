"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const whatWeDoItems = [
  {
    title: "Interior Design",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
    className: "md:col-span-2 md:row-span-2 h-[300px] md:h-full"
  },
  {
    title: "Construction & Building",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
    className: "col-span-1 h-[250px] md:h-[300px]"
  },
  {
    title: "Renovation & Remodelling",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
    className: "col-span-1 h-[250px] md:h-[300px]"
  },
  {
    title: "Commercial Fit-Out",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    className: "col-span-1 h-[250px] md:h-[300px]"
  },
  {
    title: "3D interior visualization",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
    className: "col-span-1 h-[250px] md:h-[300px]"
  },
  {
    title: "Office Interiors",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800",
    className: "col-span-1 h-[250px] md:h-[300px]"
  }
];

export default function PortfolioPage() {
  const [activeWhatWeDo, setActiveWhatWeDo] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = testimonialsRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      // Only auto-scroll on mobile views
      if (window.innerWidth >= 1024) return;

      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-0 lg:px-12">

        {/* What We Do - Horizontal Accordion */}
        <section className="py-10 lg:py-20">
          <div className="text-center mb-16 px-6 max-w-3xl mx-auto">
            <h2 className="text-sm font-outfit uppercase tracking-[0.3em] font-semibold text-primary mb-4">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-slate-900 mb-6">What We Do</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              We specialize in crafting bespoke environments that perfectly balance aesthetics and functionality. From conceptualization to execution, our expert team transforms ordinary spaces into extraordinary experiences tailored to your unique lifestyle and vision.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row h-[800px] lg:h-[600px] gap-2 lg:gap-4 w-full px-4 lg:px-0">
            {whatWeDoItems.map((item, idx) => {
              const isActive = activeWhatWeDo === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveWhatWeDo(idx)}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col lg:flex-row ${isActive ? 'flex-[4] lg:flex-[5]' : 'flex-[1.5] lg:flex-1'
                    }`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={`object-cover transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-110 grayscale-[30%]'}`}
                    />
                    <div className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent' : 'bg-slate-900/60 hover:bg-slate-900/40'}`}></div>
                  </div>

                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end items-start h-full w-full z-10">
                    <div className="flex flex-row lg:flex-col items-center lg:items-start w-full lg:w-auto h-full lg:h-auto justify-between lg:justify-end gap-4 transition-opacity duration-300">

                      {/* Number Indicator */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/30 backdrop-blur-md transition-all duration-500 ${isActive ? 'bg-primary text-white border-transparent' : 'text-white'}`}>
                        <span className="font-outfit text-sm font-semibold">0{idx + 1}</span>
                      </div>

                      {/* Title */}
                      <div className={`overflow-hidden transition-all duration-700 w-auto lg:w-full lg:h-full flex items-center lg:items-end ${isActive ? '' : 'lg:pb-12'}`}>
                        <h4
                          className={`font-playfair font-bold text-white whitespace-nowrap transition-all duration-700 origin-bottom-left ${isActive
                              ? 'text-xl md:text-3xl lg:text-4xl opacity-100 transform-none'
                              : 'text-lg lg:text-2xl lg:-rotate-90 lg:translate-x-[2.2rem] lg:-translate-y-4 opacity-80'
                            }`}
                        >
                          {item.title}
                        </h4>
                      </div>

                      {/* Description */}
                      {/* <div className={`hidden lg:block overflow-hidden transition-all duration-700 ${isActive ? 'max-h-[100px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
                        <p className="text-slate-200 text-sm max-w-xs line-clamp-2">
                          Transforming spaces with unparalleled design and craftsmanship. We bring your vision to life.
                        </p>
                      </div> */}

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white overflow-hidden relative mt-20 mb-20 rounded-3xl mx-4 lg:mx-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-slate-900 mb-2">
                <span className="text-primary">150+</span> SATISFIED CUSTOMERS
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
            </div>

            <div ref={testimonialsRef} className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-5 gap-6 max-w-7xl mx-auto pb-8 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* Testimonial 1 */}
              <div className="flex flex-col items-center text-center group snap-center shrink-0 w-[85%] sm:w-[45%] lg:w-auto">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                    <Image src="/testimonials/Dr.R N kausik.png" alt="Dr. R.N Kausik" fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                    <span className="font-serif text-2xl leading-none pt-2">“</span>
                  </div>
                </div>
                <h3 className="text-lg font-playfair font-bold text-primary mb-2">Dr. R.N Kausik</h3>
                <p className="text-sm text-slate-600 leading-relaxed px-2">Transformed our messy house into a gorgeous, highly functional home.</p>
              </div>

              {/* Testimonial 2 */}
              <div className="flex flex-col items-center text-center group snap-center shrink-0 w-[85%] sm:w-[45%] lg:w-auto">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                    <Image src="/testimonials/Girish menon.png" alt="Mr. Girish Menon" fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                    <span className="font-serif text-2xl leading-none pt-2">“</span>
                  </div>
                </div>
                <h3 className="text-lg font-playfair font-bold text-primary mb-2">Mr. Girish Menon (DUBAI,UAE)</h3>
                <p className="text-sm text-slate-600 leading-relaxed px-2">Flawless execution and beautiful spatial planning from start to finish</p>
              </div>

              {/* Testimonial 3 */}
              <div className="flex flex-col items-center text-center group snap-center shrink-0 w-[85%] sm:w-[45%] lg:w-auto">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                    <Image src="/testimonials/Jacob koshy.png" alt="Mr. Jacob Koshy" fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                    <span className="font-serif text-2xl leading-none pt-2">“</span>
                  </div>
                </div>
                <h3 className="text-lg font-playfair font-bold text-primary mb-2">Mr. Jacob Koshy (USA)</h3>
                <p className="text-sm text-slate-600 leading-relaxed px-2">They perfectly captured our unique style into pure luxury.</p>
              </div>

              {/* Testimonial 4 */}
              <div className="flex flex-col items-center text-center group snap-center shrink-0 w-[85%] sm:w-[45%] lg:w-auto">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                    <Image src="/testimonials/Justin scaria from dubai.png" alt="Mr. Justin Scaria" fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                    <span className="font-serif text-2xl leading-none pt-2">“</span>
                  </div>
                </div>
                <h3 className="text-lg font-playfair font-bold text-primary mb-2">Mr. Justin Scaria (DUBAI,UAE)</h3>
                <p className="text-sm text-slate-600 leading-relaxed px-2">Highly professional designers who made our renovation journey incredibly easy.</p>
              </div>

              {/* Testimonial 5 */}
              <div className="flex flex-col items-center text-center group snap-center shrink-0 w-[85%] sm:w-[45%] lg:w-auto">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                    <Image src="/testimonials/Justice S. Easwaran.png" alt="Justice S. Easwaran" fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-2 right-2 w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center text-white border-2 border-white shadow-md">
                    <span className="font-serif text-2xl leading-none pt-2">“</span>
                  </div>
                </div>
                <h3 className="text-lg font-playfair font-bold text-primary mb-2">Justice S. Easwaran</h3>
                <p className="text-sm text-slate-600 leading-relaxed px-2">Professional, highly creative team that handled everything completely stress-free.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
