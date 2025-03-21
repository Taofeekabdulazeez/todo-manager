"use server";

import { API_URL } from "@/constants";
import { TodoFormData, TodoFormState } from "@/hooks/useTodoForm";
import http from "@/lib/http";
import { ApiResponse, Todo } from "@/types";
import { validateTodoFormData } from "@/validations/todo.validations";
import { revalidatePath } from "next/cache";

export const fetchTodos = async () => {
  const response = await http.get<Todo[]>(`${API_URL}/todos`);
  const todos = response.data;

  return todos ?? [];
};

export const addTodo = async (data: TodoFormData): Promise<TodoFormState> => {
  const validation = validateTodoFormData(data);

  if (!validation.success) return { data, errors: validation.errors };

  try {
    const response = await http.post<Todo>(`${API_URL}/todos`, data);
    const result = response.data;
    return {
      data: result,
      errors: null!,
      message: "Todo successfully added!",
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    return { data, errors: null! };
  } finally {
    revalidatePath("/todos");
  }
};

export const updateTodo = async (
  data: TodoFormData
): Promise<TodoFormState> => {
  const validation = validateTodoFormData(data);

  if (!validation.success) return { data, errors: validation.errors };

  const { id, dueDate: due_date, ...payload } = data;
  console.log(due_date);

  try {
    const response = await http.patch<Todo>(`${API_URL}/todos/${id}`, payload);
    const result = response.data;
    return {
      data: result,
      errors: null!,
      message: "Todo successfully updated!",
      status: response.status,
    };
  } catch (error) {
    console.log(error);
    return { data, errors: null!, message: "Error: could not update Todo!" };
  } finally {
    revalidatePath("/todos");
  }
};

export const fetchTodo = async (id: number) => {
  const response = await http.get<Todo>(`${API_URL}/todos/${id}`);

  const todo = response.data;

  return todo;
};

export const deleteTodo = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const response = await http.delete<null>(`${API_URL}/todos/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return { data: null, message: "Error: could not delete Todo", status: 400 };
  } finally {
    revalidatePath("/todos");
  }
};
