FaidaRise Sports Odds Dashboard - Submission Documentation
📌 Table of Contents
🚀 Setup Instructions

🛠 Technology Choices & Rationale

⚠️ Challenges Faced & Solutions

🔮 Future Improvements

🚀 Setup Instructions
Prerequisites
✅ Node.js v18+ (for frontend & backend)
✅ Python 3.10+ (for the scraper)
✅ Yarn (recommended) or npm
✅ Cloudflare Tunnel (for public sharing)

1️⃣ Backend (odds_Api) Setup
bash
cd odds_Api
yarn install
cp .env.example .env  # Configure your environment variables
yarn dev  # Starts the Express server at http://localhost:3000
2️⃣ Frontend Setup
bash
cd ../frontend
yarn install
yarn dev  # Starts Astro frontend at http://localhost:4321
3️⃣ Scraper Execution
bash
cd ../scrapper
pip install -r requirements.txt
python sportybet_scraper.py  # Outputs JSON to `scrapper/data/odds.json`
4️⃣ Running with Cloudflare Tunnel (Public Sharing)
bash
# Terminal 1: Backend
cd odds_Api
cloudflared tunnel --url http://localhost:3000

# Terminal 2: Frontend
cd ../frontend
cloudflared tunnel --url http://localhost:4321
📌 Note: Cloudflare will generate temporary URLs (e.g., https://your-subdomain.trycloudflare.com).

🛠 Technology Choices & Rationale
🔹 Scraper (Python + BeautifulSoup)
Choice	Why?
Python	Best ecosystem for web scraping
BeautifulSoup	Lightweight, fast HTML parsing
Playwright	Handles JavaScript-rendered content
Retry Logic	Prevents rate-limiting & bans
🔹 Backend (Express + TypeScript)
Choice	Why?
Express	Minimalist, fast API server
TypeScript	Type safety reduces runtime errors
JWT Auth	Simple yet secure API access
CORS	Safe frontend-backend communication
🔹 Frontend (Astro + React + TailwindCSS)
Choice	Why?
Astro	Blazing-fast static + dynamic rendering
React	Reusable components for odds display
TailwindCSS	Rapid UI development
Material-UI	Professional, responsive tables
⚠️ Challenges Faced & Solutions
1️⃣ Scraper Blocked by Bookmaker
❌ Problem: SportyBet detected and blocked automated requests.
✅ Solution:

Randomized request delays (time.sleep(random.uniform(1, 3)))

Rotating User-Agent headers

Playwright for JS-rendered content

2️⃣ API Authentication
❌ Problem: Needed secure but simple API access.
✅ Solution:

JWT tokens with 30-minute expiry

Protected routes with authMiddleware

3️⃣ Real-Time Data Sync
❌ Problem: Frontend needed fresh odds without manual refresh.
✅ Solution:

Frontend polling (every 60s)

Cached responses to reduce API calls

4️⃣ Mobile Responsiveness
❌ Problem: Odds tables looked bad on small screens.
✅ Solution:

Material-UI DataGrid with column hiding

TailwindCSS breakpoints for adaptive UI

🔮 Future Improvements
📌 Short-Term (Post-Interview)
✔ Multi-Bookmaker Support (Betika, MozzartBet)
✔ WebSockets for live odds updates
✔ Better Error Logging (Sentry/LogRocket)

📌 Long-Term (Production-Ready)
✔ Dockerize (Easy deployment)
✔ Automated Scraping (Cron jobs)
✔ Odds Comparison (Compare across bookmakers)
✔ User Accounts (Save favorite matches)

🎯 Final Notes
This project demonstrates:
✅ Full-stack development (Python + Node + React)
✅ Problem-solving (rate-limiting, UI challenges)
✅ Best practices (TypeScript, JWT, responsive design)

Ready for review! 🚀

