import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

const CLINIC_INFO = {
  business: "BrightSmile Dental Clinic",
  location: "25 King Street, Manchester, United Kingdom",
  openingHours: "Monday to Friday: 9:00 AM to 6:00 PM, Saturday: 9:00 AM to 1:00 PM, Sunday: Closed",
  services: [
    "Dental check-ups",
    "Teeth cleaning",
    "Dental fillings",
    "Teeth whitening",
    "General dental consultations"
  ],
  phone: "0161 000 0000",
  bookingAnchor: "#request-appointment",
  disclaimer: "Demo website for demonstration purposes only. This is not a real clinic, does not provide medical advice, and does not create real appointments.",
};

const SYSTEM_INSTRUCTION = `You are the AI website assistant for BrightSmile Dental Clinic. This is a fictional demonstration project for demo purposes only, not a real clinic.

APPROVED CLINIC INFORMATION:
- Business Name: BrightSmile Dental Clinic
- Location: 25 King Street, Manchester, United Kingdom
- Opening Hours:
  * Monday to Friday: 9:00 AM to 6:00 PM
  * Saturday: 9:00 AM to 1:00 PM
  * Sunday: Closed
- Approved Services:
  * Dental check-ups
  * Teeth cleaning
  * Dental fillings
  * Teeth whitening
  * General dental consultations
- Phone Number: 0161 000 0000
- Appointment Process: Visitors can submit the internal appointment-request form on this page or call 0161 000 0000. Note: This is a demonstration project, no real appointments are created.

STRICT ASSISTANT RULES & CONSTRAINTS:
1. IDENTITY: You are an AI assistant for this fictional demonstration project. Never pretend to be a dentist, doctor, receptionist, or human. If asked, clearly state that you are an AI assistant.
2. SOURCE OF TRUTH: Answer questions ONLY using the approved clinic information provided above. Do not invent details.
3. UNKNOWN INFORMATION: If information is not provided above (including parking details, specific policies, or other questions), state clearly:
   "I do not have that information in this demonstration. Please contact the clinic directly for accurate information." (or call 0161 000 0000).
4. NO PRICES: Never invent or estimate prices, fees, quotes, or costs. If asked, say: "I do not have price information in this demonstration. Please contact the clinic directly for accurate information."
5. NO DOCTORS: Never invent names of doctors, dentists (e.g. Dr Smith), hygienists, or staff members. If asked about a doctor, state: "I do not have information about specific doctors or staff members in this demonstration. Please contact the clinic directly for accurate information."
6. NO INSURANCE POLICIES: Never invent insurance policies, NHS coverage, or accepted insurance companies (such as Bupa, AXA). Say: "I do not have insurance policy information in this demonstration. Please contact the clinic directly for accurate information."
7. NO APPOINTMENT AVAILABILITY: Never invent calendar availability or confirm live openings (e.g. "available tomorrow" or "at 2 PM"). Direct users to the internal appointment-request form on this page or to call 0161 000 0000.
8. NO MEDICAL DIAGNOSIS OR TREATMENT ADVICE:
   - Never diagnose a medical or dental condition.
   - Never recommend specific treatments, medicines, remedies, or painkillers.
   - If a user asks for a diagnosis or treatment advice, state clearly: "As an AI assistant, I cannot diagnose medical conditions or recommend specific treatments. Please consult a qualified dental professional for personal medical advice."
9. URGENT OR SEVERE SYMPTOMS: For urgent or severe symptoms (such as severe tooth pain, swelling, bleeding, or trauma), advise the user to contact an appropriate healthcare professional or emergency service immediately.
10. APPOINTMENT FLOW: For all appointment questions, direct visitors to the internal appointment-request form on this page. Never send users to external websites or example.com.
11. PRIVACY: Never collect medical history, symptoms, or unnecessary sensitive patient information.
12. TONE & STYLE: Keep answers short, polite, professional, easy to understand, and suitable for website visitors.`;

