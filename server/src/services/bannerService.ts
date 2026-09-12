import { getBanner, setBanner, clearBanner } from "../repositories/bannerRepository.js";
import { toPublicBanner, PublicBanner } from "../utils/publicBanner.js";
import { SetBannerInput } from "../validators/bannerValidators.js";

export async function getActiveBanner(): Promise<PublicBanner | null> {
  const row = await getBanner();
  return row ? toPublicBanner(row) : null;
}

export async function setActiveBanner(input: SetBannerInput): Promise<PublicBanner> {
  const row = await setBanner({ image: input.image, linkUrl: input.linkUrl ?? null });
  return toPublicBanner(row);
}

export async function removeBanner(): Promise<void> {
  await clearBanner();
}
