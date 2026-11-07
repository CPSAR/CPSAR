/** Accept same-site paths and HTTPS URLs for links managed through published content. */
export function safePublicUrl(value: string): string | null {
  const candidate = value.trim();
  if (!candidate || candidate.startsWith("//") || candidate.includes("\\")) return null;
  if (candidate.startsWith("/")) return candidate;

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}
