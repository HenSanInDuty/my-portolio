"""
Workflow:
1. Generate a list of questions 
2. Create answers for given questions including label for the image and
    list of model name and image id
3. Load original image for questions
4. Load CAM image for questions
"""

from typing import Tuple
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import base64

MODELS = ["DenseNet201", "ConvNeXt_Large", "Inception_V3", "ResNet152", "MobileNet_V2", "EfficientNet_B7", "VGG19"]
TECHNIQUES = ['GradCAM', 'GradCAMPlusPlus', 'EigenCAM', 'AblationCAM', 'ScoreCAM']

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*']
)

@app.get("/generate-questions/{n_questions}")
async def generate_list_questions(n_questions: int):
    '''Create a list of questions

    Args:
        n_questions (int): Number of questions to be generated
    '''
    import random
    import os

    # Extract valid models
    valid_models = []
    for model in MODELS:
        if not all([os.path.isdir(f"./{model}/{tech}") for tech in TECHNIQUES]):
            continue
        valid_models.append(model)

    questions = []
    for model_id, model in enumerate(valid_models):
        # Make sure at least one question is required to be extracted
        if n_questions == 0:
            break

        # Extract valid questions
        model_questions = []
        for root, dirs, files in os.walk(f"./{model}/{TECHNIQUES[0]}"):
            for file in files:
                if file.endswith(".png"):
                    model_questions.append(file.split(".")[0])
        
        current_n_questions = n_questions // (len(valid_models) - model_id)
        n_questions -= current_n_questions

        sample_ids = random.sample(model_questions, current_n_questions)
        questions.extend([
            (model, sample_id) for sample_id in sample_ids
        ])

    return {"questions": questions}

@app.get("/question/{model_name}/{image_id}")
async def create_question(model_name: str, image_id: int):
    '''Create answers for given questions including model name and image id
    
    Args:
        model_name (str): Name of the model
        image_id (int): Id of the image
    '''
    import os
    import pandas as pd

    imgs_info = []
    for technique in TECHNIQUES:
        path = f"./{model_name}/{technique}/{image_id}.png"
        if not os.path.exists(path):
            return {"msg": f"Image {image_id} not found for model {model_name} and technique {technique}"}
        
        imgs_info.append({
            'model_name': model_name, 
            'technique': technique,
            'image_id': image_id,
        })

    label_mapping = pd.read_csv('./file_paths_with_labels.csv')
    label = label_mapping[label_mapping['id'] == image_id]['label_name'].values[0]


    return {"labe_name": label, "imgs_info": imgs_info}

@app.get("/cam/{model_name}/{technique}/{img_id}")
async def get_image(model_name: str, technique: str, img_id: str):
    '''Get CAM image for questions
    Args:
        model_name (str): Name of the model
        technique (str): Name of the technique
        img_id (str): Id of the image
    '''
    path = f"./{model_name}/{technique}/{img_id}.png"
    with open(path, 'rb') as f:
        base64image = base64.b64encode(f.read())
    return base64image

@app.get("/image/{img_id}")
async def get_image(img_id: str):
    '''Get orignal image for questions'''
    import pandas as pd

    mapping = pd.read_csv('./file_paths_with_labels.csv')
    img_name = mapping[mapping['id'] == int(img_id)]['path'].values[0]

    path = f"./CAM-data/{img_name}.JPEG"
    with open(path, 'rb') as f:
        base64image = base64.b64encode(f.read())
    return base64image
