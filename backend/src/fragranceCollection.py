from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pydantic import BaseModel

router = APIRouter()

class UserFragrancePackage(BaseModel):
    email: str
    name: str
    brand: str
    image: str


@router.get("/api/get-collection")
def getCollection(username: str):
    '''
    Returns the user's fragrance collection stored in mongoDB
    '''
    url = None
    with open("mongoCluster.txt", 'r') as f:
        url = f.readline()

    if not url:
        return JSONResponse(status_code=500, 
                            content="Could not connect to the mongo cluster.")
    client = MongoClient(url, server_api=ServerApi('1'))

    try:
        db = client['Fragrances']
        query = db.Collection.find({
            'email' : username
        }, {"_id" : 0, "collection" : 1})

        result = [doc for doc in query][0]
        print(result)

        return JSONResponse(content=result)
    except Exception as e:
        message = f"Failed to connect to MongoDB: {e}"

    return JSONResponse(status_code=500, content=message)


@router.post("/api/add-fragrance")
def addToCollection(user_fragrance_info: UserFragrancePackage):
    '''
    Allows the user to add a fragrance to their collection
    '''
    url = None
    with open("mongoCluster.txt", 'r') as f:
        url = f.readline()