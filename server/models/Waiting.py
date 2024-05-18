from pydantic import BaseModel, Field
from typing import Optional


class Waiting(BaseModel):
    doctorId: Optional[str] = None
    nurseId: Optional[str] = None
    isChecked: Optional[bool] = None
