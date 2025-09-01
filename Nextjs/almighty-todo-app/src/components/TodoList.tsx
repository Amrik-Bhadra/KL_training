"use client";

import React, { useState } from "react";
import { Todo } from "@prisma/client";
import useSWR from "swr";

// reusable fetcher function
// SWR uses this function to make the actual api requests
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TodoListProps {
  initialTodos: Todo[];
}

const TodoList = ({ initialTodos }: TodoListProps) => {
  // const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");

  const {
    data: todos,
    error,
    isLoading,
    mutate, // function to update the cache
  } = useSWR("/api/todos", fetcher, {
    //Use the server-fetched data as the initial state
    fallbackData: initialTodos,
  });

  // function to add todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    const optimisticTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Optimistic UI Update: Update the local cache immediately
    mutate([...todos, optimisticTodo], { revalidate: false });
    setNewTodoText("");

    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: optimisticTodo.text }),
    });

    // if (res.status === 201) {
    //   const newTodo = await res.json();
    //   setTodos([...todos, newTodo]);
    //   setNewTodoText("");
    // }

    //  Trigger a revalidation to get the final data from the server
    mutate();
  };

  // function to update todo's completion status
  const toggleTodo = async (id: number, completed: boolean) => {
    const updatedTodos = todos.map((todo: Todo) =>
      todo.id === id ? { ...todo, completed: !completed } : todo
    );

    mutate(updatedTodos, { revalidate: false });

    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });

    // if (res.ok) {
    //   const updatedTodo = await res.json();
    //   setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    // }

    mutate();
  };

  // function to delete todo
  const deleteTodo = async (id: number) => {
    const remainingTodos = todos.filter((todo: Todo) => todo.id !== id);
    mutate(remainingTodos, { revalidate: false });

    await fetch(`/api/todos/${id}`, { method: "DELETE" });

    // if (res.ok) {
    //   setTodos(todos.filter((todo) => todo.id !== id));
    // }

    mutate();
  };

  if (error) return <div>Failed to load todos.</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add new todo"
          className="border p-2 rounded w-full text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id} className="flex items-center gap-4 p-2 border-b">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, todo.completed)}
              className="w-5 h-5"
            />
            <span
              className={todo.completed ? "line-through text-gray-500" : ""}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
