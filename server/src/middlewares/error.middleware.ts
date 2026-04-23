import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import { logger } from "../utils/logger";

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    //? Controlled errors in AppError
    if (err instanceof AppError) {
        logger.error({
            message: err.message,
            stack: err.stack,
        });

        return res.status(err.statusCode).json({
            success: false,
            error: err.message,
        });
    }

    //*Native errors
    if (err instanceof Error) {
        logger.error({
            message: err.message,
            stack: err.stack,
        });

        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }

    //! Unknown errors
    logger.error({
        message: "Unknown error",
        error: err,
    });

    return res.status(500).json({
        success: false,
        error: "Internal Server Error",
    });
};