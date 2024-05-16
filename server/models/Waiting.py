from pydantic import BaseModel


class Waiting(BaseModel):
    patientId: str
    doctorId: str
    nurseId: str
    isChecked: bool = False
