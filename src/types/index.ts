export type User = {
	name: string;
	email: string;
};

export type FileRow = {
	id: string;
	user_id: string;
	name: string;
	path: string;
	size: number;
	mime_type: string;
	is_deleted: boolean;
	created_at: string;
	deleted_at?: string | null;
	last_accessed_at?: string | null;
};

export type Folder = {
	id: string;
	user_id: string;
	name: string;
	created_at: string;
}

export type RegisterFormType = Pick<User, "name" | "email"> & {
	password: string;
	password_confirmation: string;
};

export type LoginFormType = Pick<User, "email"> & {
	password: string;
};
