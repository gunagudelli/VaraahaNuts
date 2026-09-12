import { BannerRow } from "../repositories/bannerRepository.js";

export interface PublicBanner {
  id: string;
  image: string;
  linkUrl?: string;
}

export function toPublicBanner(row: BannerRow): PublicBanner {
  return {
    id: row.id,
    image: row.image,
    linkUrl: row.link_url ?? undefined,
  };
}
