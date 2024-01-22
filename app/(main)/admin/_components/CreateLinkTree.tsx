"use client";

import { Button } from "@/components/ui/button";
import { useCreateLinktreeModal } from "@/hooks/use-createlinktree-modal";

export const CreateLinkTree = () => {
  const { onOpen } = useCreateLinktreeModal();

  return (
    <Button
      onClick={() => onOpen()}
      size="lg"
      className="rounded-full text-lg bg-purple-700 hover:bg-purple-600"
    >
      Create LinkTree
    </Button>
  );
};
