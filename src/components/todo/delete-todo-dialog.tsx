import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteTodo } from "@/server/todo.actions";
import { Trash2 } from "lucide-react";
import { useActionState, startTransition, useEffect, useState } from "react";
import Loader from "../common/loader";
import { toast } from "sonner";

type DeleteTodoDialogProps = {
  id: number;
};

export function DeleteTodoDialog({ id }: DeleteTodoDialogProps) {
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);
  const [data, action, isDeleting] = useActionState(
    deleteTodo.bind(null, id),
    null
  );

  useEffect(() => {
    if (data?.message) {
      closeDialog();
      toast(data.message);
    }
  }, [data]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="ghost" size="icon">
          <Trash2
            size={16}
            className="stroke-muted-foreground cursor-pointer"
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
          <span>{data?.message}</span>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={() => startTransition(action)}
          >
            {isDeleting ? <Loader text="Deleting" /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
