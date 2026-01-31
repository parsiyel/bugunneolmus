from abc import ABC, abstractmethod
from typing import List, Dict, Any

class BaseScraper(ABC):
    def __init__(self, source_name: str):
        self.source_name = source_name

    @abstractmethod
    async def fetch(self) -> List[Dict[str, Any]]:
        """
        Fetches data from the source.
        Returns a list of raw data dictionaries.
        """
        pass

    @abstractmethod
    async def parse(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Parses raw data into a standardized format.
        """
        pass

    async def run(self):
        print(f"[{self.source_name}] Scraping started...")
        try:
            raw = await self.fetch()
            parsed = await self.parse(raw)
            print(f"[{self.source_name}] Found {len(parsed)} items.")
            return parsed
        except Exception as e:
            print(f"[{self.source_name}] Error: {str(e)}")
            return []
