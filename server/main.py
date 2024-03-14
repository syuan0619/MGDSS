import json
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from models.patient import Info, Visit, Thymus, BloodTest
from mongoDB.connectDB import getAllPatients, addNewPatient, updatePatient
from OCR.ImgToWord import recognize
from routers import inquiry

app = FastAPI()
app.include_router(inquiry.router)

# GET /patients/ -> return all patients
@app.get("/patinets/", tags=["patients"])
async def get_all_patients():
    return getAllPatients()

# POST /patients/ -> add new patient
@app.post("/patients/", tags=["patients"])
async def add_new_patient(newPatientInfo: Info):
    try:
        newPatient = addNewPatient(newPatientInfo)
        return {"message": "Success add new patient", "newPatient": newPatient}
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid patient info"})

@app.get("/")
async def root():
    content = {"message": "Hello World"}
    headers = {}
    return JSONResponse(content=content, headers=headers)

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
