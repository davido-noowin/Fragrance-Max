# Script that uses the Gemini API to provide suggestions from 
# our recommendations and summarize the fragrancess

import google.generativeai as genai
import pandas as pd

QUERY_STRING = "Given this collection of fragrances pick out 7 for me with the following properties: "

def geminiSummary(recommendations:pd.DataFrame, gender:str, season:str, occasion:str, ai_model: genai.GenerativeModel) -> dict:
    '''
    Looks at the recommendation results and bundles it with a summary, brand, and fragrance
    '''
    # print(f"Generating summary for the following recommendations: {recommendations}")
    follow_up_query = f"The person is a {gender}, but unisex could also apply. They are looking for a fragrance \
                      for the {season} for a {occasion} occasion. Additionally, give me a 1-3 sentence summary \
                      bundled together of the notes, the longevity, the sillage, the season, and occasion from \
                      the recommendations in the style of a descriptive writer. \
                      Can you also give me the response in JSON format with the brand, fragrance, and description? \
                      Make sure that your response is in the format ```json [{'brand: ..., fragrance: ..., description:...'}]```"
    model_query = QUERY_STRING + follow_up_query + recommendations.to_string()
    
    if not ai_model:
        return [
            {
              "brand" : "Error",
              "fragrance" : "Not Found",
              "description" : "Failed to load Gemini model"
            }
        ]

    response = ai_model.generate_content(model_query)
    try:
        answer = response.text.split("```")[1].split("json")[1]
        # print(eval(answer))
        return eval(answer)
    except Exception as e:
        # print(f"ERROR: {e}")
        # print()
        # print(response.text)
        try:
            answer = eval(response.text)['recommendations']
            return answer
        except Exception as e:
            print(f"ERROR: {e}")
            return eval("[" + response.text + "]")