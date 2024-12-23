import type { Post } from "@/types";

import { PostNavigation } from "@/components/post-navigation";
import { formatter } from "@/lib/formatter";
import { getPosts } from "@/lib/mdx";
import { OpenGraph } from "@/lib/og";
import { MDX } from "@/mdx-components";

import { notFound } from "next/navigation";
import React from "react";
import { readingTime } from "reading-time-estimator";

const route = "me";

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

  const PublishedTime = () => {
    return <div>Published {formatter.date(new Date(post.time.created))}</div>;
  };
  const UpdateTime = () => {
    return <div>Updated {formatter.date(new Date(post.time.updated))}</div>;
  };

  const ReadingTime = () => {
    return <div>{readingTime(post.content).minutes} minute read</div>;
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

  if (!post) {
    notFound();
  }

  return <Layout post={post} route={route} />;
}
