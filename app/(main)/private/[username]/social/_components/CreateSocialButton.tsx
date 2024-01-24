"use client";

import { Button } from "@/components/ui/button";
import { useCreateSocialButtonModal } from "@/hooks/use-createsocialbutton-modal";
import { PlusIcon } from "lucide-react";

export const CreateSocialButton = ({ username }: { username: string }) => {
  const { onOpen } = useCreateSocialButtonModal();

  return (
    <Button
      onClick={() => onOpen(username)}
      size="lg"
      className="w-full bg-purple-700 hover:bg-purple-600 rounded-full"
    >
      <PlusIcon className="mr-1 w-5 h-5" /> Add Social Button
    </Button>
  );
};
