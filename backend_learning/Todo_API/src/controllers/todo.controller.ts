import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todo.services";
import { createTodoSchema, updateTodoSchema } from "../dtos/todo.dto";

export class TodoController {
    private todoService = new TodoService();

    createTodo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = createTodoSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ errors: parsed.error.issues });
            }

            const todo = await this.todoService.createTodo(parsed.data);
            return res.status(201).json({ message: 'Todo created successfully!', data: todo });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    updateTodo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = updateTodoSchema.safeParse(req.body);
            if (!parsed.success) return res.status(400).json({ errors: parsed.error.issues });

            const { id } = req.params;
            const updatedTodo = await this.todoService.updateTodo(id, parsed.data);
            res.status(200).json({ message: 'Todo updated successfully!', data: updatedTodo });
        } catch (err) {
            next(err);
        }
    }

    deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.todoService.deleteTodo(id);
            res.status(200).json({ message: 'Todo deleted successfully!' })
        } catch (err) {
            next(err);
        }
    }

    getTodos = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const todos = await this.todoService.getTodos();
            res.status(200).json({ data: todos });
        }catch(err){
            next(err);
        }
    }
}