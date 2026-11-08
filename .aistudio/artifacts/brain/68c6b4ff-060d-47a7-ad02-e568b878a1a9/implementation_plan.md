# BrightSmile Dental Clinic & AI Website Assistant

An inviting, high-converting dental practice website for BrightSmile Dental Clinic in Manchester featuring a dedicated floating AI chat assistant strictly grounded in authorized clinic services, operating hours, contact details, and booking pathways.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following design and behavioral choices were confirmed during Phase 1 clarification:

- **Confirmed Assistant Presentation**: A clean, modern clinic website featuring an interactive floating chat assistant widget with smooth open/collapse transitions.
- **Confirmed Quick-Start Prompts**: Interactive chips for instant inquiries regarding Opening Hours, Available Services, Appointment Booking, and Direct Clinic Contact.
- **Confirmed Medical Inquiry Boundary**: A warm, reassuring disclaimer explicitly redirecting any symptom inquiries or diagnostic questions to an in-person dental evaluation and phone booking.
- **Zero Hallucination Guarantee**: Strict system instruction and fallback guardrails prohibiting fabricated pricing, unlisted procedures, altered hours, or clinical diagnoses.

---

## 1. Overview & Core Concept

BrightSmile Dental Clinic is a premier dental practice based in Manchester, dedicated to preventive oral health, routine hygiene, restorative fillings, and cosmetic teeth whitening. 

The website delivers:
1. **Clinical Trust & Clear Information**: Comprehensive practice details highlighting hours (Monday–Saturday, 9:00–18:00), central Manchester location, and direct scheduling.
2. **Interactive Clinical Assistant**: An embedded, floating conversational assistant that greets visitors, answers questions using strictly authorized clinic data, and guides patients to appointments via `https://example.com/book` or `000-000-0000`.
3. **Medical Safety Safeguards**: Active prevention against medical diagnosis or prescription advice, always pointing patients to licensed clinicians.

---

## 2. User Experience & Visual Design

### A. Section Flow & Visual Storytelling
Following healthcare and landing marketing principles, the page follows a natural narrative flow:
1. **Top Bar (3-Zone Contract)**:
   - **Zone 1 (Brand)**: `BrightSmile Dental` wordmark with subtle dental tooth icon.
   - **Zone 2 (Nav Links)**: `Services`, `Practice Hours`, `Location`, `Patient Care`, `About`.
   - **Zone 3 (Action)**: `Book Appointment` button linking to the online booking portal.
2. **Hero Section**:
   - Compelling headline: *"Gentle, Modern Dental Care in Manchester"*.
   - Direct value proposition covering routine check-ups, cleanings, tooth-colored fillings, and professional whitening.
   - Dual actions: Primary `Book Online` button and secondary `Chat with Clinic Assistant` button that immediately triggers the assistant widget.
   - Trust indicators: Manchester practice, Mon–Sat availability, experienced clinical team.
3. **Practice Information & Quick Stats Strip**:
   - Opening Hours: Monday–Saturday, 9:00–18:00 (Sunday Closed).
   - Location: Manchester, UK.
   - Telephone: 000-000-0000.
   - Online Booking: 24/7 self-service scheduling.
4. **Authorized Services Grid**:
   - **Dental Check-ups**: Comprehensive oral health exams, digital diagnostics, and preventive treatment plans.
   - **Hygiene & Cleaning**: Professional scaling, plaque removal, and stain polishing.
   - **Restorative Fillings**: High-quality composite, tooth-colored restorations.
   - **Teeth Whitening**: Safe, professional brightening treatments for a radiant smile.
5. **Patient Journey & Policy Transparency**:
   - Clear guidance on how appointments work, what to bring, and direct booking guidance.
6. **Floating Assistant Drawer (Widget)**:
   - Floating circular toggle at bottom-right with indicator.
   - Conversational window featuring:
     - Header with practice status (`Open Mon–Sat 9:00–18:00`), phone shortcut, and close button.
     - Starter prompt chips: *"What are your opening hours?"*, *"Which services do you offer?"*, *"How do I book an appointment?"*, *"Where is the clinic located?"*, *"What is your phone number?"*.
     - Message stream with formatted clinical responses, direct booking button cards, and clear contact links.
     - Medical disclaimer pill explaining the assistant provides administrative and clinic info only.

