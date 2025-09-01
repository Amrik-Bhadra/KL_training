import { CreateTodoDTO, UpdateTodoDTO } from "@/dtos/todo.dto";
import { todoRepository } from "@/repositories/todo.repository";

type TodoRepository = typeof todoRepository;

class TodoService {
    private todoRepository: TodoRepository;

    constructor(repository: TodoRepository){
        this.todoRepository = repository;
    }

    async getAllTodos(){
        return await this.todoRepository.findAll();
    }

    async createTodo(todoData: CreateTodoDTO){
        return await this.todoRepository.create(todoData);
    }

    async updateTodo(id: number, todoData: UpdateTodoDTO){
        return await this.todoRepository.update(id, todoData);
    }

    async deleteTodo(id: number){
        return await this.todoRepository.remove(id);
    }
}

export const todoService = new TodoService(todoRepository);