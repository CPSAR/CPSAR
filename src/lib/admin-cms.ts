export const cmsCollections = {
  programmes: {
    label: "Programmes",
    table: "programmes",
    fields: ["title", "slug", "summary", "body", "image_url", "published"],
    required: ["title", "slug"],
  },
  events: {
    label: "Events",
    table: "events",
    fields: ["title", "slug", "summary", "body", "category", "location", "starts_at", "ends_at", "image_url", "featured", "published"],
    required: ["title", "slug"],
  },
  articles: {
    label: "Articles",
    table: "news_articles",
    fields: ["title", "slug", "summary", "body", "author", "category", "image_url", "featured", "published", "published_at"],
    required: ["title", "slug"],
  },
  resources: {
    label: "Documents",
    table: "resources",
    fields: ["title", "slug", "summary", "body", "category", "resource_url", "published"],
    required: ["title", "resource_url"],
  },
  team: {
    label: "Team profiles",
    table: "leadership_members",
    fields: ["name", "role", "bio", "image_url", "display_order", "published"],
    required: ["name", "role"],
  },
  partners: {
    label: "Partners",
    table: "partners",
    fields: ["name", "summary", "website", "logo_url", "display_order", "published"],
    required: ["name"],
  },
  testimonials: {
    label: "Testimonials",
    table: "testimonials",
    fields: ["name", "role", "quote", "image_url", "display_order", "published"],
    required: ["name", "quote"],
  },
  alumni: {
    label: "Alumni",
    table: "alumni_members",
    fields: ["name", "graduation_year", "current_role", "bio", "image_url", "published"],
    required: ["name"],
  },
  gallery: {
    label: "Gallery images",
    table: "gallery_items",
    fields: ["image_url", "alt_text", "caption", "published"],
    required: ["image_url", "alt_text"],
  },
} as const;

export type CmsCollection = keyof typeof cmsCollections;

export function isCmsCollection(value: string): value is CmsCollection {
  return Object.hasOwn(cmsCollections, value);
}
