import google.generativeai as genai
from dotenv import load_dotenv
import os


load_dotenv()

genai.configure(api_key = os.getenv('api_key'))


def get_gemini_response(prompt):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text