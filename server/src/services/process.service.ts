
import { processModel } from "../models/process.model";
import type { CreateProcessDTO, UpdateProcessDTO } from "../dtos/process.dto";
import { userModel } from "../models/user.model";
import { vehicleModel } from "../models/vehicle.model";
import { z } from 'zod'

const registerProcess = async (data: CreateProcessDTO) => {
    // const existingProcess = await processModel.findByType(data.type);
    // console.log(existingProcess)

    // if (existingProcess && existingProcess.length > 0) {
    //     throw new Error("Process with that type is already registered");
    // }

    const operator = await userModel.findById(data.operatorId);
    if (!operator || !z.uuid(data.operatorId)) {
        throw new Error("OperatorId is not valid");
    }

    const vehicle = await vehicleModel.findById(data.vehicleId);
    if (!vehicle || !z.uuid(data.vehicleId)) {
        throw new Error("VehicleId is not valid");
    }

    const process = await processModel.createProcess(data);

    return process;
};

const updateProcess = async (id: string, data: UpdateProcessDTO) => {

    const existingProcess = await processModel.findById(id);

    if (!existingProcess) {
        throw new Error("Process Id is not valid or registered");
    }

    if (Object.keys(data).length === 0) throw new Error("Process data must be sended to update");

    return processModel.updateProcess(id, data);

};


const listProcess = async () => {
    return processModel.getAllProcess();
};

export const processService = {
    registerProcess,
    updateProcess,
    listProcess,
}