import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ success: false, error: "The token is needed to access!" });



    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token as string, process.env.ACCESS_SECRET!);
        (req as any).user = decoded;
        next();
    } catch (error: any) {
        return res.status(403).json({ success: false, error: error.message });
    }
};  