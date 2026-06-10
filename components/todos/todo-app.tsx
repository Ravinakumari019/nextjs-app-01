"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Todo } from "@/lib/todo";

type TodoAppProps = {
  initialTodos: Todo[];
};

export function TodoApp({ initialTodos }: TodoAppProps) {
  const router = useRouter();
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);

  async function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = title.trim();
    if (!trimmed || pending) {
      return;
    }

    setPending(true);

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmed }),
      });
      const json = await res.json();

      if (json.success) {
        setTodos((current) => [json.data, ...current]);
        setTitle("");
        router.refresh();
      }
    } finally {
      setPending(false);
    }
  }

  async function toggleTodo(id: string, completed: boolean) {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    const json = await res.json();

    if (json.success) {
      setTodos((current) =>
        current.map((todo) => (todo.id === id ? json.data : todo)),
      );
      router.refresh();
    }
  }

  async function deleteTodo(id: string) {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    const json = await res.json();

    if (json.success) {
      setTodos((current) => current.filter((todo) => todo.id !== id));
      router.refresh();
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="todo-panel w-full max-w-xl space-y-6">
      <form onSubmit={handleAdd} className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a new task..."
          disabled={pending}
          className="todo-input flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all"
        />
        <button
          type="submit"
          disabled={pending || !title.trim()}
          className="todo-btn rounded-xl px-5 py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add
        </button>
      </form>

      <div className="flex items-center justify-between px-1 text-xs uppercase tracking-widest text-slate-500">
        <span>{todos.length} tasks</span>
        <span className="text-blue-400/80">{completedCount} done</span>
      </div>

      {todos.length === 0 ? (
        <p className="rounded-xl border border-dashed border-blue-500/20 py-12 text-center text-sm text-slate-500">
          No todos yet. Add your first task above.
        </p>
      ) : (
        <ul className="todo-list divide-y divide-blue-500/10 rounded-xl">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item flex items-center gap-3 px-4 py-3.5">
              <label className="relative flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(event) =>
                    toggleTodo(todo.id, event.target.checked)
                  }
                  className="peer sr-only"
                />
                <span
                  className={`todo-checkbox flex size-5 items-center justify-center rounded-md border transition-all ${
                    todo.completed
                      ? "border-blue-400 bg-blue-500/20"
                      : "border-blue-500/35"
                  }`}
                >
                  <svg
                    className={`size-3 text-blue-300 transition-opacity ${
                      todo.completed ? "opacity-100" : "opacity-0"
                    }`}
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </label>

              <span
                className={
                  todo.completed
                    ? "flex-1 text-sm text-slate-500 line-through"
                    : "flex-1 text-sm text-slate-200"
                }
              >
                {todo.title}
              </span>

              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                className="rounded-lg px-2.5 py-1 text-xs text-red-400/80 transition-colors hover:bg-red-500/10 hover:text-red-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
