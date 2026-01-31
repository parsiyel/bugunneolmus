from .base import BaseScraper
from telethon import TelegramClient
from telethon.tl.types import MessageMediaPhoto
import os
import asyncio

# These should be in .env
API_ID = os.getenv("TELEGRAM_API_ID")
API_HASH = os.getenv("TELEGRAM_API_HASH")
SESSION_Name = "bugunneoldu_bot"

class TelegramScraper(BaseScraper):
    def __init__(self, source_name: str, channel_username: str):
        super().__init__(source_name)
        self.channel_username = channel_username
        self.client = None

    async def fetch(self):
        if not API_ID or not API_HASH:
            print(f"[{self.source_name}] Missing Telegram Credentials. Skipping.")
            return []

        async with TelegramClient(SESSION_Name, int(API_ID), API_HASH) as client:
            # Fetch last 20 messages
            messages = await client.get_messages(self.channel_username, limit=20)
            return messages

    async def parse(self, raw_data):
        parsed_items = []
        for msg in raw_data:
            if not msg.message:
                continue

            # Determine media type for viral score
            has_media = False
            if msg.media and isinstance(msg.media, MessageMediaPhoto):
                has_media = True

            item = {
                "source": self.source_name,
                "title": msg.message[:50] + "..." if len(msg.message) > 50 else msg.message,
                "summary": msg.message, # Full text for AI analysis
                "link": f"https://t.me/{self.channel_username}/{msg.id}",
                "published_at": msg.date,
                "views": msg.views or 0,
                "has_media": has_media
            }
            parsed_items.append(item)
        return parsed_items
