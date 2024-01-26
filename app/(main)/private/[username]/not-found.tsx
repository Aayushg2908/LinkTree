import Image from "next/image";

const PublicNotFoundPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Image
        src="/logo.png"
        alt="MainLogo"
        width={200}
        height={200}
        className="w-44 h-32 bg-background invert"
      />
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-2xl">Page not found</p>
      </div>
    </div>
  );
};

export default PublicNotFoundPage;
