from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

router = APIRouter()


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
        # TODO: collection retrieval implementation
        pass
    except Exception as e:
        message = f"Failed to connect to MongoDB: {e}"

    return JSONResponse(status_code=500, content=message)