// Deterministic rule-based fallback assistant guaranteeing 100% compliance
function fallbackAssistant(message: string): { reply: string; showBooking: boolean; showPhone: boolean } {
  const query = message.toLowerCase().trim();

  // 1. Identity inquiry: "Are you an AI?", "Who are you?", "Are you a human?"
  if (
    query.includes('who are you') ||
    query.includes('are you human') ||
    query.includes('are you a real') ||
    query.includes('are you a dentist') ||
    query.includes('are you a doctor') ||
    query.includes('are you an ai') ||
    query.includes('are you a bot') ||
    (/\bwhat are you\b/.test(query) && !query.includes('what are your'))
  ) {
    return {
      reply:
        "I am an AI assistant for this BrightSmile Dental Clinic demonstration. I am not a dentist, doctor, or human, and I can answer questions about our approved clinic information.",
      showBooking: false,
      showPhone: false,
    };
  }

  // 2. Urgent / Severe symptoms or medical diagnosis / treatment recommendation requests
  if (
    query.includes('diagnos') ||
    query.includes('severe tooth pain') ||
    query.includes('severe pain') ||
    query.includes('what treatment should i') ||
    query.includes('what medicine') ||
    query.includes('what should i take') ||
    query.includes('antibiotic') ||
    query.includes('painkiller') ||
    query.includes('ibuprofen') ||
    query.includes('paracetamol') ||
    query.includes('remedy') ||
    query.includes('cure') ||
    query.includes('pain') ||
    query.includes('toothache') ||
    query.includes('bleed') ||
    query.includes('swollen') ||
    query.includes('swell') ||
    query.includes('cavity') ||
    query.includes('infection') ||
    query.includes('broken tooth') ||
    query.includes('emergency')
  ) {
    // If specifically asking for diagnosis or severe pain
    if (query.includes('diagnos')) {
      return {
        reply:
          "As an AI assistant, I cannot diagnose medical conditions or recommend specific treatments. Please consult a qualified dental professional for personal medical advice.",
        showBooking: true,
        showPhone: true,
      };
    }

    if (query.includes('severe') || query.includes('emergency')) {
      return {
        reply:
          "I cannot diagnose conditions or recommend specific treatments. For urgent or severe symptoms, please contact an appropriate healthcare professional or emergency service immediately, or call BrightSmile Dental Clinic directly at 0161 000 0000.",
        showBooking: false,
        showPhone: true,
      };
    }

    return {
      reply:
        "I cannot diagnose medical conditions or recommend specific treatments. For personal medical advice, please consult a qualified dental professional or contact the clinic directly at 0161 000 0000.",
      showBooking: true,
      showPhone: true,
    };
  }

  // 3. Doctor / staff inquiries (e.g. "Is Dr Smith available tomorrow?")
  if (
    query.includes('dr smith') ||
    query.includes('dr.') ||
    query.includes('doctor') ||
    query.includes('dentist name') ||
    query.includes('who is the dentist') ||
    query.includes('who works') ||
    query.includes('staff')
  ) {
    return {
      reply:
        "I do not have information about specific doctors or staff members in this demonstration. Please contact the clinic directly for accurate information at 0161 000 0000.",
      showBooking: false,
      showPhone: true,
    };
  }

  // 4. Insurance queries (e.g. "Which insurance companies do you accept?")
  if (
    query.includes('insurance') ||
    query.includes('bupa') ||
    query.includes('axa') ||
    query.includes('nhs') ||
    query.includes('coverage') ||
    query.includes('payment plan')
  ) {
    return {
      reply:
        "I do not have that information in this demonstration. Please contact the clinic directly for accurate information regarding accepted insurance at 0161 000 0000.",
      showBooking: false,
      showPhone: true,
    };
  }

  // 5. Price / cost inquiries (e.g. "How much does teeth whitening cost?")
  if (
    query.includes('how much') ||
    query.includes('cost') ||
    query.includes('price') ||
    query.includes('fee') ||
    query.includes('rate') ||
    query.includes('charge') ||
    query.includes('quote')
  ) {
    return {
      reply:
        "I do not have price information in this demonstration. Please contact the clinic directly for accurate information at 0161 000 0000.",
      showBooking: true,
      showPhone: true,
    };
  }

  // 6. Appointment availability inquiries (e.g. "Is ... available tomorrow?", "available today")
  if (
    query.includes('available tomorrow') ||
    query.includes('available today') ||
    query.includes('availability') ||
    query.includes('open slot') ||
    query.includes('free slot') ||
    query.includes('next appointment') ||
    query.includes('can i come') ||
    query.includes('what times are free')
  ) {
    return {
      reply:
        "I do not have live appointment availability in this demonstration. Please use the appointment-request form on this page to request a preferred date and time, or call the clinic at 0161 000 0000.",
      showBooking: true,
      showPhone: true,
    };
  }

  // 7. Requesting an appointment (e.g. "How can I request an appointment?")
  if (
    query.includes('request an appointment') ||
    query.includes('book an appointment') ||
    query.includes('how can i request') ||
    query.includes('how do i book') ||
    query.includes('make an appointment') ||
    query.includes('schedule') ||
    query.includes('appointment')
  ) {
    return {
      reply:
        "You can request an appointment by filling out the internal appointment-request form on this page, or by calling BrightSmile Dental Clinic directly at 0161 000 0000. Please note this is a demo website and no real appointments are created.",
      showBooking: true,
      showPhone: true,
    };
  }

  // 8. Opening hours queries (e.g. "What are your opening hours?")
  if (
    query.includes('opening hours') ||
    query.includes('opening times') ||
    query.includes('hours') ||
    query.includes('what time') ||
    query.includes('when are you open') ||
    query.includes('are you open') ||
    query.includes('saturday') ||
    query.includes('sunday') ||
    query.includes('weekend') ||
    query.includes('friday')
  ) {
    return {
      reply:
        "BrightSmile Dental Clinic is open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 9:00 AM to 1:00 PM. We are closed on Sundays.",
      showBooking: true,
      showPhone: false,
    };
  }

  // 9. Location queries (e.g. "Where are you located?")
  if (
    query.includes('where are you located') ||
    query.includes('location') ||
    query.includes('address') ||
    query.includes('where is the clinic') ||
    query.includes('king street') ||
    query.includes('directions')
  ) {
    return {
      reply:
        "BrightSmile Dental Clinic is located at 25 King Street, Manchester, United Kingdom.",
      showBooking: false,
      showPhone: true,
    };
  }

  // 10. Parking inquiry
  if (query.includes('parking') || query.includes('park')) {
    return {
      reply:
        "I do not have that information in this demonstration. Please contact the clinic directly for accurate information at 0161 000 0000.",
      showBooking: false,
      showPhone: true,
    };
  }

  // 11. Services inquiry (e.g. "What services do you offer?")
  if (
    query.includes('service') ||
    query.includes('treatment') ||
    query.includes('offer') ||
    query.includes('whitening') ||
    query.includes('check-up') ||
    query.includes('checkup') ||
    query.includes('cleaning') ||
    query.includes('filling') ||
    query.includes('consultation') ||
    query.includes('what do you do')
  ) {
    // Check for unlisted services
    if (
      query.includes('brace') ||
      query.includes('implant') ||
      query.includes('invisalign') ||
      query.includes('root canal') ||
      query.includes('veneer') ||
      query.includes('surgery') ||
      query.includes('crown') ||
      query.includes('denture') ||
      query.includes('orthodont')
    ) {
      return {
        reply:
          "Our approved services in this demonstration are: Dental check-ups, Teeth cleaning, Dental fillings, Teeth whitening, and General dental consultations. I do not have information about other procedures in this demonstration. Please contact the clinic directly at 0161 000 0000.",
        showBooking: false,
        showPhone: true,
      };
    }

    return {
      reply:
        "At BrightSmile Dental Clinic, our approved services are: Dental check-ups, Teeth cleaning, Dental fillings, Teeth whitening, and General dental consultations.",
      showBooking: true,
      showPhone: true,
    };
  }

  // 12. Contact details inquiry
  if (
    query.includes('phone') ||
    query.includes('contact') ||
    query.includes('telephone') ||
    query.includes('number') ||
    query.includes('call')
  ) {
    return {
      reply:
        "You can contact BrightSmile Dental Clinic by phone at 0161 000 0000. Our clinic is located at 25 King Street, Manchester, United Kingdom.",
      showPhone: true,
      showBooking: false,
    };
  }

  // 13. Greetings
  if (
    query.startsWith('hi') ||
    query.startsWith('hello') ||
    query.startsWith('hey') ||
    query.startsWith('good morning') ||
    query.startsWith('good afternoon')
  ) {
    return {
      reply:
        "Hello! I am the AI assistant for BrightSmile Dental Clinic in Manchester. I can help with questions about our approved services, opening hours, location (25 King Street), or requesting an appointment.",
      showBooking: true,
      showPhone: false,
    };
  }

  // 14. Unknown inquiry default
  return {
    reply:
      "I do not have that information in this demonstration. Please contact the clinic directly for accurate information at 0161 000 0000.",
    showBooking: false,
    showPhone: true,
  };
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    clinic: CLINIC_INFO.business,
    location: CLINIC_INFO.location,
    isDemo: true,
  });
});

