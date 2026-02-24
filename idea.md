# SnapText — Product Idea & Ideology Document
**Version:** MVP 1.0  
**Platform:** Android (Expo)  
**AI Engine:** Gemini API *(modular — swappable)*  
**Stage:** Early MVP

---

## The One-Line Pitch

> **Point your camera at any text. Get it on your clipboard in seconds.**

---

## The Problem

We encounter text everywhere — on whiteboards, receipts, handwritten notes, printed documents, signs, menus, books. Yet every time we need to digitize that text, we're stuck. Retyping is tedious and error-prone. Screenshot + manual reading breaks the flow. OCR apps feel clunky and outdated.

There's no fast, elegant, AI-native way to just **capture text and use it** — until now.

---

## The Idea

**SnapText** is a focused Android app with one core loop:

```
Open App → Tap Camera → Take Photo → Text Extracted → Copy & Use
```

No sign-ups. No bloat. No learning curve. Just point, shoot, and get your text.

The app uses a multimodal AI model (currently Gemini) to intelligently read and extract text from any image — handling handwriting, mixed fonts, skewed angles, and messy real-world conditions far better than traditional OCR.

---

## Core Ideology

### 1. Speed Is the Feature
The entire experience should take under 10 seconds from open to copied text. Every design decision — UI, API call, result display — is optimized around this. No unnecessary screens, no friction.

### 2. AI as Infrastructure, Not a Gimmick
The AI is the engine under the hood. Users don't need to know or care what model is running. What they care about is that it works — accurately, fast, and every time. The AI layer is intentionally kept modular so we can swap Gemini for GPT-4V, Claude, or any future model without changing the product experience.

### 3. Output First
The result screen is the most important screen in the app. The extracted text should be displayed in a clean, readable format with a prominent **Copy to Clipboard** button. Nothing should distract from that output.

### 4. Build Lean, Build Right
This MVP does one thing. It does it well. We resist the urge to add features before the core loop is flawless. Every future feature must earn its place by making the core experience better — not just bigger.

### 5. Design Is Not an Afterthought
Even at MVP stage, the UI should feel intentional and polished. Clean layout, good typography, smooth transitions. Users should trust the product the moment they open it.

---

## MVP Feature Set

| Feature | Description |
|---|---|
| **Camera Capture** | In-app camera with a single tap-to-capture button |
| **AI Text Extraction** | Full image sent to Gemini API for intelligent OCR |
| **Result Display** | Extracted text shown in a clean, readable card |
| **Copy to Clipboard** | One-tap copy with confirmation feedback |

That's it. This is the MVP. Tight, focused, and complete.

---

## Technical Foundation

- **Framework:** Expo (React Native) — cross-platform base, Android-first
- **Camera:** `expo-camera` — native camera access
- **AI API:** Google Gemini (multimodal) — image-to-text extraction
- **AI Layer:** Abstracted behind a service module so the model provider is swappable with zero UI changes
- **Clipboard:** `expo-clipboard` — native clipboard integration

The AI integration is written as a standalone service (`aiService.ts` or similar) that accepts an image and returns text. Swapping Gemini for another provider is a config change, not a rewrite.

---

## What This Is NOT (Yet)

- Not a document scanner
- Not a translation app
- Not a cloud storage app
- Not a history/archive app

These may come later. For now, we build the base — and we build it strong.

---

## The Vision

SnapText starts as a utility. A tool you reach for without thinking — like a calculator or a flashlight. Fast, reliable, always there.

But the foundation we're building — camera → AI → structured output — is a powerful primitive. Once the core is solid, the surface area for new features is enormous: language translation, smart summarization, document parsing, form filling, and more.

**We build the base right so everything that comes next sits on something solid.**

---

## Success Metric for MVP

> A user can open the app, photograph a piece of text, and have it copied to their clipboard in **under 10 seconds** — with **zero confusion** about what to do.

That's the bar. Everything else is secondary.

---

*SnapText MVP · Internal Product Document · Subject to iteration*