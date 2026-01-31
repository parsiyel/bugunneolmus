import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.scrapers.rss import RSSScraper
from app.scrapers.telegram import TelegramScraper

# Define Sources
RSS_SOURCES = [
    {"name": "BBC Turkce", "url": "http://feeds.bbci.co.uk/turkce/rss.xml"},
    {"name": "Google Trends TR", "url": "https://trends.google.com/trends/trendingsearches/daily/rss?geo=TR"},
]

TELEGRAM_CHANNELS = [
    "pusholder",
    "darkwebhaber"
]

async def job_rss_scraping():
    print("--- Starting RSS Job ---")
    for src in RSS_SOURCES:
        scraper = RSSScraper(src["name"], src["url"])
        data = await scraper.run()
        # TODO: Save data to DB
        print(f"Saved {len(data)} items from {src['name']}")

async def job_telegram_scraping():
    print("--- Starting Telegram Job ---")
    for channel in TELEGRAM_CHANNELS:
        scraper = TelegramScraper(f"tg_{channel}", channel)
        try:
           data = await scraper.run()
           # TODO: Save to DB
           print(f"Saved {len(data)} items from {channel}")
        except Exception as e:
           print(f"Telegram Error ({channel}): {e}")

def start_scheduler():
    scheduler = AsyncIOScheduler()
    # Run rss every 15 minutes
    scheduler.add_job(job_rss_scraping, 'interval', minutes=15)
    # Run telegram every 5 minutes (if creds exist)
    scheduler.add_job(job_telegram_scraping, 'interval', minutes=5)
    
    scheduler.start()
    print("Scheduler started...")
