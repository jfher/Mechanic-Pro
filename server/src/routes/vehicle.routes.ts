import { Router, type Request, type Response } from "express";
import { getVehicleByPlate, getVehicles, register, update } from "../controllers/vehicle.controller";
import { vehicleCreateSchema, vehicleUpdateSchema } from "../validators/vehicle.validator";
import { validate } from "../middlewares/validate.middleware";

/**
 * @swagger
 * /api/v1/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of vehicles
 */

export const vehicleRoutes = Router();


vehicleRoutes.get('/', getVehicles);
vehicleRoutes.get('/:plate', getVehicleByPlate);

vehicleRoutes.post('/', validate(vehicleCreateSchema), register)

vehicleRoutes.patch('/:vehicleId', validate(vehicleUpdateSchema), update)

vehicleRoutes.delete('/', async (req: Request, res: Response) => {

})