from dataset import DATASET
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from llmProcessing import geminiSummary
from fragranceClustering import FragranceRecommendation

router = APIRouter()


class UserProfile(BaseModel):
    scent_pref: str
    intensity: str
    gender: str
    age_group: str
    occasion: str
    season: str


@router.post("/api/recommendations")
def getRecommendations(user_profile: UserProfile):
    try:
        rec = FragranceRecommendation()
        user_input = rec.createUserProfile(
            user_profile.scent_pref, 
            user_profile.intensity, 
            user_profile.gender, 
            user_profile.age_group, 
            user_profile.occasion, 
            user_profile.season
        )
        user_cluster = rec.loaded_kmeans_model.predict(user_input)
        recommended_fragrances = DATASET[DATASET['cluster'] == user_cluster[0]]
        recommended_fragrances_info = rec.filter_recommendations(recommended_fragrances, user_profile.gender, user_profile.season, user_profile.occasion)

        summary = geminiSummary(recommended_fragrances_info.to_string(), user_profile.gender, user_profile.season, user_profile.occasion)
        return JSONResponse(content=summary)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))