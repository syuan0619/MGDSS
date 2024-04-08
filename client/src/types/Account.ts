type Account = {
  name: string;
  email: string;
  password: string;
  role: "doctor" | "nurse" | "admin";
  authCode: string;
  isVerified: boolean;
};

type returnAccount = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "doctor" | "nurse" | "admin";
  authCode: string;
  isVerified: boolean;
};

export type { Account, returnAccount };
