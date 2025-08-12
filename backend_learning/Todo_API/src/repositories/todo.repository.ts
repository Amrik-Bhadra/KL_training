import { ITodo, TodoModel } from "../models/todo.model";

export class TodoRepository {
    async createTodo(todo: Partial<ITodo>): Promise<ITodo> {
        const newTodo = new TodoModel(todo);
        return await newTodo.save();
    }

    async getAllTodos(): Promise<ITodo[]> {
        return await TodoModel.find();
    }

    async updateTodo(id: string, updateData: Partial<ITodo>): Promise<ITodo | null> {
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        return updatedTodo;
    }

    async deleteTodo(id: string): Promise<ITodo | null> {
        return await TodoModel.findByIdAndDelete(id);
    }

    async findByTitle(title: string): Promise<ITodo | null> {
        return await TodoModel.findOne({ title });
    }

    async findById(id: string): Promise<ITodo | null> {
        return await TodoModel.findById(id);
    }
}