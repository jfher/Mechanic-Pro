import type { CreateServiceDTO, UpdateServiceDTO } from "../dtos/service.dto";
import { BadRequestError, NotFoundError } from "../errors/types";
import { serviceRepository } from "../repositories/service.repository";

const registerService = async (data: CreateServiceDTO) => {
    return await serviceRepository.create(data);
};

const updateService = async (id: string, data: UpdateServiceDTO) => {

    const existing = await serviceRepository.findById(id);
    if (!existing) throw new NotFoundError("Service not found");

    if (Object.keys(data).length === 0)
        throw new BadRequestError("No data provided");

    return serviceRepository.update(id, data);

};

const listServices = async (page: number, limit: number) => {
    return serviceRepository.findAll(page, limit);
};

export const serviceService = {
    registerService,
    updateService,
    listServices,
}