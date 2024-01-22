import ModalProvider from "@/components/providers/modal-provider";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen grainy">
      <ModalProvider />
      {children}
    </div>
  );
};

export default MainLayout;
