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

export async function wait(secs = 3000) {
  return await new Promise((resolve) => setTimeout(resolve, secs));
}

export function formatCustomDate(date: Date): string {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day: number = date.getDate();
  const year: number = date.getFullYear();
  const monthName: string = months[date.getMonth()];
  const dayWithSuffix: string = getDayWithSuffix(day);

  return `${monthName} ${dayWithSuffix}, ${year}`;
}

function getDayWithSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}
