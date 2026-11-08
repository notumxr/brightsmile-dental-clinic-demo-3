import React, { useState } from 'react';
import { Menu, X, Sparkles, Phone, Calendar } from 'lucide-react';
import { CLINIC_DATA } from '../types.ts';

interface NavbarProps {
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAssistant }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Demonstration Notice Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 text-center border-b border-slate-800 flex items-center justify-center gap-2 font-medium">
        <span>Demo website for demonstration purposes only. This is not a real clinic, does not provide medical advice, and does not create real appointments.</span>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark (Single text element with icon) */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-slate-900 hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm shadow-teal-600/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              BrightSmile Dental
            </span>
          </a>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#services"
              className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#hours"
              className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0"
            >
              Opening Hours
            </a>
            <a
              href="#practice"
              className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0"
            >
              Manchester Clinic
            </a>
            <a
              href="#care"
              className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0"
            >
              Patient Care
            </a>
            <button
              onClick={onOpenAssistant}
              className="text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Clinic Assistant</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="#request-appointment"
              className="px-4 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Request an Appointment</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-700">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 hover:bg-slate-50 rounded"
            >
              Services
            </a>
            <a
              href="#hours"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 hover:bg-slate-50 rounded"
            >
              Opening Hours
            </a>
            <a
              href="#practice"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 hover:bg-slate-50 rounded"
            >
              Manchester Clinic
            </a>
            <a
              href="#care"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 px-2 hover:bg-slate-50 rounded"
            >
              Patient Care
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssistant();
              }}
              className="text-left py-1 px-2 text-teal-700 font-semibold hover:bg-teal-50 rounded"
            >
              Chat with Clinic Assistant
            </button>
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${CLINIC_DATA.phone}`}
              className="py-2.5 px-3 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {CLINIC_DATA.phone}</span>
            </a>
            <a
              href="#request-appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 text-xs font-semibold text-white bg-teal-700 rounded-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Request an Appointment</span>
            </a>
          </div>
        </div>
      )}
      </header>
    </>
  );
};
