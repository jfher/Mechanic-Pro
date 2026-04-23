
import { serviceModel } from "../models/service.model";
import type { CreateServiceDTO, UpdateServiceDTO } from "../dtos/service.dto";

const registerService = async (data: CreateServiceDTO) => {
    const service = await serviceModel.createService(data);

    return service;
};

const updateService = async (id: string, data: UpdateServiceDTO) => {

    const existingService = await serviceModel.findById(id);

    if (!existingService) {
        throw new Error("ServiceId not found");
    }

    if (Object.keys(data).length === 0) throw new Error("Service data must be sended to update");

    return serviceModel.updateService(id, data);

};

const listServices = async () => {
    return serviceModel.getAllServices();
};

export const serviceService = {
    registerService,
    updateService,
    listServices,
}