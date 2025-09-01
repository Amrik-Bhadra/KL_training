import { NextResponse } from "next/server";
import { todoService } from "@/services/todo.services";
import { createTodoSchema, updateTodoSchema } from "@/dtos/todo.dto";

type TodoService = typeof todoService;
interface RouteContext {
    params: {
        id: string;
    }
}

class TodoController {
    private todoService: TodoService;
    constructor(todoService: TodoService) {
        this.todoService = todoService;
    }

    getAll = async () => {
        try {
            const todos = await this.todoService.getAllTodos();
            return NextResponse.json(todos);
        } catch (error) {
            console.log('Error while fetching todos: ', error);
            return NextResponse.json({ message: 'Failed to fetch todos' }, { status: 500 });
        }
    }

    create = async (request: Request) => {
        try {
            const body = await request.json();
            const validation = createTodoSchema.safeParse(body);

            if (!validation.success) {
                return NextResponse.json({ message: validation.error.issues }, { status: 400 });
            }

            const newTodo = await this.todoService.createTodo(validation.data);
            return NextResponse.json(newTodo, { status: 201 });
        } catch (error) {
            console.log('Error while creating todo: ', error);
            return NextResponse.json({ message: 'Failed to create todo' }, { status: 500 });
        }
    }

    update = async (req: Request, context: RouteContext) => {
        try {
            const id = parseInt(context.params.id);
            const body = await req.json();
            const validation = updateTodoSchema.safeParse(body);

            if (!validation.success) {
                return NextResponse.json({ message: validation.error.issues }, { status: 400 });
            }

            const updatedTodo = await this.todoService.updateTodo(id, validation.data);
            return NextResponse.json(updatedTodo);
        } catch (error) {
            console.log('Error while updating todo:', error);
            return NextResponse.json({ message: 'Failed to update todo' }, { status: 500 });
        }
    }

    delete = async (req: Request, context: RouteContext) => {
        try {
            const id = parseInt(context.params.id);
            await this.todoService.deleteTodo(id);
            return NextResponse.json({ message: 'Todo deleted successfully' });
        } catch (error) {
            console.log('Error while deleting todo:', error);
            return NextResponse.json({ message: 'Failed to delete todo' }, { status: 500 });
        }
    }
}

export const todoController = new TodoController(todoService);