from pymongo.mongo_client import MongoClient
import certifi
import pymongo
from cv22md import img_to_code
import json

def code_to_md(id_num:str):
    ca = certifi.where()
    client = pymongo.MongoClient(
    "mongodb+srv://the60:0000@testnm87.lexdiua.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=ca)

    try:
        client.admin.command('ping')
        print("---連線成功---")
    except Exception as e:
        print(e)

    db=client["test_cases"]       #database name
    col=db["cases"]               #collection name
    output_info=col.find({"ID#":id_num})[0]
    popElement = output_info.pop('_id')

    return  json.dumps(output_info, ensure_ascii=False)
    
