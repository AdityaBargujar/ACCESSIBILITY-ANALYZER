ACCESSIBILITY ANALYZER (Lightweight) - Improved UI
-------------------------------------------------
This version uses axios + cheerio (no Playwright) for stability and speed, and includes a nicer UI.

Backend:
  cd backend
  npm install
  node server.js

Frontend:
  cd frontend
  npm install
  npm run dev
  open http://localhost:5173

Notes:
  - The frontend proxies /api requests to http://localhost:4000 via vite config.
  - If you want Playwright version later, I can generate it.
