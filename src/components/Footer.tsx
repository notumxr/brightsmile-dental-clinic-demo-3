import React from 'react';
import { Sparkles, Phone, MapPin, Clock, Calendar, ExternalLink } from 'lucide-react';
import { CLINIC_DATA } from '../types.ts';

interface FooterProps {
  onOpenAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAssistant }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                BrightSmile Dental
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Providing welcoming, gentle, and comprehensive dental care in Manchester. Specializing in routine check-ups, professional hygiene cleaning, composite fillings, and teeth whitening.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAssistant}
                className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Launch Clinic Assistant</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Practice Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Approved Services
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Dental check-ups</li>
              <li>Teeth cleaning</li>
              <li>Dental fillings</li>
              <li>Teeth whitening</li>
              <li>General dental consultations</li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Hours
            </h4>
            <div className="space-y-1 text-xs text-slate-400">
              <p className="font-semibold text-slate-200">Mon – Fri</p>
              <p className="font-mono tabular-nums text-slate-300">9:00 AM – 6:00 PM</p>
              <p className="font-semibold text-slate-200 pt-1.5">Saturday</p>
              <p className="font-mono tabular-nums text-slate-300">9:00 AM – 1:00 PM</p>
              <p className="font-semibold text-slate-200 pt-1.5">Sunday</p>
              <p className="text-slate-500 italic">Closed</p>
            </div>
          </div>

          {/* Contact and Booking */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact & Location
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>25 King Street, Manchester, UK</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="font-mono tabular-nums">{CLINIC_DATA.phone}</span>
              </div>
              <div className="pt-2">
                <a
                  href="#request-appointment"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors cursor-pointer"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Request an Appointment</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 Clearly Visible Notice near the bottom of the website */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} BrightSmile Dental Clinic. Fictional demonstration project.
          </p>
          <p className="max-w-xl text-slate-300 text-left md:text-right font-medium">
            Demo website for demonstration purposes only. This is not a real clinic, does not provide medical advice, and does not create real appointments.
          </p>
        </div>
      </div>
    </footer>
  );
};
