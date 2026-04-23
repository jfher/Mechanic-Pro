import type { Request, Response, NextFunction } from "express";
import { vehicleService } from "../services/vehicle.service";
import { toVehicleResponse } from "../mappers/vehicle.,mapper";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vehicle = await vehicleService.registerVehicle(req.body);

        res.status(201).json({
            success: true,
            data: toVehicleResponse(vehicle),
        });
    } catch (err) {
        next(err);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vehicleId = req.params.vehicleId as string;

        const vehicle = await vehicleService.updateVehicle(
            vehicleId,
            req.body
        );

        res.json({
            success: true,
            data: toVehicleResponse(vehicle),
        });
    } catch (err) {
        next(err);
    }
};

export const getVehicles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await vehicleService.listVehicles(page, limit);

        res.json({
            success: true,
            ...result,
        });
    } catch (err) {
        next(err);
    }
};

export const getVehicleByPlate = async (req: Request, res: Response, next: NextFunction) => {
    const plate = req.params.plate?.toString();
    try {

        if (!plate) return res.status(400).json({
            success: false,
            error: "Plate parameter is required"
        })

        const vehicle = await vehicleService.getVehicleByPlate(plate);

        res.status(200).json({
            success: true,
            data: toVehicleResponse(vehicle)
        });
    } catch (err) {
        next(err);
    }
};