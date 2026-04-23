import { serviceService } from "../services/service.service";
import type { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {

    try {
        const service = await serviceService.registerService(req.body);
        res.status(201).json({
            success: true,
            data: { service }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
};

export const update = async (req: Request, res: Response) => {

    try {
        const serviceId = req.params.serviceId;

        if (!serviceId) return res.status(400).json({
            success: false,
            error: "ServiceId paramater is required"
        })

        const service = await serviceService.updateService(serviceId.toString(), req.body);

        res.status(201).json({
            success: true,
            data: { service }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }


};

export const getServices = async (req: Request, res: Response) => {
    const services = await serviceService.listServices();
    try {
        res.status(200).json({
            success: true,
            data: services
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
};