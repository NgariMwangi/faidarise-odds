# FaidaRise Sports Odds Dashboard

A complete solution for scraping, serving, and displaying sports betting odds from Kenyan bookmakers.

## Table of Contents
- [Setup Instructions](#setup-instructions)
- [Technology Choices](#technology-choices)
- [Challenges & Solutions](#challenges--solutions)
- [Future Improvements](#future-improvements)

## Setup Instructions

### Prerequisites
- Node.js v18+
- Python 3.10+ (for scraper)
- Yarn or npm
- Cloudflare account (for tunneling)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/faidarise-odds.git
cd faidarise-odds

2. **Backend Setup**
```bash
cd backend
yarn install
cp .env.example .env
# Update environment variables
yarn dev