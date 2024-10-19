import { Breadcrumb } from "@/components/breadcrumb";
import { getPosts } from "@/lib/mdx";
import { OpenGraph } from "@/lib/og";
import type { Post } from "@/types";

import { notFound } from "next/navigation";

const route = "papers";

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
    <div className="absolute top-0 left-0 flex w-screen items-center justify-center bg-[#EAF3FF]">
      <div className="h-full w-3/5 min-w-[1300px] overflow-y-auto">
        <div className="absolute top-10 left-10">
          <Breadcrumb />
        </div>
        <div className="h-full w-full">
          <div className="flex h-screen flex-col">
            <iframe
              src="https://max.v3rv.com/writing/papers/A%20Contrastive%20Analysis%20of%20Features%20in%20Twin%20Toy%20Transformers%20that%20(play)%20Chess"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              title="Embedded Page"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
