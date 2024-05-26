# Script that handles the machine learning aspect of the backend

from dataset import DATASET
from sklearn.preprocessing import StandardScaler
from custom_tokenizer import custom_tokenizer
import numpy as np
import pandas as pd
import pickle


class FragranceRecommendation:
    def __init__(self):
        with open("../database/fragrance_vectorizer.pkl", "rb") as f:
            self.loaded_vectorizer = pickle.load(f)
            self.loaded_vectorizer.tokenizer = custom_tokenizer

        with open("../database/kmeans_model.pkl", "rb") as f:
            self.loaded_kmeans_model = pickle.load(f)

        with open("../database/bag_of_words.pkl", "rb") as f:
            loaded_bag_of_words = pickle.load(f)

        # Convert categorical features to numeric using one-hot encoding
        self.additional_features = pd.get_dummies(DATASET[['sillage', 'longevity', 'gender', 'Age Group', 'Season', 'Occasion']],
                                                   columns=['sillage', 'longevity', 'gender', 'Age Group', 'Season', 'Occasion'])
        self.features = pd.concat([pd.DataFrame(loaded_bag_of_words.toarray()), self.additional_features.reset_index(drop=True)], axis=1)
        self.features.columns = self.features.columns.astype(str)

        self.scaler = StandardScaler()
        self.scaled_features = self.scaler.fit_transform(self.features)

    def map_intensity(self, intensity: str):
        '''
        Maps the quiz responses under intensity to longevity and sillage.
        '''
        longevity_map = {
            "Light and subtle": "longevity_weak",
            "Moderate": "longevity_moderate",
            "Strong": "longevity_long lasting",
            "Very strong": "longevity_eternal"
        }
        
        sillage_map = {
            "Light and subtle": "sillage_intimate",
            "Moderate": "sillage_moderate",
            "Strong": "sillage_strong",
            "Very strong": "sillage_enormous"
        }

        return longevity_map.get(intensity, "Moderate"), sillage_map.get(intensity, "Moderate")

    def create_user_profile(self, scent_pref: str, intensity: str, gender: str, age_group: str, occasion: str, season: str):
        '''
        Loads in the user's answers into a profile that could be predicted by our model.
        '''
        user_notes = self.loaded_vectorizer.transform([scent_pref.lower()]).toarray()
        user_longevity, user_sillage = self.map_intensity(intensity)
        user_occasion = 'Occasion_' + occasion
        user_season = 'Season_' + season
        user_gender = 'gender_' + gender
        user_age_group = 'Age Group_' + age_group

        user_additional_features = pd.DataFrame(0, index=[0], columns=self.additional_features.columns)
        user_additional_features[user_longevity] = 1
        user_additional_features[user_sillage] = 1
        user_additional_features[user_gender] = 1
        user_additional_features[user_age_group] = 1
        user_additional_features[user_occasion] = 1
        user_additional_features[user_season] = 1    

        user_features = np.concatenate([user_notes, user_additional_features], axis=1)
        user_features = self.scaler.transform(user_features)
        return user_features

    def filter_recommendations(self, recommendation: pd.DataFrame, gender: str, season: str, occasion: str):
        recommendation = recommendation[
            (recommendation['gender'] == gender) | (recommendation['gender'] == 'unisex')
            & (recommendation['Age Group'] == occasion)
            & (recommendation['Season'] == season)
            & (recommendation['Occasion'] == occasion)
        ]

        # Select a random 25 recommendations
        recommended_fragrances_info = recommendation.sample(n=25)

        return recommended_fragrances_info