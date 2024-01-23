import { auth } from "@clerk/nextjs";
import { Navbar } from "./_components/navbar";
import { redirect } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default AdminLayout;
