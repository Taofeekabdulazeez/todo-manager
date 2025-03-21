import { Calendar as CalendarIcon } from "lucide-react";
import { cn, formatCustomDate } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, ComponentProps } from "react";
import { TodoFormState, useTodoForm } from "@/hooks/useTodoForm";
import { addTodo, updateTodo } from "@/server/todo.actions";
import Loader from "../common/loader";
import { Todo } from "@/types";
import { toast } from "sonner";

type FormTodoProps = {
  todo?: Todo;
  closeFormDialog?: () => void;
};

export function FormTodo({ closeFormDialog, todo = undefined }: FormTodoProps) {
  const isEditSession = !!todo;
  const { state, dispatch, handleValueChange } = useTodoForm(todo);
  const [response, action, isPending] = useActionState(
    isEditSession
      ? updateTodo.bind(null, state.data)
      : addTodo.bind(null, state.data),
    state
  );

  useEffect(() => {
    if (!response.message) return;

    if (response.status === 200)
      toast.success(response.message, { id: response.data?.id });
    else toast.error(response.message, { id: response.data?.id });

    closeFormDialog?.();
  }, [response, closeFormDialog]);

  return (
    <form action={action} className="grid gap-4 py-2">
      <input type="text" hidden name="id" defaultValue={todo?.id} />
      <LabelInput
        name="title"
        state={state}
        onChange={handleValueChange}
        errorMessage={response?.errors?.title}
      />
      <LabelInput
        name="description"
        state={state}
        onChange={handleValueChange}
        errorMessage={response?.errors?.description}
      />
      <LabelInput
        name="assignee"
        state={state}
        onChange={handleValueChange}
        errorMessage={response?.errors?.assignee}
      />
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="dueDate" className="text-right">
          Due Date
        </Label>
        <input
          type="text"
          hidden
          name="dueDate"
          defaultValue={state.data.dueDate as unknown as string}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !state.data.dueDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {state.data.dueDate ? (
                formatCustomDate(state.data.dueDate)
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={state.data.dueDate}
              onSelect={(date) =>
                dispatch({ type: "set/due-date", payload: date! })
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="dueDate" className="text-right">
          Priority
        </Label>
        <RadioGroup
          value={state.data.priority}
          onValueChange={(value) =>
            dispatch({
              type: "set/priority",
              payload: value as "low" | "medium" | "high",
            })
          }
          defaultValue="medium"
          className="flex items-center justify-between mt-2"
        >
          <input
            type="text"
            hidden
            name="priority"
            defaultValue={state.data.priority}
          />
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="r1" />
            <Label htmlFor="r1">Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="r2" />
            <Label htmlFor="r2">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="r3" />
            <Label htmlFor="r3">High</Label>
          </div>
        </RadioGroup>
        {/* <input type="text" hidden name="status" value={"backlog"} /> */}
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-4">
        <Button
          type="button"
          onClick={closeFormDialog}
          variant="outline"
          className="cursor-pointer"
        >
          cancel
        </Button>
        <Button disabled={isPending} type="submit" className="cursor-pointer">
          {isPending ? (
            <Loader text={isEditSession ? "Editing" : "Adding"} />
          ) : (
            `${isEditSession ? "Edit" : "Add"} Todo`
          )}
        </Button>
      </div>
    </form>
  );
}

interface LabelInputProps extends ComponentProps<"input"> {
  state: TodoFormState;
  name: "title" | "description" | "assignee";
  // onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errorMessage?: string | null;
}

function LabelInput(props: LabelInputProps) {
  const { name, state, onChange, label, errorMessage, ...inputProps } = props;
  return (
    <div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={name} className="text-right capitalize">
          {label ? label : name}
        </Label>
        <Input
          value={state.data[name]}
          id={name}
          name={name}
          {...inputProps}
          className="col-span-3"
          onChange={onChange}
          autoComplete="off"
        />
      </div>
      {errorMessage && (
        <div className="grid grid-cols-[1fr_3fr] items-center gap-4 mt-2">
          <span></span>
          <span className="text-xs text-destructive-foreground">
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  );
}
