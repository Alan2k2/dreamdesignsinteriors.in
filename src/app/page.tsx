"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import ConsultationModal from "@/components/ConsultationModal";
import axios from "axios";

const staticServices = [
  {
    title: "Interior Design",
    description: "Transforming a house into a functional, aesthetically pleasing home relies on understanding core interior design principles, space optimization, and curated color harmony.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Construction & Building",
    description: "Successful building projects rely on a highly structured sequence. Skipping steps or overlapping phases prematurely can cause structural failures, legal liabilities, or massive budget overruns.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Renovation & Remodelling",
    description: "Renovating an existing structure requires a fundamentally different approach than building new. Success depends on uncovering hidden structural conditions, respecting the existing building envelope, and prioritizing tasks by structural urgency rather than cosmetic appeal.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Home Interiors",
    description: "Crafting homes that feel alive in every detail, designed to touch your heart. From compact apartments to sprawling villas, our best home interior designers in Kerala  turn every room into something you’ll love coming home to.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Commercial Interiors",
    description: "We define the formula to perfect commercial interiors by aligning function and aesthetics. Offices, showrooms, restaurants — our commercial interior designers in Kerala build spaces that perform.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Custom Made Furniture",
    description: "As you imagine your dream interiors, we make it happen through custom-made furniture",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Modular Kitchen",
    description: "Designed for the way you cook. Our kitchen interior designers in Kerala craft modular kitchens that are smart, durable, and built to last",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Office Interiors",
    description: "Workspaces that inspire performance. Our office interior designers in Kerala design offices, co-working spaces, and corporate environments that bring out the best in your team.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800"
  }
];

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

const videoTestimonialsList = [
  {
    id: "4_YGA-Dg1HM",
    client: "Featured Client",
    quote: "They listened to every detail and elevated our ideas into something truly spectacular. The level of luxury and comfort is simply unmatched."
  }
];

