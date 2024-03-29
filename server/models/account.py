from pydantic import BaseModel, Field

class Account(BaseModel):
	name: str = Field(default="user")
	email: str = Field(default="email")
	password: str = Field(default="password")
	role: str = Field(default="role")
	authCode: str = Field(default="authCode")
	isVerified: bool = Field(default=False)