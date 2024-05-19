from .connectDB import account_collection


def get_doctor_list():
    doctors = account_collection.find({"role": "doctor"})
    response = []
    for doctor in doctors:
        response.append(
            {
                "_id": str(doctor["_id"]),
                "name": doctor["name"],
            }
        )
    return response
