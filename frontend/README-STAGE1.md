# NammaSathi Frontend — Stage 1

This stage adds the responsive application shell and first UI routes:
- Overview dashboard
- Translator interface (UI only; no translation provider connected)
- Conversation practice situation cards (role-play not connected)
- Searchable starter phrasebook
- Basic settings screen

## Apply
1. Extract this ZIP into `D:\PROJECTS\NammaSathi\frontend`.
2. Allow it to merge/replace files under `src` and replace `vite.config.ts`.
3. From the frontend directory run:
   ```powershell
   npm run dev
   ```
4. Open `http://localhost:5173`.
5. Verify production build:
   ```powershell
   npm run build
   ```

Dependencies used: `react-router-dom`, `lucide-react`, `tailwindcss`, `@tailwindcss/vite`.
No backend changes are included.

## Important
This is a UI foundation only. Translation, speech recognition, text-to-speech and AI role-play are not yet integrated. The interface labels these as coming soon rather than returning simulated AI results.
