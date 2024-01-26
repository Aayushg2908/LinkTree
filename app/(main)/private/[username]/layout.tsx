import { getPageByUsername } from "@/actions";
import { Navbar } from "./_components/Navbar";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { Sidebar } from "./_components/Sidebar";
import { PreviewButton } from "./_components/PreviewButton";
import Link from "next/link";

const PrivateLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const page = await getPageByUsername(params.username);
  if (!page) {
    return notFound();
  }

  return (
    <div className="w-full min-h-screen">
      <Navbar username={params.username} />
      <main className="w-full h-full flex">
        <div className="w-full md:w-3/5 overflow-y-auto">
          <div className="bg-blue-300 rounded-full my-8 mx-4 p-4 h-[50px] flex items-center gap-x-2 max-sm:flex-col max-sm:h-[70px] max-sm:justify-center">
            <p className="ml-2">Your LinkTree:</p>
            <Link
              target="_blank"
              href={`/public/${params.username}`}
              className="font-bold underline"
            >
              aayush-linktree1.vercel.app/public/{params.username}
            </Link>
          </div>
          {children}
        </div>
        <div className="max-md:hidden w-2/5 h-full">
          <Separator
            orientation="vertical"
            className="h-screen z-1 fixed top-0"
          />
          <div className="w-full flex justify-center">
            <Sidebar page={page} />
          </div>
        </div>
      </main>
      <div className="md:hidden w-full z-50 fixed bottom-5 flex justify-center">
        <PreviewButton page={page} />
      </div>
    </div>
  );
};

export default PrivateLayout;
