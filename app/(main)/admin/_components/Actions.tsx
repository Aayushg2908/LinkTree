"use client";

import { deleteLinkTree } from "@/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateLinktreeModal } from "@/hooks/use-createlinktree-modal";
import { Edit, Trash2 } from "lucide-react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { toast } from "sonner";

const Actions = ({ username }: { username: string }) => {
  const { onOpen } = useCreateLinktreeModal();

  const handleDelete = async () => {
    try {
      await deleteLinkTree(username);
      toast.success("LinkTree deleted successfully!");
    } catch (error: any) {
      toast.error(JSON.stringify(error));
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-2">
        <IoEllipsisHorizontalSharp />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onOpen(username)}
          className="cursor-pointer"
        >
          <Edit className="w-4 h-4 mr-1" /> Change Username
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          className="mt-2 cursor-pointer"
        >
          <Trash2 className="w-4 h-4 mr-1" /> Delete LinkTree
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
