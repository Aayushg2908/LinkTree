import { getPageByUsername } from "@/actions";
import { AppearanceCard } from "./_components/AppearanceCard";
import { notFound } from "next/navigation";

const AppearancePage = async ({ params }: { params: { username: string } }) => {
  const page = await getPageByUsername(params.username);
  if (!page) {
    return notFound();
  }

  return (
    <div className="mt-10 w-full flex flex-col items-center px-4">
      <h1 className="font-bold text-3xl">Profile</h1>
      <AppearanceCard
        pageId={page.id}
        username={page.username}
        bio={page.bio}
        logoImage={page.logoImage}
      />
    </div>
  );
};

export default AppearancePage;
