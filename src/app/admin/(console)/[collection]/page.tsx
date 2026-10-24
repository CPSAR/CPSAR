import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentManager } from "../../components/ContentManager";
import { isCmsCollection } from "@/lib/admin-cms";

export const metadata: Metadata = { title: "Manage content | CPSAR Admin" };
export default async function Page({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  if (!isCmsCollection(collection)) notFound();
  return <ContentManager collection={collection} />;
}
