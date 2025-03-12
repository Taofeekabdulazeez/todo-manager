"use server";

import { API_URL } from "@/constants";
import { TodoFormState } from "@/hooks/useTodoForm";
import { ApiResponse, Todo } from "@/types";
import { validateTodoFormData } from "@/validations/todo.validations";
import axios from "axios";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

export const fetchTodos = async () => {
  const response = await axios.get(`${API_URL}/todos`);

  const todos = response.data.data as Todo[];

  return todos;
};

export const addTodo = async ({
  data,
}: TodoFormState): Promise<TodoFormState> => {
  console.log(data);
  const validation = validateTodoFormData(data);

  if (!validation.success) return { data, errors: validation.errors };

  try {
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

export const updateTodo = async ({ data }: TodoFormState) => {
  const validation = validateTodoFormData(data);
  console.log(validation.success, validation.errors);

  if (!validation.success) return { data, errors: validation.errors };

  const { id, dueDate: due_date, ...payload } = data;
  format(due_date, "yyyy-MM-dd");

  try {
    const response = await axios.patch<ApiResponse>(
      `${API_URL}/todos/${id}`,
      payload
    );
    const result = response.data.data as Todo;
    return { data: result, errors: null! };
  } catch (error) {
    console.log(error);
    return { data, errors: null! };
  } finally {
    revalidatePath("/todos");
  }
};

export const fetchTodo = async (id: number) => {
  const response = await axios.get(`${API_URL}/todos/${id}`);

  const todo = response.data.data as Todo;

  return todo;
};

export const deleteTodo = async (id: number) => {
  try {
    const response = await axios.delete<ApiResponse>(`${API_URL}/todos/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/todos");
  }
};
