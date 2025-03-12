import { TodosKanban } from "@/components/todo/todos-kanban";
import { fetchTodos } from "@/server/todo.actions";

export default async function Todospage() {
  const todos = await fetchTodos();

  return (
    <div className="px-6">
      <h1 className="text-xl text-center font-bold mb-12 mt-3 uppercase">
        Todos
      </h1>
      <TodosKanban todos={todos} />
    </div>
  );
}
