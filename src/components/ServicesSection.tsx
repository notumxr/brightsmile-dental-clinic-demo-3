import React from 'react';
import { CheckCircle2, Calendar, Phone, ArrowUpRight } from 'lucide-react';
import { CLINIC_DATA } from '../types.ts';

interface ServicesSectionProps {
  onOpenAssistantWithTopic: (topic: string) => void;
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenAssistantWithTopic,
  onSelectService,
}) => {
  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-semibold text-teal-800 uppercase tracking-wider mb-2">
            Authorized Practice Treatments
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Our core dental services in Manchester
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            BrightSmile Dental Clinic offers dental check-ups, teeth cleaning, dental fillings, teeth whitening, and general dental consultations at 25 King Street, Manchester. This demonstration site does not create real appointments.
          </p>
        </div>

        {/* 5 Authorized Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CLINIC_DATA.services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-semibold text-teal-700 tracking-wide">
                    Service 0{index + 1}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {service.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onOpenAssistantWithTopic(`Tell me about ${service.title}`)}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Ask assistant about this</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="#request-appointment"
                  onClick={() => onSelectService && onSelectService(service.title)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Request an Appointment</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Specialized Inquiries Notice */}
        <div className="mt-10 rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-900">
              Need more information about fees or specialized treatments?
            </h4>
            <p className="text-xs text-slate-600">
              In accordance with clinic policy, specific pricing and individualized treatment plans are provided directly by our Manchester clinicians during consultation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${CLINIC_DATA.phone}`}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              <span>Call: {CLINIC_DATA.phone}</span>
            </a>
            <a
              href="#request-appointment"
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
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
