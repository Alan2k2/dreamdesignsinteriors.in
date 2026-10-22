"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, ChevronDown } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    date: '',
    time: '',
    message: ''
  });

  const [openDropdown, setOpenDropdown] = useState<'date' | 'time' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time) {
      alert("Please select a preferred date and time.");
      return;
    }
    const text = `*New Free Consultation Request*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Phone:* ${encodeURIComponent(formData.phone)}%0A*WhatsApp:* ${encodeURIComponent(formData.whatsapp)}%0A*Preferred Date:* ${encodeURIComponent(formData.date)}%0A*Preferred Time:* ${encodeURIComponent(formData.time)}%0A*Message:* ${encodeURIComponent(formData.message)}`;
    const whatsappUrl = `https://wa.me/918714054763?text=${text}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  // Generate Date Options
  const dateOptions = Array.from({ length: 14 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    let label = '';
    if (i === 0) label = `Today, ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    else if (i === 1) label = `Tomorrow, ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    else label = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    return { label, value: date.toISOString().split('T')[0] };
  });

  // Generate Time Options
  const timeOptions = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"].map(t => ({ label: t, value: t }));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto" ref={dropdownRef}>
          <h2 className="text-2xl md:text-3xl font-bold font-playfair text-slate-900 mb-2">Book a Free Consultation</h2>
          <p className="text-slate-500 mb-6 text-sm">Fill out the details below and we will get back to you to confirm your appointment.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900 bg-white" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900 bg-white" placeholder="john@example.com" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900 bg-white" placeholder="+91 9876543210" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">WhatsApp Number *</label>
                <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900 bg-white" placeholder="+91 9876543210" />
              </div>
            </div>
            
            {/* Custom Styled Date and Time Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Picker */}
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Preferred Date *</label>
                <button 
                  type="button" 
                  onClick={() => setOpenDropdown(openDropdown === 'date' ? null : 'date')}
                  className={`w-full border px-4 py-2.5 rounded-lg text-left flex items-center justify-between transition-all bg-white ${openDropdown === 'date' ? 'border-primary ring-2 ring-primary/20 shadow-sm' : 'border-slate-300 hover:border-slate-400'}`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className={`w-5 h-5 ${formData.date ? 'text-primary' : 'text-slate-400'}`} />
                    <span className={formData.date ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                      {formData.date ? dateOptions.find(o => o.value === formData.date)?.label : 'Select a day'}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openDropdown === 'date' ? 'rotate-180 text-primary' : ''}`} />
                </button>
                
                {openDropdown === 'date' && (
                  <div className="absolute top-[72px] left-0 w-full bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="max-h-56 overflow-y-auto styled-scrollbar">
                      {dateOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => {
                            setFormData({ ...formData, date: opt.value });
                            setOpenDropdown(null);
                          }}
                          className={`w-full text-left px-5 py-3 hover:bg-slate-50 transition-colors text-sm flex items-center ${formData.date === opt.value ? 'bg-primary/5 text-primary font-semibold' : 'text-slate-700'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Time Picker */}
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Preferred Time *</label>
                <button 
                  type="button" 
                  onClick={() => setOpenDropdown(openDropdown === 'time' ? null : 'time')}
                  className={`w-full border px-4 py-2.5 rounded-lg text-left flex items-center justify-between transition-all bg-white ${openDropdown === 'time' ? 'border-primary ring-2 ring-primary/20 shadow-sm' : 'border-slate-300 hover:border-slate-400'}`}
                >
                  <div className="flex items-center gap-3">
                    <Clock className={`w-5 h-5 ${formData.time ? 'text-primary' : 'text-slate-400'}`} />
                    <span className={formData.time ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                      {formData.time ? timeOptions.find(o => o.value === formData.time)?.label : 'Select time slot'}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openDropdown === 'time' ? 'rotate-180 text-primary' : ''}`} />
                </button>
                
                {openDropdown === 'time' && (
                  <div className="absolute top-[72px] left-0 w-full bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-xl z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="max-h-56 overflow-y-auto styled-scrollbar">
                      {timeOptions.map((opt) => (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => {
                            setFormData({ ...formData, time: opt.value });
                            setOpenDropdown(null);
                          }}
                          className={`w-full text-left px-5 py-3 hover:bg-slate-50 transition-colors text-sm flex items-center ${formData.time === opt.value ? 'bg-primary/5 text-primary font-semibold' : 'text-slate-700'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full border border-slate-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none text-slate-900 bg-white" placeholder="Tell us about your project..."></textarea>
            </div>
            
            <button type="submit" className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-slate-900 transition-colors uppercase tracking-wider text-sm shadow-lg hover:shadow-xl mt-4">
              Submit Request via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
