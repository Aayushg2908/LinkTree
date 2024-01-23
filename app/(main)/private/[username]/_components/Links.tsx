"use client";

import { Link as PrismaLink } from "@prisma/client";
import { LinkCard } from "./Link";

export const Links = ({
  links,
  username,
}: {
  links: PrismaLink[];
  username: string;
}) => {
  return (
    <div className="px-4 w-full flex flex-col items-center mb-4">
      {links.length > 0 ? (
        <div className="sm:px-4 w-full flex flex-col items-center gap-y-4">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} username={username} />
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
