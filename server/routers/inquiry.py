import json
import io
import datetime
from fastapi import APIRouter, Response, UploadFile, File, Header, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import ValidationError
from mongoDB.connectDB import (
    add_new_table,
    get_patient_by_id,
    getPatientByDate,
    get_table_by_date,
    update_patient_by_date,
    update_patient_info,
)
from OCR.functionalRecognize import functionalRecognize
from models import *


router = APIRouter(prefix="/inquiry", tags=["inquiry"])


# GET /inquiry/{patient_id} -> get patient by id
@router.get("/{patient_id}", summary="Get patient by id")
async def get_patient_with_patient_id(patient_id: str):
    try:
        patient = get_patient_by_id(patient_id)
        return patient
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )


# GET /inquiry/{patientId}/{date} -> get all table on date
@router.get(
    "/{patientId}/{date}",
    description="path parameter: patientId(病患的_id), date(日期'yyyy-mm-dd')",
    summary="回傳病患在特定日期有填的表格",
)
async def get_patient_date(patientId: str, date: datetime.date):
    try:
        tables = getPatientByDate(patientId, str(date))
        return {"message": f"Success get tables in {date}", "tables": tables}
    except Exception as e:
        print("error: ", str(e))
        if str(e) == "No visit record at this date":
            raise HTTPException(status_code=404, detail="No visit record at this date")
        return JSONResponse(status_code=500, content={"message": str(e)})


# GET /inquiry/{patient_id}/{table_name}/{date} -> get specific table on date
@router.get("/{patient_id}/{table_name}/{date}", summary="取得指定日期之單一table")
async def get_table_with_date(patient_id: str, table_name: str, date: str):
    if table_name not in [
        "visit",
        "thymus",
        "bloodTest",
        "QOL",
        "QMG",
        "MG",
        "ADL",
        "EMG",
    ]:
        return JSONResponse(status_code=400, content={"message": "Invalid table name"})
    else:
        try:
            table = get_table_by_date(patient_id, table_name, date)
            if table:
                return {
                    "message": f"Success get {table_name} table on {date}",
                    "table": table,
                }
            else:
                return JSONResponse(
                    status_code=404,
                    content={"message": f"No {table_name} table on {date}"},
                )
        except Exception as e:
            print("Exception: ", str(e))
            return JSONResponse(status_code=500, content={"message": str(e)})


# POST /inquiry/{patient_id}/info -> update patient info
@router.post(
    "/{patient_id}/info",
    summary="更新（覆蓋）info",
    description="request body: 病患資料",
)
async def inquiry_update_patient_info(patient_id: str, new_info=Info):
    try:
        updated_patient = update_patient_info(
            patient_id, new_info.model_dump(by_alias=True)
        )
        return {
            "message": "Success update patient info!",
            "updatedPatient": updated_patient,
        }
    except Exception as e:
        print("Exception: ", str(e))
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )


@router.post(
    "/{patientId}/visit",
    description="request body: visit table",
    summary="新增visit表格",
)
async def inquiry_visit(patientId: str, table: Visit):
    try:
        updatedPatient = add_new_table(
            patientId, "visit", table.model_dump(by_alias=True)
        )
        return {
            "message": "Success add new visit table!",
            "updatedPatient": updatedPatient,
        }
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid visit table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )


@router.post("/{patientId}/thymus")
async def inquiry_thymus(patientId: str, table: Thymus):
    try:
        updatedPatient = add_new_table(
            patientId, "thymus", table.model_dump(by_alias=True)
        )
        return {
            "message": "Success add new thymus table!",
            "updatedPatient": updatedPatient,
        }
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(
            status_code=400, content={"message": "Invalid thymus table"}
        )
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )


@router.post("/{patientId}/bloodTest")
async def inquiry_bloodTest(patientId: str, table: BloodTest):
    try:
        updatedPatient = add_new_table(
            patientId, "bloodTest", table.model_dump(by_alias=True)
        )
        return {
            "message": "Success add new bloodTest table!",
            "updatedPatient": updatedPatient,
        }
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(
            status_code=400, content={"message": "Invalid bloodTest table"}
        )
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )


