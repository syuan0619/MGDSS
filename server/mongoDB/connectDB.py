import pymongo
import models
import pandas as pd
from bson.objectid import ObjectId
from bson.binary import Binary
from datetime import date

client = pymongo.MongoClient(
    "mongodb+srv://testMember:1234@schoolproject.tsw5n6e.mongodb.net/?retryWrites=true&w=majority"
)
db = client["SchoolProject"]
patientCollection = db["Patient"]
accountCollection = db["Account"]

### Patient ###


def getAllPatients():
    patients = patientCollection.find()
    response = []
    for patient in patients:
        response.append({"_id": str(patient["_id"]), "info": patient["info"], "visit": patient["visit"]})
    return response

def getPatientById(patientId):
    patient = patientCollection.find_one({"_id": ObjectId(patientId)})
    patient["_id"] = str(patient["_id"])
    for emg in patient["EMG"]:
        if "image" in emg:
            emg.pop("image")
    return patient

def getPatientByDate(patientId: str, date: str):
    patient = getPatientById(patientId)
    tablesAtDate = {}
    for key in patient:
        if key != "_id" and key != "info":
            for table in patient[key]:
                if table["testDate"] == date:
                    tablesAtDate[key] = table
    return tablesAtDate

def update_patient_info(patientId: str, updatedInfo: dict):
    updatedPatient = patientCollection.find_one_and_update(
        {"_id": ObjectId(patientId)},
        {"$set": {"info": updatedInfo}},
        return_document=pymongo.ReturnDocument.AFTER,
    )
    updatedPatient["_id"] = str(updatedPatient["_id"])
    return {"_id": updatedPatient["_id"], "info": updatedPatient["info"]}

def delete_patient(patient_id: str):
    return patientCollection.delete_one({"_id": ObjectId(patient_id)})

# return dict with _id
def addNewPatient(newPatientInfo: dict):
    newPatient = models.Patient(info=newPatientInfo).model_dump(by_alias=True)
    newPatientId = patientCollection.insert_one(newPatient).inserted_id
    newPatient["_id"] = str(newPatientId)
    return newPatient

def add_new_table(patientId: str, tableName: str, table: dict):
    old_patient = patientCollection.find_one({"_id": ObjectId(patientId)})
    old_patient["_id"] = str(old_patient["_id"])
    old_patient[tableName].append(table)
    old_patient[tableName].sort(key=lambda x: date.fromisoformat(x["testDate"]))
    updated_patient = patientCollection.find_one_and_update(
        {"_id": ObjectId(patientId)},
        {"$set": {tableName: old_patient[tableName]}},
        return_document=pymongo.ReturnDocument.AFTER,
    )
    updated_patient["_id"] = str(updated_patient["_id"])
    return updated_patient

def update_entire_patient(patientId: str, updatedPatient: dict):
    patientCollection.find_one_and_update(
        {"_id": ObjectId(patientId)}, {"$set": updatedPatient}
    )
    updatedPatient["_id"] = str(updatedPatient["_id"])
    return updatedPatient

def update_patient_by_date(patient_id: str, table_name: str, table: dict, date: str):
    old_patient = patientCollection.find_one({"_id": ObjectId(patient_id)})
    old_patient["_id"] = str(old_patient["_id"])
    for old_table in old_patient[table_name]:
        print(old_table["testDate"], date)
        if old_table["testDate"] == date:
            old_table.update(table)
            old_table["testDate"] = date
            updated_patient = patientCollection.find_one_and_update(
                {"_id": ObjectId(patient_id)},
                {"$set": {table_name: old_patient[table_name]}},
                return_document=pymongo.ReturnDocument.AFTER,
            )
            updated_patient["_id"] = str(updated_patient["_id"])
            return updated_patient
        else:
            continue
    return None


### Account ###


def getAllAccounts():
    accounts = accountCollection.find()
    response = []
    for account in accounts:
        if account["role"] != "admin":
            account["_id"] = str(account["_id"])
            response.append(account)
    return response


def createAccount(newAccount: dict):
    if accountCollection.find_one({"email": newAccount["email"]}):
        raise Exception("Email already exists")

    accountId = accountCollection.insert_one(newAccount).inserted_id()
    accountId = str(accountId)
    return accountId


def update_account(accountId: str, updatedAccount: dict):
    updatedAccount = accountCollection.find_one_and_update(
        {"_id": ObjectId(accountId)},
        {"$set": updatedAccount},
        return_document=pymongo.ReturnDocument.AFTER,
    )
    updatedAccount["_id"] = str(updatedAccount["_id"])
    return updatedAccount


def loginWithEmailandPassword(email: str, password: str):
    account = accountCollection.find_one({"email": email, "password": password})
    if account:
        account["_id"] = str(account["_id"])
        return account
    else:
        return None


def deleteAccount(accountId: str):
    return accountCollection.delete_one({"_id": ObjectId(accountId)})


### Analyze ###

def all_patients_to_csv() -> pd.DataFrame:
    # patients = list(patientCollection.find({"_id": ObjectId("65e43cbafe46cf205a0e4886")})) # 測試用
    patients = list(patientCollection.find())
    records_list = []
    for patient in patients:
        patient_info = {
            "ID": patient["info"]["ID#"],
            "姓名": patient["info"]["name"],
            "生日": patient["info"]["DOB"],
            "性別": patient["info"]["sex"],
            "身高": patient["info"]["height"],
            "體重": patient["info"]["weight"],
            "狀態": patient["info"]["status"],
            "特殊註記": patient["info"]["other"],
            "發病日期": patient["info"]["attackDate"],
            "初始症狀": patient["info"]["beginSymptom"],
            "其他醫院住院日期": patient["info"]["otherHospitalRecord"]["recentlyDate"],
            "其他醫院住院次數": patient["info"]["otherHospitalRecord"]["totalTimes"],
            "其他疾病": patient["info"]["otherDisease"],
            "其他用藥紀錄": patient["info"]["otherMedicine"],
        }
        for visit in patient["visit"]:
            record = patient_info.copy()
            record.update({
                "看診日期": visit["testDate"],
                "治療": visit["treat"],
                "SBP": visit["SBP"],
                "DBP": visit["DBP"],
                "自覺嚴重程度": visit["selfAssessment"],
                "註記": visit["note"],
                "用藥_pyridostigmine": visit["prescription"]["pyridostigmine"],
                "用藥_compesolone": visit["prescription"]["compesolone"],
                "用藥_cellcept": visit["prescription"]["cellcept"],
                "用藥_imuran": visit["prescription"]["imuran"],
                "用藥_prograf": visit["prescription"]["prograf"],
                "症狀_ptosis": visit["examination"]["ptosis"],
                "症狀_diplopia": visit["examination"]["diplopia"],
                "症狀_dysphagia": visit["examination"]["dysphagia"],
                "症狀_dysarthria": visit["examination"]["dysarthria"],
                "症狀_dyspnea": visit["examination"]["dyspnea"],
                "症狀_limpWeakness": visit["examination"]["limpWeakness"],
                "MGFA分級": visit["MGFAclassification"],
            })
            records_list.append(record)
        for table in ["thymus", "bloodTest", "QOL", "QMG", "MG", "ADL"]:
            for record in patient[table]:
                matching_record = next((r for r in records_list if r["看診日期"] == record["testDate"]), None)
                if matching_record:
                    for key, value in record.items():
                        if key != "testDate":
                            matching_record[f"{table}_{key}"] = value
            
    records_df = pd.DataFrame(records_list)
    return records_df