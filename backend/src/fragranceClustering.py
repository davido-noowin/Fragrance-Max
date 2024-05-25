# Script that handles the machine learning aspect of the backend

from dataset import DATASET, ADDITIONAL_FEATURES, features
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans # pip install scikit-learn
import numpy as np
import pandas as pd
import pickle


def custom_tokenizer(text):
    '''
    Defines the custome tokenizer used for the bag of words to convert 
    entries in the notes column from strings separated by commas to a tokenized array.
    '''
    return text.split(',')


def map_intensity(intensity):
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


with open("../database/fragrance_vectorizer.pkl", "rb") as f:
    loaded_vectorizer = pickle.load(f)
    loaded_vectorizer.tokenizer = custom_tokenizer


with open("../database/kmeans_model.pkl", "rb") as f:
    loaded_kmeans_model = pickle.load(f)


scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)


def create_user_profile(scent_pref, intensity, gender, age_group, occasion, season):
    '''
    Loads in the user's answers into a profile that could be predicted by our model.
    '''
    user_notes = loaded_vectorizer.transform([scent_pref]).toarray()
    user_longevity, user_sillage = map_intensity(intensity)
    user_occasion = 'Occasion_' + occasion
    user_season = 'Season_' + season
    user_gender = 'gender_' + gender
    user_age_group = 'Age Group_' + age_group

    user_additional_features = pd.DataFrame(0, index=[0], columns=ADDITIONAL_FEATURES.columns)
    user_additional_features[user_longevity] = 1
    user_additional_features[user_sillage] = 1
    user_additional_features[user_gender] = 1
    user_additional_features[user_age_group] = 1
    user_additional_features[user_occasion] = 1
    user_additional_features[user_season] = 1
    

    user_features = np.concatenate([user_notes, user_additional_features], axis=1)
    
    user_features = scaler.transform(user_features)
    return user_features


if __name__ == "__main__":
    user_input = create_user_profile("Floral", "Strong", "female", "20-30", "Casual", "Fall")
    # Predict the cluster for the user
    user_cluster = loaded_kmeans_model.predict(user_input)

    # Recommend fragrances from the same cluster
    recommended_fragrances = DATASET[DATASET['cluster'] == user_cluster[0]]

    recommended_fragrances = recommended_fragrances[
        (recommended_fragrances['gender'] == 'female') | (recommended_fragrances['gender'] == 'unisex')
        & (recommended_fragrances['Season'] == 'Fall')
        & (recommended_fragrances['Occasion'] == 'Casual')
    ]

    selected_columns = ['brand', 'perfume', 'notes', 'gender', 'Season', 'Occasion']

    recommended_fragrances_info = recommended_fragrances[selected_columns]

    print(recommended_fragrances_info)