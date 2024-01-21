import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-green-900">
      <Navbar />
      {children}
    </div>
  );
};

export default MarketingLayout;
