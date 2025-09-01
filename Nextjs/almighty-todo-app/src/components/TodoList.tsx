"use client";

import React, { useState } from "react";
import { Todo } from "@prisma/client";

interface TodoListProps {
  initialTodos: Todo[];
}

const TodoList = ({ initialTodos }: TodoListProps) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState("");

  // function to add todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodoText }),
    });

    if (res.status === 201) {
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    }
  };

  // function to update todo's completion status
  const toggleTodo = async (id: number, completed: boolean) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });

    if (res.ok) {
      const updatedTodo = await res.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    }
  };

  // function to delete todo
  const deleteTodo = async (id: number) => {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });

    if (res.ok) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

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
        {todos.map((todo) => (
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
