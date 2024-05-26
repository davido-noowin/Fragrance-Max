# pip install uvicorn
# pip install fastapi
# to run: python -m uvicorn main:app --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from root import router as home
from recommendation import router as recommendation
from login import router as login

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(home)
app.include_router(recommendation)
app.include_router(login)