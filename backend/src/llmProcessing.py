# Script that uses the Gemini API to provide suggestions from 
# our recommendations and summarize the fragrancess

import google.generativeai as genai

QUERY_STRING = "Given this collection of fragrances pick out 10 for me with the following properties: "

def geminiSummary(recommendations:str, gender:str, season:str, occasion:str) -> dict:
  '''
  Looks at the recommendation results and bundles it with a summary, brand, and fragrance
  '''
  with open("gptkey.txt", "r") as api_key:
    api_key = api_key.read()

  genai.configure(api_key=api_key)

  follow_up_query = f"The person is a {gender}, but unisex could also apply. They are looking for a fragrance \
                    for the {season} for a {occasion} occasion. Additionally, give me a 1-3 sentence summary \
                    bundled together of the notes, the longevity, the sillage, the season, and occasion from \
                    the recommendations in the style of a descriptive writer. \
                    Can you also give me the response in JSON format with the brand, fragrance, and description?"
  model_query = QUERY_STRING + follow_up_query + recommendations
  
  model = genai.GenerativeModel()
  response = model.generate_content(model_query)

  answer = response.text.split("```")[1].split("json")[1]

  return eval(answer)