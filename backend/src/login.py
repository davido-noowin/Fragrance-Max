from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

router = APIRouter()

@router.get("/api/login")
def login():
    url = "mongodb+srv://chienbinh456:Urgods_project123@cluster0.yvb700i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(url, server_api=ServerApi('1'))

    try:
        client.admin.command('ping')
        message = "Pinged your deployment. you successfully connected to MongoDB!"
    except Exception as e:
        message = e

    return JSONResponse(content=message)