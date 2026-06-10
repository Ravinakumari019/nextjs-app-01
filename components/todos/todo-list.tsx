import { fetchTodos } from "@/lib/todo";
import { TodoApp } from "./todo-app";

export async function TodoList() {
  const todos = await fetchTodos();

  return <TodoApp initialTodos={todos} />;
}
