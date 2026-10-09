# FootFit AI Analyzer

Create a new production-ready FootFit-AI frontend for our Science Expo project.

EXISTING WEBSITE TO USE ONLY AS A VISUAL/UX REFERENCE:
https://shoeadvisor.netlify.app/

Do NOT copy its source code. Recreate and improve the interface while keeping a similar overall visual language, layout quality, navigation style, cards, spacing, typography, and professional healthcare/AI appearance.

IMPORTANT BACKEND:
Our real AI backend is already deployed and MUST be used. Do not create fake predictions, mock data, placeholder AI results, or a new machine-learning model.

Backend URL:
https://footfit-ai-backend.onrender.com

Prediction endpoint:
POST https://footfit-ai-backend.onrender.com/predict

The endpoint accepts an image as multipart/form-data using the field name:
file

The backend performs the complete real pipeline:
1. Uploaded foot image
2. OpenCV image processing
3. Foot contour extraction
4. Extraction of 7 features
5. Existing Orange3-trained models
6. Random Forest
7. Decision Tree
8. kNN
9. SVM
10. Logistic Regression
11. Hybrid ensemble decision
12. Final foot-type prediction and confidence

DO NOT reproduce this machine-learning logic in the frontend. The frontend only uploads the image and displays the response received from the backend.

FRONTEND FLOW:

1. HOME / LANDING PAGE
Create a polished FootFit-AI landing page explaining that the system uses computer vision and machine learning to analyze foot images.

Use a professional Science Expo / AI healthcare aesthetic.

Include:
- FootFit-AI branding
- Short explanation
- "Analyze Your Foot" primary button
- Clean AI/medical visual design
- Responsive desktop layout

2. FOOT IMAGE ANALYSIS PAGE

Create a prominent image upload area.

Allow the user to:
- Select an image from the computer
- Preview the selected image
- Replace the image
- Remove the image
- Click "Analyze Foot"

Only allow image files.

Before sending the request, validate that an image has been selected.

3. REAL BACKEND CONNECTION

When the user clicks "Analyze Foot":

Send the selected image to:

https://footfit-ai-backend.onrender.com/predict

using:

POST
Content-Type: multipart/form-data

Form field:
file = selected image

Do NOT send JSON instead of multipart/form-data.

Show a loading state while waiting for the backend.

For example:
"Analyzing your foot..."
"Extracting features..."
"Running AI models..."

Do not fake progress percentages.

4. HANDLE THE REAL API RESPONSE

The backend returns a structure containing:

success
filename
features
predictions
decision

The important final result is:

decision.final_prediction

and:

decision.confidence

Display the final result prominently.

Possible final predictions:
- Flat
- Normal
- HighArch

Display them with user-friendly names:

Flat → Flat Foot
Normal → Normal Foot
HighArch → High Arch

Display confidence values such as:
- Very High
- High
- Moderate
- Low

5. RESULT PAGE

Create a polished result card showing:

"Your Foot Type"

[Flat Foot / Normal Foot / High Arch]

"AI Confidence"

[Very High / High / Moderate / Low]

Also show the uploaded foot image.

Include a short, simple explanation appropriate for a Science Expo demonstration.

IMPORTANT:
Do NOT make medical claims or diagnose diseases.

Use wording such as:
"This result is an AI-based foot-type classification and is intended for educational and demonstration purposes."

6. EXPO-FRIENDLY MODEL INFORMATION

Add an expandable or secondary section called:

"How FootFit-AI Works"

Explain visually:

Foot Image
↓
Image Processing
↓
Foot Contour Detection
↓
7 Geometric Features
↓
5 AI Models
↓
Hybrid Ensemble
↓
Final Classification

The seven features are:

- Contour Area
- Perimeter
- Bounding Rectangle Width
- Bounding Rectangle Height
- Solidity
- Extent
- Aspect Ratio

The five existing models are:

- Random Forest
- Decision Tree
- kNN
- SVM
- Logistic Regression

Explain that the final result is selected using a hybrid voting strategy.

DO NOT expose unnecessary raw technical data on the main result screen.

7. OPTIONAL TECHNICAL DETAILS

Provide an expandable "Technical Details" section for the Science Expo.

If the backend response contains them, display:

- 7 extracted feature values
- Individual model predictions
- Stage 1 vote counts
- Stage 2 vote counts
- Final decision stage
- Final confidence
- Decision explanation

This section should be secondary and should not overwhelm normal users.

8. ERROR HANDLING

If the backend cannot process the image, show a clear message such as:

"We couldn't analyze this image. Please try another clear foot image."

Handle:
- No image selected
- Invalid file
- Network error
- Backend error
- No foot contour detected
- Unexpected API response

Never display raw technical error messages to normal users unless placed inside a developer/technical details section.

9. BACKEND URL CONFIGURATION

Do not hard-code the backend URL throughout multiple components.

Create a single configuration/API constant such as:

API_BASE_URL = "https://footfit-ai-backend.onrender.com"

Then use:

${API_BASE_URL}/predict

This will make future backend changes easy.

10. CORS / BROWSER REQUEST

The frontend will make a browser request to the Render backend.

Ensure the implementation uses normal fetch/API calls and does not attempt to bypass CORS.

11. DESIGN REQUIREMENTS

Make the new interface:
- Modern
- Professional
- Clean
- Science-exhibition appropriate
- AI/healthcare themed
- Responsive
- Easy to demonstrate on a laptop
- Large readable result
- Smooth transitions
- No unnecessary clutter
- No fake statistics
- No fake model accuracy claims
- No fake patient information

Keep the interface visually impressive but realistic rather than looking obviously AI-generated.

12. IMPORTANT PROJECT RULES

DO NOT:
- Retrain models
- Replace models
- Create new ML models
- Create mock prediction logic
- Hard-code predictions
- Modify the backend
- Modify the existing .pkcls models
- Calculate a different prediction in JavaScript
- Invent model accuracy
- Invent medical diagnoses

The Render backend is the source of truth for predictions.

The final website should be a frontend client for the existing FootFit-AI FastAPI backend.

After implementing everything, make sure the Analyze Foot button actually sends a real image to:

https://footfit-ai-backend.onrender.com/predict

and displays the real response.

Use the existing website at https://shoeadvisor.netlify.app/ only as a visual reference, while creating a clean new implementation.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://fitfoot-ai.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/81234658-8a28-4c0b-9f30-9d7abbb503b7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
