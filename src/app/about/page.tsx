"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const staticServices = [
  {
    title: "Interior Design",
    description: "Transforming a house into a functional, aesthetically pleasing home relies on understanding core interior design principles, space optimization, and curated color harmony.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Construction & Build",
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

export default function AboutPage() {

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* About Us Section */}
        <section className="py-12 bg-slate-50 overflow-hidden">
          <div className="container mx-auto">
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

        {/* Our Services */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto">
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

      </div>
    </main>
  );
}
