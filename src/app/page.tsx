"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="grid place-content-center py-32">
      <h1 className="text-xl font-semibold mb-6">Get Started</h1>
      <Button
        onClick={() => {
          router.push("/todos");
          console.log("clicked");
        }}
        className="cursor-pointer"
      >
        Get started
      </Button>
    </div>
  );
}
