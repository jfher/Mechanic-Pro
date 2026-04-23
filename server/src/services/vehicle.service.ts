import type { CreateVehicleDTO, UpdateVehicleDTO } from "../dtos/vehicle.dto";
import { userModel } from "../models/user.model";
import { ConflictError, NotFoundError, BadRequestError, } from "../errors/types";
import { vehicleRepository } from "../repositories/vehicle.repository";


const registerVehicle = async (data: CreateVehicleDTO) => {
    const existing = await vehicleRepository.findByPlate(data.plate);
    if (existing) throw new ConflictError("Plate already registered");

    const owner = await userModel.findById(data.ownerId);
    if (!owner) throw new NotFoundError("Owner not found");

    return vehicleRepository.create(data);
};

const updateVehicle = async (id: string, data: UpdateVehicleDTO) => {
    const existing = await vehicleRepository.findById(id);
    if (!existing) throw new NotFoundError("Vehicle not found");

    if (Object.keys(data).length === 0)
        throw new BadRequestError("No data provided");

    return vehicleRepository.update(id, data);

};


const listVehicles = (page: number, limit: number) => {
    return vehicleRepository.findAll(page, limit);
};

const getVehicleByPlate = async (plate: string) => {
    const vehicle = await vehicleRepository.findByPlate(plate);
    if (!vehicle) throw new NotFoundError("Vehicle not found");

    return vehicle;
};


export const vehicleService = {
    registerVehicle,
    updateVehicle,
    listVehicles,
    getVehicleByPlate,
}