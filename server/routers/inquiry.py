import json
import models
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from mongoDB.connectDB import updatePatient, updateEntirePatient, getPatientById
from OCR.ImgToWord import recognize

router = APIRouter(prefix="/inquiry", tags=["inquiry"])

@router.get("/{patientId}", summary="Get patient by id")
async def get_patient_by_id(patientId: str):
    try:
        patient = getPatientById(patientId)
        return patient
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(status_code=500, content={"message": "Internal server error"})
    
@router.post("/{patientId}/patient", summary="Update entire patient info", description="request body: patient")
async def inquiry_update_entire_patient(patientId: str, table: models.Patient):
    try:
        updatedPatient = updateEntirePatient(patientId, table.model_dump(by_alias=True))
        return {"message": "Success update patient info!", "updatedPatient": updatedPatient}
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid patient info"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(status_code=500, content={"message": "Internal server error"})

@router.post("/{patientId}/visit", description="request body: visit table", summary="Add new visit table")
async def inquiry_visit(patientId: str, table: models.Visit):
    try:
        updatedPatient = updatePatient(patientId, "visit", table.model_dump(by_alias=True))
        return {"message": "Success add new visit table!", "updatedPatient": updatedPatient}
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid visit table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(status_code=500, content={"message": "Internal server error"})

@router.post("/{patientId}/thymus")
async def inquiry_thymus(patientId: str, table: models.Thymus):
    try:
        updatedPatient = updatePatient(patientId, "thymus", table.model_dump(by_alias=True))
        return {"message": "Success add new thymus table!", "updatedPatient": updatedPatient}
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid thymus table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(status_code=500, content={"message": "Internal server error"})
    
@router.post("/{patientId}/bloodTest")
async def inquiry_bloodTest(patientId: str, table: models.BloodTest):
    try:
        updatedPatient = updatePatient(patientId, "bloodTest", table.model_dump(by_alias=True))
        return {"message": "Success add new bloodTest table!", "updatedPatient": updatedPatient}
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid bloodTest table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(status_code=500, content={"message": "Internal server error"})
    
@router.post("/{patientId}/QOL")
async def inquiry_QOL(patientId: str, table: models.QOL):
    try:
        updatedPatient = updatePatient(patientId, "QOL", table.model_dump(by_alias=True))
        return {"message": "Success add new QOL table!", "updatedPatient": updatedPatient}
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid QOL table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(status_code=500, content={"message": "Internal server error"})
    
@router.post("/{patientId}/QMG")
async def inquiry_QMG(patientId: str, table: models.QMG):
    try:
        updatedPatient = updatePatient(patientId, "QMG", table.model_dump(by_alias=True))
        return {"message": "Success add new QMG table!", "updatedPatient": updatedPatient}
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid QMG table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(status_code=500, content={"message": "Internal server error"})
    
@router.post("/{patientId}/MG")
async def inquiry_MG(patientId: str, table: models.MG):
    try:
        updatedPatient = updatePatient(patientId, "MG", table.model_dump(by_alias=True))
        return {"message": "Success add new MG table!", "updatedPatient": updatedPatient}
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid MG table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(status_code=500, content={"message": "Internal server error"})

@router.post("/{patientId}/ADL")
async def inquiry_ADL(patientId: str, table: models.ADL):
    try:
        updatedPatient = updatePatient(patientId, "ADL", table.model_dump(by_alias=True))
        return {"message": "Success add new ADL table!", "updatedPatient": updatedPatient}
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid ADL table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(status_code=500, content={"message": "Internal server error"})

@router.post("/{patientId}/EMG")
async def inquiry_EMG(patientId: str, table: models.EMG):
    try:
        updatedPatient = updatePatient(patientId, "EMG", table.model_dump(by_alias=True))
        return {"message": "Success add new EMG table!", "updatedPatient": updatedPatient}
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid EMG table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(status_code=500, content={"message": "Internal server error"})

@router.post("/recognize")
async def recognize_text(file: UploadFile=File(...)):
    output = recognize(file.file)
    response = []
    for result in output:
        response.append({
            "musclePart": result["target_phrase"],
            "preActivation": json.loads(result['result_data']),
            # "preActivation": [ json.loads(activation) for activation in result['result_data']]
            # "postActivation":
        })
        print("muscle part: ", result["target_words"])
    return response