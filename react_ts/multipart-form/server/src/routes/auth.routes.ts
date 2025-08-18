import express from "express";
import { AuthController } from "../controllers/user.controller";
const router = express.Router();

const authController = new AuthController();

router.post('/', )