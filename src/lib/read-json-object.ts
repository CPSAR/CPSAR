export async function readJsonObject(
  request: Request,
  maxBytes: number,
): Promise<{ ok: true; value: Record<string, unknown> } | { ok: false; tooLarge: boolean }> {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > maxBytes) return { ok: false, tooLarge: true };

  const reader = request.body?.getReader();
  if (!reader) return { ok: false, tooLarge: false };

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        return { ok: false, tooLarge: true };
      }
      chunks.push(value);
    }

    const body = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }

    const parsed: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(body));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ok: false, tooLarge: false };
    }
    return { ok: true, value: parsed as Record<string, unknown> };
  } catch {
    return { ok: false, tooLarge: false };
  }
}
