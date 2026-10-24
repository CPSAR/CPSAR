import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PublicContentRecord = Record<string, unknown> & { id: string };

const publicTables = new Set([
  "programmes", "events", "news_articles", "resources", "leadership_members", "partners", "testimonials", "alumni_members", "gallery_items",
]);

export async function getPublishedContent(table: string, limit = 50): Promise<PublicContentRecord[]> {
  if (!publicTables.has(table)) return [];
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_PUBLISHABLE_KEY) return [];
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return data as PublicContentRecord[];
  } catch {
    return [];
  }
}

export async function getPublishedBySlug(table: string, slug: string): Promise<PublicContentRecord | null> {
  if (!new Set(["programmes", "events", "news_articles"]).has(table)) return null;
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_PUBLISHABLE_KEY) return null;
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error || !data) return null;
    return data as PublicContentRecord;
  } catch {
    return null;
  }
}
