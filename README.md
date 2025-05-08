# 🏆 FaidaRise Sports Odds Dashboard

A real-time sports odds dashboard that scrapes betting data, serves it via an API, and presents it in a responsive, user-friendly frontend.

---

## 📌 Table of Contents

- [🚀 Setup Instructions](#-setup-instructions)
- [🛠 Technology Stack](#-technology-stack)
- [⚠️ Challenges & Solutions](#-challenges--solutions)
- [🔮 Roadmap](#-roadmap)
- [🎯 Key Features](#-key-features)

---

## 🚀 Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Python](https://www.python.org/) 3.10+
- npm (comes with Node.js)
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/) (for demo sharing)

### Installation

#### 1. Backend Setup

```bash
cd odds_Api
npm install
cp .env.example .env
npm run dev
```
2. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
3. Scraper Execution
```bash

cd ../scrapper
pip install -r requirements.txt
python sportybet_scraper.py
```
4. Cloudflare Tunnel (for demo sharing)
```bash

# Backend tunnel
cd odds_Api
cloudflared tunnel --url http://localhost:3000
```
```bash

# Frontend tunnel (run in new terminal)
cd ../frontend
cloudflared tunnel --url http://localhost:4321
```
## 🛠 Technology Stack

| **Component** | **Technology**          | **Rationale**                     |
|---------------|--------------------------|-----------------------------------|
| Scraper       | Python + Playwright      | Reliable JS rendering             |
| Backend       | Express + TypeScript     | Type-safe API development         |
| Frontend      | Astro + React            | Optimal performance               |
| Styling       | TailwindCSS              | Rapid UI development              |
| Deployment    | Cloudflare               | Secure public sharing             |

---

## ⚠️ Challenges & Solutions

### 🛡️ Anti-Scraping Measures

- Implemented request throttling (1–3s delays)  
- Used rotating user agents  
- Added Playwright for full page rendering  

### 🧠 Data Freshness

- Created caching layer in Express  
- Implemented 60s polling in the frontend  

### 📱 Mobile Experience

- Used Material-UI responsive tables  
- Implemented column hiding on small screens  

---

## 🔮 Roadmap

### Near-Term Goals

- Add Betika & MozzartBet scrapers  
- Implement WebSocket updates  
- Enhance error tracking  

### Long-Term Goals

- Docker containerization  
- Automated cron jobs  
- Multi-bookmaker odds comparison  

---

## 🎯 Key Features

- Real-time odds display  
- Responsive mobile interface  
- Secure JWT authentication  
- Automated scraping pipeline  
