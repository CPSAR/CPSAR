import type { PublicContentRecord } from "@/lib/public-content";

export function getContentGalleryImages(item: PublicContentRecord): string[] {
  const gallery = item.gallery_images;
  const coverImage = typeof item.image_url === "string" ? item.image_url : "";
  if (Array.isArray(gallery)) {
    const images = gallery.filter((image): image is string => typeof image === "string" && image.length > 0);
    if (images.length) return Array.from(new Set([coverImage, ...images].filter(Boolean)));
  }

  return coverImage ? [coverImage] : [];
}
