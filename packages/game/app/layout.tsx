import "./globals.css";
import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";

const dot = DotGothic16({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pokemon",
  description: "pokemon de asobou",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${dot.className} max-w-md mx-auto my-10 bg-neutral-200`}>
        {children}
      </body>
    </html>
  );
}
