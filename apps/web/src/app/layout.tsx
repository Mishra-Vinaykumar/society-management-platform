import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Society Management Platform",
    template: "%s | Society Management Platform",
  },
  description: "A secure, multi-tenant foundation for residential society management.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#020617",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
