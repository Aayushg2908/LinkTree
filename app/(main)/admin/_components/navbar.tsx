"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="sticky top-0 sm:top-4 w-full flex items-center justify-between bg-white h-16 sm:rounded-full px-8 transition-all shadow-md">
      <div className="flex gap-4 items-center">
        <Link href="/admin">
          <Image
            src="/tree.png"
            alt="treeLogo"
            width={200}
            height={200}
            className="w-10 h-10"
          />
        </Link>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
