import pandas as pd # pip install pandas
import pickle

with open("../database/bag_of_words.pkl", "rb") as f:
    loaded_bag_of_words = pickle.load(f)

DATASET = pd.read_excel('../database/perfume_database_cluster.xlsx', 
                   usecols=['brand', 
                            'perfume', 
                            'notes', 
                            'longevity', 
                            'sillage', 
                            'gender', 
                            'Age Group', 
                            'Occasion', 
                            'Season',
                            'cluster'])

ADDITIONAL_FEATURES = DATASET[['sillage', 'longevity', 'gender', 'Age Group', 'Season', 'Occasion']]

# Convert categorical features to numeric using one-hot encoding
additional_features = pd.get_dummies(ADDITIONAL_FEATURES, columns=['sillage', 'longevity', 'gender', 'Age Group', 'Season', 'Occasion'])
features = pd.concat([pd.DataFrame(loaded_bag_of_words.toarray()), additional_features.reset_index(drop=True)], axis=1)
features.columns = features.columns.astype(str)