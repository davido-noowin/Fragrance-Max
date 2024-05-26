# Script that handles the machine learning aspect of the backend

from dataset import DATASET
from sklearn.preprocessing import StandardScaler
from llmProcessing import geminiSummary
import numpy as np
import pandas as pd
import pickle

ADDITIONAL_FEATURES = DATASET[['sillage', 'longevity', 'gender', 'Age Group', 'Season', 'Occasion']]
SELECTED_COLUMNS = ['brand', 'perfume', 'notes', 'longevity', 'sillage', 'gender', 'Age Group', 'Season', 'Occasion']


def custom_tokenizer(text:str):
    '''
    Defines the custome tokenizer used for the bag of words to convert 
    entries in the notes column from strings separated by commas to a tokenized array.
    '''
    return text.split(',')


def map_intensity(intensity:str):
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

with open("../database/bag_of_words.pkl", "rb") as f:
    loaded_bag_of_words = pickle.load(f)

# Convert categorical features to numeric using one-hot encoding
additional_features = pd.get_dummies(ADDITIONAL_FEATURES, columns=['sillage', 'longevity', 'gender', 'Age Group', 'Season', 'Occasion'])
features = pd.concat([pd.DataFrame(loaded_bag_of_words.toarray()), additional_features.reset_index(drop=True)], axis=1)
features.columns = features.columns.astype(str)

scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)


def create_user_profile(scent_pref:str, intensity:str, gender:str, age_group:str, occasion:str, season:str):
    '''
    Loads in the user's answers into a profile that could be predicted by our model.
    '''
    user_notes = loaded_vectorizer.transform([scent_pref.lower()]).toarray()
    user_longevity, user_sillage = map_intensity(intensity)
    user_occasion = 'Occasion_' + occasion
    user_season = 'Season_' + season
    user_gender = 'gender_' + gender
    user_age_group = 'Age Group_' + age_group


    user_additional_features = pd.DataFrame(0, index=[0], columns=additional_features.columns)
    user_additional_features[user_longevity] = 1
    user_additional_features[user_sillage] = 1
    user_additional_features[user_gender] = 1
    user_additional_features[user_age_group] = 1
    user_additional_features[user_occasion] = 1
    user_additional_features[user_season] = 1    

    user_features = np.concatenate([user_notes, user_additional_features], axis=1)
    
    user_features = scaler.transform(user_features)
    return user_features


def filterRecommendations(recommendation:pd.DataFrame, gender:str, season:str, occasion:str):
    recommendation = recommendation[
        (recommendation['gender'] == gender) | (recommendation['gender'] == 'unisex')
        & (recommendation['Age Group'] == occasion)
        & (recommendation['Season'] == season)
        & (recommendation['Occasion'] == occasion)
    ]

    # Select a random 25 recommendations
    recommended_fragrances_info = recommendation[SELECTED_COLUMNS].sample(n=25)

    return recommended_fragrances_info



if __name__ == "__main__":
    user_input = create_user_profile("Fresh", "Moderate", "male", "20-30", "Casual", "Summer")
    # Predict the cluster for the user
    user_cluster = loaded_kmeans_model.predict(user_input)

    # Recommend fragrances from the same cluster
    recommended_fragrances = DATASET[DATASET['cluster'] == user_cluster[0]]

    recommended_fragrances_info = filterRecommendations(recommended_fragrances, "male", "Summer", "Casual")

    # with open('a.out', 'w') as f:
    #    f.write(recommended_fragrances_info.to_string())
    summary = geminiSummary(recommended_fragrances_info.to_string(), "male", "summer", "casual")
    print(type(summary))
    print(summary)