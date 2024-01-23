import * as z from "zod";

export const createLinkSchema = z.object({
  name: z.string().min(1, {
    message: "You must provide a name for your link",
  }),
  url: z.string().min(1, {
    message: "You must provide a URL",
  }),
});
