from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pydantic import BaseModel


router = APIRouter()

class User(BaseModel):
    email: str

@router.post("/api/login")
def login(username: User):
    url = "mongodb+srv://chienbinh456:Urgods_project123@cluster0.yvb700i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(url, server_api=ServerApi('1'))
    result = None

    try:
        db = client['Fragrances']
        query = db.Email.find({
            'email': username
            }, {"email" : 1, "_id" : 0})

        result_list = [doc for doc in query]

        # Return JSON response
        return JSONResponse(content=result_list)

    except Exception as e:
        # Catch ConnectionFailure exceptions
        message = f"Failed to connect to MongoDB: {e}"

    return JSONResponse(content=message)