export default function Home() {
  const [homeSettings, setHomeSettings] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeWhatWeDo, setActiveWhatWeDo] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playVideo || videoTestimonialsList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videoTestimonialsList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [playVideo]);

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

  useEffect(() => {
    // Fetch dynamic home settings from Laravel CMS
    axios.get(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}`}/home-settings`)
      .then(res => setHomeSettings(res.data))
      .catch(err => console.log("Backend not available, using fallback data."));

    axios.get(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}`}/services`)
      .then(res => setServices(res.data))
      .catch(err => console.log("Backend not available, using fallback data."));

    axios.get(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}`}/testimonials`)
      .then(res => setTestimonials(res.data))
      .catch(err => console.log("Backend not available, using fallback data."));
  }, []);

  const heading = homeSettings?.hero_heading || "Crafting Spaces That Inspire Life";
  const subheading = homeSettings?.hero_subheading || "Award-winning interior design and premium construction services tailored to elevate your living and working environments to unprecedented luxury.";

  // Create stylized heading by separating the last two words for the gradient class
  const words = heading.split(" ");
  const lastTwoWords = words.length > 2 ? words.splice(-2).join(" ") : "";
  const firstPart = words.join(" ");

  return (
    <main className="bg-slate-50">
      {/* Hero Content Area */}
      <section className="relative h-[50vh] md:h-screen flex items-center justify-center pt-20 pointer-events-none">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroCarousel images={homeSettings?.carousel_images || []} />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center pointer-events-auto">
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-xs uppercase tracking-widest text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-slate-300 overflow-hidden relative">
            <motion.div
              animate={{ y: [0, 48, 48] }}
              transition={{ repeat: Infinity, duration: 2, ease: "circInOut" }}
              className="absolute top-0 left-0 w-full h-full bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* Intro Tagline Strip */}
      <section className="bg-primary py-6">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white font-outfit uppercase tracking-[0.3em] text-sm md:text-base font-semibold">
            {homeSettings?.intro_tagline || "Award-winning design. Uncompromising craftsmanship. Spaces built to last a lifetime."}
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left side Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative z-10"
            >
              <div className="relative h-[400px] md:h-[500px] w-full rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden shadow-2xl">
                <Image
                  src="/hero-bg.png"
                  alt="About Dream Designs Interiors"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary rounded-full -z-20 blur-3xl opacity-20"></div>
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-slate-300 rounded-full -z-20 blur-2xl opacity-50"></div>
            </motion.div>

            {/* Right side Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <h2 className="text-sm md:text-base font-outfit uppercase tracking-[0.2em] font-semibold text-slate-500 mb-3">
                About Dream Designs Interiors
              </h2>
              <h3 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-8 leading-tight">
                WE MAKE YOUR DREAMS
              </h3>

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  At Dream Designs Interiors, we believe that every living space needs to provide a feeling of warmth and well-being to its inhabitants. Innovation guides our process, allowing us to create interiors that are both functional and distinctive.
                </p>
                <p>
                  Dream Designs Interiors, with our expert team of professionals, aim to create comfort and warmth while allowing functionality, all considering our client's requirements and personality.
                </p>
                <p>
                  Ultimately, we are committed to excellence in every project, transforming how people live, work, and connect through interiors that are distinctive, adaptable, and enduring.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Services - Icon Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {staticServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative bg-white rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100/50 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Image Wrapper */}
                <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6">
                  {/* Subtle color overlay that fades out on hover */}
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>

                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Hover icon */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                    <svg className="w-5 h-5 text-primary transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="px-3 pb-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-playfair font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Animated underline */}
                  <div className="w-12 h-[2px] bg-primary/30 mb-4 group-hover:w-full group-hover:bg-primary transition-all duration-500 ease-out"></div>

                  <p className="text-slate-500 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do - Interactive List & Image Reveal */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-start">

            {/* Left side: Interactive List */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-sm font-outfit uppercase tracking-[0.3em] font-semibold text-primary mb-4">Our Expertise</h2>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-slate-900">What We Do</h3>
              </motion.div>

              <div className="flex flex-col w-full relative">
                {whatWeDoItems.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveWhatWeDo(idx)}
                    className="group border-b border-slate-200 py-6 lg:py-8 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-baseline gap-6">
                      <span className={`font-outfit text-sm font-semibold transition-colors duration-500 ${activeWhatWeDo === idx ? 'text-primary' : 'text-slate-400'}`}>
                        0{idx + 1}
                      </span>
                      <h4 className={`text-2xl md:text-3xl lg:text-4xl font-playfair font-bold transition-all duration-500 transform ${activeWhatWeDo === idx ? 'text-slate-900 translate-x-4' : 'text-slate-400 group-hover:text-slate-600 group-hover:translate-x-2'}`}>
                        {item.title}
                      </h4>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${activeWhatWeDo === idx ? 'bg-primary text-white scale-100' : 'bg-slate-100 text-slate-400 scale-0 group-hover:scale-50'}`}>
                      <svg className="w-5 h-5 transform -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Sticky Image Reveal */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-32 h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl relative">
              {whatWeDoItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeWhatWeDo === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover transition-transform duration-1000 ease-out ${activeWhatWeDo === idx ? 'scale-100' : 'scale-110'}`}
                  />
                  {/* Elegant gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10"></div>

                  {/* Image caption */}
                  <div className="absolute bottom-8 left-8 right-8 text-white z-20">
                    <p className="text-xl md:text-2xl font-playfair font-light tracking-wide">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us - Stats */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <h4 className="text-5xl font-playfair font-bold text-primary mb-2">
                {homeSettings?.stat_projects_completed || "150+"}
              </h4>
              <p className="text-slate-700 uppercase tracking-widest font-semibold text-sm">Projects Completed</p>
            </div>
            <div>
              <h4 className="text-5xl font-playfair font-bold text-primary mb-2">
                {homeSettings?.stat_years_experience || "15+"}
              </h4>
              <p className="text-slate-700 uppercase tracking-widest font-semibold text-sm">Years of Experience</p>
            </div>
            <div>
              <h4 className="text-5xl font-playfair font-bold text-primary mb-2">
                {homeSettings?.stat_client_satisfaction || "98%"}
              </h4>
              <p className="text-slate-700 uppercase tracking-widest font-semibold text-sm">Client Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white overflow-hidden relative">
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
      
      {/* Creative Video Testimonial Section */}
      <section className="py-32 bg-white overflow-hidden relative">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-slate-50 -skew-x-12 transform origin-top-right z-0 hidden lg:block"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-3xl z-0"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left side text content */}
            <div className="w-full lg:w-5/12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[2px] bg-primary"></div>
                  <h2 className="text-sm font-outfit uppercase tracking-[0.3em] font-semibold text-primary">Featured Client</h2>
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-slate-900 mb-8 leading-tight">
                  Stories of <br/><span className="italic text-slate-500 font-light">Transformation</span>
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-12">
                  Step inside the homes of our clients and hear firsthand how we turned their visions into breathtaking realities. Because a space isn't just designed—it's brought to life.
                </p>
                
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentVideoIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="relative p-8 md:p-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] rounded-tr-[3rem] rounded-bl-[3rem] border border-slate-100"
                  >
                    <div className="absolute -top-6 -left-2 text-primary opacity-20">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                    </div>
                    <p className="relative z-10 text-slate-700 italic font-medium leading-relaxed text-lg mb-4">
                      "{videoTestimonialsList[currentVideoIndex].quote}"
                    </p>
                    <p className="relative z-10 text-primary font-outfit font-bold uppercase tracking-widest text-sm">
                      - {videoTestimonialsList[currentVideoIndex].client}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Controls */}
                {videoTestimonialsList.length > 1 && (
                  <div className="mt-8 flex gap-3 items-center">
                    {videoTestimonialsList.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          setCurrentVideoIndex(idx);
                          setPlayVideo(false);
                        }}
                        className={`transition-all duration-300 rounded-full ${
                          currentVideoIndex === idx 
                            ? "w-8 h-2 bg-primary" 
                            : "w-2 h-2 bg-slate-300 hover:bg-primary/50"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right side Video Morphing Blob */}
            <div className="w-full lg:w-7/12 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
              {/* Decorative Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] md:w-[90%] aspect-square border-[1px] border-slate-300 rounded-full animate-[spin_40s_linear_infinite] opacity-60 z-0 border-dashed"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[75%] aspect-square border-[1px] border-primary/20 rounded-full animate-[spin_30s_linear_infinite_reverse] z-0"></div>

              <motion.div 
                className="relative z-10 w-full max-w-xl aspect-square md:aspect-[4/3] bg-slate-900 shadow-[0_30px_60px_rgba(0,0,0,0.2)] overflow-hidden cursor-pointer group"
                initial={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
                animate={{ 
                  borderRadius: playVideo 
                    ? "2rem" 
                    : ["40% 60% 70% 30% / 40% 50% 60% 50%", "30% 70% 50% 50% / 50% 40% 60% 40%", "50% 50% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
                }}
                transition={{ 
                  duration: playVideo ? 0.6 : 12, 
                  repeat: playVideo ? 0 : Infinity,
                  ease: "easeInOut"
                }}
                onMouseEnter={() => setPlayVideo(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentVideoIndex + (playVideo ? '-playing' : '-thumb')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {playVideo ? (
                      <iframe
                        className="w-full h-full object-cover scale-[1.02]"
                        src={`https://www.youtube.com/embed/${videoTestimonialsList[currentVideoIndex].id}?autoplay=1&mute=0&controls=1&rel=0`}
                        title="Video Testimonial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <>
                        <Image 
                          src={`https://img.youtube.com/vi/${videoTestimonialsList[currentVideoIndex].id}/maxresdefault.jpg`} 
                          alt="Video Testimonial Thumbnail" 
                          fill 
                          className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-slate-900/30 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-80"></div>
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="relative">
                            {/* Pulsing ring */}
                            <div className="absolute inset-0 rounded-full border-2 border-white animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-40"></div>
                            
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl transition-transform duration-500 group-hover:scale-110">
                              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center text-primary shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                                <svg className="w-8 h-8 md:w-10 md:h-10 ml-2" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="mt-8 flex items-center gap-4">
                            <div className="w-8 md:w-12 h-[1px] bg-white/50"></div>
                            <p className="text-white font-outfit uppercase tracking-[0.3em] font-bold text-xs md:text-sm drop-shadow-lg">Watch Video</p>
                            <div className="w-8 md:w-12 h-[1px] bg-white/50"></div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-24 bg-primary text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            {homeSettings?.bottom_cta_headline || "Ready to Transform Your Space?"}
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            {homeSettings?.bottom_cta_body || "Whether it's a cozy apartment, a sprawling villa, or a corporate headquarters, we bring your vision to life. Let's start the conversation today."}
          </p>
          <button onClick={() => setIsModalOpen(true)} className="inline-block px-10 py-5 bg-white text-primary uppercase tracking-widest text-sm font-bold hover:bg-slate-100 transition-colors duration-300 shadow-lg">
            {homeSettings?.bottom_cta_button_text || "Book a Free Consultation"}
          </button>
        </div>
      </section>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
