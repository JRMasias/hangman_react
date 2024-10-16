import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hangman",
  description: "Designed & developed by J. R. Masias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-neutral-950 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
