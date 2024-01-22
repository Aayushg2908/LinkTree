"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPage = async (username: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const existingUsername = await db.page.findFirst({
    where: {
      username: username,
    },
  });
  if (existingUsername) {
    return null;
  }

  const page = await db.page.create({
    data: {
      userId,
      username,
    },
  });

  revalidatePath("/admin");

  return page;
};

export const getUserLinkTrees = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const page = await db.page.findMany({
    where: {
      userId,
    },
  });

  return page;
};

export const updateUsername = async (
  initialUsername: string,
  username: string
) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const existingUsername = await db.page.findFirst({
    where: {
      username: username,
    },
  });
  if (existingUsername) {
    return null;
  }

  const page = await db.page.update({
    where: {
      userId,
      username: initialUsername,
    },
    data: {
      username,
    },
  });

  revalidatePath("/admin");

  return page.username;
};

export const deleteLinkTree = async (username: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  await db.page.delete({
    where: {
      userId,
      username,
    },
  });

  revalidatePath("/admin");
};

export const getPageByUsername = async (username: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const page = await db.page.findFirst({
    where: {
      username,
    },
  });

  return page;
};
