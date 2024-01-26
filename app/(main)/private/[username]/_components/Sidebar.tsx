import { Link as PrismaLink, Page, SocialButton } from "@prisma/client";
import Image from "next/image";
import { SocialIcons } from "./SocialIcons";
import Link from "next/link";

export const Sidebar = ({
  page,
}: {
  page: Page & { links: PrismaLink[]; socialButtons: SocialButton[] };
}) => {
  return (
    <div className="z-50 bg-black fixed top-36 h-[450px] w-[250px] rounded-3xl overflow-y-auto custom-scrollbar py-8 px-4">
      <div className="flex flex-col items-center">
        <Image
          src={page.logoImage || "/tree.png"}
          alt="previewLogoImage"
          width={100}
          height={100}
          className="rounded-full w-20 h-20"
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
        <div className="mt-4 flex flex-col w-full px-2 gap-y-2">
          {page.links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
              className="bg-neutral-800 rounded-xl w-full h-[50px] hover:scale-110 shadow-md transition-all flex items-center justify-center px-4"
            >
              <h1 className="font-bold text-base text-white line-clamp-1">
                {link.name}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
