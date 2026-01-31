from fastapi import FastAPI
from contextlib import asynccontextmanager
from sqlmodel import SQLModel, create_engine
import os

# Database Setup (SQLite for local dev, Postgres for prod)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./local.db")
engine = create_engine(DATABASE_URL)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    create_db_and_tables()
    print("Database Initialized")
    yield
    # Shutdown
    print("Shutting down...")

app = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"message": "BugunNeOldu? Backend API is running."}

@app.get("/health")
def health_check():
    return {"status": "ok"}
