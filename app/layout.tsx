"use client";

import "@/styles/main.css";

import { Providers } from "@/components/providers";

import clsx from "clsx";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation"; // Import usePathname
import { Analytics } from "@vercel/analytics/react"
import { useEffect } from "react";
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

  const specificRoute = "/writing/papers/A%20Contrastive%20Analysis%20of%20Feature";
  const route2 = "writing/papers/A%20Contrastive%20Analysis%20of%20Features%20in%20Twin%20Toy%20Transformers%20that%20(play)%20Chess"

  useEffect(() => {
    if (pathname === specificRoute || pathname === route2) {
      window.location.href = "/papers/chess";
    }
  }, [pathname]);


  return (
    <html lang="en" className={clsx(inter.className)} suppressHydrationWarning>
      <body>
        <Providers>
          <main className="mx-auto max-w-screen-sm overflow-x-hidden px-6 py-24 md:overflow-x-visible ">
            <article className="article">{children}</article>
          </main>
        </Providers>
        <Analytics/>
      </body>
    </html>
  );
}
