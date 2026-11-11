import type { PublicContentRecord } from "@/lib/public-content";

export function getProgrammeImages(programme: PublicContentRecord): string[] {
  const gallery = programme.gallery_images;
  if (Array.isArray(gallery)) {
    const images = gallery.filter((image): image is string => typeof image === "string" && image.length > 0);
    if (images.length) return images;
  }

  return typeof programme.image_url === "string" && programme.image_url
    ? [programme.image_url]
    : [];
}
