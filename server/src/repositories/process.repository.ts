import { prisma } from "../configs/prisma";
import type { CreateProcessDTO, UpdateProcessDTO } from "../dtos/process.dto";
import type { ProcessType } from "../../generated/prisma/enums";

const create = async (data: CreateProcessDTO) => {
    return prisma.$transaction(async (tx) => {

        const process = await tx.process.create({ data });

        return tx.process.findUnique({
            where: { id: process.id },
            include: {
                operator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                vehicle: {
                    select: {
                        id: true,
                        plate: true,
                        brand: true,
                        model: true,
                    },
                }
            },
        });
    });
};


const update = async (processId: string, data: UpdateProcessDTO) => {

    return prisma.$transaction(async (tx) => {
        const process = await tx.process.update({
            where: { id: processId },
            data,
        });

        return tx.process.findUnique({
            where: { id: process.id },
            include: {
                operator: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                vehicle: {
                    select: {
                        id: true,
                        plate: true,
                        brand: true,
                        model: true,
                    },
                }
            },
        });
    });
};


const findById = (id: string) => {
    return prisma.process.findUnique({
        where: { id },
        include: {
            operator: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            vehicle: {
                select: {
                    id: true,
                    plate: true,
                    brand: true,
                    model: true,
                },
            }
        },
    });
};

const findByType = (type: ProcessType) => {
    return prisma.process.findMany({
        where: { type },
        include: {
            operator: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            vehicle: {
                select: {
                    id: true,
                    plate: true,
                    brand: true,
                    model: true,
                },
            }
        },
    });
};

const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const data = await prisma.process.findMany({
        skip,
        take: limit,
        include: {
            operator: {
                select: {
                    id: true,
                    name: true,
                }
            },
            vehicle: {
                select: {
                    id: true,
                    plate: true,
                    brand: true,
                    model: true,
                }
            }
        },
    });

    const total = await prisma.process.count();

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


export const processRepository = {
    create,
    update,
    findByType,
    findById,
    findAll

}


