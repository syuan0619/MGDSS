import models
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from mongoDB.connectDB import getAllPatients, addNewPatient, update_patient_info
from routers import inquiry, account, prediction

app = FastAPI()
# routers/inquiry.py
app.include_router(inquiry.router)
app.include_router(account.router)
app.include_router(prediction.router)

# GET /patients/ -> return all patients
@app.get("/patients", tags=["patients"])
async def get_all_patients():
    return getAllPatients()

# POST /patients/ -> add new patient
@app.post("/patients", tags=["patients"])
async def add_new_patient(newPatientInfo: models.Info):
    try:
        newPatient = addNewPatient(newPatientInfo.model_dump(by_alias=True))
        return {"message": "Success add new patient", "newPatient": newPatient}
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid patient info"})
    
@app.post("/updateinfo/{patientId}", tags=["patients"], description="request body: 更新後的info, return: {_id: _id, info:執行後的info}")
async def update_info(patientId: str, updatedPatientInfo: models.Info):
    try:
        updatedPatient = update_patient_info(patientId, updatedPatientInfo.model_dump(by_alias=True))
        return {
            "message": "Success update patient info!",
            "updatedPatient": updatedPatient,
        }
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(
            status_code=400, content={"message": "Invalid patient info"}
        )
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )


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
