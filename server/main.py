import models
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from routers import inquiry, account, prediction, patients

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


origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
