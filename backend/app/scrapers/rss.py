import feedparser
from .base import BaseScraper
from datetime import datetime
import time

class RSSScraper(BaseScraper):
    def __init__(self, source_name: str, feed_url: str):
        super().__init__(source_name)
        self.feed_url = feed_url

    async def fetch(self):
        # Feedparser is blocking, so in a real async app we might want to run this in an executor
        # For MVP, it's fine.
        feed = feedparser.parse(self.feed_url)
        return feed.entries

    async def parse(self, raw_data):
        parsed_items = []
        for entry in raw_data:
            # Basic normalization
            dt = datetime.now() # Fallback
            if hasattr(entry, 'published_parsed') and entry.published_parsed:
                 dt = datetime.fromtimestamp(time.mktime(entry.published_parsed))
            
            item = {
                "source": self.source_name,
                "title": entry.title,
                "link": entry.link,
                "summary": entry.get('summary', ''),
                "published_at": dt,
                "author": entry.get('author', 'Unknown')
            }
            parsed_items.append(item)
        return parsed_items
