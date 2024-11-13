import type { Post } from "@/types";

import { Breadcrumb } from "@/components/breadcrumb";
import { getPosts } from "@/lib/mdx";
import { OpenGraph } from "@/lib/og";

import { notFound } from "next/navigation";

const route = "random";

const Posts = getPosts(route);

interface PageProps {
  params: Post;
}

export async function generateStaticParams() {
  return Posts.map((post) => ({
    slug: `${post.slug}`,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const post = Posts.find((post: { slug: string }) => post.slug === params.slug);
  const title = post ? post.title : "";
  const image = `${process.env.NEXT_PUBLIC_SITE_URL}api/og?title=${encodeURIComponent(title)}`;

  return {
    ...OpenGraph,
    title,
    openGraph: {
      title,
      images: [image],
    },
    twitter: {
      images: [image],
    },
  };
}

export default function Page({ params }: PageProps) {
  const post = Posts.find((post: { slug: string }) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="absolute top-0 -left-2 flex w-screen h-screen items-center justify-center bg-[#242424] pt-20 md:pt-20">
      <div className="h-full w-full overflow-y-auto">
        <div className="absolute top-10 left-10 text-white">
          <Breadcrumb />
        </div>
        <div className="h-full">
          <div className="flex h-screen w-screen flex-col overflow-auto -mt-32">
            <iframe
              src="https://model-viz.vercel.app"
              className="h-full w-full border-none"
              title="Embedded Page"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
