export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  showBooking?: boolean;
  showPhone?: boolean;
}

export interface ClinicService {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  duration: string;
}

export const CLINIC_DATA = {
  name: "BrightSmile Dental Clinic",
  address: "25 King Street, Manchester, United Kingdom",
  city: "Manchester",
  weekdayHours: "Monday to Friday: 9:00 AM to 6:00 PM",
  saturdayHours: "Saturday: 9:00 AM to 1:00 PM",
  sundayHours: "Sunday: Closed",
  hoursSummary: "Mon–Fri: 9:00 AM – 6:00 PM | Sat: 9:00 AM – 1:00 PM",
  phone: "0161 000 0000",
  bookingAnchor: "#request-appointment",
  disclaimer: "Demo website for demonstration purposes only. This is not a real clinic, does not provide medical advice, and does not create real appointments.",
  services: [
    {
      id: "checkups",
      title: "Dental check-ups",
      description: "Thorough clinical check-up of teeth, gums, and oral health to identify and prevent concerns early.",
      benefits: ["Oral health examination", "Preventive dental care", "Tailored guidance"],
      duration: "30–45 mins"
    },
    {
      id: "cleaning",
      title: "Teeth cleaning",
      description: "Professional dental hygiene scaling, plaque removal, and gentle tooth polishing.",
      benefits: ["Plaque & tartar removal", "Stain polishing", "Gum health maintenance"],
      duration: "45 mins"
    },
    {
      id: "fillings",
      title: "Dental fillings",
      description: "Restorative tooth-colored dental fillings to repair and protect damaged or decayed teeth.",
      benefits: ["Natural appearance", "Durable tooth restoration", "Tooth enamel protection"],
      duration: "45–60 mins"
    },
    {
      id: "whitening",
      title: "Teeth whitening",
      description: "Professional cosmetic teeth whitening to lighten discoloration and brighten your smile.",
      benefits: ["Clinically supervised", "Effective stain lightening", "Brightened appearance"],
      duration: "60 mins"
    },
    {
      id: "consultations",
      title: "General dental consultations",
      description: "Informative dental consultations to discuss routine oral hygiene options and treatment pathways.",
      benefits: ["One-on-one consultation", "Oral care guidance", "In-person evaluation"],
      duration: "30 mins"
    }
  ]
};
