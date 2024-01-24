"use client";

import { SocialButton } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { GripVertical, LinkIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { deleteSocialButton } from "@/actions";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { GrYoutube } from "react-icons/gr";
import { SiDiscord } from "react-icons/si";
import { FaFacebookSquare } from "react-icons/fa";
import Link from "next/link";

export const SocialButtonCard = ({
  index,
  socialButton,
  username,
}: {
  socialButton: SocialButton;
  username: string;
  index: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Icon, setIcon] = useState<any>("");

  useEffect(() => {
    switch (socialButton.type) {
      case "TWITTER":
        setIcon(<FaXTwitter className="text-blue-500 text-4xl" />);
        break;
      case "GITHUB":
        setIcon(<FaGithub className="text-gray-500 text-4xl" />);
        break;
      case "LINKEDIN":
        setIcon(<FaLinkedin className="text-blue-500 text-4xl" />);
        break;
      case "INSTAGRAM":
        setIcon(<AiFillInstagram className="text-pink-500 text-4xl" />);
        break;
      case "YOUTUBE":
        setIcon(<GrYoutube className="text-red-500 text-4xl" />);
        break;
      case "DISCORD":
        setIcon(<SiDiscord className="text-blue-500 text-4xl" />);
        break;
      case "FACEBOOK":
        setIcon(<FaFacebookSquare className="text-blue-500 text-4xl" />);
        break;
      default:
        break;
    }
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteSocialButton(id, username);
      toast.success("Link deleted successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (isLoading) {
    toast.loading("Deleting link...");
  }

  return (
    <Draggable draggableId={socialButton.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="bg-white h-[100px] w-full lg:w-[550px] rounded-3xl flex items-center justify-between px-4 shadow-md transition-all"
        >
          <div {...provided.dragHandleProps}>
            <GripVertical className="cursor-grab" />
          </div>
          <div className="flex items-center gap-x-2">
            {Icon}
            <Link
              target="_blank"
              href={socialButton.url}
              className="flex gap-x-1 text-blue-500 text-base ml-2"
            >
              <LinkIcon className="w-5 h-5" />
              {socialButton.url}
            </Link>
          </div>
          <Trash2
            onClick={() => handleDelete(socialButton.id)}
            className="cursor-pointer text-red-500"
          />
        </div>
      )}
    </Draggable>
  );
};
