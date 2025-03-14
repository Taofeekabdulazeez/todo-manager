"use client";

import { Button } from "@/components/ui/button";
import { ErrorPageProps } from "@/types";

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="h-screen grid place-content-center text-center">
      <h1>{error.message}</h1>
      <p className="mb-6">Click the button below to Troubleshoot</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
