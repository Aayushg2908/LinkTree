import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignOutButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-full flex justify-center">
      <div className="z-30 w-full fixed top-8 max-w-7xl rounded-full h-[100px] bg-white p-10 flex items-center justify-between shadow-xl">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="MainLogo"
            width={200}
            height={200}
            className="w-32 h-24 bg-background"
          />
        </Link>
        <div className="flex items-center gap-x-2">
          <SignedOut>
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  className:
                    "h-16 sm:w-28 transition-all duration-300 font-bold sm:text-lg",
                })
              )}
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({
                  className:
                    "h-16 sm:w-28 transition-all duration-300 font-bold sm:text-lg rounded-full",
                })
              )}
            >
              Sign Up
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/admin"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  className:
                    "h-16 sm:w-28 transition-all duration-300 font-bold sm:text-lg ml-4",
                })
              )}
            >
              Admin
            </Link>
            <SignOutButton>
              <Button className="h-16 sm:w-28 sm:font-bold sm:text-lg rounded-full">
                Log Out
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};
