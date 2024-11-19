from flask import Flask , request, jsonify
from extractJd import extractJd , filter_jd , fetch_user_details_by_id
from gemini import get_gemini_response
app = Flask(__name__)


@app.route('/')
def home():
    return "Hello, World!"


@app.route('/getemail',methods=['POST'])
def getemail():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": " no data provided"}),400
    else:
        job_url = data.get('job_url')
        user_url = data.get('user_url')
        user_id = data.get('user_id')
        
        jd = extractJd(job_url)
        filtered_jd = filter_jd(jd)
        user_details = fetch_user_details_by_id(user_url,user_id)
        
        prompt = f"""
        you will be given a job description and a user details which contains name , skills ,  education , achievements in the given format
        {{
    "skills": <skills which the candidate has>,
    "education": [
        {
            "degree": <degree_name>,
            "institution": <institution name>,
            "year_of_passing": <passing year>,
            "_id": <id>
        }
    ],
    "experience": <experience if the user has , otherwise it can be blank>,
    "extra_achievement": <experiextra achievementence if the user has , otherwise it can be blank>
}}
        your task is to compose a short and brief email based on the job description and the user details to the particular company.
        only return the email content
        here is the job description {filtered_jd}
        here is the user details {user_details}
        """
        
        response = get_gemini_response(prompt)
        return jsonify({"response": response }), 200
        
if __name__ == '__main__':
    app.run(debug=True)
