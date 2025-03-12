import { TodosKanbanLoader } from "@/components/todo/todos-kanban-loader";
import React from "react";

export default function Loading() {
  return (
    <div className="pt-24">
      <TodosKanbanLoader />;
    </div>
  );
}
