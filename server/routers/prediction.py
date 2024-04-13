import pandas as pd
import models
from fastapi import APIRouter
from prediction.predict import patient_to_dataframe, predict_MGCscore

router = APIRouter(prefix="/prediction", tags=["prediction"])

@router.post("/data")
async def get_prediction_data(patient: models.PatientForPredict):
	# try:
		df = patient_to_dataframe(patient.model_dump())	
		print(predict_MGCscore(df))
		# return predict_MGCscore(df)
	# except Exception as e:
	# 	return {"message": e}