import type { CreateRoleDTO, UpdateRoleDTO } from "../dtos/role.dto";
import { BadRequestError, ConflictError, NotFoundError } from "../errors/types";
import { roleRepository } from "../repositories/role.repository";

const registerRole = async (data: CreateRoleDTO) => {
    const existing = await roleRepository.findByName(data.name);
    if (existing) throw new ConflictError("Role already registered");

    return roleRepository.create(data);
};

const updateRole = async (id: string, data: UpdateRoleDTO) => {

    const existing = await roleRepository.findById(id);
    if (!existing) throw new NotFoundError("Role not found");

    if (Object.keys(data).length === 0)
        throw new BadRequestError("No data provided");

    return roleRepository.update(id, data);

};

const listRoles = (page: number, limit: number) => {
    return roleRepository.findAll(page, limit);
};

export const roleService = {
    registerRole,
    updateRole,
    listRoles,
}