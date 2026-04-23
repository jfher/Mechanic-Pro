import type { Request, Response } from "express";
import { authService } from "../../services/auth/auth.service";


export const login = async (req: Request, res: Response) => {
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

        res.status(200).json({ success: true, data: { accessToken, user: { name: user.name, id: user.id, email: user.email } } });
    } catch (error: any) {
        res.status(401).json({ success: false, data: {}, error: error.message });
    }
};

export const refresh = async (req: Request, res: Response) => {
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
        res.status(403).json({ success: false, error: error.message });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.refreshToken;

        await authService.logoutService(token);

        res.clearCookie("refreshToken");
        res.status(204).json({ success: true });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
};  