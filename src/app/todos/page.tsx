import { ModeToggle } from "@/components/theme/mode-toggle";
import { TodosKanban } from "@/components/todo/todos-kanban";
import { fetchTodos } from "@/server/todo.actions";

export default async function Todospage() {
  const todos = await fetchTodos();

  return (
    <div className="px-6">
      <h1 className="text-xl text-center font-bold mb-6 mt-3 uppercase">
        Todos
      </h1>
      <div className="flex items-center justify-between mb-6">
        <ModeToggle />
      </div>
      <TodosKanban todos={todos} />
    </div>
  );
}
