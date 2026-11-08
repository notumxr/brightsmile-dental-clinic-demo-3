import { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { AppointmentRequestSection } from './components/AppointmentRequestSection.tsx';
import { HoursAndLocation } from './components/HoursAndLocation.tsx';
import { PatientCare } from './components/PatientCare.tsx';
import { Footer } from './components/Footer.tsx';
import { ClinicAssistant } from './components/ClinicAssistant.tsx';

export default function App() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantPrompt, setAssistantPrompt] = useState<string | null>(null);
  const [selectedServiceForAppointment, setSelectedServiceForAppointment] = useState<string | null>(null);

  const handleOpenAssistant = () => {
    setIsAssistantOpen(true);
  };

  const handleOpenAssistantWithTopic = (topic: string) => {
    setAssistantPrompt(topic);
    setIsAssistantOpen(true);
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForAppointment(serviceName);
    // Smooth scroll to the appointment request section
    const el = document.getElementById('request-appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Navigation */}
      <Navbar onOpenAssistant={handleOpenAssistant} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero onOpenAssistant={handleOpenAssistant} />
        <ServicesSection
          onOpenAssistantWithTopic={handleOpenAssistantWithTopic}
          onSelectService={handleSelectService}
        />
        <AppointmentRequestSection
          selectedService={selectedServiceForAppointment}
          onClearSelectedService={() => setSelectedServiceForAppointment(null)}
        />
        <HoursAndLocation />
        <PatientCare />
      </main>

      {/* Footer */}
      <Footer onOpenAssistant={handleOpenAssistant} />

      {/* Floating Grounded Clinical Assistant Widget */}
      <ClinicAssistant
        isOpen={isAssistantOpen}
        onToggle={() => setIsAssistantOpen((prev) => !prev)}
        initialPrompt={assistantPrompt}
        onClearInitialPrompt={() => setAssistantPrompt(null)}
      />
    </div>
  );
}
