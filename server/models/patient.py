from pydantic import BaseModel, Field
from typing import Optional
from pydantic import BaseModel


class OtherHospitalRecord(BaseModel):
    recentlyDate: str
    totalTimes: int


# 基本資料
class Info(BaseModel):
    ID: str = Field(alias="ID#")
    name: str
    DOB: str
    sex: str
    height: float
    weight: float
    other: str
    attackDate: str
    beginSymptom: str
    otherHospitalRecord: OtherHospitalRecord
    otherDisease: list[str]
    otherMedicine: list[str]


class Prescription(BaseModel):
    pyridostigmine: int
    compesolone: int
    cellcept: int
    imuran: int
    prograf: int


class Examination(BaseModel):
    ptosis: int
    diplopia: int
    dysphagia: int
    dysarthria: int
    dyspnea: int
    limpWeakness: int


class Status(BaseModel):
    isWaiting: bool = Field(default=False)
    description: int = Field(default=0)


# 看診紀錄
class Visit(BaseModel):
    testDate: str
    treat: int
    SBP: float
    DBP: float
    selfAssessment: int
    MGFAclassification: str
    note: str
    prescription: Prescription
    examination: Examination
    status: Status


# 胸腺掃描
class Thymus(BaseModel):
    testDate: str
    thymusStatus: int
    thymusDescription: str


# 血液檢查
class BloodTest(BaseModel):
    testDate: str
    ACHR: float
    TSH: float
    freeThyroxine: float
    ANA: float
    uricAcid: float


# QOL
class QOL(BaseModel):
    testDate: str
    frustration: int
    eyeUsing: int
    eating: int
    social: int
    entertainment: int
    fullfillFamilyNeeds: int
    plansNecessity: int
    jobState: int
    speaking: int
    driving: int
    depression: int
    walking: int
    beingInPublicPlaces: int
    overwhelm: int
    freshenUp: int
    sum: int


# QMG
class QMG(BaseModel):
    testDate: str
    doubleVision: int
    ptosis: int
    facialMuscle: int
    swallowing: int
    speakFluency: int
    rightArmHeight: int
    leftArmHeight: int
    vitalCapacity: int
    rightHandGrid: int
    leftHandGrid: int
    headLift: int
    rightLegHeight: int
    leftLegHeight: int
    sum: int


# MG
class MG(BaseModel):
    testDate: str
    ptosis: int
    doubleVision: int
    eyeClosure: int
    talking: int
    chewing: int
    swallowing: int
    breathing: int
    neckFlexion: int
    shoulderAbduction: int
    hipFlexion: int
    sum: int


# ADL
class ADL(BaseModel):
    testDate: str
    talking: int
    chewing: int
    swallowing: int
    breathing: int
    brushTeethOrCombHair: int
    ariseFromChair: int
    doubleVision: int
    eyelid: int
    sum: int


class Nasalis(BaseModel):
    preactivation: float
    postactivation: list[float]


class Abd(BaseModel):
    preactivation: float
    postactivation: list[float]


class Trapezius(BaseModel):
    preactivation: float
    postactivation: list[float]


# 電生理訊號
class EMG(BaseModel):
    testDate: str
    image: Optional[bytes]
    nasalis: Nasalis
    abd: Abd
    trapezius: Trapezius


# 病患資料
class Patient(BaseModel):
    info: Info
    visit: list[Visit] = Field(default=[])
    thymus: list[Thymus] = Field(default=[])
    bloodTest: list[BloodTest] = Field(default=[])
    qol: list[QOL] = Field(default=[], alias="QOL")
    qmg: list[QMG] = Field(default=[], alias="QMG")
    mg: list[MG] = Field(default=[], alias="MG")
    adl: list[ADL] = Field(default=[], alias="ADL")
    emg: list[EMG] = Field(default=[], alias="EMG")


class PatientForPredict(BaseModel):
    info: Info
    visit: Visit
    thymus: Thymus
    bloodTest: BloodTest
    qol: QOL = Field(alias="QOL")
    qmg: QMG = Field(alias="QMG")
    mg: MG = Field(alias="MG")
    adl: ADL = Field(alias="ADL")
