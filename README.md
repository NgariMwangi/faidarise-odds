🏆 FaidaRise Sports Odds Dashboard
A real-time sports odds dashboard that scrapes data, serves it through an API, and presents it in a responsive frontend.

📌 Table of Contents
🚀 Setup Instructions

🛠 Technology Stack

⚠️ Challenges & Solutions

🔮 Roadmap

🎯 Key Features

🚀 Setup Instructions
Prerequisites
Node.js v18+

Python 3.10+

npm (comes with Node.js)

Cloudflare Tunnel (for demo sharing)

Installation
1. Backend Setup
bash
Copy
Edit
cd odds_Api
npm install
cp .env.example .env
npm run dev
2. Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
npm run dev
3. Scraper Execution
bash
Copy
Edit
cd ../scrapper
pip install -r requirements.txt
python sportybet_scraper.py
4. Cloudflare Tunnel (for demo sharing)
bash
Copy
Edit
# Backend tunnel
cd odds_Api
cloudflared tunnel --url http://localhost:3000
bash
Copy
Edit
# Frontend tunnel (run in new terminal)
cd ../frontend
cloudflared tunnel --url http://localhost:4321
🛠 Technology Stack
Component	Technology	Rationale
Scraper	Python + Playwright	Reliable JS rendering
Backend	Express + TypeScript	Type-safe API development
Frontend	Astro + React	Optimal performance
Styling	TailwindCSS	Rapid UI development
Deployment	Cloudflare	Secure public sharing

⚠️ Challenges & Solutions
🛡️ Anti-Scraping Measures
Implemented request throttling (1–3s delays)

Used rotating user agents

Added Playwright for full page rendering

🧠 Data Freshness
Created caching layer in Express

Implemented 60s polling in the frontend

📱 Mobile Experience
Used Material-UI responsive tables

Implemented column hiding on small screens

🔮 Roadmap
Near-Term
Add Betika & MozzartBet scrapers

Implement WebSocket updates

Enhance error tracking

Long-Term
Docker containerization

Automated cron jobs

Multi-bookmaker odds comparison

🎯 Key Features
Real-time odds display

Responsive mobile interface

Secure JWT authentication

Automated scraping pipeline

