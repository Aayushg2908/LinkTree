import { getPageByUsername } from "@/actions";
import { Navbar } from "./_components/Navbar";

const PrivateLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) => {
  const page = await getPageByUsername(params.username);
  return (
    <div className="w-full min-h-screen">
      <Navbar username={params.username} />
      {children}
    </div>
  );
};

export default PrivateLayout;
