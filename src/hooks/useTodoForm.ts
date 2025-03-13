import { TodoColumnContext } from "@/components/todo/todo-column-context";
import { Todo } from "@/types";
import { ChangeEvent, use, useReducer } from "react";

export type TodoFormData = {
  id?: number;
  title: string;
  description: string;
  assignee: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  status: "backlog" | "inProgress" | "done";
};

export interface TodoFormState {
  data: TodoFormData;
  message?: string;
  status?: number;
  errors: Record<keyof Omit<TodoFormData, "id">, string | null>;
}

type Action =
  | {
      type: "set/input-value";
      payload: { key: string; value: string };
    }
  | { type: "set/due-date"; payload: Date }
  | { type: "set/priority"; payload: "low" | "medium" | "high" };

const initialState: TodoFormState = {
  data: {
    id: null!,
    title: "",
    description: "",
    assignee: "",
    dueDate: new Date(),
    priority: "low",
    status: "backlog",
  },
  errors: {
    title: null,
    description: null,
    assignee: null,
    dueDate: null,
    priority: null,
    status: null,
  },
  message: undefined,
  status: undefined,
};

function reducer(state: TodoFormState, action: Action): TodoFormState {
  switch (action.type) {
    case "set/input-value":
      return {
        ...state,
        data: { ...state.data, [action.payload.key]: action.payload.value },
      };
    case "set/due-date":
      return {
        ...state,
        data: { ...state.data, dueDate: action.payload },
      };
    case "set/priority":
      return { ...state, data: { ...state.data, priority: action.payload } };
    default:
      return state;
  }
}

export function useTodoForm(todo?: Todo) {
  const initialValue: TodoFormState = {
    errors: initialState.errors,
    data: todo!,
  };
  const context = use(TodoColumnContext);

  const [state, dispatch] = useReducer(
    reducer,
    todo
      ? initialValue
      : {
          ...initialState,
          data: { ...initialState.data, status: context.status },
        }
  );

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "set/input-value",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  return { state, dispatch, handleValueChange };
}
