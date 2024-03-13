import pymongo
from bson.objectid import ObjectId
import json

client = pymongo.MongoClient(
"mongodb+srv://testMember:1234@schoolproject.tsw5n6e.mongodb.net/?retryWrites=true&w=majority")
db = client["SchoolProject"]
patientCollection = db["Patient"]

def ReadAllPatient():
    myList = []
    db=client["SchoolProject"]
    collection=db["Patient"] 
    originOutput = collection.find()
    for eachOutput in originOutput:
        popElement = eachOutput.pop('_id')
        myList.append(eachOutput)

    return myList

# def ReadOnePatient(name:str):
#     db=client["SchoolProject"]  #database name
#     col=db["Account"]   #collection name
#     output_info=col.find({"name": name})[0]
#     popElement = output_info.pop('_id')

#     return  json.dumps(output_info, ensure_ascii=False)

def getPatientById(patientId: ObjectId):
    return patientCollection.find_one({"_id": patientId})