@router.post("/{patientId}/QOL")
async def inquiry_QOL(patientId: str, table: QOL):
    try:
        updatedPatient = add_new_table(
            patientId, "QOL", table.model_dump(by_alias=True)
        )
        return {
            "message": "Success add new QOL table!",
            "updatedPatient": updatedPatient,
        }
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid QOL table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )


@router.post("/{patientId}/QMG")
async def inquiry_QMG(patientId: str, table: QMG):
    try:
        updatedPatient = add_new_table(
            patientId, "QMG", table.model_dump(by_alias=True)
        )
        return {
            "message": "Success add new QMG table!",
            "updatedPatient": updatedPatient,
        }
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid QMG table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )


@router.post("/{patientId}/MG")
async def inquiry_MG(patientId: str, table: MG):
    try:
        updatedPatient = add_new_table(patientId, "MG", table.model_dump(by_alias=True))
        return {
            "message": "Success add new MG table!",
            "updatedPatient": updatedPatient,
        }
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid MG table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )


@router.post("/{patientId}/ADL")
async def inquiry_ADL(patientId: str, table: ADL):
    try:
        updatedPatient = add_new_table(
            patientId, "ADL", table.model_dump(by_alias=True)
        )
        return {
            "message": "Success add new ADL table!",
            "updatedPatient": updatedPatient,
        }
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid ADL table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )


@router.post(
    "/{patientId}/EMG",
    summary="Add new EMG table",
    description="request body: croped image, request header: EMG table without 'image' key",
)
async def inquiry_EMG(
    patientId: str, file: UploadFile = File(...), table: str = Header(None)
):
    try:
        table = json.loads(table)
        # add_new_table(patientId, "EMG", {**table, "image": file.file.read()})
        add_new_table(patientId, "EMG", {**table})
        return {"message": "Success add new EMG table!", "updatedPatient": table}
    except ValidationError as e:
        print("error: ", str(e))
        return JSONResponse(status_code=400, content={"message": "Invalid EMG table"})
    except Exception as e:
        print("error: ", str(e))
        return JSONResponse(
            status_code=500, content={"message": "Internal server error"}
        )


@router.post("/recognize")
async def recognize_text(file: UploadFile = File(...)):
    output, white_part = functionalRecognize(file.file)
    response = []
    for result in output:
        response.append(
            {
                "musclePart": result["target_words"],
                "preActivation": result["result_data"][0:3],
                "postActivation": result["result_data"][3:],
            }
        )
    buffer = io.BytesIO()
    white_part.save(buffer, format="PNG")
    buffer.seek(0)
    return Response(
        content=buffer.getvalue(),
        headers={
            "results": json.dumps(response),
            "Access-Control-Expose-Headers": "results",
        },
        media_type="image/*",
    )


# PUT /inquiry/{patient_id}/{table_name}/{date} -> update table on date
@router.put(
    "/{patient_id}/{table_name}/{date}",
    summary="更新(覆蓋)指定日期之table",
    description="date: 日期, tabe_name: visit、QOL等, request body: 更新的table\n 例如: /inquiry/123/visit/2021-01-01, 更新123病患2021-01-01的visit table",
)
async def update_table_on_date(
    patient_id: str,
    table_name: str,
    date: str,
    updated_table: Visit | Thymus | BloodTest | QOL | QMG | MG | ADL | EMG,
):
    if table_name not in [
        "visit",
        "thymus",
        "bloodTest",
        "QOL",
        "QMG",
        "MG",
        "ADL",
        "EMG",
    ]:
        return JSONResponse(status_code=400, content={"message": "Invalid table name"})
    else:
        try:
            updated_patient = update_patient_by_date(
                patient_id, table_name, updated_table.model_dump(by_alias=True), date
            )
            if updated_patient:
                return {
                    "message": f"Success update {table_name} table on {date}",
                    "updatedPatient": updated_patient,
                }
            else:
                return JSONResponse(
                    status_code=404,
                    content={"message": f"No {table_name} table on {date}"},
                )
        except Exception as e:
            print("Exception: ", str(e))
            return JSONResponse(status_code=500, content={"message": str(e)})
