import Loader from "@/components/common/loader";
import React from "react";

export default function Loading() {
  return (
    <div className="h-screen grid place-items-center">
      <Loader text="Loading Todo" />
    </div>
  );
}
