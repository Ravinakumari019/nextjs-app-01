import { Suspense } from "react";
import { TodoList } from "@/components/todos/todo-list";

export const dynamic = "force-dynamic";

function TodoListFallback() {
  return (
    <div className="todo-panel w-full max-w-xl animate-pulse space-y-4">
      <div className="h-12 rounded-xl bg-blue-500/10" />
      <div className="h-48 rounded-xl bg-blue-500/5" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.18),_transparent_55%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />

      <main className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-10">
        <header className="text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400/70">
            Task Manager
          </p>
          <h1 className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
            Todos
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Server-rendered from the database. Client-powered interactions.
          </p>
        </header>

        <Suspense fallback={<TodoListFallback />}>
          <TodoList />
        </Suspense>
      </main>
    </div>
  );
}
