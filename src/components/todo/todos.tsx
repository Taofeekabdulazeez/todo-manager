import { fetchTodos } from "@/server/todo.actions";
import React from "react";
import { TodosKanban } from "./todos-kanban";

export default async function Todos() {
  const todos = await fetchTodos();

  return (
    <div>
      <TodosKanban todos={todos} />
    </div>
  );
}
