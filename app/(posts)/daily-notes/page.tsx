import * as FadeIn from "@/components/motion/staggers/fade";
import { getPosts } from "@/lib/mdx";
import { OpenGraph } from "@/lib/og";
import { MDX } from "@/mdx-components";

import React from "react";
import { TableOfContents } from "@/components/on-this-page";

const category = "daily-notes";

export function generateMetadata() {
  const image = `${process.env.NEXT_PUBLIC_SITE_URL}api/og?title=${encodeURIComponent(category)}`;

  return {
    ...OpenGraph,
    category,
    openGraph: {
      category,
      images: [image],
    },
    twitter: {
      images: [image],
    },
  };
}

const route = "daily-notes";

const Posts = getPosts(route);

const Layout = ({ post, route }: Props) => {
  const posts = getPosts(route);

  const Seperator = () => {
    return <div>⋅</div>;
  };

  return (
    <React.Fragment>
      <MDX source={post.content} />
    </React.Fragment>
  );
};


export default function Page() {
  const concatenatedContent = Posts.map(post => post.content).join("\n");

  const extractHeaderIdForToday = (content: string): string | null => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // "year-month-day"
    const headerIdRegex = new RegExp(`# ${formattedDate}`, 'g');
    const match = headerIdRegex.exec(content);
    console.log(match, concatenatedContent, formattedDate)
    return match ? formattedDate : null;
  };

  const initialHeaderId = extractHeaderIdForToday(concatenatedContent);
  console.log(initialHeaderId, "PENIS")

  // Lazy load the MDX content
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
