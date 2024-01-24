"use client";

import { updateAppearance, uploadPageLogo } from "@/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const AppearanceCard = ({
  pageId,
  username,
  bio,
  logoImage,
}: {
  pageId: string;
  username: string;
  bio: string | null;
  logoImage: string | null;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [name, setName] = useState(username);
  const [pageBio, setPageBio] = useState(bio || "");
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const handleEnter = async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        try {
          const updatedPage = await updateAppearance({
            bio: pageBio,
            username: name,
            id: pageId,
          });
          toast.success("Appearance Updated!");
          router.replace(`/private/${updatedPage.username}/appearance`);
        } catch (error) {
          toast.error("Something went wrong!");
        }
      }
    };

    window.addEventListener("keydown", handleEnter);

    return () => window.removeEventListener("keydown", handleEnter);
  }, [name, pageBio, pageId, router]);

  const handleUpload = async (result: any) => {
    try {
      await uploadPageLogo(pageId, result.info.secure_url);
      toast.success("Logo Updated!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  if (!isMounted) return null;

  return (
    <div className="mt-10 bg-white w-full sm:w-[400px] lg:w-[500px] h-[400px] rounded-3xl p-4 flex flex-col items-center justify-center gap-y-4">
      <div className="w-full flex items-center gap-x-10 mb-2">
        {logoImage ? (
          <Image
            src={logoImage}
            alt="pageLogo"
            width={200}
            height={200}
            className="rounded-full w-36 h-28"
          />
        ) : (
          <Image
            src="/tree.png"
            alt="pageLogo"
            width={200}
            height={200}
            className="rounded-full w-36 h-28"
          />
        )}
        <CldUploadButton
          className="w-full"
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset="grwkis5v"
        >
          <div className="w-full rounded-full bg-purple-600 hover:bg-purple-500 h-10 text-white flex items-center justify-center">
            Pick Image
          </div>
        </CldUploadButton>
      </div>
      <Label className="text-xl font-bold">Username</Label>
      <Input
        className="rounded-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Label className="text-xl font-bold">Bio</Label>
      {pageBio ? (
        <Input
          className="rounded-full"
          value={pageBio}
          onChange={(e) => setPageBio(e.target.value)}
        />
      ) : (
        <Input
          className="rounded-full"
          placeholder="Add a bio"
          value={pageBio}
          onChange={(e) => setPageBio(e.target.value)}
        />
      )}
    </div>
  );
};
