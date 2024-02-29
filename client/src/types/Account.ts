type Account = {
    email: string;
    password: string;
    role: "doctor" | "nurse" | "admin";
    authCode: string;
    isAuth: boolean;
};

export type { Account };
