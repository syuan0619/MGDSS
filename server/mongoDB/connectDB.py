import pymongo
import models
import pandas as pd
from bson.objectid import ObjectId
from bson.binary import Binary
from datetime import date
import smtplib
from email.message import EmailMessage

client = pymongo.MongoClient(
    "mongodb+srv://testMember:1234@schoolproject.tsw5n6e.mongodb.net/?retryWrites=true&w=majority"
)
db = client["SchoolProject"]
patient_collection = db["Patient"]
account_collection = db["Account"]
waiting_list_collection = db["WaitingList"]
verified_authCode_collection = db["VerifiedAuthCode"]

### Patient ###


def get_patient_by_id(patientId):
    patient = patient_collection.find_one({"_id": ObjectId(patientId)})
    patient["_id"] = str(patient["_id"])
    # for emg in patient["EMG"]:
    #     if "image" in emg:
    #         emg.pop("image")
    return patient


def getPatientByDate(patientId: str, date: str):
    patient = get_patient_by_id(patientId)
    tablesAtDate = {}
    # tablesAtDate["_id"] = patient["_id"]
    tablesAtDate["info"] = patient["info"]
    tablesAtDate["thymus"] = patient["thymus"][-1]
    for key in patient:
        if key != "_id" and key != "info":
            for table in patient[key]:
                if table["testDate"] == date:
                    tablesAtDate[key] = table
                    break
            tablesAtDate[key] = patient[key][-1]
    return tablesAtDate


def get_table_by_date(patient_id: str, table_name: str, date: str):
    patient = get_patient_by_id(patient_id)
    for table in patient[table_name]:
        if table["testDate"] == date:
            return table
    return None


def update_patient_info(patientId: str, updatedInfo: dict):
    updatedPatient = patient_collection.find_one_and_update(
        {"_id": ObjectId(patientId)},
        {"$set": {"info": updatedInfo}},
        return_document=pymongo.ReturnDocument.AFTER,
    )
    updatedPatient["_id"] = str(updatedPatient["_id"])
    return {"_id": updatedPatient["_id"], "info": updatedPatient["info"]}


# return dict with _id
def addNewPatient(newPatientInfo: dict):
    newPatient = models.Patient(info=newPatientInfo).model_dump(by_alias=True)
    newPatientId = patient_collection.insert_one(newPatient).inserted_id
    newPatient["_id"] = str(newPatientId)
    return newPatient


def add_new_table(patient_id: str, table_name: str, table: dict):
    old_patient = get_patient_by_id(patient_id)

    # if date already exists, update the table
    for old_table in old_patient[table_name]:
        if old_table["testDate"] == table["testDate"]:
            old_table.update(table)
            updated_patient = patient_collection.find_one_and_update(
                {"_id": ObjectId(patient_id)},
                {"$set": {table_name: old_patient[table_name]}},
                return_document=pymongo.ReturnDocument.AFTER,
            )
            updated_patient["_id"] = str(updated_patient["_id"])
            return updated_patient
        else:
            continue

    # if no table with the same date, append the new table
    old_patient[table_name].append(table)
    old_patient[table_name].sort(key=lambda x: date.fromisoformat(x["testDate"]))
    updated_patient = patient_collection.find_one_and_update(
        {"_id": ObjectId(patient_id)},
        {"$set": {table_name: old_patient[table_name]}},
        return_document=pymongo.ReturnDocument.AFTER,
    )
    updated_patient["_id"] = str(updated_patient["_id"])
    return updated_patient


def update_entire_patient(patientId: str, updatedPatient: dict):
    patient_collection.find_one_and_update(
        {"_id": ObjectId(patientId)}, {"$set": updatedPatient}
    )
    updatedPatient["_id"] = str(updatedPatient["_id"])
    return updatedPatient


def update_patient_by_date(patient_id: str, table_name: str, table: dict, date: str):
    old_patient = get_patient_by_id(patient_id)
    for old_table in old_patient[table_name]:
        print(old_table["testDate"], date)
        if old_table["testDate"] == date:
            old_table.update(table)
            old_table["testDate"] = date
            updated_patient = patient_collection.find_one_and_update(
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
    accounts = account_collection.find()
    response = []
    for account in accounts:
        if account["role"] != "admin":
            account["_id"] = str(account["_id"])
            response.append(account)
    return response


def createAccount(newAccount: dict):
    if account_collection.find_one({"email": newAccount["email"]}):
        raise Exception("Email already exists")

    accountId = account_collection.insert_one(newAccount).inserted_id()
    accountId = str(accountId)
    return accountId


def update_account(accountId: str, updatedAccount: dict):
    updatedAccount = account_collection.find_one_and_update(
        {"_id": ObjectId(accountId)},
        {"$set": updatedAccount},
        return_document=pymongo.ReturnDocument.AFTER,
    )
    updatedAccount["_id"] = str(updatedAccount["_id"])
    return updatedAccount


def loginWithEmailandPassword(email: str, password: str):
    account = account_collection.find_one({"email": email, "password": password})
    if account:
        account["_id"] = str(account["_id"])
        return account
    elif not account["isVerified"]:
        raise Exception("Account not verified")
    else:
        return None


def deleteAccount(accountId: str):
    return account_collection.delete_one({"_id": ObjectId(accountId)})


def autoVerifiedAccount(authCode: str) -> bool:
    isVerified = verified_authCode_collection.find_one({"authCode": authCode})
    if isVerified:
        return True
    else:
        return False


### Analyze ###


def all_patients_to_csv() -> pd.DataFrame:
    # patients = list(patient_collection.find({"_id": ObjectId("65e43cbafe46cf205a0e4886")})) # 測試用
    patients = list(patient_collection.find())
    records_list = []
    for patient in patients:
        patient_info = {
            "ID": patient["info"]["ID#"],
            "姓名": patient["info"]["name"],
            "生日": patient["info"]["DOB"],
            "性別": patient["info"]["sex"],
            "身高": patient["info"]["height"],
            "體重": patient["info"]["weight"],
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
            record.update(
                {
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
                }
            )
            records_list.append(record)
        for table in ["thymus", "bloodTest", "QOL", "QMG", "MG", "ADL"]:
            for record in patient[table]:
                matching_record = next(
                    (r for r in records_list if r["看診日期"] == record["testDate"]),
                    None,
                )
                if matching_record:
                    for key, value in record.items():
                        if key != "testDate":
                            matching_record[f"{table}_{key}"] = value

    records_df = pd.DataFrame(records_list)
    return records_df


### Email ###


def sendPlainEmail(subject, body, to):
    msg = EmailMessage()
    msg.set_content(body)
    msg["subject"] = subject
    msg["to"] = to
    user = "kevin920429@gmail.com"
    msg["from"] = user
    password = "ipmg aoye hyrk gauq"
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(user, password)
    server.send_message(msg)
    server.quit()
