import type { Request, Response, NextFunction } from 'express';
import { processService } from "../services/process.service";
import { toProcessResponse } from '../mappers/process.mapper';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const process = await processService.registerProcess(req.body);
        res.status(201).json({
            success: true,
            data: toProcessResponse(process)
        });
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const processId = req.params.processId as string;

        if (!processId) return res.status(400).json({
            success: false,
            error: "Process Id parameter is required"
        })

        const process = await processService.updateProcess(processId, req.body);

        res.status(201).json({
            success: true,
            data: toProcessResponse(process)
        });
    } catch (error) {
        next(error);
    }


};

export const getProcess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await processService.listProcess(page, limit);
        res.status(200).json({
            success: true,
            data: result.data.map(toProcessResponse)
        });
    } catch (error) {
        next(error);
    }
};