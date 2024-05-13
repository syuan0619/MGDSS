from .connectDB import waiting_list_collection, patient_collection
from fastapi import HTTPException
from bson.objectid import ObjectId
from datetime import datetime


def get_waiting_list(date_to_get: datetime) -> dict:
    waiting_list = waiting_list_collection.find_one({"date": date_to_get})
    if waiting_list is None:
        waiting_list_collection.insert_one({"date": date_to_get, "list": []})
        return {"date": date_to_get, "list": []}
    else:
        return waiting_list


def add_to_waiting_list(date_to_add: str, patient_id: str):
    date = datetime.strptime(date_to_add, "%Y-%m-%d")
    waiting_list = waiting_list_collection.find_one({"date": date})
    # if date not exists, create a new date
    if waiting_list is None:
        waiting_list_collection.insert_one({"date": date, "list": []})
        waiting_list_collection.update_one(
            {"date": date},
            {"$push": {"list": {"patient_id": patient_id, "isChecked": False}}},
        )
    else:
        patient = patient_collection.find_one({"_id": ObjectId(patient_id)})
        # if patient not exists, raise 404
        if patient is None:
            raise HTTPException(status_code=404, detail="Patient not found")
        else:
            # if patient already in waiting list, raise 400
            if patient_id in waiting_list["list"]:
                raise HTTPException(
                    status_code=400, detail="Patient already in waiting list"
                )
            else:
                waiting_list_collection.update_one(
                    {"date": date},
                    {"$push": {"list": {"patient_id": patient_id, "isChecked": False}}},
                )


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
