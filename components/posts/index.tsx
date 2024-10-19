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

      {category === "paper2s" ? (
        <React.Fragment key={1}>
          <Seperator />
          <NextViewTransition
            href="https://max.v3rv.com/writing/papers/A%20Contrastive%20Analysis%20of%20Features%20in%20Twin%20Toy%20Transformers%20that%20(play)%20Chess"
            target="_blank"
            className="flex w-full justify-between py-2"
          >
            <p>{"A Constrastive Analysis of Transformers that (play) chess"}</p>
            <p className="mt-0 text-muted">{"Oct 1, 2024"}</p>
          </NextViewTransition>
        </React.Fragment>
      ) : (
        posts.map((post) => {
          return (
            <React.Fragment key={post.slug}>
              <Seperator />
              <NextViewTransition href={`/${category}/${post.slug}`} className="flex w-full justify-between py-2">
                <p>{post.title}</p>
                <p className="mt-0 text-muted">{formatter.date(new Date(post.time.created))}</p>
              </NextViewTransition>
            </React.Fragment>
          );
        })
      )}
    </div>
  );
};
