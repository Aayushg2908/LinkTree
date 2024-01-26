const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black min-h-screen w-full flex justify-center">
      {children}
    </div>
  );
};

export default PublicLayout;
