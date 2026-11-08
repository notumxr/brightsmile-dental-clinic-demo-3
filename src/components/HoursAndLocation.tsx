import React, { useState } from 'react';
import { Clock, MapPin, Phone, Calendar, Check, ExternalLink } from 'lucide-react';
import { CLINIC_DATA } from '../types.ts';

export const HoursAndLocation: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [portraitError, setPortraitError] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(CLINIC_DATA.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const schedule = [
    { day: "Monday", hours: "9:00 AM – 6:00 PM", open: true },
    { day: "Tuesday", hours: "9:00 AM – 6:00 PM", open: true },
    { day: "Wednesday", hours: "9:00 AM – 6:00 PM", open: true },
    { day: "Thursday", hours: "9:00 AM – 6:00 PM", open: true },
    { day: "Friday", hours: "9:00 AM – 6:00 PM", open: true },
    { day: "Saturday", hours: "9:00 AM – 1:00 PM", open: true },
    { day: "Sunday", hours: "Closed", open: false },
  ];

  return (
    <section id="hours" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Practice Schedule and Contact Details */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
                Visiting BrightSmile
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
                Opening hours & practice details
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                BrightSmile Dental Clinic is open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 9:00 AM to 1:00 PM. We are located at 25 King Street, Manchester.
              </p>
            </div>

            {/* Operating Hours Table */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                <Clock className="w-4 h-4 text-teal-700" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Weekly Practice Hours
                </h3>
              </div>

              <div className="divide-y divide-slate-200/70">
                {schedule.map((item) => (
                  <div key={item.day} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-slate-700">{item.day}</span>
                    <span
                      className={`tabular-nums font-mono ${
                        item.open ? 'text-slate-900 font-semibold' : 'text-slate-400 italic'
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Telephone Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-teal-700">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Practice Location</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">25 King Street</h4>
                <p className="text-xs text-slate-600">
                  Manchester, United Kingdom
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-teal-700">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Direct Telephone</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                    {CLINIC_DATA.phone}
                  </span>
                  <button
                    onClick={handleCopyPhone}
                    className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <span>Copy</span>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-600">
                  Reception available Mon–Sat during opening hours.
                </p>
              </div>
            </div>

            {/* Direct Booking Strip */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#request-appointment"
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Request an Appointment</span>
              </a>

              <a
                href={`tel:${CLINIC_DATA.phone}`}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-teal-700" />
                <span>Call {CLINIC_DATA.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Portrait of Dentist in Treatment Suite */}
          <div className="lg:col-span-5 relative" id="practice">
            <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-white">
              {!portraitError ? (
                <img
                  src="/src/assets/images/clinic_doctor_care_1794057657131.jpg"
                  alt="BrightSmile Dental practitioner in Manchester practice"
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover"
                  onError={() => setPortraitError(true)}
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-teal-900 flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-semibold uppercase text-teal-300">Clinical Excellence</span>
                  <h3 className="text-lg font-bold mt-1">Manchester Dental Team</h3>
                  <p className="text-xs text-teal-100 mt-1">Dedicated to preventive oral care and positive patient outcomes.</p>
                </div>
              )}

              <div className="p-5 bg-white border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Manchester Practice</span>
                  <span className="font-semibold text-teal-700">Accepting Appointments</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Caring Dental Professionals in Manchester
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our clinicians provide comfortable appointments, transparent treatment discussions, and thorough preventive care six days a week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
