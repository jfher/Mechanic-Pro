import { prisma } from "../configs/prisma";
import type { CreateServiceDTO, UpdateServiceDTO } from "../dtos/service.dto";

const create = async (data: CreateServiceDTO) => {
    return prisma.$transaction(async (tx) => {

        const service = await tx.service.create({ data });

        await tx.service.findUnique({
            where: { id: service.id },
            include: {
                operator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                history: {
                    select: {
                        id: true,
                        createdAt: true,
                    }
                }
            },
        });

        return service;
    });
};


const update = async (serviceId: string, data: UpdateServiceDTO) => {

    return prisma.$transaction(async (tx) => {
        const service = await tx.service.update({
            where: { id: serviceId },
            data,
        });

        await tx.service.findUnique({
            where: { id: service.id },
            include: {
                operator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                history: {
                    select: {
                        id: true,
                        createdAt: true,
                    }
                }
            },
        });

        return service;
    });
};


const findById = (id: string) => {
    return prisma.service.findUnique({
        where: { id },
        include: {
            operator: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            history: {
                select: {
                    id: true,
                    createdAt: true,
                }
            }
        },
    });
};

const findByOperator = (operatorId: string) => {
    return prisma.service.findMany({
        where: { operatorId: operatorId },
        include: {
            operator: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
};

const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const data = await prisma.service.findMany({
        skip,
        take: limit,
        include: {
            operator: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }, history: {
                select: {
                    id: true,
                    createdAt: true,
                }
            }
        },
    });

    const total = await prisma.service.count();

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


export const serviceRepository = {
    create,
    update,
    findByOperator,
    findById,
    findAll
}


