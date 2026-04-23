import { userModel } from "../models/user.model";
import type { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";

const registerUser = async (data: CreateUserDTO) => {
    const existingUser = await userModel.findByEmail(data.email);

    if (existingUser) {
        throw new Error("Email already registered");
    }

    const user = await userModel.createUser(data);

    return user;
};

const updateUser = async (id: string, data: UpdateUserDTO) => {

    const existingUser = await userModel.findById(id);

    if (!existingUser) {
        throw new Error("UserID not found");
    }

    if (Object.keys(data).length === 0) throw new Error("User data must be sended to update");

    return userModel.updateUser(id, data);

};


const listUsers = async () => {
    return userModel.getAllUsers();
};

export const userService = {
    registerUser,
    updateUser,
    listUsers,
}