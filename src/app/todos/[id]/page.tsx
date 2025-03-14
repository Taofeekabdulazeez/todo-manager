import { fetchTodo } from "@/server/todo.actions";
import { PageProps } from "@/types";
import { notFound } from "next/navigation";
import React from "react";

export default async function TodoPage({ params }: PageProps) {
  const { id } = await params;

  const todo = await fetchTodo(Number(id));

  if (!todo) return notFound();

  return (
    <div className="grid place-items-center">
      <code>{JSON.stringify(todo, null, 2)}</code>
    </div>
  );
}
