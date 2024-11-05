import { formatter } from "@/lib/formatter";
import { getPosts } from "@/lib/mdx";

import { Link as NextViewTransition } from "next-view-transitions";
import React from "react";

interface PostProps {
  category: string;
}

export const Posts = ({ category }: PostProps) => {
  const posts = getPosts(category).sort((a, b) => {
    return new Date(b.time.created).getTime() - new Date(a.time.created).getTime();
  });

  const Seperator = () => <div className="border-border border-t" />;

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col">
      <NextViewTransition href={`/${category}`} className="flex justify-between">
        <h2 className="py-2 text-muted capitalize">
          {category} {posts.length > 0 && `(${posts.length})`}
        </h2>
      </NextViewTransition>
      {category === "daily-notes" ? (
        posts.map((post) => {
          return (
            <React.Fragment key={post.slug}>
              <Seperator />
              <NextViewTransition href={`/${category}/${post.slug}`} className="flex w-full justify-between py-2">
                <p className="wrap max-w-[70%]">{post.title}</p>
                <p className="mt-0 text-muted min-w-32 flex justify-end">{formatter.date(new Date(post.time.created))}</p>
              </NextViewTransition>
            </React.Fragment>
          );
        })
      ) : (
        posts.map((post) => {
          return (
            <React.Fragment key={post.slug}>
              <Seperator />
              <NextViewTransition href={`/${category}/${post.slug}`} className="flex w-full justify-between py-2">
                <p className="wrap max-w-[70%]">{post.title}</p>
                <p className="mt-0 text-muted min-w-32 flex justify-end">{formatter.date(new Date(post.time.created))}</p>
              </NextViewTransition>
            </React.Fragment>
          );
        })
      )}
    </div>
  );
};
