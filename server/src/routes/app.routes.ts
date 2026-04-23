import { Router } from "express";
import cors from 'cors'

import { userRoutes } from "./user.routes";
import { roleRoutes } from "./role.routes";
import { vehicleRoutes } from "./vehicle.routes";
import { serviceRoutes } from "./service.routes";
import { processRoutes } from "./process.routes";
import { authRoutes } from "./auth.routes";

import { authenticate } from "../middlewares/auth.middleware";


export const router = Router();
router.use(cors({ origin: "http://localhost:5173", credentials: true }));

router.use(`/auth`, authRoutes);
router.use(`/users`, authenticate, userRoutes);
router.use(`/roles`, authenticate, roleRoutes);
router.use(`/vehicles`, authenticate, vehicleRoutes);
router.use(`/services`, authenticate, serviceRoutes);
router.use(`/process`, authenticate, processRoutes);
