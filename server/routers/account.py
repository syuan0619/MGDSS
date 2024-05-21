import models
from fastapi import APIRouter, BackgroundTasks
from fastapi.responses import JSONResponse
from mongoDB import (
    get_doctor_list,
    getAllAccounts,
    createAccount,
    deleteAccount,
    loginWithEmailandPassword,
    update_account,
    autoVerifiedAccount,
    sendPlainEmail,
)

router = APIRouter(prefix="/account", tags=["account"])


@router.get("/")
def get_all_accounts():
    try:
        accounts = getAllAccounts()
        return accounts
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})


@router.put(
    "/{accountId}",
    description="用accountId找到對應的帳號，將帳號資料覆蓋為updatedAccount，回傳更新後的帳號資料",
)
def update_account_by_id(accountId: str, updatedAccount: models.Account):
    try:
        updatedAccount = update_account(
            accountId, updatedAccount.model_dump(by_alias=True)
        )
        return {"message": "Success update account!", "updatedAccount": updatedAccount}
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})


@router.delete("/{accountId}")
def delete_account(accountId: str):
    try:
        deleteAccount(accountId)
        return {"message": "Success delete account!"}
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})


@router.get("/doctorlist")
def get_doctorlist():
    try:
        doctors = get_doctor_list()
        return doctors
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": str(e)})


@router.post("/register")
async def create_account(newAccount: models.Account, background_tasks: BackgroundTasks):
    try:
        dictAccount = newAccount.model_dump(by_alias=True)
        if autoVerifiedAccount(dictAccount["authCode"]):
            dictAccount["isVerified"] = True
            background_tasks.add_task(
                sendPlainEmail(
                    "帳號驗證通過！",
                    "您於MGDSS系統註冊的帳號已經通過驗證囉!",
                    dictAccount["email"],
                )
            )
        accountId = createAccount(dictAccount)
        accountId = str(accountId)
        return {
            "message": "Success create an account!",
            "dictAccount": accountId,
        }
    except Exception as e:
        print("Exception:", str(e))
        return JSONResponse(status_code=400, content={"message": str(e)})


@router.post("/testVerified")
def test_verified(authCode: str):
    try:
        verifiedResult = autoVerifiedAccount(authCode)
        return {
            "message": "Success verify!",
            "autoVerifiedAccount": verifiedResult,
        }
    except Exception as e:
        print("Exception:", str(e))
        return JSONResponse(status_code=500, content={"message": str(e)})


@router.post(
    "/login",
    description="用email和password在資料庫中查詢，如果有對應的帳號回傳該帳號資料，否則回傳None，回傳內容可以改，在error code 400那行",
)
def login(email: str, password: str):
    try:
        account = loginWithEmailandPassword(email, password)
        if account:
            return {"message": "Success login!", "account": account}
        else:
            return JSONResponse(
                status_code=400, content={"message": "Invalid email or password"}
            )
    except Exception as e:
        print("Exception", str(e))
        return JSONResponse(status_code=500, content={"message": str(e)})


### Email ###
@router.post("/sendEmail")
async def sendEmail(
    subject: str, body: str, to: str, background_tasks: BackgroundTasks
):
    try:
        background_tasks.add_task(sendPlainEmail(subject, body, to))
        return {
            "message": "Success verify!",
        }
    except Exception as e:
        print("Exception", str(e))
        return JSONResponse(status_code=500, content={"message": str(e)})