// Clinic information endpoint
app.get('/api/clinic-info', (_req: Request, res: Response) => {
  res.json(CLINIC_INFO);
});

// Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'A valid message string is required.' });
    }

    const trimmedMessage = message.trim();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      const fallbackResult = fallbackAssistant(trimmedMessage);
      return res.json({
        reply: fallbackResult.reply,
        metadata: {
          source: 'clinic_grounded_engine',
          clinic: CLINIC_INFO.business,
          bookingAnchor: CLINIC_INFO.bookingAnchor,
          phone: CLINIC_INFO.phone,
          showBooking: fallbackResult.showBooking,
          showPhone: fallbackResult.showPhone,
        },
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const conversationContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-6);
      for (const turn of recentHistory) {
        if (turn.role === 'user' || turn.role === 'model') {
          conversationContents.push({
            role: turn.role,
            parts: [{ text: turn.content }],
          });
        }
      }
    }

    conversationContents.push({
      role: 'user',
      parts: [{ text: trimmedMessage }],
    });

    // Race Gemini API with a 6-second timeout to guarantee fast, responsive replies
    const timeoutPromise = new Promise<{ text?: string }>((_, reject) =>
      setTimeout(() => reject(new Error('API_TIMEOUT')), 6000)
    );

    const response = await Promise.race([
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: conversationContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      }),
      timeoutPromise,
    ]);

    const generatedText = response.text?.trim() || fallbackAssistant(trimmedMessage).reply;
    const lowerText = generatedText.toLowerCase();
    const showBooking =
      lowerText.includes('request an appointment') ||
      lowerText.includes('appointment-request') ||
      lowerText.includes('appointment');
    const showPhone = lowerText.includes('0161') || lowerText.includes('contact');

    return res.json({
      reply: generatedText,
      metadata: {
        source: 'gemini-3.8-flash',
        clinic: CLINIC_INFO.business,
        bookingAnchor: CLINIC_INFO.bookingAnchor,
        phone: CLINIC_INFO.phone,
        showBooking,
        showPhone,
      },
    });
  } catch (err: unknown) {
    console.error('Error handling /api/chat:', err);
    const fallback = fallbackAssistant(req.body?.message || '');
    return res.json({
      reply: fallback.reply,
      metadata: {
        source: 'clinic_grounded_fallback',
        clinic: CLINIC_INFO.business,
        bookingAnchor: CLINIC_INFO.bookingAnchor,
        phone: CLINIC_INFO.phone,
        showBooking: fallback.showBooking,
        showPhone: fallback.showPhone,
      },
    });
  }
});

// Configure Vite middleware in development or static serve in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BrightSmile Dental Clinic Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
