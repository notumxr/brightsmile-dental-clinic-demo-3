import React from 'react';
import { ShieldAlert, Stethoscope, Sparkles, AlertCircle, Phone, Calendar } from 'lucide-react';
import { CLINIC_DATA } from '../types.ts';

export const PatientCare: React.FC = () => {
  return (
    <section id="care" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
            Patient Guidelines & Transparency
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Our clinical approach and care standards
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            At BrightSmile Dental Clinic, patient safety, honest clinical evaluations, and comfortable visits are our foundation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">In-Person Clinical Evaluations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every mouth is unique. We never recommend treatments or diagnose conditions through digital chat. Proper diagnosis requires an in-person clinical check-up with diagnostic tools.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Preventive Hygiene Focus</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Regular cleanings and routine dental reviews help prevent tooth decay and gum disease before they require invasive restorative interventions.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Clear Clinic Policies</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We operate Monday to Friday: 9:00 AM to 6:00 PM, Saturday: 9:00 AM to 1:00 PM (Sunday: Closed) at 25 King Street, Manchester. Appointment requests can be submitted via our demonstration form.
            </p>
          </div>
        </div>

        {/* Medical Safety Disclaimer Callout */}
        <div className="mt-8 bg-amber-50/80 border border-amber-200 rounded-2xl p-6 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-amber-950">
                AI Clinic Assistant Safety & Information Rules
              </p>
              <p className="text-xs text-amber-800 leading-relaxed max-w-2xl">
                Our AI assistant answers exclusively from approved clinic facts. It does not invent prices, doctors, insurance policies, opening hours, or appointment availability. It does not diagnose dental problems or recommend treatments. If information is not in our approved records, visitors are directed to call our Manchester clinic directly at <strong className="font-semibold text-amber-950">{CLINIC_DATA.phone}</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${CLINIC_DATA.phone}`}
              className="px-3.5 py-2 text-xs font-semibold text-amber-950 bg-amber-100/80 hover:bg-amber-200/80 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {CLINIC_DATA.phone}</span>
            </a>
            <a
              href="#request-appointment"
              className="px-3.5 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Request an Appointment</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
