"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [globalSettings, setGlobalSettings] = useState<any>({
    contact_email: "info@dreamdesignsinteriors.in",
    contact_phone: "+91 8714054763",
    contact_address: "123 Design Avenue, Kochi, Kerala, India"
  });
  const [faqs, setFaqs] = useState<any[]>([
    {
      id: 1,
      question: "What is the typical timeline for an interior design project?",
      answer: "A standard residential project takes between 8 to 12 weeks from initial consultation to final handover. Commercial projects vary based on scale and requirements."
    },
    {
      id: 2,
      question: "Do you provide turnkey solutions?",
      answer: "Yes, we handle everything from design concept and 3D modeling to material procurement and on-site execution."
    },
    {
      id: 3,
      question: "Do you charge for the first consultation?",
      answer: "The initial consultation is completely free. We discuss your vision, space, and budget to see if we're a good fit for your project."
    }
  ]);
  const [pageSettings, setPageSettings] = useState<any>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate API call for static frontend
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold font-playfair text-slate-900 mb-6"
          >
            {pageSettings?.hero_heading || "Let's Build Something Extraordinary"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            {pageSettings?.hero_subheading || "Reach out to our experts. Whether you have a project in mind, need design consultation, or just want to explore possibilities."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Contact Details */}
          <div className="space-y-12">
            <div className="bg-slate-900 text-white p-10 rounded-2xl">
              <h2 className="text-2xl font-playfair font-bold mb-8 text-primary">Get In Touch</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-2">Visit Us</h3>
                  <p className="text-lg">{globalSettings?.company_address || "V699, Bldg No. 60/44, JC Chambers Opp. Kairali Apartments, Panampilly Nagar, Kochi, Pin-682036"}</p>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-2">Call Us</h3>
                  <p className="text-lg">{globalSettings?.contact_phone || "+91 8714054763"}</p>
                  {globalSettings?.secondary_phone && (
                    <p className="text-lg">{globalSettings.secondary_phone}</p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-2">Email Us</h3>
                  <p className="text-lg">{globalSettings?.contact_email || "info@dreamdesignsinteriors.in"}</p>
                </div>

                {globalSettings?.social_links && globalSettings.social_links.length > 0 && (
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-3">Follow Us</h3>
                    <div className="flex gap-4">
                      {globalSettings.social_links.map((link: any, idx: number) => (
                        <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="text-white hover:text-primary transition-colors uppercase text-sm font-semibold tracking-wider">
                          {link.platform}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Embedded Map */}
            <div className="h-64 bg-slate-200 rounded-2xl overflow-hidden relative border border-slate-200">
              <iframe
                src="https://maps.google.com/maps?q=JC%20Chambers,%20Opp.%20Kairali%20Apartments,%20Panampilly%20Nagar,%20Kochi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 md:p-12 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-3xl font-playfair font-bold text-slate-900 mb-8">Send an Inquiry</h2>

            {formStatus === "success" ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={() => setFormStatus("idle")} className="mt-6 text-green-700 font-semibold hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                    <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Message</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"></textarea>
                </div>

                {formStatus === "error" && (
                  <p className="text-red-500 text-sm font-medium">Failed to send message. Please try again.</p>
                )}

                <button disabled={formStatus === "submitting"} type="submit" className="w-full py-4 bg-primary text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-slate-900 transition-colors duration-300 disabled:opacity-70">
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs */}
        {faqs.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-playfair font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>
            <div className="space-y-4">
              {faqs.map((faq: any, index: number) => (
                <div key={faq.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                  >
                    <span className="font-playfair font-bold text-lg text-slate-900">{faq.question}</span>
                    <span className={`text-2xl text-primary transition-transform duration-300 ${activeFaq === index ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-0 text-slate-600">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
