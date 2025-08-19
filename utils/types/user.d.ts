export type UserRole = "owner" | "admin" | "user";

export type User = {
    id: number,
    name: string,
    email: string,
    password?: string,
    role: UserRole,
    photo: string;
};
