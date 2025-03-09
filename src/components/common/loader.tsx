import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-md font-semibold">Loading</span>
      <Loader2 className="animate-spin" />
    </div>
  );
}