### B. Visual Identity & Palette
- **Canvas Neutrals (60%)**: Crisp bright medical white (`#FFFFFF`) with cool porcelain slate backgrounds (`#F8FAFC`).
- **Structural Surfaces (30%)**: Refined cards with hairline borders (`#E2E8F0`), deep ocean slate text (`#0F172A`), and calm neutral secondary copy (`#475569`).
- **Accent Palette (10%)**: Clinical cyan-teal (`#0D9488` / `#0F766E`) conveying freshness, hygiene, and calmness, paired with sky highlights (`#0284C7`).
- **Typography**: Clean, friendly neo-grotesque display (`Plus Jakarta Sans`) paired with high-legibility body prose and tabular numbers for hours and contact digits.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: AI Assistant Architecture & Strict Boundary Enforcement
- **Approach**: Server-side Express proxy (`/api/chat`) using `@google/genai` with `gemini-3.8-flash`, fortified by an explicit, unalterable system prompt containing only the verified clinic knowledge base. A client-side intelligent fallback engine also guarantees instant, compliant replies even if the network or API key is temporarily unavailable.
- **Why**: Protects the clinic against medical liability and AI hallucinations (invented prices, unverified procedures, or clinical diagnoses).
- **Restrictions Enforced**:
  - Only authorized services: Check-ups, cleaning, fillings, whitening.
  - Fixed hours: Monday–Saturday, 9:00–18:00.
  - Fixed location: Manchester.
  - Fixed phone: 000-000-0000.
  - Appointment direction: `https://example.com/book`.
  - Unknown queries: Polite instruction to contact clinic directly at 000-000-0000.

### Decision 2: Hybrid Widget & Landing Page Experience
- **Approach**: Build a complete, responsive dental practice website accompanied by a sticky, collapsible chat widget with interactive quick chips.
- **Why**: Patients seeking immediate answers (e.g. "Are you open on Saturday?" or "Do you do whitening?") can use the chat widget or scan the landing page directly, maximizing accessibility for both mobile and desktop users.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Browser                         │
│                                                             │
│  ┌─────────────────────────┐   ┌─────────────────────────┐  │
│  │   BrightSmile Website   │   │ Floating Assistant      │  │
│  │  - Header & Top Bar     │   │  - Floating Toggle      │  │
│  │  - Hero & Quick Stats   │   │  - Quick Action Chips   │  │
│  │  - Services Grid        │   │  - Message History      │  │
│  │  - Location & Hours     │   │  - Booking Action Cards │  │
│  │  - Contact & Footer     │   │  - Medical Safe Guard   │  │
│  └───────────┬─────────────┘   └────────────┬────────────┘  │
│              │                              │               │
└──────────────┼──────────────────────────────┼───────────────┘
               │                              │
               │ HTTP GET (Static Assets)     │ POST /api/chat
               ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Node.js / Express Server                    │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Express Endpoint: /api/chat                           │  │
│  │ - Validates user message                              │  │
│  │ - Injects strict BrightSmile Grounding Prompt         │  │
│  │ - Calls @google/genai (model: gemini-3.8-flash)       │  │
│  │ - Returns structured assistant response               │  │
│  └───────────────────────────┬───────────────────────────┘  │
└──────────────────────────────┼──────────────────────────────┘
                               │
                               ▼
               ┌──────────────────────────────┐
               │    Google Gemini API         │
               │    (gemini-3.8-flash)        │
               └──────────────────────────────┘
```

### Knowledge Base Grounding Specification
The backend system prompt incorporates:
```text
You are the professional website assistant for BrightSmile Dental Clinic in Manchester.
Authorized Clinic Facts:
- Business: BrightSmile Dental Clinic
- Location: Manchester
- Opening hours: Monday–Saturday, 9:00–18:00
- Services: Check-ups, cleaning, fillings, whitening
- Phone: 000-000-0000
- Booking link: https://example.com/book

Strict Safety Guidelines:
1. Answer questions using only the clinic information provided.
2. Do not invent prices, services, opening hours, or policies.
3. Do not diagnose medical conditions.
4. Do not recommend specific treatment.
5. For appointments, direct visitors to the booking link: https://example.com/book.
6. If you do not know the answer or if the question is outside this clinic's scope, tell the visitor to contact the clinic directly at 000-000-0000.
```

### Verification & Test Scenarios
1. **Clinic Information Tests**:
   - "When are you open?" -> Answers Monday–Saturday, 9:00–18:00.
   - "Where are you located?" -> Answers Manchester.
   - "Can I get root canal or braces?" -> Declines unlisted services, states provided services (check-ups, cleaning, fillings, whitening), and directs to 000-000-0000.
   - "How much does whitening cost?" -> Does not invent prices; advises contacting 000-000-0000 or checking the booking link.
2. **Medical Diagnosis Rejection Tests**:
   - "My tooth hurts when drinking cold water, do I have an infection?" -> Refuses diagnosis, provides gentle disclaimer, recommends booking an in-person check-up, and offers 000-000-0000.
3. **Interactive & Responsive Tests**:
   - Click chips to fill chat inputs; click booking links to launch `https://example.com/book`.
