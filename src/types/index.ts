export type User = {
    name: string;
    email: string;
}

export type RegisterFormType = Pick<User, "name" | "email"> & {
    password: string;
    password_confirmation: string;
}

export type LoginFormType = Pick<User, "email"> & {
	password: string;
};