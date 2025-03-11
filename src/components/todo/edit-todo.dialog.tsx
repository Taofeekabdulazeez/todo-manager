import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormTodo } from "./form-todo";
import React, { useEffect, useState } from "react";
import { Todo } from "@/types";

type EditTodoDialogProps = {
  todo: Todo;
  ref: React.RefObject<HTMLDivElement>;
};

export function EditTodoDialog({ todo, ref }: EditTodoDialogProps) {
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);

  useEffect(() => {
    if (open) {
      console.log(ref.current);
      // ref.current.style.display = "none";
    }
  }, [ref, open]);

  // console.log(ref.current);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SquarePen
            size={16}
            className="stroke-muted-foreground cursor-pointer"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] z-50">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogDescription>
            Add info to the fields. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <FormTodo todo={todo} closeForm={closeDialog} />
        {/* <DialogFooter></DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
