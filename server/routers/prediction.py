import pandas as pd
import models
from fastapi import APIRouter
from prediction.predict import patient_to_dataframe, predict_MG_sum, predict_ADL_sum

router = APIRouter(prefix="/prediction", tags=["prediction"])

@router.post("/predict", description="body: 要預測的病患資料(單次的)")
async def predict(patient: models.PatientForPredict):
	try:
		df = patient_to_dataframe(patient.model_dump())
		result = {}
		print(predict_MG_sum(df))
		print(predict_ADL_sum(df))
		return result
	except Exception as e:
		print(e)
		return {"message": e}