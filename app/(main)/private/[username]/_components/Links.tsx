"use client";

import { deleteLink } from "@/actions";
import { Link as PrismaLink } from "@prisma/client";
import { GripVertical, LinkIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export const Links = ({
  links,
  username,
}: {
  links: PrismaLink[];
  username: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteLink(id, username);
      toast.success("Link deleted successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    toast.loading("Deleting link...");
  }

  return (
    <div className="px-4 w-full flex flex-col items-center mb-4">
      {links.length > 0 ? (
        <div className="sm:px-4 w-full flex flex-col items-center gap-y-4">
          {links.map((link) => (
            <div
              key={link.id}
              className="bg-white h-[150px] w-full lg:w-[550px] rounded-3xl flex items-center justify-between px-4 shadow-md transition-all"
            >
              <div>
                <GripVertical className="cursor-pointer" />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-xl">{link.name}</h1>
                <Link
                  href={`https://${link.url}`}
                  target="_blank"
                  className="font-semibold flex items-center gap-1 text-blue-500"
                >
                  <LinkIcon className="w-4 h-4" /> {link.url}
                </Link>
              </div>
              <Trash2
                onClick={() => handleDelete(link.id)}
                className="cursor-pointer text-red-500"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-2xl">
          No links yet! Create One...
        </div>
      )}
    </div>
  );
};
