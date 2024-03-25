import pymongo
import models
from bson.objectid import ObjectId
from bson.binary import Binary

client = pymongo.MongoClient(
"mongodb+srv://testMember:1234@schoolproject.tsw5n6e.mongodb.net/?retryWrites=true&w=majority")
db = client["SchoolProject"]
patientCollection = db["Patient"]
accountCollection = db["Account"]

### Patient

def getAllPatients():
    patients = patientCollection.find()
    response = []
    for patient in patients:
        response.append({'_id': str(patient['_id']), 'info': patient['info']})
    return response

def getPatientById(patientId):
    patient = patientCollection.find_one({"_id": ObjectId(patientId)})
    patient['_id'] = str(patient['_id'])
    return patient

# return dict with _id
def addNewPatient(newPatientInfo: dict):
    newPatient = models.Patient(info= newPatientInfo).model_dump(by_alias=True)
    newPatientId = patientCollection.insert_one(newPatient).inserted_id
    newPatient["_id"] = str(newPatientId)
    return newPatient

def updatePatient(patientId: str, tableName: str, table: dict):
    updatedPatient = patientCollection.find_one_and_update({"_id": ObjectId(patientId)}, {"$push": {tableName: table}}, return_document=pymongo.ReturnDocument.AFTER)
    updatedPatient['_id'] = str(updatedPatient['_id'])
    return updatedPatient

def uploadImage(patientId: str, image: Binary):
    pateient = getPatientById(patientId)
    return "Success upload image!"

def updateEntirePatient(patientId: str, updatedPatient: dict):
    patientCollection.find_one_and_update({"_id": ObjectId(patientId)}, {"$set": updatedPatient})
    updatedPatient['_id'] = str(updatedPatient['_id'])
    return updatedPatient



### Account

def getAllAccounts():
    accounts = accountCollection.find()
    response = []
    for account in accounts:
        account['_id'] = str(account['_id'])
        response.append(account)
    return response

def createAccount(newAccount: dict):
    if accountCollection.find_one({"email": newAccount['email']}):
        raise Exception("Email already exists")
        
    accountId = accountCollection.insert_one(newAccount).inserted_id()
    accountId = str(accountId)
    return accountId

def loginWithEmailandPassword(email: str, password: str):
    account = accountCollection.find_one({"email": email, "password": password})
    if account:
        account['_id'] = str(account['_id'])
        return account
    else:
        return None
    
    
def deleteAccount(accountId: str):
    return accountCollection.delete_one({"_id": ObjectId(accountId)})
    
