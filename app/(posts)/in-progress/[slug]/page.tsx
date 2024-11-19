import type { Post } from "@/types";

import { PostNavigation } from "@/components/post-navigation";
import { getPosts } from "@/lib/mdx";
import { OpenGraph } from "@/lib/og";
import { MDX } from "@/mdx-components";
import * as FadeIn from "@/components/motion/staggers/fade";

import React from "react";
import { TableOfContents } from "@/components/on-this-page";

const route = "in-progress";

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

interface Props {
  post: Post;
  route: string;
}

const Layout = ({ post, route }: Props) => {
  const posts = getPosts(route);

  const Seperator = () => {
    return <div>⋅</div>;
  };

  return (
    <React.Fragment>
      <MDX source={post.content} />
      <PostNavigation posts={posts} />
    </React.Fragment>
  );
};

export default function Page({ params }: PageProps) {
  const post = Posts.find((post: { slug: string }) => post.slug === params.slug);
  const concatenatedContent = Posts.map(post => post.content).join("\n");

  const extractHeaderIdForToday = (content: string): string | null => {
    const headerIdRegex = new RegExp(`# ${params.slug}`, 'g');
    const match = headerIdRegex.exec(content);
    return match ? params.slug : null;
  };

  const initialHeaderId = extractHeaderIdForToday(concatenatedContent);

  const LazyMDX = React.lazy(() => Promise.resolve({ default: () => <MDX source={concatenatedContent} /> }));

  return (
    <React.Fragment>
      <FadeIn.Item>
        <div className="">
          <React.Suspense fallback={<div>Loading...</div>}>
            <LazyMDX />
          </React.Suspense>
          <div className="w-full border mt-20"/>
        </div>
      </FadeIn.Item>
      <TableOfContents initialHeaderId={initialHeaderId}  />
    </React.Fragment>
  );
}
