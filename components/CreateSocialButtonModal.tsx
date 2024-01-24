"use client";

import { useCreateSocialButtonModal } from "@/hooks/use-createsocialbutton-modal";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useEffect, useState } from "react";
import { SocialButton } from "@prisma/client";
import { CheckIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { createSocialButton } from "@/actions";
import { socialButtons } from "@/constants";

export const CreateSocialButtonModal = () => {
  const { username, isOpen, onClose } = useCreateSocialButtonModal();
  const [selectedSocialButton, setSelectedSocialButton] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (selectedSocialButton == "" || url == "") {
      return toast.error("Please select a social button and enter a url");
    } else {
      try {
        setLoading(true);
        await createSocialButton(username, selectedSocialButton, url);
        toast.success("Social button created successfully!");
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
        setUrl("");
        setSelectedSocialButton("");
        onClose();
      }
    }
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder="Search a Social Platform..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Popular Social Platforms">
          {socialButtons.map((socialButton) => (
            <CommandItem
              key={socialButton.name}
              onSelect={() => setSelectedSocialButton(socialButton.name)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-x-2">
                <socialButton.Icon />
                {socialButton.name}
              </div>
              {selectedSocialButton === socialButton.name && (
                <CheckIcon className="text-green-500 w-5 h-5" />
              )}
            </CommandItem>
          ))}
          <Separator className="w-full bg-black" />
          <Input
            value={url}
            disabled={loading}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the Url with https://"
            className="mb-2 mt-3 rounded-full"
          />
          <Button
            disabled={loading}
            onClick={handleClick}
            className="w-full rounded-full bg-purple-600 hover:bg-purple-500"
          >
            Add Social Button
          </Button>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
