import json
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from mongoDB.connectDB import ReadAllPatient
from OCR.ImgToWord import recognize

app = FastAPI()


@app.get("/")
async def root():
    content = {"message": "Hello World"}
    headers = {}
    return JSONResponse(content=content, headers=headers)


@app.get("/readAllPatient")
async def test():
    respodse = ReadAllPatient()
    return respodse


@app.post("/upload")
async def upload(file: UploadFile=File(...)):
    with open("./images/" + file.filename, 'wb') as image:
        image.write(file.file.read())
        image.close()
        
    output = recognize(recognize("./images/" + file.filename))
    print("output: ", output)
    return {"type": file.content_type, "filename": file.filename, "output": output}


@app.post("/recognize")
async def recognize_text(file: UploadFile=File(...)):
    # print("file: ", file)
    output = recognize(file.file)
    # print("output: ", output)
    response = []
    for result in output:
        # print("muscle part: ", result["target_phrase"])
        # print("result data: ", [ json.loads(activation) for activation in result['result_data']])
        response.append({
            "musclePart": result["target_phrase"],
            "preActivation": [ json.loads(activation) for activation in result['result_data']]
            # "postActivation":
        })

    return response



origins = [
    'http://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
