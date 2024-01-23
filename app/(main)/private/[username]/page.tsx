import { getPageByUsername } from "@/actions";
import { CreateLinkButton } from "./_components/CreateLinkButton";

const UsernamePage = async ({ params }: { params: { username: string } }) => {
  const page = await getPageByUsername(params.username);

  return (
    <div className="mt-10 w-full flex flex-col items-center">
      <div className="px-4 w-full">
        <CreateLinkButton username={params.username} />
      </div>
    </div>
  );
};

export default UsernamePage;
