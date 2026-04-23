import { prisma } from "../configs/prisma";
import type { CreateServiceDTO, UpdateServiceDTO } from "../dtos/service.dto";

const createService = async (data: CreateServiceDTO) => {
    const { ...serviceData } = data;

    return prisma.$transaction(async (tx) => {

        const service = await tx.service.create({
            data: {
                ...serviceData,
            },
        });

        return tx.service.findUnique({
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
    });
};


const updateService = async (serviceId: string, data: UpdateServiceDTO) => {
    const { ...serviceData } = data;

    return prisma.$transaction(async (tx) => {
        const service = await tx.service.update({
            where: { id: serviceId },
            data: { ...serviceData },
        });

        return tx.service.findUnique({
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

const getAllServices = () => {
    return prisma.service.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            startDate: true,
            endDate: true,
            status: true,
            operatorId: true,
            historyId: true,
            createdAt: true,
            updatedAt: true,
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


export const serviceModel = {
    createService,
    updateService,
    findByOperator,
    findById,
    getAllServices
}


