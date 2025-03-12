"use server";

import { API_URL } from "@/constants";
import { TodoFormData, TodoFormState } from "@/hooks/useTodoForm";
import { ApiResponse, Todo } from "@/types";
import { validateTodoFormData } from "@/validations/todo.validations";
import axios from "axios";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

export const fetchTodos = async () => {
  const response = await axios.get(`${API_URL}/todos`);

  const todos = response.data.data as Todo[];

  return todos ?? [];
};

export const addTodo = async (data: TodoFormData): Promise<TodoFormState> => {
  // console.log(data);
  const validation = validateTodoFormData(data);

  if (!validation.success) return { data, errors: validation.errors };

  try {
    const response = await axios.post<ApiResponse<Todo>>(
      `${API_URL}/todos`,
      data
    );
    const result = response.data.data;
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
  format(due_date, "yyyy-MM-dd");

  try {
    const response = await axios.patch<ApiResponse<Todo>>(
      `${API_URL}/todos/${id}`,
      payload
    );
    const result = response.data.data;
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
  const response = await axios.get<ApiResponse<Todo>>(`${API_URL}/todos/${id}`);

  const todo = response.data.data;

  return todo;
};

export const deleteTodo = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const response = await axios.delete<ApiResponse<null>>(
      `${API_URL}/todos/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { data: null, message: "Error: could not delete Todo", status: 400 };
  } finally {
    revalidatePath("/todos");
  }
};
