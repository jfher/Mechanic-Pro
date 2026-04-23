import { processService } from "../services/process.service";
import type { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {

    try {
        const process = await processService.registerProcess(req.body);
        res.status(201).json({
            success: true,
            data: { process }
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
        const processId = req.params.processId;

        if (!processId) return res.status(400).json({
            success: false,
            error: "Process Id parameter is required"
        })

        const process = await processService.updateProcess(processId.toString(), req.body);

        res.status(201).json({
            success: true,
            data: { process }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }


};

export const getProcess = async (req: Request, res: Response) => {
    const process = await processService.listProcess();
    try {
        res.status(200).json({
            success: true,
            data: process
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
};