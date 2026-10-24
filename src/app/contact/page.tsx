import type { Metadata } from "next";
import { Contact } from "../pages/Contact";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return <Contact />;
}
