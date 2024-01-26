import { getPageByUsername } from "@/actions";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SocialIcons } from "./_components/SocialIcons";
import Link from "next/link";

const SharePage = async ({ params }: { params: { username: string } }) => {
  const page = await getPageByUsername(params.username);
  if (!page) {
    return notFound();
  }

  return (
    <div className=" w-full max-w-5xl flex flex-col items-center py-4 px-6 gap-y-1">
      <Image
        src={page.logoImage || "/tree.png"}
        alt="previewLogoImage"
        width={100}
        height={100}
        className="rounded-full w-32 h-32 mt-10"
      />
      <h1 className="mt-2 font-bold text-2xl sm:text-3xl text-white line-clamp-1">
        @{page.username}
      </h1>
      <p className="text-muted-foreground font-semibold tracking-tight text-base sm:text-lg">
        {page.bio}
      </p>
      <div className="flex flex-wrap items-center gap-x-4 mt-2 transition-all">
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
            className="bg-neutral-800 rounded-xl w-full h-[50px] hover:scale-105 shadow-md transition-all flex items-center justify-center px-4"
          >
            <h1 className="font-bold text-base text-white line-clamp-1">
              {link.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SharePage;
