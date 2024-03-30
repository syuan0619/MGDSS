import pandas as pd
from fastapi import APIRouter
from mongoDB import getAllPatients

router = APIRouter(prefix="/prediction", tags=["prediction"])

@router.get("/data")
async def get_prediction_data():
	try:
		allPatients = getAllPatients()
		for patient in allPatients:
			del patient['_id']
			QOL_df = pd.DataFrame(patient['qol'])
			print(QOL_df)
	except Exception as e:
		return {"message": f"Error: {e}"}