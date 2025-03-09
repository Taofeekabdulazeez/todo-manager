import { ChangeEvent, useReducer } from "react";

export interface TodoFormState {
  title: string;
  description: string;
  assignee: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  status: string;
}

type Action =
  | {
      type: "set/input-value";
      payload: { key: string; value: string };
    }
  | { type: "set/due-date"; payload: Date }
  | { type: "set/priority"; payload: "low" | "medium" | "high" };

const initialState: TodoFormState = {
  title: "",
  description: "",
  assignee: "",
  dueDate: new Date(),
  priority: "low",
  status: "backlog",
};

function reducer(state: TodoFormState, action: Action): TodoFormState {
  switch (action.type) {
    case "set/input-value":
      return { ...state, [action.payload.key]: action.payload.value };
    case "set/due-date":
      return { ...state, dueDate: action.payload };
    case "set/priority":
      return { ...state, priority: action.payload };
    default:
      return state;
  }
}

export function useTodoForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: "set/input-value",
      payload: { key: event.target.name, value: event.target.value },
    });

  return { state, dispatch, handleValueChange };
}
