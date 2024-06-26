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
    remove_from_waiting_list,
)
import models
import io


router = APIRouter(prefix="/patients", tags=["patients"])


# GET /patients/ -> return all patients
@router.get("/{date}", tags=["patients"], summary="取得所有病患資料")
async def get_patients(date: str, doctor_id: str | None = None):
    try:
        date = datetime.strptime(date, "%Y-%m-%d")
        patients = get_all_patients(date, doctor_id)
        return patients
    except Exception as e:
        print("error: ", str(e))
        return Response(status_code=500, content={"message": str(e)})


# POST /patients/ -> add new patient
@router.post("", tags=["patients"], summary="新增病患")
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
    "/waitinglist/{date}/{patient_id}",
    tags=["patients"],
    summary="新增病患到指定日期候診名單，若已存在則更新",
    description="isChecked: 0:候診, 1:已看診",
)
async def put_patients_waitinglist_date(
    date: str, patient_id: str, waiting: models.Waiting
):
    try:
        response = add_to_waiting_list(
            date, patient_id, waiting.model_dump(exclude_none=True)
        )
        return {"message": response}
    except HTTPException as e:
        raise e
    except Exception as e:
        print("Exception: ", str(e))
        return JSONResponse(status_code=500, content={"Exception": str(e)})


# DELETE /patients/waitinglist/{date}/{patient_id} -> remove patient from waiting list
@router.delete(
    "/waitinglist/{date}/{patient_id}",
    tags=["patients"],
    summary="刪除候診名單中的病患(取消候診)",
)
async def delete_patient_waitinglist_date(date: str, patient_id: str):
    try:
        date = datetime.strptime(date, "%Y-%m-%d")
        response = remove_from_waiting_list(date, patient_id)
        return {"message": response}
    except HTTPException as e:
        raise e
    except Exception as e:
        print("Exception: ", str(e))
        return JSONResponse(status_code=500, content={"Exception": str(e)})
