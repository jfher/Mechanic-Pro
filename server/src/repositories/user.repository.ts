import { prisma } from "../configs/prisma";
import bcrypt from "bcrypt";
import type { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";

const create = async (data: CreateUserDTO) => {
    const { roles = [], ...userData } = data;

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return prisma.$transaction(async (tx) => {

        const user = await tx.user.create({
            data: { ...userData, password: hashedPassword },
        });

        if (roles.length > 0) {
            await tx.userRoles.createMany({
                data: roles.map((roleId) => ({
                    userId: user.id,
                    roleId,
                })),
                skipDuplicates: true,
            });
        }

        return tx.user.findUnique({
            where: { id: user.id },
            include: {
                userRoles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
    });
};


const update = async (userId: string, data: UpdateUserDTO) => {
    const { roles, ...userData } = data;

    let hashedPassword: string;
    if (userData.password) {
        hashedPassword = await bcrypt.hash(userData.password, 10);
    }

    return prisma.$transaction(async (tx) => {
        // actualizar datos básicos
        const user = await tx.user.update({
            where: { id: userId },
            data: { ...userData, password: hashedPassword },
        });

        // actualizar roles si vienen
        if (roles) {

            // eliminar actuales
            await tx.userRoles.deleteMany({
                where: { userId: user.id },
            });

            // crear nuevos
            if (roles.length > 0) {
                await tx.userRoles.createMany({
                    data: roles.map((roleId) => ({
                        userId,
                        roleId,
                    })),
                    skipDuplicates: true,
                });
            }
        }

        return tx.user.findUnique({
            where: { id: userId },
            include: {
                userRoles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
    });
};


const findById = (id: string) => {
    return prisma.user.findUnique({
        where: { id },
        include: {
            userRoles: {
                include: {
                    role: true,
                },
            },
        },
    });
};

const findByEmail = (email: string) => {
    return prisma.user.findUnique({
        where: { email },
        include: {
            userRoles: {
                include: {
                    role: true,
                },
            },
        },
    });
};

const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [data, total] = await prisma.$transaction([
        prisma.user.findMany({
            skip,
            take: limit,
            include: { userRoles: { include: { role: true } } },
        }),
        prisma.user.count(),
    ]);

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


export const userRepository = {
    create,
    update,
    findByEmail,
    findById,
    findAll

}


