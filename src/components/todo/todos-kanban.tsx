"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Kanban from "@/components/ui/kanban";
import { Todo } from "@/types";
import { Calendar, GripVertical } from "lucide-react";
import * as React from "react";
import { formatCustomDate, serializeTodos } from "@/lib/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { TodoStatusTag } from "./todo-status-tag";
import { AddTodoDialog } from "./add-todo-dialog";
import { EditTodoDialog } from "./edit-todo.dialog";
import { DeleteTodoDialog } from "./delete-todo-dialog";
import { TodoColumnProvider } from "./todo-column-context";

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
  const values = React.useMemo(() => serializeTodos(todos), [todos]);
  const [columns, setColumns] = React.useState<Record<string, Todo[]>>(values);

  React.useEffect(() => setColumns(values), [values]);

  const handleValueChange = (columns: Record<UniqueIdentifier, Todo[]>) => {
    console.log(columns);
    setColumns(columns);
  };

  return (
    <Kanban.Root
      value={columns}
      onValueChange={handleValueChange}
      getItemValue={(item) => item.id}
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
  const ref = React.useRef<HTMLDivElement>(null!);

  return (
    <Kanban.Item ref={ref} key={todo.id} value={todo.id} asChild {...props}>
      <div className="rounded-md border bg-card p-3 shadow-xs">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="line-clamp-1 font-medium text-sm">
                {todo.title}
              </span>
              <EditTodoDialog todo={todo} ref={ref} />
              <DeleteTodoDialog id={todo.id} />
            </div>
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
              <time className="text-xs tabular-nums flex items-center gap-1">
                <Calendar size={12} /> {formatCustomDate(todo.dueDate)}
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
        <TodoColumnProvider status={COLUMN_TITLES[value]}>
          <AddTodoDialog />
        </TodoColumnProvider>
      </div>
    </Kanban.Column>
  );
}
