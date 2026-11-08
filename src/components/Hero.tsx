import React, { useState } from 'react';
import { Calendar, MessageSquare, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { CLINIC_DATA } from '../types.ts';

interface HeroProps {
  onOpenAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAssistant }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-teal-50/40 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition and Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wide uppercase">
              <span>25 King Street, Manchester</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Mon–Fri 9:00–18:00 · Sat 9:00–13:00</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Demonstration Demo</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.12] text-balance">
              Gentle, expert dental care tailored for your smile.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Welcome to <strong className="text-slate-800 font-semibold">{CLINIC_DATA.name}</strong> at 25 King Street, Manchester. 
              We offer comprehensive dental check-ups, teeth cleaning, dental fillings, teeth whitening, and general dental consultations in a warm, welcoming environment.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#request-appointment"
                className="px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-center group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-teal-200 group-hover:scale-110 transition-transform" />
                <span>Request an Appointment</span>
              </a>

              <button
                onClick={onOpenAssistant}
                className="px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-teal-800 bg-white hover:bg-slate-50 border border-slate-300/90 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-teal-600" />
                <span>Ask Clinic Assistant</span>
              </button>
            </div>

            {/* Trust and Key Info Strip */}
            <div className="pt-6 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900">25 King Street</p>
                  <p className="text-slate-500">Manchester, UK</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900">Mon–Fri: 9–18 | Sat: 9–13</p>
                  <p className="text-slate-500">Sunday closed</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900">Direct Telephone</p>
                  <p className="text-slate-500 font-mono tabular-nums">{CLINIC_DATA.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg bg-white">
              {!imageError ? (
                <img
                  src="/src/assets/images/hero_brightsmile_clinic_1794057656064.jpg"
                  alt="BrightSmile Dental Clinic interior in Manchester"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-teal-800 to-slate-900 flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-wider text-teal-300 font-medium">Manchester Clinic</span>
                  <h3 className="text-xl font-bold mt-1">BrightSmile Dental Practice</h3>
                  <p className="text-xs text-teal-100/90 mt-1">Clean, modern treatment suites and compassionate dental care.</p>
                </div>
              )}

              {/* Verified Practice badge overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span className="font-semibold">Fictional Demonstration Practice</span>
                </div>
                <span className="text-slate-500 font-mono tabular-nums">{CLINIC_DATA.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
