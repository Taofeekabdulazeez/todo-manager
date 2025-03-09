"use server";

import { Todo } from "@/types";
import axios from "axios";

const API_URL = "https://todoapi-eeb5.onrender.com/api";

export const fetchTodos = async () => {
  const response = await axios.get(`${API_URL}/todos`);

  const todos = response.data.data as Todo[];

  return todos;
};
