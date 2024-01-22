"use client";

import { createPage } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const ClaimLinktree = () => {
  const { user } = useUser();
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (username === "") {
      toast.error("Username cannot be empty");
    } else {
      if (!user || !user.id) {
        toast.error("You must be logged in to claim a username");
        setUsername("");
        return;
      } else {
        try {
          setIsLoading(true);
          const page = await createPage(username);
          if (!page) {
            toast.error("Username already taken");
          } else {
            toast.success(`You claimed ${username} username`);
            router.push(`/private/${username}`);
          }
        } catch (error: any) {
          toast.error(error);
        } finally {
          setUsername("");
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div className="mt-4 flex max-sm:flex-col items-center gap-2">
      <Input
        disabled={isLoading}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        className="rounded-lg h-16 text-lg"
      />
      <Button
        disabled={isLoading}
        onClick={handleClick}
        className="max-sm:w-full rounded-full h-16 text-lg bg-pink-200 text-black hover:bg-pink-300"
      >
        Claim your LinkTree
      </Button>
    </div>
  );
};
