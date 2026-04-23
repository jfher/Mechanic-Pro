import { Router, type Request, type Response } from "express";
import { getServices, register, update } from "../controllers/service.controller";
import { serviceCreateSchema, serviceUpdateSchema } from "../validators/service.validator";
import { validate } from "../middlewares/validate.middleware";

export const serviceRoutes = Router();


serviceRoutes.get('/', getServices);

serviceRoutes.post('/', validate(serviceCreateSchema), register)

serviceRoutes.patch('/:serviceId', validate(serviceUpdateSchema), update)

serviceRoutes.delete('/', async (req: Request, res: Response) => {

})