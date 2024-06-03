from fastapi import FastAPI
from dataset import DATASET
from sklearn.feature_extraction.text import CountVectorizer
import google.generativeai as genai
import pickle


def custom_tokenizer(text:str):
    '''
    Defines the custome tokenizer used for the bag of words to convert 
    entries in the notes column from strings separated by commas to a tokenized array.
    '''
    return text.split(',')


class FragranceAPI(FastAPI):
    '''
    Inherits from the FastAPI class and loads in auxillary data info
    '''
    def __init__(self):
        super().__init__() # loading in all default FastAPI inits

        # Custom dataset inits
        self.dataset = DATASET
        with open("../database/kmeans_model.pkl", "rb") as f:
            self.model = pickle.load(f)

        self.vectorizer = CountVectorizer(tokenizer=custom_tokenizer)

        self.ai_model = genai.GenerativeModel()
