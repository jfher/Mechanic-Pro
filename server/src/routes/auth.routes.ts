import { Router } from "express";
import { login, logout, refresh } from "../controllers/auth/auth.controller";


export const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.post("/refresh", refresh);
authRoutes.post("/logout", logout);
