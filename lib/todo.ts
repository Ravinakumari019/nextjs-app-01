import { prisma } from "@/lib/db";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

type TodoRecord = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export function serializeTodo(todo: TodoRecord): Todo {
  return {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
  };
}

export async function getTodos(): Promise<Todo[]> {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return todos.map(serializeTodo);
}
