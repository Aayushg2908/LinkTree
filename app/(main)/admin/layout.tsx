import { Navbar } from "./_components/navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default AdminLayout;
