import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client/extension";
import { CreateTodoDTO, UpdateTodoDTO } from "@/dtos/todo.dto";

class TodoRepository {
    private prisma: PrismaClient;

    constructor(prismaInstance: PrismaClient) {
        this.prisma = prismaInstance;
    }

    async findAll() {
        return await this.prisma.todo.findMany({ orderBy: { createdAt: 'asc' } });
    }

    async create(todoData: CreateTodoDTO) {
        return await this.prisma.todo.create({ data: todoData });
    }

    async update(id: number, todoData: UpdateTodoDTO) {
        return await this.prisma.todo.update({ where: { id }, data: todoData });
    }

    async remove(id: number) {
        return await this.prisma.todo.delete({ where: { id } });
    }
}

export const todoRepository = new TodoRepository(prisma);