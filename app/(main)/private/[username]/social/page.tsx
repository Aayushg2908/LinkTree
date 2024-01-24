import { getPageByUsername } from "@/actions";
import { notFound } from "next/navigation";
import { CreateSocialButton } from "./_components/CreateSocialButton";

const SocialPage = async ({ params }: { params: { username: string } }) => {
  const page = await getPageByUsername(params.username);
  if (!page) {
    return notFound();
  }

  return (
    <div className="mt-10 w-full flex flex-col gap-8 items-center">
      <div className="px-4 w-full">
        <CreateSocialButton username={params.username} />
      </div>
    </div>
  );
};

export default SocialPage;
