"use server";

import { TodoFormData, TodoFormState } from "@/hooks/useTodoForm";
import { ApiResponse, Todo } from "@/types";
import { validateTodoForm } from "@/validations/todo.validations";
import axios from "axios";
import { revalidatePath } from "next/cache";

const API_URL = "https://todoapi-eeb5.onrender.com/api";

export const fetchTodos = async () => {
  const response = await axios.get(`${API_URL}/todos`);

  const todos = response.data.data as Todo[];

  return todos;
};

export const addTodo = async (
  prevState: TodoFormState,
  formData: FormData
): Promise<TodoFormState> => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const assignee = formData.get("assignee") as string;
  const dueDate = formData.get("dueDate") as string;
  const priority = formData.get("priority") as TodoFormData["priority"];

  const data: TodoFormData = {
    title,
    description,
    assignee,
    dueDate: new Date(dueDate),
    priority,
    status: prevState.data.status,
  };

  console.log(data);

  const validation = validateTodoForm(data);
  console.log(validation.success);

  if (!validation.success) return { data, errors: validation.errors };

  try {
    // await wait();
    const response = await axios.post<ApiResponse>(`${API_URL}/todos`, data);
    const result = response.data.data as Todo;
    return { data: result, errors: null! };
  } catch (error) {
    console.log(error);
    return { data, errors: null! };
  } finally {
    revalidatePath("/todos", "layout");
  }
};
