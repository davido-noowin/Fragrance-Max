from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from llmProcessing import geminiSummary
from fragranceClustering import FragranceRecommendation

router = APIRouter()


class UserProfile(BaseModel):
    age_group: str
    gender: str
    intensity: str
    occasion: str
    scent_pref: str
    season: str


@router.post("/api/recommendations")
def getRecommendations(request: Request, user_profile: UserProfile):
    try:
        if user_profile.gender != "Male" or user_profile.gender != "Female":
            user_profile.gender = "Unisex"

        rec = FragranceRecommendation(request.app.dataset, 
                                      request.app.model,
                                      request.app.vectorizer)
        user_input = rec.create_user_profile(
            user_profile.scent_pref, 
            user_profile.intensity, 
            user_profile.gender.lower(), 
            user_profile.age_group, 
            user_profile.occasion, 
            user_profile.season,
        )
        try:
            user_cluster = request.app.model.predict(user_input)
        except Exception as e:
            print(f"error: {e}")
        recommended_fragrances = request.app.dataset[request.app.dataset['cluster'] == user_cluster[0]]
        recommended_fragrances_info = rec.filter_recommendations(recommended_fragrances, 
                                                                 user_profile.gender.lower(), 
                                                                 user_profile.season, 
                                                                 user_profile.occasion)
        try:
            summary = geminiSummary(recommended_fragrances_info.to_string(), 
                                    user_profile.gender, 
                                    user_profile.season, 
                                    user_profile.occasion,
                                    request.app.ai_model)
        except Exception as e:
            return JSONResponse(status_code=500, content=f"Failed to summarize the clustered fragrances: {e}")
        return JSONResponse(content=summary)
    except Exception as e:
        return JSONResponse(status_code=500, content=str(e))