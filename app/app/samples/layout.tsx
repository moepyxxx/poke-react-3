"use client";

import { Provider } from "jotai";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider>{children}</Provider>;
}
