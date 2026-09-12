import { z } from "zod";

export const setBannerSchema = z.object({
  image: z.string().trim().min(1, "Image is required"),
  linkUrl: z.string().trim().min(1).optional(),
});

export type SetBannerInput = z.infer<typeof setBannerSchema>;
