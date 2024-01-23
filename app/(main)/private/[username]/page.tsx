import { getLinks } from "@/actions";
import { CreateLinkButton } from "./_components/CreateLinkButton";
import { Links } from "./_components/Links";

const UsernamePage = async ({ params }: { params: { username: string } }) => {
  const links = await getLinks(params.username);

  return (
    <div className="mt-10 w-full flex flex-col gap-8 items-center">
      <div className="px-4 w-full">
        <CreateLinkButton username={params.username} />
      </div>
      <Links links={links} username={params.username} />
    </div>
  );
};

export default UsernamePage;
