import clsx from "clsx";
import { BadgeCheck, BadgeInfo, Hourglass } from "lucide-react";
import { Badge } from "../ui/badge";

type Tag_Props = {
  status:
    | "Done"
    | "In Progress"
    | "Backlog"
    | "withdrawn"
    | "retaking"
    | string;
  className?: string;
  num_items?: number;
};

export function TodoStatusTag({ status, className, num_items = 0 }: Tag_Props) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={clsx(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-2xl text-xs font-medium capitalize",
          {
            "bg-green-100   dark:bg-green-800 text-green-800 dark:text-green-100":
              status === "Done",
            "bg-rose-100 dark:bg-rose-800 text-rose-900 dark:text-rose-100":
              status === "pending",
            "bg-sky-100 dark:bg-sky-800 text-sky-900 dark:text-aky-100":
              status === "In Progress",
            "bg-amber-100 dark:bg-amber-800 text-amber-900 dark:text-amber-100":
              status === "Backlog",
          },
          className
        )}
      >
        <Icon status={status} />
        {status}
      </span>
      <Badge
        variant="secondary"
        className={clsx("pointer-events-none rounded-sm", {
          "dark:bg-green-100  bg-green-800 darK:text-green-800 text-green-100":
            status === "Done",
          "dark:bg-rose-100 bg-rose-800 dark:text-rose-900 text-rose-100":
            status === "pending",
          "dark:bg-sky-100 bg-sky-800 dark:text-sky-900 text-sky-100":
            status === "In Progress",
          "dark:bg-amber-100 bg-amber-800 dark:text-amber-900 text-amber-100":
            status === "Backlog",
        })}
      >
        {num_items}
      </Badge>
    </div>
  );
}

const Icon = ({ status }: Tag_Props) => {
  switch (status) {
    case "Done":
      return <BadgeCheck size={16} />;
    case "Backlog":
      return <BadgeInfo size={16} />;
    case "In Progress":
      return <span className="time-loader"></span>;
    case "pending":
      return <Hourglass size={16} />;
  }
};
