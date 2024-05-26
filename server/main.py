import models
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routers import inquiry, account, prediction, patients
from fastapi.responses import Response
from mongoDB import all_patients_to_csv
import io

app = FastAPI()
# routers/inquiry.py
app.include_router(inquiry.router)
app.include_router(account.router)
app.include_router(prediction.router)
app.include_router(patients.router)


@app.get("/")
async def root():
    content = {"message": "Hello World"}
    headers = {}
    return JSONResponse(content=content, headers=headers)


# GET /patients/csv -> download all patients as csv
@app.get(
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


origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
