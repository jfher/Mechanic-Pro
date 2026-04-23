import { userService } from "../services/user.service";
import type { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {

    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({
            success: true,
            data: { user }
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
        const userId = req.params.userId;

        if (!userId) return res.status(400).json({
            success: false,
            error: "UserId paramater is required"
        })

        const user = await userService.updateUser(userId.toString(), req.body);

        res.status(201).json({
            success: true,
            data: { user }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }


};

export const getUsers = async (req: Request, res: Response) => {
    const users = await userService.listUsers();
    try {
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
};