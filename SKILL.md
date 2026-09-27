---
name: Nutri Journal / CalAI
description: Rules and UI/UX guidelines for maintaining the Nutri Journal (CalAI) single-page application.
---

# Nutri Journal (CalAI) Guidelines

This project is a high-end FinTech-style Nutrition Tracker (Single Page Application in `index.html`).

## 1. UI/UX Design System
- **Theme**: "FinTech Trading Journal" style. Dark mode only. 
- **Colors**:
  - Background: Matte Obsidian (`#0c0d12`) / Deep Charcoal (`#14141d` for cards).
  - Borders: Hairline 1px `#252538`.
  - Accents: Neon Purple (`#8b5cf6`), Emerald (`#10b981`), Red (`#ef4444`), Cyan (`#38bdf8`).
- **Typography**: `Kanit` or `Prompt` for Thai, `Inter` or monospace for numbers and tech terms.
- **Vibe**: Keep it feeling like a native, premium app. No raw JSON output, no raw markdown in UI. 
- **NO "AI" Branding**: Hide all API keys, remove "Powered by Gemini" texts. Make it feel like magic. Button should say "บันทึกและสกัดข้อมูลโภชนาการ" instead of "วิเคราะห์ภาพด้วย AI".

## 2. Technical Stack
- **Single File**: Everything (HTML, CSS via Tailwind CDN, JS) is in `index.html`.
- **Database**: `localStorage` (Keys: `nj_data2` for historical logs, `nj_profile2` for settings).
- **Date Handling**: Stores data in `YYYY-MM-DD` objects. Allows backwards navigation.
- **Charts**: Uses `Chart.js` via CDN to render 7-day trailing calorie sparklines.

## 3. Gemini Vision API Integration
- **Endpoint**: Use `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=...`
- **Why 3.8-Flash?**: It balances extremely fast multi-modal reasoning with high rate limits, preventing 429 (Too Many Requests) when users scan multiple meals in a row.
- **Multi-Image Support**: Supports array of images and array of JSON objects in response.
- **Strict JSON Parsing**: ALWAYS use `generationConfig.response_schema` explicitly with uppercase data types (`ARRAY`, `OBJECT`, `STRING`, `INTEGER`) to prevent 400 Bad Request errors. Do NOT inject schema JSON as text into `system_instruction` when using 3.8.
- **Auto-Close Modal**: On successful API scan, automatically push to app state, close the modal immediately, and render the dashboard so it feels seamless.

## 4. Business Logic
- **Target Math**: 1 kg of fat = ~7,700 kcal. Deficit per week is calculated from user's Target Weight and Target Months.
- **Diet Types**: Macros dynamically shift based on 'Balanced', 'High Protein' (higher MPS threshold), 'Low Carb', or 'Keto'.
- **Meals**: Breakfast, Lunch, Dinner, Snack.

## 5. Deployment
- Deployed via GitHub Pages.
- **Caching**: Mobile Safari caches aggressively. ALWAYS append `<!-- cache bust vXX -->` in `index.html` and send the user the link with `?v=XX`.
