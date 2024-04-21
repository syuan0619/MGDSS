from fastapi import APIRouter
from fastapi.responses import JSONResponse, Response
from pydantic import ValidationError
from mongoDB import getAllPatients, addNewPatient, all_patients_to_csv
import models
import io

router = APIRouter(prefix="/patients", tags=["patients"])

# GET /patients/ -> return all patients
@router.get("/", tags=["patients"])
async def get_all_patients():
    return getAllPatients()

# POST /patients/ -> add new patient
@router.post("/", tags=["patients"])
async def add_new_patient(newPatientInfo: models.Info):
    try:
        newPatient = addNewPatient(newPatientInfo.model_dump(by_alias=True))
        return {"message": "Success add new patient", "newPatient": newPatient}
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid patient info"})
    
@router.get("/csv", tags=["patients"], description="下載之後還要右鍵->編輯->另存新檔->編碼選帶有BOM的UTF-8 再用excel開啟才不會亂碼")
async def get_all_patients_to_csv():
    records_df = all_patients_to_csv()
    records_csv = records_df.to_csv(index=False, encoding='utf-8-sig').encode('utf-8-sig')
    file_stream = io.BytesIO(records_csv)
    headers = {
        "Content-Disposition": "attachment; filename=patients.csv",
        "Content-Type": "text/csv; charset=utf-8-sig",
    }
    
    return Response(file_stream.getvalue(), headers=headers)