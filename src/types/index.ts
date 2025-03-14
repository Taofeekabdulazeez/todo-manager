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

export type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export type PageProps = {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
