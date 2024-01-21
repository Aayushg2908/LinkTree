import Image from "next/image";
import { ClaimLinktree } from "./_components/claim-linktree";
import { LandingImage } from "./_components/LandingImage";

const MarketingPage = () => {
  return (
    <section className="p-4 mt-56 flex justify-center">
      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-y-4">
          <h1 className="font-extrabold text-yellow-400 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
            Everything you are. In one, simple link in bio.
          </h1>
          <p className="text-lime-300 font-semibold">
            Join 40M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
          <ClaimLinktree />
        </div>
        <div className="max-md:hidden">
          <LandingImage />
        </div>
      </div>
    </section>
  );
};

export default MarketingPage;
