import { prisma } from "../configs/prisma";
import type { CreateVehicleDTO, UpdateVehicleDTO } from "../dtos/vehicle.dto";

const createVehicle = async (data: CreateVehicleDTO) => {
    const { ...vehicleData } = data;

    return prisma.$transaction(async (tx) => {

        const vehicle = await tx.vehicle.create({
            data: { ...vehicleData },
        });

        const history = await tx.history.create({
            data: { vehicleId: vehicle.id }
        })

        return tx.vehicle.findUnique({
            where: { id: vehicle.id },
            include: {
                owner: {
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


const updateVehicle = async (vehicleId: string, data: UpdateVehicleDTO) => {
    const { ...vehicleData } = data;

    return prisma.$transaction(async (tx) => {
        const vehicle = await tx.vehicle.update({
            where: { id: vehicleId },
            data: { ...vehicleData },
        });

        return tx.vehicle.findUnique({
            where: { id: vehicle.id },
            include: {
                owner: {
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
    return prisma.vehicle.findUnique({
        where: { id },
        include: {
            owner: {
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

const findByPlate = (plate: string) => {
    return prisma.vehicle.findUnique({
        where: { plate },
        include: {
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
};

const getAllVehicles = () => {
    return prisma.vehicle.findMany({
        select: {
            id: true,
            brand: true,
            model: true,
            year: true,
            plate: true,
            color: true,
            ownerId: true,
            createdAt: true,
            owner: {
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


export const vehicleModel = {
    createVehicle,
    updateVehicle,
    findByPlate,
    findById,
    getAllVehicles

}


