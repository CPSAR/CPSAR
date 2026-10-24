import type { Metadata } from "next";
import { AboutPage } from "../pages/AboutPage";

export const metadata: Metadata = { title: "About CPSAR" };

export default function Page() {
  return <AboutPage />;
}
