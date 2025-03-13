import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormTodo } from "./form-todo";
import { useState } from "react";

export function AddTodoDialog() {
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Todo</DialogTitle>
          <DialogDescription>
            Add info to the fields. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <FormTodo closeFormDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}
