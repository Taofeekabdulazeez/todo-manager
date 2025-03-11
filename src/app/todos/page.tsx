import Todos from "@/components/todo/todos";
import { TodosKanbanLoader } from "@/components/todo/todos-kanban-loader";
import React, { Suspense } from "react";

export default function Todospage() {
  return (
    <div className="px-6">
      <h1 className="text-xl text-center font-bold mb-12 mt-3 uppercase">
        Todos
      </h1>
      <Suspense fallback={<TodosKanbanLoader />}>
        <Todos />
      </Suspense>
    </div>
  );
}
