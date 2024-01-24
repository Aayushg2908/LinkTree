"use client";

import { updateAppearance } from "@/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const AppearanceCard = ({
  pageId,
  username,
  bio,
}: {
  pageId: string;
  username: string;
  bio: string | null;
}) => {
  const [name, setName] = useState(username);
  const [pageBio, setPageBio] = useState(bio || "");
  const router = useRouter();

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
  }, [name, pageBio, pageId]);

  return (
    <div className="mt-10 bg-white w-full sm:w-[400px] lg:w-[500px] h-[300px] rounded-3xl p-4 flex flex-col items-center justify-center gap-y-4">
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
