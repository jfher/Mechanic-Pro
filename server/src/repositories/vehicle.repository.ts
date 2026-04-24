import { prisma } from "../configs/prisma";
import type { CreateVehicleDTO, UpdateVehicleDTO } from "../dtos/vehicle.dto";

const create = async (data: CreateVehicleDTO) => {
    return prisma.$transaction(async (tx) => {
        const vehicle = await tx.vehicle.create({ data });

        await tx.history.create({
            data: { vehicleId: vehicle.id },
        });

        return vehicle;
    });
};

const update = (id: string, data: UpdateVehicleDTO) => {
    return prisma.vehicle.update({
        where: { id },
        data,
    });
};

const findById = (id: string) =>
    prisma.vehicle.findUnique({
        where: { id },
        include: { owner: true, history: true },
    });

const findByPlate = (plate: string) =>
    prisma.vehicle.findUnique({
        where: { plate },
    });

const findAll = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const data = await prisma.vehicle.findMany({
        skip,
        take: limit,
        include: {
            owner: {
                select: {
                    id: true,
                    name: true,
                }
            }, history: true
        },
    });

    const total = await prisma.vehicle.count();

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

export const vehicleRepository = {
    create,
    update,
    findById,
    findByPlate,
    findAll,
};