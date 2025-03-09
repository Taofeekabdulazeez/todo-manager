import { Todo } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serializeTodos(data: Todo[]) {
  const todos = <Record<string, Todo[]>>{
    backlog: [],
    inProgress: [],
    done: [],
  };

  data.forEach((todo) => {
    if (todo.status === "backlog") todos.backlog.push(todo);
    else if (todo.status === "inProgress") todos.inProgress.push(todo);
    else todos.done.push(todo);
  });

  return todos;
}
