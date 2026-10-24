import type { Metadata, Viewport } from "next";
import { Layout } from "./components/Layout";
import "../styles/index.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cpsarwanda.org"),
  title: {
    default: "CPSAR | Clinical Psychology Students Association of Rwanda",
    template: "%s | CPSAR",
  },
  description:
    "The Clinical Psychology Students Association of Rwanda supports students through professional development, community, research, and mental health advocacy.",
  openGraph: {
    type: "website",
    locale: "en_RW",
    siteName: "CPSAR",
    title: "CPSAR | Clinical Psychology Students Association of Rwanda",
    description:
      "Building Rwanda’s next generation of mental health professionals through community, research, and advocacy.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#24578E",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
