import { userRepository } from "../repositories/user.repository";
import type { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { BadRequestError, ConflictError, NotFoundError } from "../errors/types";

const registerUser = async (data: CreateUserDTO) => {
    const existing = await userRepository.findByEmail(data.email);
    if (existing) throw new ConflictError("Email already registered");

    return await userRepository.create(data);
};

const updateUser = async (id: string, data: UpdateUserDTO) => {

    const existing = await userRepository.findById(id);
    if (!existing) throw new NotFoundError("User not found");

    if (Object.keys(data).length === 0)
        throw new BadRequestError("No data provided");

    return userRepository.update(id, data);

};

const listUsers = async (page: number, limit: number) => {
    return userRepository.findAll(page, limit);
};

export const userService = {
    registerUser,
    updateUser,
    listUsers,
}