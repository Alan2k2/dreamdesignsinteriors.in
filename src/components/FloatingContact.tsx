"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Calendar } from 'lucide-react';
import ConsultationModal from './ConsultationModal';

export default function FloatingContact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed top-1/2 -translate-y-1/2 right-4 md:right-6 z-50 flex flex-col gap-3 md:gap-4 items-end">
        {/* Free Consultation FAB */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group flex flex-row-reverse items-center bg-slate-900 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden max-w-[48px] md:max-w-[56px] hover:max-w-[250px]"
          title="Free Consultation"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="font-semibold text-xs md:text-sm uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 pl-5 pr-1">
            Free Consultation
          </span>
        </button>

        {/* Email FAB */}
        <Link 
          href="mailto:info@dreamdesignsinteriors.in"
          className="group flex flex-row-reverse items-center bg-white text-slate-900 rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden max-w-[48px] md:max-w-[56px] hover:max-w-[200px] hover:bg-primary hover:text-white"
          title="Email Us"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="font-semibold text-xs md:text-sm uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 pl-5 pr-1">
            Email Us
          </span>
        </Link>

        {/* WhatsApp FAB */}
        <Link 
          href="https://wa.me/918714054763"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-row-reverse items-center bg-green-500 text-white rounded-full shadow-lg hover:shadow-green-500/50 transition-all duration-500 overflow-hidden max-w-[48px] md:max-w-[56px] hover:max-w-[200px] hover:bg-green-400"
          title="WhatsApp Us"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
            </svg>
          </div>
          <span className="font-semibold text-xs md:text-sm uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 pl-5 pr-1">
            WhatsApp Us
          </span>
        </Link>
      </div>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
