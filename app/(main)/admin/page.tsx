import { getUserLinkTrees } from "@/actions";
import { CreateLinkTree } from "./_components/CreateLinkTree";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Actions from "./_components/Actions";

const AdminPage = async () => {
  const linktrees = await getUserLinkTrees();

  return (
    <div className="w-full mt-10 flex flex-col items-center">
      <h1 className="font-bold text-2xl sm:text-4xl">
        LinkTree&apos;s you own
      </h1>
      <div className="w-full flex flex-col items-center gap-y-3">
        {linktrees.length > 0 ? (
          <div className="w-full mt-10 flex flex-col items-center gap-y-4">
            <CreateLinkTree />
            {linktrees.map((linktree) => (
              <div
                className="max-w-2xl w-full bg-white h-16 flex justify-between items-center shadow-md hover:shadow-lg transition-all rounded-lg p-3"
                key={linktree.id}
              >
                <Link
                  href={`/private/${linktree.username}`}
                  className="flex items-center gap-x-2"
                >
                  <Image
                    src={linktree.logoImage || "/tree.png"}
                    alt="userImage"
                    width={50}
                    height={50}
                    className="rounded-full w-10 h-10"
                  />
                  <Separator orientation="vertical" className="h-16" />
                  <div className="font-bold">@{linktree.username}</div>
                </Link>
                <Actions username={linktree.username} />
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="text-xl mt-10">
              You don&apos;t own any LinkTree&apos;s. Create One!
            </p>
            <CreateLinkTree />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
