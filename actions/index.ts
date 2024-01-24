"use server";

import { db } from "@/lib/db";
import { createLinkSchema } from "@/lib/validations";
import { auth } from "@clerk/nextjs";
import { Link, SocialButton } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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
    include: {
      links: true,
      socialButtons: true,
    },
  });

  return page;
};

export const createLink = async (
  values: z.infer<typeof createLinkSchema>,
  username: string
) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const { name, url } = values;

  const page = await db.page.findUnique({
    where: {
      userId,
      username,
    },
  });
  if (!page) {
    throw new Error("Page not found");
  }

  const lastOrder = await db.link.findFirst({
    where: {
      pageId: page.id,
    },
    orderBy: {
      order: "desc",
    },
    select: {
      order: true,
    },
  });

  const newOrder = lastOrder ? lastOrder.order + 1 : 0;

  await db.link.create({
    data: {
      name,
      url,
      pageId: page.id,
      order: newOrder,
    },
  });

  revalidatePath(`/private/${username}`);
};

export const getLinks = async (username: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const page = await db.page.findUnique({
    where: {
      userId,
      username,
    },
    include: {
      links: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
  if (!page) {
    throw new Error("Page not found");
  }

  return page.links;
};

export const deleteLink = async (id: string, username: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const page = await db.page.findUnique({
    where: {
      userId,
      username,
    },
  });
  if (!page) {
    throw new Error("Page not found");
  }

  await db.link.delete({
    where: {
      id,
      pageId: page.id,
    },
  });

  revalidatePath(`/private/${username}`);
};

export const updateName = async (
  name: string,
  id: string,
  username: string
) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  await db.link.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  revalidatePath(`/private/${username}`);
};

export const updateUrl = async (url: string, id: string, username: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  await db.link.update({
    where: {
      id,
    },
    data: {
      url,
    },
  });

  revalidatePath(`/private/${username}`);
};

export const updateOrder = async (links: Link[], username: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const page = await db.page.findUnique({
    where: {
      userId,
      username,
    },
  });
  if (!page) {
    throw new Error("Page not found");
  }

  const updateLinks = links.map((link) =>
    db.link.update({
      where: {
        id: link.id,
      },
      data: {
        order: link.order,
      },
    })
  );

  const updatedLinks = await db.$transaction(updateLinks);

  revalidatePath(`/private/${username}`);

  return updatedLinks;
};

export const updateAppearance = async (values: {
  username: string;
  bio: string;
  id: string;
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const { id, ...rest } = values;

  const page = await db.page.findUnique({
    where: {
      userId,
      id,
    },
  });
  if (!page) {
    throw new Error("Page not found");
  }

  const updatedPage = await db.page.update({
    where: {
      userId,
      id,
    },
    data: {
      ...rest,
    },
  });

  revalidatePath(`/private/${values.username}`);
  revalidatePath(`/private/${values.username}/appearace`);

  return updatedPage;
};

export const uploadPageLogo = async (id: string, logoImage: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const page = await db.page.findUnique({
    where: {
      userId,
      id,
    },
  });
  if (!page) {
    throw new Error("Page not found");
  }

  await db.page.update({
    where: {
      userId,
      id,
    },
    data: {
      logoImage,
    },
  });

  revalidatePath(`/private/${page.username}`);
  revalidatePath(`/private/${page.username}/appearace`);
};

export const createSocialButton = async (
  username: string,
  type: string,
  url: string
) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const page = await db.page.findUnique({
    where: {
      userId,
      username,
    },
  });
  if (!page) {
    throw new Error("Page not found");
  }

  const lastOrder = await db.socialButton.findFirst({
    where: {
      pageId: page.id,
    },
    orderBy: {
      order: "desc",
    },
    select: {
      order: true,
    },
  });

  const newOrder = lastOrder ? lastOrder.order + 1 : 0;

  await db.socialButton.create({
    data: {
      type,
      url,
      order: newOrder,
      pageId: page.id,
    },
  });

  revalidatePath(`/private/${username}`);
  revalidatePath(`/private/${username}/social`);
};

export const getSocialButtons = async (username: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const page = await db.page.findUnique({
    where: {
      userId,
      username,
    },
    include: {
      socialButtons: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
  if (!page) {
    throw new Error("Page not found");
  }

  return page.socialButtons;
};

export const deleteSocialButton = async (id: string, username: string) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const page = await db.page.findUnique({
    where: {
      userId,
      username,
    },
  });
  if (!page) {
    throw new Error("Page not found");
  }

  await db.socialButton.delete({
    where: {
      id,
      pageId: page.id,
    },
  });

  revalidatePath(`/private/${username}`);
  revalidatePath(`/private/${username}/social`);
};

export const updateSocialButtonsOrder = async (
  socialButtons: SocialButton[],
  username: string
) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const page = await db.page.findUnique({
    where: {
      userId,
      username,
    },
  });
  if (!page) {
    throw new Error("Page not found");
  }

  const updateSocialButtons = socialButtons.map((socialButton) =>
    db.socialButton.update({
      where: {
        id: socialButton.id,
      },
      data: {
        order: socialButton.order,
      },
    })
  );

  const updatedSocialButtons = await db.$transaction(updateSocialButtons);

  revalidatePath(`/private/${username}`);
  revalidatePath(`/private/${username}/social`);

  return updatedSocialButtons;
};
