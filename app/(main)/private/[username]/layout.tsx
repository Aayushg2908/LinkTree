import { getPageByUsername } from "@/actions";
import { Navbar } from "./_components/Navbar";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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

  return (
    <div className="w-full min-h-screen">
      <Navbar username={params.username} />
      <main className="w-full h-full flex">
        <div className="w-full md:w-3/5 overflow-y-auto">{children}</div>
        <div className="max-md:hidden w-2/5 h-full">
          <Separator
            orientation="vertical"
            className="h-screen z-1 fixed top-0"
          />
        </div>
      </main>
    </div>
  );
};

export default PrivateLayout;
