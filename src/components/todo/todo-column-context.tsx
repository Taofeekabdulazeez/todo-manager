import { createContext, PropsWithChildren } from "react";

type TodoStatus = "backlog" | "inProgress" | "done";

interface TodoColumnContext {
  status: TodoStatus;
}

const TodoColumnContext = createContext<TodoColumnContext>({ status: null! });

interface TodoColumnProviderProps extends PropsWithChildren {
  status: string;
}

function TodoColumnProvider({ children, status }: TodoColumnProviderProps) {
  return (
    <TodoColumnContext.Provider value={{ status: getMappedStatus(status) }}>
      {children}
    </TodoColumnContext.Provider>
  );
}

function getMappedStatus(status: string): TodoStatus {
  return new Map<string, TodoStatus>()
    .set("In Progress", "inProgress")
    .set("Backlog", "backlog")
    .set("Done", "done")
    .get(status)!;
}

export { TodoColumnProvider, TodoColumnContext };
