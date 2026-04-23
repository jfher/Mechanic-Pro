import { roleService } from "../services/role.service";
import type { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {

    try {
        const role = await roleService.registerRole(req.body);
        res.status(201).json({
            success: true,
            data: { role }
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
        const roleId = req.params.roleId;

        if (!roleId) return res.status(400).json({
            success: false,
            error: "RoleId paramater is required"
        })

        const role = await roleService.updateRole(roleId.toString(), req.body);

        res.status(201).json({
            success: true,
            data: { role }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }


};

export const getRoles = async (req: Request, res: Response) => {
    const roles = await roleService.listRoles();
    try {
        res.status(200).json({
            success: true,
            data: roles
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
};