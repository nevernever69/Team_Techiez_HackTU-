from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import json
import requests
from bs4 import BeautifulSoup
from fastapi.middleware.cors import CORSMiddleware  # Import CORS Middleware

# Configure Google Gemini API
genai.configure(api_key="AIzaSyBAPXkiIC79cvyoqX1BiGoUsd3EPgKyfW0")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Frontend can access backend)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Allow all headers
)
# Define request models
class CourseRequest(BaseModel):
    topic: str
    language: str = "English"

class SummarizeRequest(BaseModel):
    content: str

# 🟢 Web Scraping Function
def scrape_web(topic):
    """Scrapes Google search results for the topic and returns top documentation links."""
    search_url = f"https://www.google.com/search?q={topic}+documentation"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")
    links = [a["href"] for a in soup.find_all("a", href=True)]
    return links[:5]  # Return top 5 links

# 🟢 Extract Web Content
def extract_content(url):
    """Fetches and extracts readable content from a URL."""
    try:
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
        soup = BeautifulSoup(response.text, "html.parser")
        return soup.get_text()
    except Exception:
        return ""

# 🟢 Course Generation Endpoint
class CourseRequest(BaseModel):
    topic: str
    language: str = "English"
    experience: str = "Beginner"

@app.post("/generate-course")
async def generate_course(request: CourseRequest):
    """Generate a structured course using Google Gemini AI with experience level"""
    try:
        prompt = f"""
        Create a structured course on {request.topic} in {request.language}.

        Adapt the content based on the experience level: {request.experience}
        - **Beginner**: Explain concepts in a simple and easy-to-understand way. Use more examples and avoid complex jargon.
        - **Intermediate**: Use more technical explanations. Assume basic knowledge and provide deeper insights.
        - **Advanced**: Use expert-level explanations with in-depth technical details.

        The course should be in **valid JSON format**:
        {{
            "course_title": "{request.topic} Course",
            "language": "{request.language}",
            "experience": "{request.experience}",
            "modules": [
                {{
                    "title": "Module Title",
                    "description": "Module Description adapted to {request.experience} level",
                    "summary": "Simplified summary without bullet points",
                    "code_example": "Python/C code example without markdown formatting"
                }}
            ]
        }}
        """

        response = genai.GenerativeModel("gemini-pro").generate_content(prompt)

        print("🔍 Raw response from Gemini:")
        print(response.text)

        response_text = response.text.strip().replace("```json", "").replace("```", "")

        try:
            response_json = json.loads(response_text)  # Safe JSON parsing
            return response_json
        except json.JSONDecodeError as e:
            print("🚨 JSON Parsing Error:", str(e))
            raise HTTPException(status_code=500, detail="Invalid JSON response from Gemini API")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 🟢 Summarization Endpoint
@app.post("/summarize")
async def summarize(request: SummarizeRequest):
    """Summarize content using Gemini AI"""
    try:
        prompt = f"Summarize this content in an easy-to-understand way:\n\n{request.content}"
        response = genai.GenerativeModel("gemini-pro").generate_content(prompt)
        return {"summary": response.text.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

