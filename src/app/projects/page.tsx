"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories = ["All Projects", "Residential", "Commercial", "Hospitality", "Renovation", "Turnkey"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [projects, setProjects] = useState<any[]>([
    // New Google Drive Folder 1 (IMAGES 1)
    {
      id: 4,
      title: "Luxury Villa - Living Space",
      category: "Residential",
      location: "Kochi, Kerala",
      completion_year: "2024",
      description: "An expansive living area featuring custom furniture, ambient lighting, and elegant decor.",
      image: "/projects/IMAGES 1/DSC08465.JPG"
    },
    {
      id: 5,
      title: "Luxury Villa - Dining",
      category: "Residential",
      location: "Kochi, Kerala",
      completion_year: "2024",
      description: "Elegant dining setup designed for hosting, blending warm wood tones with contemporary luxury.",
      image: "/projects/IMAGES 1/DSC08471.JPG"
    },
    {
      id: 6,
      title: "Luxury Villa - Kitchen",
      category: "Residential",
      location: "Kochi, Kerala",
      completion_year: "2024",
      description: "A state-of-the-art modular kitchen prioritizing workflow and aesthetics with premium finishes.",
      image: "/projects/IMAGES 1/DSC08475.JPG"
    },
    {
      id: 7,
      title: "Luxury Villa - Master Suite",
      category: "Residential",
      location: "Kochi, Kerala",
      completion_year: "2024",
      description: "A tranquil retreat featuring plush textiles, acoustic paneling, and bespoke wardrobes.",
      image: "/projects/IMAGES 1/DSC08477.JPG"
    },
    {
      id: 8,
      title: "Luxury Villa - Washroom",
      category: "Residential",
      location: "Kochi, Kerala",
      completion_year: "2024",
      description: "Spa-inspired bathroom design with high-end fixtures and stone textures.",
      image: "/projects/IMAGES 1/DSC08484.JPG"
    },
    {
      id: 9,
      title: "Luxury Villa - Guest Room",
      category: "Residential",
      location: "Kochi, Kerala",
      completion_year: "2024",
      description: "Welcoming and comfortable guest accommodation with thoughtful storage and decor.",
      image: "/projects/IMAGES 1/DSC08499.JPG"
    },
    {
      id: 10,
      title: "Luxury Villa - Balcony",
      category: "Residential",
      location: "Kochi, Kerala",
      completion_year: "2024",
      description: "A beautifully curated outdoor space connecting the interior luxury with nature.",
      image: "/projects/IMAGES 1/DSC08502.JPG"
    },
    // New Google Drive Folder 2 (IMAGES 2)
    { id: 11, title: "Corporate Office 1", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Premium commercial space featuring modern furnishings.", image: "/projects/IMAGES 2/DSC08052 copy.jpg" },
    { id: 12, title: "Corporate Office 2", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "High-end commercial workspace designed for productivity.", image: "/projects/IMAGES 2/DSC08063 copy.jpg" },
    { id: 13, title: "Corporate Office 3", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Sleek glass partitions and contemporary design.", image: "/projects/IMAGES 2/DSC08074 copy.jpg" },
    { id: 14, title: "Corporate Office 4", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Expansive layout tailored for collaborative work.", image: "/projects/IMAGES 2/DSC08076 copy.jpg" },
    { id: 15, title: "Corporate Office 5", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Premium commercial space featuring modern furnishings.", image: "/projects/IMAGES 2/DSC08077 copy.jpg" },
    { id: 16, title: "Corporate Office 6", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "High-end commercial workspace designed for productivity.", image: "/projects/IMAGES 2/DSC08078 copy.jpg" },
    { id: 17, title: "Corporate Office 7", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Sleek glass partitions and contemporary design.", image: "/projects/IMAGES 2/DSC08080 copy.jpg" },
    { id: 18, title: "Corporate Office 8", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Expansive layout tailored for collaborative work.", image: "/projects/IMAGES 2/DSC08082 copy.jpg" },
    { id: 19, title: "Corporate Office 9", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Premium commercial space featuring modern furnishings.", image: "/projects/IMAGES 2/DSC08083 copy (1).jpg" },
    { id: 20, title: "Corporate Office 10", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "High-end commercial workspace designed for productivity.", image: "/projects/IMAGES 2/DSC08086 copy.jpg" },
    { id: 21, title: "Corporate Office 11", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Sleek glass partitions and contemporary design.", image: "/projects/IMAGES 2/DSC08093 copy.jpg" },
    { id: 22, title: "Corporate Office 12", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Expansive layout tailored for collaborative work.", image: "/projects/IMAGES 2/DSC08094 copy.jpg" },
    { id: 23, title: "Corporate Office 13", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Premium commercial space featuring modern furnishings.", image: "/projects/IMAGES 2/DSC08096 copy 2 copy.jpg" },
    { id: 24, title: "Corporate Office 14", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "High-end commercial workspace designed for productivity.", image: "/projects/IMAGES 2/DSC08096 copy.jpg" },
    { id: 25, title: "Corporate Office 15", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Sleek glass partitions and contemporary design.", image: "/projects/IMAGES 2/DSC08106.jpg" },
    { id: 26, title: "Corporate Office 16", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Expansive layout tailored for collaborative work.", image: "/projects/IMAGES 2/DSC08110 copy.jpg" },
    { id: 27, title: "Corporate Office 17", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Premium commercial space featuring modern furnishings.", image: "/projects/IMAGES 2/DSC08112 copy.jpg" },
    { id: 28, title: "Corporate Office 18", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "High-end commercial workspace designed for productivity.", image: "/projects/IMAGES 2/DSC08117 copy.jpg" },
    { id: 29, title: "Corporate Office 19", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Sleek glass partitions and contemporary design.", image: "/projects/IMAGES 2/DSC08118 copy.jpg" },
    { id: 30, title: "Corporate Office 20", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Expansive layout tailored for collaborative work.", image: "/projects/IMAGES 2/DSC08121 copy.jpg" },
    { id: 31, title: "Corporate Office 21", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Premium commercial space featuring modern furnishings.", image: "/projects/IMAGES 2/DSC08124 copy.jpg" },
    { id: 32, title: "Corporate Office 22", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "High-end commercial workspace designed for productivity.", image: "/projects/IMAGES 2/DSC08125 copy.jpg" },
    { id: 33, title: "Corporate Office 23", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Sleek glass partitions and contemporary design.", image: "/projects/IMAGES 2/DSC08134 copy 2.jpg" },
    { id: 34, title: "Corporate Office 24", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Expansive layout tailored for collaborative work.", image: "/projects/IMAGES 2/DSC08143 copy.jpg" },
    { id: 35, title: "Corporate Office 25", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Premium commercial space featuring modern furnishings.", image: "/projects/IMAGES 2/DSC081498.jpg" },
    { id: 36, title: "Corporate Office 26", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "High-end commercial workspace designed for productivity.", image: "/projects/IMAGES 2/DSC081499 copy.jpg" },
    { id: 37, title: "Corporate Office 27", category: "Residential", location: "Trivandrum", completion_year: "2024", description: "Sleek glass partitions and contemporary design.", image: "/projects/IMAGES 2/DSC08154 copy.jpg" }
  ]);

  const filteredProjects = projects.filter((project: any) => 
    activeCategory === "All Projects" ? true : project.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold font-playfair text-slate-900 mb-6"
          >
            Our Work Speaks for Itself
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Browse a curated selection of residential, commercial, and hospitality projects — each a story of design excellence and skilled construction.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-primary text-white shadow-lg shadow-primary/30" 
                  : "bg-white text-slate-600 border border-slate-200 hover:border-primary hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid - Bento Box / Masonry Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] gap-4 md:gap-6">
          <AnimatePresence>
            {filteredProjects.map((project: any, index: number) => {
              // Dynamic Span Logic for Creative Bento Box
              const remainder = index % 7;
              let spanClass = "col-span-1 md:col-span-1 lg:col-span-1 row-span-1"; // default square
              if (remainder === 0) spanClass = "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2"; // large featured block
              else if (remainder === 3) spanClass = "col-span-1 md:col-span-2 lg:col-span-2 row-span-1"; // wide horizontal
              else if (remainder === 6) spanClass = "col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-2"; // tall vertical

              // Ensure .webp paths are used for hyper-fast loading
              const optimizedImage = project.image.replace(/\.[jJ][pP][eE]?[gG]$/, '.webp');

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer ${spanClass}`}
                >
                  {/* Image */}
                  <Image
                    src={optimizedImage || "/placeholder.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 right-6 bg-slate-900/50 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-white border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                    {project.category}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
