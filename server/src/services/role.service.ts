import { roleModel } from "../models/role.model";
import type { CreateRoleDTO, UpdateRoleDTO } from "../dtos/role.dto";

const registerRole = async (data: CreateRoleDTO) => {
    const existingRole = await roleModel.findByName(data.name);

    if (existingRole) {
        throw new Error("Role already registered");
    }

    const role = await roleModel.createRole(data);

    return role;
};

const updateRole = async (id: string, data: UpdateRoleDTO) => {

    const existingRole = await roleModel.findById(id);

    if (!existingRole) {
        throw new Error("RoleId not found");
    }

    if (Object.keys(data).length === 0) throw new Error("Role data must be sended to update");

    return roleModel.updateRole(id, data);

};

const listRoles = async () => {
    return roleModel.getAllRoles();
};

export const roleService = {
    registerRole,
    updateRole,
    listRoles,
}