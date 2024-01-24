import { getPageByUsername, getSocialButtons } from "@/actions";
import { notFound } from "next/navigation";
import { CreateSocialButton } from "./_components/CreateSocialButton";
import { SocialButtons } from "./_components/SocialButtons";

const SocialPage = async ({ params }: { params: { username: string } }) => {
  const page = await getPageByUsername(params.username);
  if (!page) {
    return notFound();
  }

  const socialButtons = await getSocialButtons(params.username);

  return (
    <div className="mt-10 w-full flex flex-col gap-8 items-center">
      <div className="px-4 w-full">
        <CreateSocialButton username={params.username} />
      </div>
      <SocialButtons socialButtons={socialButtons} username={params.username} />
    </div>
  );
};

export default SocialPage;
