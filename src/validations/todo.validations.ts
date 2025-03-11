import { TodoFormData } from "@/hooks/useTodoForm";

export const validateTodoFormData = (
  state: Partial<Omit<TodoFormData, "id">>
) => {
  const errors: Record<keyof typeof state, string | null> = {
    title: null,
    description: null,
    assignee: null,
    dueDate: null,
    priority: null,
    status: null,
  };

  const textFields: (keyof typeof state)[] = [
    "title",
    "description",
    "assignee",
    "dueDate",
    "priority",
    "status",
  ];

  const priorities: (typeof state)["priority"][] = ["low", "medium", "high"];

  textFields.forEach((field) => {
    if (!state?.[field] || state?.[field] === "")
      errors[field] = `${capitalizeStr(field)} cannot be empty`;
  });

  if (!(state?.dueDate instanceof Date))
    errors.dueDate = "Please select a Due date";

  if (!priorities.includes(state?.priority))
    errors.priority = "Priority can be only Low, Medium or High";

  return {
    success: Object.values(errors).every((e) => e == null),
    errors,
  };
};

const capitalizeStr = (str: string): string => {
  const [first, ...rest] = str.split("");

  return `${first.toUpperCase()}${rest.join("")}`;
};
