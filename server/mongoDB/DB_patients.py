from .connectDB import waiting_list_collection, patient_collection
from fastapi import HTTPException
from bson.objectid import ObjectId
from datetime import datetime
import models


def get_waiting_list(date_to_get: datetime) -> dict:
    waiting_list = waiting_list_collection.find_one({"date": date_to_get}, {"_id": 0})
    if waiting_list is None:
        waiting_list_collection.insert_one({"date": date_to_get, "list": []})
        return {"date": date_to_get, "list": []}
    else:
        return waiting_list


def add_to_waiting_list(date_to_add: str, waiting: dict):
    date = datetime.strptime(date_to_add, "%Y-%m-%d")
    patient_id = waiting["patientId"]

    # if patient not exists, raise 404
    patient = patient_collection.find_one({"_id": ObjectId(patient_id)})
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")

    else:
        # if patient_id in waiting_list["list"], update patient
        if waiting_list_collection.find_one(
            {"date": date, "list.patientId": patient_id}
        ):
            waiting_list_collection.update_one(
                {"date": date, "list.patientId": patient_id},
                {"$set": {"list.$": waiting}},
            )
            return f"Succeed update {patient_id} in {date.date()}'s waiting list"
        # if date not exists, create a new date
        # if patient_id not in waiting_list["list"], add patient
        else:
            waiting_list_collection.update_one(
                {"date": date}, {"$push": {"list": waiting}}, upsert=True
            )
            return f"Succeed add {patient_id} to {date.date()}'s waiting list"


def get_all_patients(date: datetime | None = None) -> list[dict]:
    patients = [
        {"_id": str(patient["_id"]), "info": patient["info"], "status": "無"}
        for patient in patient_collection.find()
    ]
    if date:
        waiting_list: list = get_waiting_list(date)["list"]
        waiting_list.reverse()
        for index, patient in enumerate(patients):
            for waiting_patient in waiting_list:
                if (patient["_id"] == waiting_patient["patient_id"]) and (
                    waiting_patient["isChecked"]
                ):
                    patient["status"] = "已看診"
                    patients.insert(0, patients.pop(index))
                    break
                elif (patient["_id"] == waiting_patient["patient_id"]) and not (
                    waiting_patient["isChecked"]
                ):
                    patient["status"] = "候診"
                    patients.insert(0, patients.pop(index))
                    break
    return patients
