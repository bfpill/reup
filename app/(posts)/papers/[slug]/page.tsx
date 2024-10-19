import { Breadcrumb } from "@/components/breadcrumb";
import { getPosts } from "@/lib/mdx";
import { OpenGraph } from "@/lib/og";
import { Post } from "@/types";
import { notFound } from "next/navigation";
import React from "react";

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
    <div className="w-screen absolute left-0 top-0 flex items-center justify-center bg-[#EAF3FF]">
      <div className="w-3/5 min-w-[1300px] h-full overflow-y-auto">
        <div className="absolute top-10 left-10">
          <Breadcrumb />
        </div>
        <div className="w-full h-full">
          <div className="flex flex-col h-screen">
            <iframe
              src="https://max.v3rv.com/writing/papers/A%20Contrastive%20Analysis%20of%20Features%20in%20Twin%20Toy%20Transformers%20that%20(play)%20Chess"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Embedded Page"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
