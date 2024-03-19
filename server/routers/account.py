import models
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from mongoDB.connectDB import createAccount, loginWithEmailandPassword

router = APIRouter(prefix="/account", tags=["account"])

@router.post("/register")
def create_account(newAccount: models.Account):
	try:
		accountId = createAccount(newAccount.model_dump(by_alias=True))
		return {"message": "Success create account!", "accountId": accountId}
	except Exception as e:
		return JSONResponse(status_code=400, content={"message": str(e)})
	
@router.post("/login")
def login(email: str, password: str):
	try:
		account = loginWithEmailandPassword(email, password)
		if account:
			return {"message": "Success login!", "account": account}
		else:
			return JSONResponse(status_code=400, content={"message": "Invalid email or password"})
	except Exception as e:
		return JSONResponse(status_code=500, content={"message": str(e)})