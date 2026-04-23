import { Router, type Request, type Response } from "express";
import { getProcess, register, update } from "../controllers/process.controller";
import { processCreateSchema, processUpdateSchema } from "../validators/process.validator";
import { validate } from "../middlewares/validate.middleware";

export const processRoutes = Router();


processRoutes.get('/', getProcess);

processRoutes.post('/', validate(processCreateSchema), register)

processRoutes.patch('/:processId', validate(processUpdateSchema), update)

processRoutes.delete('/', async (req: Request, res: Response) => {

})