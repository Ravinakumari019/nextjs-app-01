import { getTodos } from "@/lib/todo";
import { TodoApp } from "./todo-app";

export async function TodoList() {
  const todos = await getTodos();

  return <TodoApp initialTodos={todos} />;
}
