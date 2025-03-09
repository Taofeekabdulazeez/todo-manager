import Loader from "@/components/common/loader";
import Todos from "@/components/todos";
import React, { Suspense } from "react";

export default function Todospage() {
  return (
    <div className="px-6">
      <h1 className="text-xl text-center font-bold mb-12">Todos Kanban</h1>
      <Suspense fallback={<Loader />}>
        <Todos />
      </Suspense>
    </div>
  );
}
