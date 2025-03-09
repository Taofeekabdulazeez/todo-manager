"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as Kanban from "@/components/ui/kanban";
import { Todo } from "@/types";
import { GripVertical } from "lucide-react";
import * as React from "react";
import { format } from "date-fns";
import { serializeTodos } from "@/lib/utils";

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

  return (
    <Kanban.Root
      value={columns}
      onValueChange={setColumns}
      getItemValue={(item) => item.id}
    >
      <Kanban.Board className="grid auto-rows-fr grid-cols-3">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <TaskColumn key={columnValue} value={columnValue} tasks={tasks} />
        ))}
      </Kanban.Board>
      <Kanban.Overlay>
        {({ value, variant }) => {
          if (variant === "column") {
            const tasks = columns[value] ?? [];

            return <TaskColumn value={value} tasks={tasks} />;
          }

          const task = Object.values(columns)
            .flat()
            .find((task) => task.id === value);

          if (!task) return null;

          return <TaskCard task={task} />;
        }}
      </Kanban.Overlay>
    </Kanban.Root>
  );
}

interface TaskCardProps
  extends Omit<React.ComponentProps<typeof Kanban.Item>, "value"> {
  task: Todo;
}

function TaskCard({ task, ...props }: TaskCardProps) {
  return (
    <Kanban.Item key={task.id} value={task.id} asChild {...props}>
      <div className="rounded-md border bg-card p-3 shadow-xs">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="line-clamp-1 font-medium text-sm">
              {task.title}
            </span>
            <Badge
              variant={
                task.priority === "high"
                  ? "destructive"
                  : task.priority === "medium"
                  ? "default"
                  : "secondary"
              }
              className="pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize"
            >
              {task.priority}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            {task.assignee && (
              <div className="flex items-center gap-1">
                <div className="size-2 rounded-full bg-primary/20" />
                <span className="line-clamp-1">{task.assignee}</span>
              </div>
            )}
            {task.dueDate && (
              <time className="text-[10px] tabular-nums">
                {format(task.dueDate, "yy")}
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
  tasks: Todo[];
}

function TaskColumn({ value, tasks, ...props }: TaskColumnProps) {
  return (
    <Kanban.Column value={value} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{COLUMN_TITLES[value]}</span>
          <Badge variant="secondary" className="pointer-events-none rounded-sm">
            {tasks.length}
          </Badge>
        </div>
        <Kanban.ColumnHandle asChild>
          <Button variant="ghost" size="icon">
            <GripVertical className="h-4 w-4" />
          </Button>
        </Kanban.ColumnHandle>
      </div>
      <div className="flex flex-col gap-2 p-0.5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} asHandle />
        ))}
      </div>
    </Kanban.Column>
  );
}
