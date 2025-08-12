import { CreateTodoInput, UpdateTodoInput } from "../dtos/todo.dto";
import { ITodo } from "../models/todo.model";
import { TodoRepository } from "../repositories/todo.repository";

export class TodoService {
    private todoRepo = new TodoRepository();

    async createTodo(input: CreateTodoInput) {
        const existingTodo = await this.todoRepo.findByTitle(input.title);
        if (existingTodo) throw new Error("Todo already exist");

        return await this.todoRepo.createTodo(input);
    }

    async getTodos(): Promise<ITodo[] | null> {
        return await this.todoRepo.getAllTodos();
    }

    async updateTodo(id:string, input: UpdateTodoInput) {
        const todo = await this.todoRepo.findById(id);
        if(!todo) throw new Error('Todo doesnot exist');

        return await this.todoRepo.updateTodo(id, input);
    }

    async deleteTodo(id: string){
        const todo = await this.todoRepo.findById(id);
        if(!todo) throw new Error('Todo doesnot exist');
        return await this.todoRepo.deleteTodo(id);
    }
}