import { prisma } from "../configs/prisma";
import type { CreateRoleDTO, UpdateRoleDTO } from "../dtos/role.dto";

const create = async (data: CreateRoleDTO) => {
    return prisma.$transaction(async (tx) => {
        const role = await tx.role.create({ data });

        await tx.role.findUnique({
            where: { id: role.id }
        });

        return role;
    });
};


const update = async (roleId: string, data: UpdateRoleDTO) => {
    return prisma.$transaction(async (tx) => {
        const role = await tx.role.update({
            where: { id: roleId },
            data,
        });

        return tx.role.findUnique({
            where: { id: role.id },
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

const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const data = await prisma.role.findMany({
        skip,
        take: limit,
    });

    const total = await prisma.role.count();

    return {
        data,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};


export const roleRepository = {
    create,
    update,
    findById,
    findByName,
    findAll,
}


