type Account = {
  name: string;
  email: string;
  password: string;
  role: string;
  authCode: string;
  isVerified: boolean;
  isAutoVerified: boolean;
};

type ReturnAccount = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  authCode: string;
  isVerified: boolean;
  isAutoVerified: boolean;
};

type DoctorInList = {
  _id: string;
  name: string;
};

type Email = {
  subject: string;
  body: string;
  to: string;
};

export type { Account, ReturnAccount, DoctorInList, Email };
