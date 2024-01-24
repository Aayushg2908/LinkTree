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
import { allSocialButtons } from "@/lib/social-buttons";
import { SocialButton } from "@prisma/client";
import { CheckIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export const CreateSocialButtonModal = () => {
  const [socialButtons, setSocialButtons] = useState<SocialButton[]>([]);
  const { username, isOpen, onClose } = useCreateSocialButtonModal();
  const [selectedSocialButton, setSelectedSocialButton] = useState("");

  useEffect(() => {
    const fetchSocialButtons = async () => {
      const socialButtons = await allSocialButtons();
      setSocialButtons(socialButtons);
    };
    fetchSocialButtons();
  }, []);

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder="Search a Social Platform..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Popular Social Platforms">
          {socialButtons.map((socialButton) => (
            <CommandItem
              key={socialButton.id}
              onSelect={() => setSelectedSocialButton(socialButton.id)}
              className="flex items-center justify-between cursor-pointer"
            >
              {socialButton.type}
              {selectedSocialButton === socialButton.id && (
                <CheckIcon className="text-green-500 w-5 h-5" />
              )}
            </CommandItem>
          ))}
          <Separator className="w-full bg-black" />
          <Input
            placeholder="Enter the Url with https://"
            className="mb-2 mt-3 rounded-full"
          />
          <Button className="w-full rounded-full bg-purple-600 hover:bg-purple-500">
            Add Social Button
          </Button>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
