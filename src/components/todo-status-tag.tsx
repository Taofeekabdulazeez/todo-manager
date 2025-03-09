import clsx from "clsx";
import { BadgeCheck, BadgeInfo, Hourglass } from "lucide-react";

type Tag_Props = {
  status:
    | "Done"
    | "In Progress"
    | "Backlog"
    | "withdrawn"
    | "retaking"
    | string;
  className?: string;
};

export function TodoStatusTag({ status, className }: Tag_Props) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-2xl text-xs font-medium capitalize",
        {
          "bg-green-100   dark:bg-green-800 text-green-800 dark:text-green-100":
            status === "Done",
          "bg-rose-100 dark:bg-rose-800 text-rose-900 dark:text-rose-100":
            status === "Backlog",
          "bg-sky-100 dark:bg-sky-800 text-sky-900 dark:text-aky-100":
            status === "In Progress",
          "bg-amber-100 dark:bg-amber-800 text-amber-900 dark:text-amber-100":
            status === "pending",
        },
        className
      )}
    >
      <Icon status={status} />
      {status}
    </span>
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
