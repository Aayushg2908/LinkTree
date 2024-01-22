"use client";

import { useCreateLinktreeModal } from "@/hooks/use-createlinktree-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { createPage, updateUsername } from "@/actions";
import { useRouter } from "next/navigation";

export const CreateLinkTreeModal = () => {
  const router = useRouter();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const {
    username: existingUsername,
    isOpen,
    onClose,
  } = useCreateLinktreeModal();
  const [username, setUsername] = useState(existingUsername);

  useEffect(() => {
    setUsername(existingUsername);
  }, [existingUsername]);

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
          if (existingUsername) {
            const updatedUsername = await updateUsername(
              existingUsername,
              username
            );
            if (!updatedUsername) {
              toast.error("Username already taken");
            } else {
              toast.success(`Username updated to ${updatedUsername}`);
              onClose();
            }
          } else {
            const page = await createPage(username);
            if (!page) {
              toast.error("Username already taken");
            } else {
              toast.success(`You claimed ${username} username`);
              onClose();
              router.push(`/private/${username}`);
            }
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {existingUsername ? "Update Username" : "Create LinkTree"}
          </DialogTitle>
          <DialogDescription>
            {existingUsername
              ? "Update your username"
              : "Create a unique username for your LinkTree"}
          </DialogDescription>
        </DialogHeader>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          placeholder="Enter your username"
          className="rounded-full mt-4"
        />
        <Button
          onClick={handleClick}
          disabled={isLoading}
          className="rounded-full bg-purple-700 hover:bg-purple-600"
        >
          {existingUsername ? "Update username" : "Claim your LinkTree"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
