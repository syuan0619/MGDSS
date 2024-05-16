from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse, Response
from pydantic import ValidationError
from datetime import datetime
from mongoDB import (
    get_all_patients,
    addNewPatient,
    update_entire_patient,
    update_patient_info,
    delete_patient,
    all_patients_to_csv,
    get_waiting_list,
    add_to_waiting_list,
)
from typing import Optional
import models
import io


router = APIRouter(prefix="/patients", tags=["patients"])


# GET /patients/ -> return all patients
@router.get("/{:date}", tags=["patients"], summary="取得所有病患資料")
async def get_patients(date: str | None = None):
    try:
        if date:
            date = datetime.strptime(date, "%Y-%m-%d")
            patients = get_all_patients(date)
        else:
            patients = get_all_patients()
        return patients
    except Exception as e:
        print("error: ", str(e))
        return Response(status_code=500, content={"message": str(e)})


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
@router.put(
    "/{patientId}/info",
    tags=["patients"],
    summary="更新病患info",
    description="request body: 更新後的info, return: {_id: _id, info:執行後的info}",
)
async def update_info(patientId: str, updatedPatientInfo: models.Info):
    try:
        updatedPatient = update_patient_info(
            patientId, updatedPatientInfo.model_dump(by_alias=True)
        )
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
            return Response(status_code=404, content={"message": "Patient not found"})
        else:
            return Response(status_code=500, content={"message": str(e)})


# GET /patients/waitinglist/{date} -> get waiting list by date
@router.get("/waitinglist/{date}", tags=["patients"], summary="取得指定日期的候診名單")
async def get_waiting_list_by_date(date: str):
    try:
        date = datetime.strptime(date, "%Y-%m-%d")
        response = get_waiting_list(date)
        response["date"] = response["date"].strftime("%Y-%m-%d")
        return response
    except Exception as e:
        print("Exception: ", str(e))
        return Response(status_code=500, content={"Exception": str(e)})


# PUT /patients/waitinglist/{date} -> add patient to waiting list
@router.put(
    "/waitinglist/{date}",
    tags=["patients"],
    summary="新增病患到指定日期候診名單，若已存在則更新",
    description="isChecked: 0:候診, 1:已看診",
)
async def put_patients_waitinglist_date(date: str, waiting: models.Waiting):
    try:
        response = add_to_waiting_list(date, waiting.model_dump())
        return {"message": response}
    except HTTPException as e:
        raise e
    except Exception as e:
        print("Exception: ", str(e))
        return JSONResponse(status_code=500, content={"Exception": str(e)})


# GET /patients/csv -> download all patients as csv
@router.get(
    "/csv",
    tags=["patients"],
    summary="匯出全部病患資料",
    description="下載之後還要右鍵->編輯->另存新檔->編碼選帶有BOM的UTF-8 再用excel開啟才不會亂碼",
)
async def get_all_patients_to_csv():
    records_df = all_patients_to_csv()
    records_csv = records_df.to_csv(index=False, encoding="utf-8-sig").encode(
        "utf-8-sig"
    )
    file_stream = io.BytesIO(records_csv)
    headers = {
        "Content-Disposition": "attachment; filename=patients.csv",
        "Content-Type": "text/csv; charset=utf-8-sig",
    }

    return Response(file_stream.getvalue(), headers=headers)
