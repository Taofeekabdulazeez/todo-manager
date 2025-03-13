export type ApiResponse<T = object> = {
  message: string;
  status: number;
  data: T;
};

export type Todo = {
  id: number;
  title: string;
  description: string;
  assignee: string;
  priority: "low" | "medium" | "high";
  status: "backlog" | "inProgress" | "done";
  dueDate: Date;
  createdAt: Date;
};
