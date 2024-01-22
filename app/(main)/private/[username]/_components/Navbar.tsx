import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { CircleUserRound, EqualSquare, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = ({ username }: { username: string }) => {
  return (
    <>
      <div className="sticky top-0 sm:top-4 w-full flex items-center justify-between bg-white h-16 sm:rounded-full px-8 transition-all sm:shadow-md max-sm:border-b">
        <div className="flex gap-8 items-center">
          <Link href="/admin">
            <Image
              src="/tree.png"
              alt="treeLogo"
              width={200}
              height={200}
              className="w-10 h-10"
            />
          </Link>
          <div className="max-sm:hidden flex items-center gap-7">
            <Link
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "lg",
                })
              )}
              href={`/private/${username}`}
            >
              <LinkIcon className="w-5 h-5 mr-1" /> Links
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "lg",
                })
              )}
              href={`/private/${username}/appearance`}
            >
              <EqualSquare className="w-5 h-5 mr-1" />
              Appearance
            </Link>
            <Link
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "lg",
                })
              )}
              href={`/private/${username}/social`}
            >
              <CircleUserRound className="w-5 h-5 mr-1" /> Social
            </Link>
          </div>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="sm:hidden flex items-center h-16 justify-around bg-white transition-all">
        <Link
          className={cn(
            buttonVariants({
              variant: "ghost",
            })
          )}
          href={`/private/${username}`}
        >
          <LinkIcon className="w-5 h-5 mr-1" /> Links
        </Link>
        <Link
          className={cn(
            buttonVariants({
              variant: "ghost",
            })
          )}
          href={`/private/${username}/appearance`}
        >
          <EqualSquare className="w-5 h-5 mr-1" />
          Appearance
        </Link>
        <Link
          className={cn(
            buttonVariants({
              variant: "ghost",
            })
          )}
          href={`/private/${username}/social`}
        >
          <CircleUserRound className="w-5 h-5 mr-1" /> Social
        </Link>
      </div>
    </>
  );
};
