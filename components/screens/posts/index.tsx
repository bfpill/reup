import type { Post } from "@/types";

import { TableOfContents } from "@/components/on-this-page";
import { PostNavigation } from "@/components/post-navigation";
import { formatter } from "@/lib/formatter";
import { getPosts } from "@/lib/mdx";
import { MDX } from "@/mdx-components";

import React from "react";
import { readingTime } from "reading-time-estimator";

interface Props {
  post: Post;
  route: string;
}

export const Layout = ({ post, route, hideTableOfContents = false }: Props & { hideTableOfContents?: boolean }) => {
  const posts = getPosts(route);

  const Seperator = () => {
    return <div>⋅</div>;
  };

  const PublishedTime = () => {
    return <div>Published {formatter.date(new Date(post?.time?.created))}</div>;
  };
  const UpdateTime = () => {
    return <div>Updated {formatter.date(new Date(post?.time?.updated))}</div>;
  };

  const ReadingTime = () => {
    return <div>{readingTime(post.content).minutes} minute read</div>;
  };

  return (
    <React.Fragment>
      <div className="flex flex-col font-lora">
        <div>
          <h1 className="font-lora text-5xl">{post.title}</h1>
        </div>
        <div className="mt-1 flex gap-2 text-muted text-small">
          <PublishedTime />
          <Seperator />
          {post?.time?.updated !== post?.time?.created && (
            <>
              <UpdateTime />
              <Seperator />
            </>
          )}
          <ReadingTime />
        </div>
      </div>

      <MDX source={post.content}/>
      <PostNavigation posts={posts} />
      { 
        !hideTableOfContents &&
        <TableOfContents />
      }

    </React.Fragment>
  );
};
