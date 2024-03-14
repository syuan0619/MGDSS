import pymongo
from bson.objectid import ObjectId
from models.patient import Patient ,Info

client = pymongo.MongoClient(
"mongodb+srv://testMember:1234@schoolproject.tsw5n6e.mongodb.net/?retryWrites=true&w=majority")
db = client["SchoolProject"]
patientCollection = db["Patient"]

# def ReadAllPatient():
#     myList = []
#     db=client["SchoolProject"]
#     collection=db["Patient"] 
#     originOutput = collection.find()
#     for eachOutput in originOutput:
#         popElement = eachOutput.pop('_id')
#         myList.append({"ObjectId": str(popElement),"patient":eachOutput})

#     return myList

# def ReadOnePatient(name:str):
#     db=client["SchoolProject"]  #database name
#     col=db["Account"]   #collection name
#     output_info=col.find({"name": name})[0]
#     popElement = output_info.pop('_id')

#     return  json.dumps(output_info, ensure_ascii=False)

def getAllPatients():
    patients = patientCollection.find()
    response = []
    for patient in patients:
        patient['_id'] = str(patient['_id'])
        response.append(patient)
    return response

def getPatientById(patientId):
    patient = patientCollection.find_one({"_id": ObjectId(patientId)})
    patient['_id'] = str(patient['_id'])
    return patient

# return dict with _id
def addNewPatient(newPatientInfo: Info):
    newPatient = Patient(info= newPatientInfo.model_dump(by_alias=True)).model_dump(by_alias=True)
    newPatientId = patientCollection.insert_one(newPatient).inserted_id
    newPatient["_id"] = str(newPatientId)
    return newPatient

def updatePatient(patientId, tableName, table):
    updatedPatient = patientCollection.find_one_and_update({"_id": ObjectId(patientId)}, {"$push": {tableName: table}}, return_document=pymongo.ReturnDocument.AFTER)
    updatedPatient['_id'] = str(updatedPatient['_id'])
    return updatedPatient