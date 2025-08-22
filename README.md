# SureRide — Frontend

React + Vite single-page app for the SureRide car rental UI.

This project uses Vite, React, Tailwind CSS utilities, and React Router for client-side navigation.

## Quick start (PowerShell)

1. Install dependencies

   ```powershell
   cd "d:\!SLIIT UNI\Internship\Tasks\Car Rental Management sys\frontend"
   npm install
   ```

2. Run the dev server

   ```powershell
   npm run dev
   ```

3. Build for production

   ```powershell
   npm run build
   npm run preview
   ```

## Environment & API

- The frontend uses `axios` for API calls. If the app expects a base API URL, set it in your code or use a `.env` (Vite) variable such as `VITE_API_BASE_URL` and reference it via `import.meta.env.VITE_API_BASE_URL`.

## Project structure (important files)

- `src/main.jsx` — React entry (mounts `App.jsx`)
- `src/App.jsx` — main app routes and layout
- `src/components/` — shared UI components
- `src/pages/` — route pages: `Home`, `Login`, `Signup`, `Admin`

## Notes

- Dev server default: http://localhost:5173
- Ensure backend is running (default: http://localhost:5000) and CORS enabled (backend already sets `cors()` globally).

## Troubleshooting

- If API calls fail, confirm the backend URL and CORS settings.
- If hot reload doesn't work, restart Vite and clear the browser cache.

---
