import { Router, type Request, type Response } from "express";
import { getUsers, register, update } from "../controllers/user.controller";
import { userCreateSchema, userUpdateSchema } from "../validators/user.validator";
import { validate } from "../middlewares/validate.middleware";

export const userRoutes = Router();


userRoutes.get('/', getUsers);

userRoutes.post('/', validate(userCreateSchema), register)

userRoutes.patch('/:userId', validate(userUpdateSchema), update)

userRoutes.delete('/', async (req: Request, res: Response) => {

})