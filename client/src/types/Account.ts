type Account = {
  name: string;
  email: string;
  password: string;
  role: "doctor" | "nurse" | "admin";
  authCode: string;
  isVerified: boolean;
};

export type { Account };
