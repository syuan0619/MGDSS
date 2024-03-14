from pydantic import BaseModel
from datetime import datetime

class OtherHospitalRecord(BaseModel):
	recentlyDate: str
	totalTimes: int

# 基本資料
class Info(BaseModel):
	ID: str
	name : str
	DOB: str
	sex: str
	height: float
	weight: float
	status: str
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
	MGFAclassification: int

# 看診紀錄
class Visit(BaseModel):
	date: datetime
	treat: int
	SBP: float
	DBP: float
	selfAssessment: int
	note: str
	prescription: Prescription
	examination: Examination

# 胸腺掃描
class Thymus(BaseModel):
	testDate: datetime
	thymusStatus: int
	thymusDescription: str

# 血液檢查
class BloodTest(BaseModel):
	testDate: datetime
	ACHR: float
	TSH: float
	freeThyroxine: float
	ANA: float
	uricAcid: float

# QOL
class QOL(BaseModel):
	testDate: datetime
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
	testDate: datetime	
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
	testDate: datetime
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
	testDate: datetime
	talking: int
	chewing: int
	swallowing: int
	breathing: int
	brushTeethOrCombHair: int
	ariseFromChair: int
	eyelid: int
	sum: int

class RNS(BaseModel):
	musclePart: str
	preActivation: list[str]
	postActivation: list[str]

# 電生理訊號
class EMG(BaseModel):
	testDate: datetime
	imgPath: str
	RNS: list[RNS]

# 病患資料
class Patient(BaseModel):
	info: Info = None
	visit: list[Visit] = []
	thymus: list[Thymus] = []
	bloodTest: list[BloodTest] = []
	QOL: list[QOL] = []
	QMG: list[QMG] = []
	MG: list[MG]  = []
	ADL: list[ADL] = []
	EMG: list[EMG] = []