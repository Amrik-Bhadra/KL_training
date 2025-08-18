import { AuthService } from "../services/auth.services";
import { Request, Response } from "express";

export class AuthController {
    private authService = new AuthService();

    async register(req: Request, res: Response){
        try{
            const { name, email, password, role } = req.body;
            const { user, token } = await this.authService.register({name, email, password, role});
            res.status(201).json({ user, token });
        }catch(error){
            res.status(400).json({ message: error })
        }
    }
}