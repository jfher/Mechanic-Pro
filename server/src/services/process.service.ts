
import { processRepository } from "../repositories/process.repository";
import type { CreateProcessDTO, UpdateProcessDTO } from "../dtos/process.dto";
import { vehicleModel } from "../models/vehicle.model";
import { BadRequestError, NotFoundError } from "../errors/types";
import { userRepository } from "../repositories/user.repository";

const registerProcess = async (data: CreateProcessDTO) => {

    const operator = await userRepository.findById(data.operatorId);
    if (!operator) throw new NotFoundError("Operator not found");

    const vehicle = await vehicleModel.findById(data.vehicleId);
    if (!vehicle) throw new NotFoundError("Vehicle not found");

    return await processRepository.create(data);
};

const updateProcess = async (id: string, data: UpdateProcessDTO) => {

    const existing = await processRepository.findById(id);
    if (!existing) throw new NotFoundError("Process not found");

    if (Object.keys(data).length === 0)
        throw new BadRequestError("No data provided");

    return processRepository.update(id, data);
};


const listProcess = async (page: number, limit: number) => {
    return processRepository.findAll(page, limit);
};

export const processService = {
    registerProcess,
    updateProcess,
    listProcess,
}