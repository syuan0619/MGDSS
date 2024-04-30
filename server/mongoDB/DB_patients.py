from .connectDB import waiting_list_collection, patientCollection
from fastapi import HTTPException
from bson.objectid import ObjectId

def get_waiting_list(date_to_get: str):
	waiting_list = waiting_list_collection.find_one({"date": date_to_get})
	if waiting_list is None:
		waiting_list_collection.insert_one({"date": date_to_get, "list": []})
		return {"date": date_to_get, "list": []}
	else:
		return waiting_list

def add_to_waiting_list(date_to_add: str, patient_id: str):
	waiting_list = waiting_list_collection.find_one({"date": date_to_add})
	# if date not exists, create a new date
	if waiting_list is None:
		waiting_list_collection.insert_one({"date": date_to_add, "list": [patient_id]})
		waiting_list_collection.update_one({"date": date_to_add}, {"$push": {"list": patient_id}})
	else:
		patient = patientCollection.find_one({"_id": ObjectId(patient_id)})
		# if patient not exists, raise 404
		if patient is None:
			raise HTTPException(status_code=404, detail="Patient not found")
		else:	
			# if patient already in waiting list, raise 400
			if patient_id in waiting_list["list"]:
				raise HTTPException(status_code=400, detail="Patient already in waiting list")
			waiting_list_collection.update_one({"date": date_to_add}, {"$push": {"list": patient_id}})