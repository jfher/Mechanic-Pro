import { prisma } from "../configs/prisma";
import type { CreateProcessDTO, UpdateProcessDTO } from "../dtos/process.dto";
import type { ProcessType } from "../../generated/prisma/enums";

const createProcess = async (data: CreateProcessDTO) => {
    const { ...processData } = data;

    return prisma.$transaction(async (tx) => {

        const process = await tx.process.create({
            data: { ...processData },
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


const updateProcess = async (processId: string, data: UpdateProcessDTO) => {
    const { ...processData } = data;

    return prisma.$transaction(async (tx) => {
        const process = await tx.process.update({
            where: { id: processId },
            data: { ...processData },
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

const getAllProcess = () => {
    return prisma.process.findMany({
        select: {
            id: true,
            date: true,
            type: true,
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


export const processModel = {
    createProcess,
    updateProcess,
    findByType,
    findById,
    getAllProcess

}


