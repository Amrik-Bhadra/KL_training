import { todoController } from "@/controllers/todo.controller";

export const GET = todoController.getAll;
export const POST = todoController.create;