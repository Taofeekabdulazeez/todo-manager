import { Loader2 } from "lucide-react";

type LoaderProps = {
  text?: string;
};

export default function Loader({ text = "Loading" }: LoaderProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-md font-semibold">{text}</span>
      <Loader2 className="animate-spin" />
    </div>
  );
}
