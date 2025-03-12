import { CircleCheckBig, TriangleAlert } from "lucide-react";
import React from "react";
import { Toaster } from "sonner";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      style={{ fontFamily: "Montserrat, sans-serif" }}
      icons={{
        success: <CircleCheckBig size={20} className="stroke-green-600" />,
        error: <TriangleAlert size={20} className="stroke-rose-600" />,
      }}
    />
  );
}
