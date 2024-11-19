import requests
from bs4 import BeautifulSoup
import json
from gemini import get_gemini_response

def extractJd(url):
    
    response = requests.get(url)

        # Check for a successful response
    if response.status_code == 200:
            # Parse the page content with BeautifulSoup
        soup = BeautifulSoup(response.content, "html.parser")
            
            # Locate the <main> tag
        main_content = soup.find("main")
            
            # Extract and print all text under the <main> tag
        if main_content:
            main_text = main_content.get_text(strip=True, separator="\n")  # Include line breaks for better readability
            print("Content has been extracted .......")
            return main_text
            
        else:
                print("<main> tag not found. Ensure the URL structure contains a <main> tag.")
    else:
        print(f"Failed to fetch the webpage. Status code: {response.status_code}")
        
        
def filter_jd(jd):
    filter_jd_prompt = f"""

act like a job description extractor who can extract the job description from a raw text. which includes many
irrelevant text.
You are given a job description which is extracted from a website so it's raw and it has some irrelavant data
your task is to carefully analyse it and return the job description which should include the skills which are present 
in the job description as well , only remove the title part and etc etc which is not relevant for job description

here is the given raw job description {jd}
return a string which is the filtered job description

"""
    filter_jd = get_gemini_response(filter_jd_prompt)
    return filter_jd


def fetch_user_details_by_id(details_url, user_id):
    try:
        # Fetch user details using the user ID
        user_details_response = requests.get(f"{details_url}/{user_id}")
        user_details_response.raise_for_status()
        
        user_data = user_details_response.json()
        
        # Filter only the relevant fields
        user_filtered = {
            "skills": user_data.get("user", {}).get("skills", []),
            "education": user_data.get("user", {}).get("education", []),
            "experience": user_data.get("user", {}).get("experience", []),
            "extra_achievement": user_data.get("user", {}).get("extra_achievement", [])
        }
        
        # Convert the filtered data to a formatted string (JSON-like)
        user_filtered_str = json.dumps(user_filtered, indent=4)
        
        return user_filtered_str

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None


