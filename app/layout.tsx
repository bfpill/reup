"use client";

import "@/styles/main.css";

import { Providers } from "@/components/providers";

import clsx from "clsx";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation"; // Import usePathname

// export const metadata: Metadata = {
//   ...OpenGraph,
// };

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const specificRoute = "/papers/chess";

  return (
    <html lang="en" className={clsx(inter.className)} suppressHydrationWarning>
      <body>
        <Providers>
          <main className="mx-auto max-w-screen-sm overflow-x-hidden px-6 py-24 md:overflow-x-visible ">
            <article className="article">{children}</article>
          </main>
        </Providers>
      </body>
    </html>
  );
}
