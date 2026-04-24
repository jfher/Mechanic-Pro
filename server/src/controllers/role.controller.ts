import type { Request, Response, NextFunction } from 'express';
import { toRoleResponse } from "../mappers/role.mapper";
import { roleService } from "../services/role.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const role = await roleService.registerRole(req.body);
        res.status(201).json({
            success: true,
            data: toRoleResponse(role)
        });
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const roleId = req.params.roleId;

        if (!roleId) return res.status(400).json({
            success: false,
            error: "RoleId paramater is required"
        })

        const role = await roleService.updateRole(roleId.toString(), req.body);

        res.status(201).json({
            success: true,
            data: toRoleResponse(role)
        });
    } catch (error) {
        next(error);
    }


};

export const getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await roleService.listRoles(page, limit);

        res.status(200).json({
            success: true,
            data: result.data.map(toRoleResponse)
        });
    } catch (error) {
        next(error);
    }
};