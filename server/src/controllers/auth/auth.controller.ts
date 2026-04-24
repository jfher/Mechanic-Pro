import type { NextFunction, Request, Response } from "express";
import { authService } from "../../services/auth/auth.service";
import { toAuthResponse } from "../../mappers/auth/auth.mapper";


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const { accessToken, user, refreshToken } = await authService.loginUser(
            email,
            password
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true
        });

        res.status(200).json({
            success: true,
            data: toAuthResponse(user, accessToken)
        });
    } catch (error) {
        next(error);
    }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.refreshToken;

        const { accessToken, refreshToken } =
            await authService.refreshTokenService(token);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true
        });

        res.status(200).json({ accessToken });
    } catch (error: any) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.refreshToken;

        await authService.logoutService(token);

        res.clearCookie("refreshToken");
        res.status(204).json({ success: true });
    } catch (error: any) {
        next(error);
    }
};