from fastapi import APIRouter
from fastapi.responses import JSONResponse, Response
from pydantic import ValidationError
from mongoDB import getAllPatients, addNewPatient, update_entire_patient, update_patient_info, delete_patient, all_patients_to_csv,get_patient_by_id
import models
import io

router = APIRouter(prefix="/patients", tags=["patients"])

# GET /patients/ -> return all patients
@router.get("/", tags=["patients"], summary="取得所有病患資料")
async def get_all_patients():
    return getAllPatients()

# POST /patients/ -> add new patient
@router.post("/", tags=["patients"], summary="新增病患")
async def add_new_patient(newPatientInfo: models.Info):
    try:
        newPatient = addNewPatient(newPatientInfo.model_dump(by_alias=True))
        return {"message": "Success add new patient", "newPatient": newPatient}
    except Exception as e:
        print("error: ", str(e))
        return Response(status_code=500, content={"message": str(e)})
    
# PUT /patients/{patient_id} -> set patient
@router.put("/{patient_id}", tags=["patients"], summary="更新病患資料（覆蓋）")
async def update_entire_patient(patient_id: str, updated_patient: models.Patient):
    try:
        update_entire_patient(patient_id, updated_patient.model_dump(by_alias=True))
        return {"message": "Success update patient!", "updatedPatient": updated_patient}
    except ValidationError as e:
        print("ValidationError: ", str(e))
        return Response(status_code=400, content={"message": str(e)})
    except Exception as e:
        print("error: ", str(e))
        return Response(status_code=500, content={"message": str(e)})

# PUT /patients/{patientId}/info -> update patient info
@router.put("/{patientId}/info", tags=["patients"], summary="更新病患info",description="request body: 更新後的info, return: {_id: _id, info:執行後的info}")
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

# DELETE /patients/{patient_id} -> delete patient by id
@router.delete("/{patient_id}", tags=["patients"], summary="刪除病患")
async def delete_patient_by_id(patient_id: str):
    try:
        await delete_patient(patient_id)
        return {"message": f"Success delete patient {patient_id}"}
    except Exception as e:
        if str(e) == "Patient not found":
            return Response(status_code=404, content={ "message": "Patient not found"})
        else:
            return Response(status_code=500, content={"message": str(e)})


# GET /patients/csv -> download all patients as csv
@router.get("/csv", tags=["patients"], summary="匯出全部病患資料", description="下載之後還要右鍵->編輯->另存新檔->編碼選帶有BOM的UTF-8 再用excel開啟才不會亂碼")
async def get_all_patients_to_csv():
    records_df = all_patients_to_csv()
    records_csv = records_df.to_csv(index=False, encoding='utf-8-sig').encode('utf-8-sig')
    file_stream = io.BytesIO(records_csv)
    headers = {
        "Content-Disposition": "attachment; filename=patients.csv",
        "Content-Type": "text/csv; charset=utf-8-sig",
    }
    
    return Response(file_stream.getvalue(), headers=headers)