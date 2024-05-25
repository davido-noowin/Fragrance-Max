from dataset import DATASET
from fastapi import APIRouter
from fastapi.responses import JSONResponse


router = APIRouter()


@router.get("/api/recommend_fragrances")
def recommendFragrances():
    pass