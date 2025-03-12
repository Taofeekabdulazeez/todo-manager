import {
  AlertDialog,
  AlertDialogAction,
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
import { useActionState } from "react";
import Loader from "../common/loader";

type DeleteTodoDialogProps = {
  id: number;
};

export function DeleteTodoDialog({ id }: DeleteTodoDialogProps) {
  const [data, action, isPending] = useActionState(
    deleteTodo.bind(null, id),
    null
  );

  console.log(isPending);

  console.log(data);

  return (
    <AlertDialog>
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
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={async () => action()}
          >
            {isPending ? <Loader text="Deleting" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
