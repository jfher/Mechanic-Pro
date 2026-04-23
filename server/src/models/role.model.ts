import { prisma } from "../configs/prisma";
import type { CreateRoleDTO, UpdateRoleDTO } from "../dtos/role.dto";

const createRole = async (data: CreateRoleDTO) => {
    const { ...roleData } = data;

    return prisma.$transaction(async (tx) => {

        const role = await tx.role.create({
            data: { ...roleData },
        });

        return tx.role.findUnique({
            where: { id: role.id }
        });
    });
};


const updateRole = async (roleId: string, data: UpdateRoleDTO) => {
    const { ...roleData } = data;

    return prisma.$transaction(async (tx) => {

        const role = await tx.role.update({
            where: { id: roleId },
            data: { ...roleData },
        });

        return tx.role.findUnique({
            where: { id: roleId },
        });
    });
};


const findById = (id: string) => {
    return prisma.role.findUnique({
        where: { id }
    });
};

const findByName = (name: string) => {
    return prisma.role.findUnique({
        where: { name }
    });
};

const getAllRoles = () => {
    return prisma.role.findMany({
        select: {
            id: true,
            name: true,
        },
    });
};


export const roleModel = {
    createRole,
    updateRole,
    findById,
    findByName,
    getAllRoles

}


