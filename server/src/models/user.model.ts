import { prisma } from "../configs/prisma";
import bcrypt from "bcrypt";
import type { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";

const createUser = async (data: CreateUserDTO) => {
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


const updateUser = async (userId: string, data: UpdateUserDTO) => {
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
                where: { userId },
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

const getAllUsers = () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            userRoles: {
                select: {
                    role: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });
};


export const userModel = {
    createUser,
    updateUser,
    findByEmail,
    findById,
    getAllUsers

}


