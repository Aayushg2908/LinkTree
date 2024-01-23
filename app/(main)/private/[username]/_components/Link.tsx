import { Link as PrismaLink } from "@prisma/client";
import {
  EditIcon,
  GripVertical,
  LinkIcon,
  Trash2,
  XCircle,
} from "lucide-react";
import { deleteLink, updateName, updateUrl } from "@/actions";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LinkCard = ({
  link,
  username,
}: {
  link: PrismaLink;
  username: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingLink, setIsUpdatingLink] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [changedName, setChangedName] = useState(link.name);
  const [changedUrl, setChangedUrl] = useState(link.url);

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

  const handleUpdateName = async (name: string) => {
    if (!name) {
      return toast.error("Name cannot be empty!");
    } else {
      try {
        setIsUpdatingLink(true);
        await updateName(name, link.id, username);
        setIsEditingName(false);
        toast.success("Name updated successfully");
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setIsUpdatingLink(false);
      }
    }
  };

  const handleUpdateUrl = async (url: string) => {
    if (!url) {
      return toast.error("Url cannot be empty!");
    } else {
      try {
        setIsUpdatingLink(true);
        await updateUrl(url, link.id, username);
        setIsEditingUrl(false);
        toast.success("Url updated successfully");
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setIsUpdatingLink(false);
      }
    }
  };

  if (isLoading) {
    toast.loading("Deleting link...");
  }
  return (
    <div
      key={link.id}
      className="bg-white h-[150px] w-full lg:w-[550px] rounded-3xl flex items-center justify-between px-4 shadow-md transition-all"
    >
      <div>
        <GripVertical className="cursor-pointer" />
      </div>
      <div className="flex flex-col items-center gap-y-1">
        {isEditingName ? (
          <div className="flex items-center gap-x-1">
            <Input
              value={changedName}
              onChange={(e) => setChangedName(e.target.value)}
              className="rounded-full border-none"
            />
            <XCircle
              className="w-8 h-8 cursor-pointer"
              onClick={() => setIsEditingName(false)}
            />
            <Button
              disabled={isUpdatingLink}
              onClick={() => handleUpdateName(changedName)}
              size="sm"
              className="rounded-full bg-purple-700 hover:bg-purple-600"
            >
              Save
            </Button>
          </div>
        ) : (
          <h1 className="font-bold text-xl flex items-center gap-x-3 line-clamp-1">
            {link.name}
            <EditIcon
              onClick={() => {
                setIsEditingUrl(false);
                setIsEditingName(true);
              }}
              className="w-4 h-4 cursor-pointer"
            />
          </h1>
        )}
        {isEditingUrl ? (
          <div className="flex items-center gap-x-1">
            <Input
              value={changedUrl}
              onChange={(e) => setChangedUrl(e.target.value)}
              className="rounded-full border-none"
            />
            <XCircle
              className="w-8 h-8 cursor-pointer"
              onClick={() => setIsEditingUrl(false)}
            />
            <Button
              disabled={isUpdatingLink}
              onClick={() => handleUpdateUrl(changedUrl)}
              size="sm"
              className="rounded-full bg-purple-700 hover:bg-purple-600"
            >
              Save
            </Button>
          </div>
        ) : (
          <div className="flex items-center">
            <Link
              href={link.url}
              target="_blank"
              className="font-semibold flex items-center gap-1 text-blue-500"
            >
              <LinkIcon className="w-4 h-4" />{" "}
              {link.url.replace("https://", "")}
            </Link>
            <EditIcon
              onClick={() => {
                setIsEditingName(false);
                setIsEditingUrl(true);
              }}
              className="ml-2 w-4 h-4 text-black cursor-pointer"
            />
          </div>
        )}
      </div>
      <Trash2
        onClick={() => handleDelete(link.id)}
        className="cursor-pointer text-red-500"
      />
    </div>
  );
};
