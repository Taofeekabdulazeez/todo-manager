"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Kanban from "@/components/ui/kanban";
import { Todo } from "@/types";
import { GripVertical } from "lucide-react";
import * as React from "react";
import { format } from "date-fns";
import { serializeTodos } from "@/lib/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { TodoStatusTag } from "./todo-status-tag";

const COLUMN_TITLES: Record<string, string> = {
  backlog: "Backlog",
  inProgress: "In Progress",
  review: "Review",
  done: "Done",
};

type TodosKanbanProps = {
  todos: Todo[];
};

export function TodosKanban({ todos }: TodosKanbanProps) {
  const [columns, setColumns] = React.useState<Record<string, Todo[]>>(
    serializeTodos(todos)
  );

  const handleValueChange = (cols: Record<UniqueIdentifier, Todo[]>) => {
    console.log(cols);
    setColumns(cols);
  };

  return (
    <Kanban.Root
      value={columns}
      onValueChange={handleValueChange}
      getItemValue={(item) => item.id}
      // onDragPending={() => console.log("Dragging is happpening")}
      // onDragStart={() => console.log("Dragging has started")}
      // onDragEnd={() => console.log("Dragging has ended")}
      // onDragCancel={() => console.log("Cancelled")}
    >
      <Kanban.Board className="grid auto-rows-fr grid-cols-3">
        {Object.entries(columns).map(([columnValue, todos]) => (
          <TodoColumn key={columnValue} value={columnValue} todos={todos} />
        ))}
      </Kanban.Board>
      <Kanban.Overlay>
        {({ value, variant }) => {
          if (variant === "column") {
            const todos = columns[value] ?? [];

            return <TodoColumn value={value} todos={todos} />;
          }

          const todo = Object.values(columns)
            .flat()
            .find((todo) => todo.id === value);

          if (!todo) return null;

          return <TodoCard todo={todo} />;
        }}
      </Kanban.Overlay>
    </Kanban.Root>
  );
}

interface TodoCardProps
  extends Omit<React.ComponentProps<typeof Kanban.Item>, "value"> {
  todo: Todo;
}

function TodoCard({ todo, ...props }: TodoCardProps) {
  return (
    <Kanban.Item key={todo.id} value={todo.id} asChild {...props}>
      <div className="rounded-md border bg-card p-3 shadow-xs">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="line-clamp-1 font-medium text-sm">
              {todo.title}
            </span>
            <Badge
              variant={
                todo.priority === "high"
                  ? "destructive"
                  : todo.priority === "medium"
                  ? "default"
                  : "secondary"
              }
              className="pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize"
            >
              {todo.priority}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            {todo.assignee && (
              <div className="flex items-center gap-1">
                <div className="size-2 rounded-full bg-primary/20" />
                <span className="line-clamp-1">{todo.assignee}</span>
              </div>
            )}
            {todo.dueDate && (
              <time className="text-[10px] tabular-nums">
                {format(todo.dueDate, "MMMM do, yyyy")}
              </time>
            )}
          </div>
        </div>
      </div>
    </Kanban.Item>
  );
}

interface TaskColumnProps
  extends Omit<React.ComponentProps<typeof Kanban.Column>, "children"> {
  todos: Todo[];
}

function TodoColumn({ value, todos, ...props }: TaskColumnProps) {
  return (
    <Kanban.Column value={value} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">
            {
              <TodoStatusTag
                status={COLUMN_TITLES[value]}
                num_items={todos.length}
              />
            }
          </span>
        </div>
        <Kanban.ColumnHandle asChild>
          <Button variant="ghost" size="icon">
            <GripVertical className="h-4 w-4" />
          </Button>
        </Kanban.ColumnHandle>
      </div>
      <div className="flex flex-col gap-2 p-0.5">
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} asHandle />
        ))}
      </div>
    </Kanban.Column>
  );
}
