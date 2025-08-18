import type { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import { StatusCode } from 'status-code-enum'

export const validateBody = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body);
        next();
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(StatusCode.ClientErrorBadRequest).json({
                error: "Validation failed",
                data: e
            });
        }
    }
}