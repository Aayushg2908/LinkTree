import { getAllSocialButtons } from "@/actions";

export const allSocialButtons = async () => {
  const socialButtons = await getAllSocialButtons();

  return socialButtons;
};
