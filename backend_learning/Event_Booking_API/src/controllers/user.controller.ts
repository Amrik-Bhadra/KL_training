import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.services";
import { createUserSchema } from "../dtos/user.dto";

export class UserController{
    private userService = new UserService();

    createUser = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const parsed = createUserSchema.safeParse(req.body);
            if(!parsed.success){
                return res.status(400).json({ errors: parsed.error.issues  });
            }

            const user = await this.userService.createUser(parsed.data);
            return res.status(201).json(user);
        }catch(error){
            next(error);
        }
    }

    getAllUsers = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const users = await this.userService.getAllUsers();
            res.status(200).json(users); 
        }catch(error){
            next(error);
        }
    }
}