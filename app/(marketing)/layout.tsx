import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full bg-green-800">
      <Navbar />
      {children}
    </div>
  );
};

export default MarketingLayout;
