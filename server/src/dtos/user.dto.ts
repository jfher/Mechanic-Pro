export type CreateUserDTO = {
    name: string;
    email: string;
    password: string;
    roles?: string[];
};

export type UpdateUserDTO = {
    name?: string;
    email?: string;
    password?: string;
    roles?: string[];
};
