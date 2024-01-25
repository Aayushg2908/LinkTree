"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Page, SocialButton, Link as PrismaLink } from "@prisma/client";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SocialIcons } from "./SocialIcons";
import { ScrollArea } from "@/components/ui/scroll-area";

export const PreviewButton = ({
  page,
}: {
  page: Page & { links: PrismaLink[]; socialButtons: SocialButton[] };
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          className="rounded-full bg-gray-300 text-black font-bold hover:bg-gray-200"
        >
          <EyeIcon className="w-5 h-5 mr-1" />
          Preview
        </Button>
      </DrawerTrigger>
      <DrawerContent className="dark">
        <div className="flex flex-col items-center">
          <Image
            src={page.logoImage || "/tree.png"}
            alt="previewLogoImage"
            width={100}
            height={100}
            className="rounded-full w-20 h-20 mt-2"
          />
          <h1 className="mt-2 font-bold text-lg text-white line-clamp-1">
            @{page.username}
          </h1>
          <p className="text-muted-foreground font-semibold tracking-tight text-sm">
            {page.bio}
          </p>
          <div className="flex flex-wrap items-center gap-x-2 mt-2 transition-all">
            {page.socialButtons.map((socialButton) => (
              <SocialIcons key={socialButton.id} socialButton={socialButton} />
            ))}
          </div>
          <ScrollArea className="mt-2 h-[300px] w-full mb-2">
            <div className="mt-4 flex flex-col w-full px-2 gap-y-2">
              {page.links.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  className="bg-neutral-800 rounded-xl w-full h-[50px] hover:scale-110 shadow-md transition-all flex items-center justify-center"
                >
                  <h1 className="font-bold text-base text-white">
                    {link.name}
                  </h1>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
