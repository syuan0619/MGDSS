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


def add_to_waiting_list(date_to_add: str, patient_id: str, waiting: dict):
    date = datetime.strptime(date_to_add, "%Y-%m-%d")
    waiting["patientId"] = patient_id

    # if patient not exists, raise 404
    patient = patient_collection.find_one({"_id": ObjectId(patient_id)})
    if patient is None:
        raise HTTPException(status_code=404, detail="Patient not found")

    else:
        current_waiting_list = waiting_list_collection.find_one(
            {"date": date, "list.patientId": patient_id}, {"list.$": 1, "_id": 0}
        )

        # if patient_id in waiting_list["list"], update patient
        if current_waiting_list:
            current_waiting: dict = current_waiting_list["list"][0]
            current_waiting.update(waiting)
            waiting_list_collection.update_one(
                {"date": date, "list.patientId": patient_id},
                {"$set": {"list.$": current_waiting}},
            )
            return f"Succeed update {patient_id} in {date.date()}'s waiting list"
        # if date not exists, create a new date
        # if patient_id not in waiting_list["list"], add patient
        else:
            waiting_list_collection.update_one(
                {"date": date}, {"$push": {"list": waiting}}, upsert=True
            )
            return f"Succeed add {patient_id} to {date.date()}'s waiting list"


def remove_from_waiting_list(date_to_remove: str, patient_id: str):
    date = datetime.strptime(date_to_remove, "%Y-%m-%d")
    waiting_list = waiting_list_collection.find_one(
        {"date": date, "list.patientId": patient_id}, {"_id": 0}
    )
    if waiting_list is None:
        raise HTTPException(
            status_code=404, detail="Date or patient not found in waiting list"
        )
    else:
        waiting_list_collection.update_one(
            {"date": date}, {"$pull": {"list": {"patientId": patient_id}}}
        )
        return f"Succeed remove {patient_id} from {date.date()}'s waiting list"


def get_all_patients(date: datetime, doctor_id: str | None = None) -> list[dict]:
    if doctor_id:
        waitinglist = [
            {"_id": x["patientId"], "isChecked": x["isChecked"]}
            for x in get_waiting_list(date)["list"]
            if x["doctorId"] == doctor_id
        ]
        patients = patient_collection.find(
            {"_id": {"$in": [ObjectId(x["_id"]) for x in waitinglist]}}, {"info": 1}
        )
        for waiting in waitinglist:
            waiting["info"] = next(
                (x["info"] for x in patients if str(x["_id"]) == waiting["_id"])
            )
        return waitinglist
    else:
        waitinglist: list = get_waiting_list(date)["list"]
        patients = [
            {
                "_id": str(x["_id"]),
                "doctorId": "",
                "nurseId": "",
                "isChecked": False,
                "info": x["info"],
            }
            for x in patient_collection.find()
        ]
        for i, waiting in enumerate(waitinglist):
            for j, patient in enumerate(patients):
                if waiting["patientId"] == patient["_id"]:
                    waitinglist[i] = {
                        "_id": waiting["patientId"],
                        "doctorId": waiting["doctorId"],
                        "nurseId": waiting["nurseId"],
                        "isChecked": waiting["isChecked"],
                        "info": patient["info"],
                    }
                    break
        waitinglist.extend(patients)
        return waitinglist
