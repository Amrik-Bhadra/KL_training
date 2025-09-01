import TodoList from "@/components/TodoList";
import prisma from "@/lib/prisma";

async function getTodos() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
  return todos;
}

async function HomePage() {
  const initialTodos = await getTodos();
  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        TODO App
      </h1>
      <TodoList initialTodos={initialTodos} />
    </main>
  );
}

export default HomePage;
