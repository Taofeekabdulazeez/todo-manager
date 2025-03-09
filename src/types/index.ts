export type ApiResponse<T = object> = {
  message: string;
  status: number;
  data: T;
};

export type Todo = {
  id: number;
  title: string;
  descripton: string;
  assignee: string;
  priority: string;
  status: string;
  dueDate: Date;
  createdAt: Date;
};
