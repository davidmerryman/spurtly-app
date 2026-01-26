import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spurtly - Generate High-Quality Leads Automatically",
  description: "Automate your lead generation with targeted campaigns. Find decision makers, scrape emails, and launch outreach in minutes.",
  keywords: ["lead generation", "email outreach", "sales automation", "B2B leads"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
