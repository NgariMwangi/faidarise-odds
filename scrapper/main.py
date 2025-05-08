import asyncio
import json
import random
import time
from pathlib import Path
from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeoutError

# List of sports and their URLs
SPORT_URLS = {
    "soccer": "https://www.betika.com/en-ke/s/soccer",
    "table-tennis": "https://www.betika.com/en-ke/s/table-tennis",
    "cricket": "https://www.betika.com/en-ke/s/cricket",
    "baseball": "https://www.betika.com/en-ke/s/baseball",
    "ice-hockey": "https://www.betika.com/en-ke/s/ice-hockey"
}

OUTPUT_FILE = "output.json"
MAX_RETRIES = 3


async def scrape_sport_events(page, url, sport_type):
    """Scrape match data for a given sport type."""
    await page.goto(url, timeout=90000)
    await page.wait_for_selector(".prebet-match", timeout=20000)
    matches = await page.query_selector_all(".prebet-match")

    sport_data = []

    for match in matches[:5]:  # Limit to 5 matches per sport
        try:
            home_team_el = await match.query_selector(".prebet-match__teams span:nth-child(1)")
            away_team_el = await match.query_selector(".prebet-match__teams span:nth-child(2)")

            home_team = await home_team_el.inner_text() if home_team_el else "N/A"
            away_team = await away_team_el.inner_text() if away_team_el else "N/A"

            odd_elements = await match.query_selector_all(".prebet-match__odd__odd-value.bold")
            odds = [await el.inner_text() for el in odd_elements]

            sport_data.append({
                "sport_type": sport_type,
                "home_team": home_team,
                "away_team": away_team,
                "odds": odds
            })

        except Exception as e:
            print(f"⚠️ Error parsing match in {sport_type}: {e}")

    return sport_data


async def run_scraper():
    """Main function to run the scraper with retry logic."""
    retries = 0
    all_data = []

    while retries < MAX_RETRIES:
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                page = await browser.new_page()

                for sport, url in SPORT_URLS.items():
                    print(f"🔍 Scraping {sport}...")
                    data = await scrape_sport_events(page, url, sport)
                    all_data.extend(data)
                    await asyncio.sleep(random.uniform(1, 2))  # Delay between sports

                await browser.close()
                if all_data:
                    break

        except PlaywrightTimeoutError:
            print(f"⏳ Timeout occurred. Retrying ({retries+1}/{MAX_RETRIES})...")
        except Exception as e:
            print(f"❌ Error during scraping: {e}")
        finally:
            retries += 1
            await asyncio.sleep(random.uniform(1, 3))

    # Save output
    if all_data:
        Path(OUTPUT_FILE).write_text(json.dumps(all_data, indent=2), encoding="utf-8")
        print(f"\n✅ Data saved to {OUTPUT_FILE}")
    else:
        print("❌ Failed to scrape any data after retries.")


if __name__ == "__main__":
    asyncio.run(run_scraper())
