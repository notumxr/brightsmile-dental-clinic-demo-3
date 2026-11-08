import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Sparkles, CheckCircle2, AlertCircle, Phone, ArrowRight } from 'lucide-react';
import { CLINIC_DATA } from '../types.ts';

interface AppointmentRequestSectionProps {
  selectedService?: string | null;
  onClearSelectedService?: () => void;
}

export const AppointmentRequestSection: React.FC<AppointmentRequestSectionProps> = ({
  selectedService,
  onClearSelectedService,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00 - 10:00');
  const [service, setService] = useState('Dental check-ups');
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    contact: string;
    date: string;
    time: string;
    service: string;
  } | null>(null);

  // Update selected service when prop changes
  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
      setSubmitted(false);
    }
  }, [selectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !date) return;

    setSubmittedData({
      name: name.trim(),
      contact: contact.trim(),
      date,
      time,
      service,
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedData(null);
    setName('');
    setContact('');
    setDate('');
    setTime('09:00 - 10:00');
    if (onClearSelectedService) onClearSelectedService();
  };

  // Get tomorrow's date formatted as YYYY-MM-DD for min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const timeSlots = [
    '09:00 - 10:00 (Morning)',
    '10:00 - 11:00 (Morning)',
    '11:00 - 12:00 (Morning)',
    '12:00 - 13:00 (Midday)',
    '13:00 - 14:00 (Early Afternoon)',
    '14:00 - 15:00 (Afternoon)',
    '15:00 - 16:00 (Afternoon)',
    '16:00 - 17:00 (Late Afternoon)',
    '17:00 - 18:00 (Evening)',
  ];

  return (
    <section id="request-appointment" className="py-16 sm:py-20 bg-gradient-to-b from-white via-teal-50/30 to-slate-50 border-b border-slate-200/80 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5 text-teal-700" />
            <span>25 King Street, Manchester</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Request an Appointment
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Submit your preferred date, time, and requested dental service. Please note that this is a demonstration form and does not create a real booking.
          </p>
        </div>

        {/* Section 4 Clearly Visible Demo Notice Near Appointment Form */}
        <div className="mb-6 bg-amber-50/90 border border-amber-200 text-amber-900 rounded-xl px-4 py-3 text-xs text-center font-medium shadow-xs">
          <span>Demo website for demonstration purposes only. This is not a real clinic, does not provide medical advice, and does not create real appointments.</span>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 relative overflow-hidden">
          {submitted ? (
            /* Post-Submission State */
            <div className="text-center py-6 sm:py-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Appointment Request Received
                </h3>
                {submittedData && (
                  <p className="text-xs text-slate-500 font-medium">
                    Requested for: <span className="text-slate-800 font-semibold">{submittedData.name}</span> · {submittedData.service} · {submittedData.date} ({submittedData.time})
                  </p>
                )}
              </div>

              {/* Mandatory Requirement #5 Notice */}
              <div className="bg-amber-50 border border-amber-200 text-amber-950 p-4 sm:p-5 rounded-xl text-xs sm:text-sm leading-relaxed max-w-xl mx-auto text-left flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 mb-1">Demonstration Notice:</p>
                  <p className="text-amber-800">
                    This is a demonstration form. No appointment has been created. In a real clinic website, this request would be sent to the clinic’s approved booking system or receptionist.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
                <a
                  href={`tel:${CLINIC_DATA.phone}`}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Reception: {CLINIC_DATA.phone}</span>
                </a>
              </div>
            </div>
          ) : (
            /* Input Form State */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Field 1: Name */}
                <div className="space-y-1.5">
                  <label htmlFor="patient-name" className="block text-xs font-semibold text-slate-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="patient-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Field 2: Email or phone number */}
                <div className="space-y-1.5">
                  <label htmlFor="patient-contact" className="block text-xs font-semibold text-slate-700">
                    Email or Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="patient-contact"
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="e.g. sarah@email.com or 07123 456789"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Field 3: Preferred Date */}
                <div className="space-y-1.5">
                  <label htmlFor="preferred-date" className="block text-xs font-semibold text-slate-700">
                    Preferred Date (Mon–Sat) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="preferred-date"
                      type="date"
                      required
                      min={minDate}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900"
                    />
                  </div>
                </div>

                {/* Field 4: Preferred Time */}
                <div className="space-y-1.5">
                  <label htmlFor="preferred-time" className="block text-xs font-semibold text-slate-700">
                    Preferred Time Slot (9:00 – 18:00) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id="preferred-time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900 bg-white"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Field 5: Requested Service (from approved services) */}
              <div className="space-y-1.5">
                <label htmlFor="requested-service" className="block text-xs font-semibold text-slate-700">
                  Requested Dental Service <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Sparkles className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="requested-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900 bg-white"
                  >
                    {CLINIC_DATA.services.map((item) => (
                      <option key={item.id} value={item.title}>
                        {item.title} ({item.duration})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request an Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Mandatory Requirement #8 Note */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>For urgent dental problems, please contact the clinic directly or seek appropriate emergency care.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
