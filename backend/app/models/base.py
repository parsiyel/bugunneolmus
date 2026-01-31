from typing import Optional, List
from datetime import datetime
from sqlmodel import Field, SQLModel, Relationship, JSON

class Source(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    url: str
    icon: Optional[str] = None
    type: str = Field(index=True) # rss, telegram, twitter, etc.
    active: bool = True

class Event(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    summary: str
    content: Optional[str] = Field(sa_type=JSON) # Full content or rich text
    date: datetime = Field(default_factory=datetime.utcnow)
    type: str = Field(default="default") # breaking, viral, history
    verification_status: str = Field(default="uncertain") # verified, claim, etc.
    category: str = Field(default="Gündem")
    image_url: Optional[str] = None
    original_url: Optional[str] = None
    
    # Metrics for Viral Score
    viral_score: int = Field(default=0)
    view_count: int = Field(default=0)
    source_count: int = Field(default=0)

    # Relationships can be added here if needed
    # sources: List["EventSource"] = Relationship(back_populates="event")

class EventSourceLink(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    event_id: int = Field(foreign_key="event.id")
    source_id: int = Field(foreign_key="source.id")
    url: str
