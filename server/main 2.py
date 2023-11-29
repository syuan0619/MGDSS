from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from test1 import code_to_md
from cv22md import img_to_code

app = FastAPI()


@app.get("/")
async def root():
    content = {"message": "Hello World"}
    headers = {}
    return JSONResponse(content=content, headers=headers)

@app.post("/test")
async def test():
    return {"message": "test"}

@app.get("/files")
async def file():
    return {"message": "file"}

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    with open("./images/" + file.filename, 'wb') as image:
        image.write(file.file.read())
        image.close()
        
    output = code_to_md(img_to_code("./images/" + file.filename))
    print("output: ", output)
    return {"type": file.content_type, "filename": file.filename, "output": output}

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