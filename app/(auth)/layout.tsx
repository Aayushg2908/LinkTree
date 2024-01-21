import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Image
        src="/logo.png"
        alt="MainLogo"
        width={200}
        height={200}
        className="w-44 h-32 bg-background"
      />
      {children}
    </div>
  );
};

export default AuthLayout;
