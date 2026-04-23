import { Router, type Request, type Response } from "express"
import { validate } from "../middlewares/validate.middleware";
import { roleCreateSchema, roleUpdateSchema } from "../validators/role.validator";
import { getRoles, register, update } from "../controllers/role.controller";

export const roleRoutes = Router();


roleRoutes.get('/', getRoles);

roleRoutes.post('/', validate(roleCreateSchema), register)

roleRoutes.patch('/:roleId', validate(roleUpdateSchema), update)

roleRoutes.delete('/', async (req: Request, res: Response) => {

})