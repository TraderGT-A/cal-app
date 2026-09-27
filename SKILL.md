---
name: Nutri Journal / CalAI
description: Rules and UI/UX guidelines for maintaining the Nutri Journal (CalAI) single-page application.
---

# Nutri Journal (CalAI) Guidelines

This project is a high-end FinTech-style Nutrition Tracker (Single Page Application in `index.html`).

## 1. UI/UX Design System
- **Theme**: "Cozy Calorie Journey" (Focus Traveller style).
- **Aesthetic**: Deep blue/teal night forest background, soft glassmorphism panels, friendly rounded typography.
- **Colors**:
  - Background: Night Forest (`#121c26` or image).
  - Cards: Translucent dark blue (`rgba(18, 28, 38, 0.85)`).
  - Accents: Campfire Orange (`#f0932b`), Soft Blue (`#3498db`).
- **Typography**: `Nunito` for numbers/headings, `Prompt` for Thai text.
- **Vibe**: Friendly, gamified, non-stressful. No "AI" branding.
- **Dynamic Avatar System**:
  - Uses an inline SVG character (`<g id="torso">`).
  - JS calculates `scaleX()` based on `currentWeight` vs `targetWeight`.
  - The character's belly dynamically shrinks or expands based on weight logs!

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
