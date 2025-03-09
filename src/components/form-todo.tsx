import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { ChangeEvent, FormEvent } from "react";
import { TodoFormState, useTodoForm } from "@/hooks/useTodoForm";

type FormTodoProps = {
  closeForm?: () => void;
};

export function FormTodo({ closeForm }: FormTodoProps) {
  const { state, dispatch, handleValueChange } = useTodoForm();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(state);
    // closeForm?.();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-2">
      <LabelInput name="title" state={state} onChange={handleValueChange} />
      <LabelInput
        name="description"
        state={state}
        onChange={handleValueChange}
      />
      <LabelInput name="assignee" state={state} onChange={handleValueChange} />
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="dueDate" className="text-right">
          Due Date
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !state.dueDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {state.dueDate ? (
                format(state.dueDate, "PPP")
              ) : (
                <span>Pick a state.date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={state.dueDate}
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
          onValueChange={(value) =>
            dispatch({
              type: "set/priority",
              payload: value as "low" | "medium" | "high",
            })
          }
          defaultValue="medium"
          className="flex items-center justify-between mt-2"
        >
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
      </div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end mt-4">
        <Button
          type="button"
          onClick={closeForm}
          variant="outline"
          className="cursor-pointer"
        >
          cancel
        </Button>
        <Button type="submit" className="cursor-pointer">
          Add Todo
        </Button>
      </div>
    </form>
  );
}

type LabelInputProps = {
  state: TodoFormState;
  name: "title" | "description" | "assignee";
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

function LabelInput({ state, name, onChange, label }: LabelInputProps) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={name} className="text-right capitalize">
        {label ? label : name}
      </Label>
      <Input
        value={state[name]}
        id={name}
        name={name}
        className="col-span-3"
        onChange={onChange}
      />
    </div>
  );
}
