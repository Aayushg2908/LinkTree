"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const ClaimLinktree = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleClick = () => {
    if (username === "") {
      toast.error("Username cannot be empty");
    } else {
      toast.success(`You claimed ${username} username`);
      setUsername("");
    }
  };

  return (
    <div className="mt-4 flex max-sm:flex-col items-center gap-2">
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        className="rounded-lg h-16 text-lg"
      />
      <Button
        onClick={handleClick}
        className="max-sm:w-full rounded-full h-16 text-lg bg-pink-200 text-black hover:bg-pink-300"
      >
        Claim your LinkTree
      </Button>
    </div>
  );
};
