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
    url = None
    with open("mongoCluster.txt", 'r') as f:
        url = f.readline()
    
    if not url:
        return JSONResponse(status_code=500, 
                            content="Could not connect to the mongo cluster.")
    client = MongoClient(url, server_api=ServerApi('1'))

    try:
        db = client['Fragrances']
        query = db.Email.find({
            'email': username.email
            }, {"email" : 1, "_id" : 0})

        result_list = [doc for doc in query]

        # Return JSON response
        return JSONResponse(content=result_list)

    except Exception as e:
        # Catch ConnectionFailure exceptions
        message = f"Failed to connect to MongoDB: {e}"

    return JSONResponse(status_code=500, content=message)