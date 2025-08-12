import { TodoController } from "../controllers/todo.controller";
import express from "express";
const router = express.Router();

const todoController = new TodoController();

router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;