import { toServiceResponse } from "../mappers/service.mapper";
import { serviceService } from "../services/service.service";
import type { NextFunction, Request, Response } from 'express';

export const register = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const service = await serviceService.registerService(req.body);
        res.status(201).json({
            success: true,
            data: toServiceResponse(service)
        });
    } catch (error) {
        next(error)
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const serviceId = req.params.serviceId;

        if (!serviceId) return res.status(400).json({
            success: false,
            error: "ServiceId paramater is required"
        })

        const service = await serviceService.updateService(serviceId.toString(), req.body);

        res.status(201).json({
            success: true,
            data: toServiceResponse(service)
        });
    } catch (error) {
        next(error);
    }


};

export const getServices = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await serviceService.listServices(page, limit);

        res.status(200).json({
            success: true,
            data: result.data.map(toServiceResponse)
        });
    } catch (error) {
        next(error);
    }
};