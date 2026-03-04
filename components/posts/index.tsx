import { formatter } from "@/lib/formatter";
import { getPosts } from "@/lib/mdx";

import { Link as NextViewTransition } from "next-view-transitions";
import React from "react";

interface PostProps {
  category: string;
  hideHeader?: boolean;
  headerText?: string;
  hideCount?: boolean;
  headerClassName?: string;
}

export const Posts = ({ category, hideHeader = false, headerText, hideCount = false, headerClassName }: PostProps) => {
  const posts = getPosts(category).sort((a, b) => {
    return new Date(b.time.created).getTime() - new Date(a.time.created).getTime();
  });

  const Seperator = () => <div className="border-border border-t" />;

  if (posts.length === 0) {
    return null;
  }

  const displayText = headerText || category;

  return (
    <div className={`flex flex-col ${hideHeader ? 'mt-2' : 'mt-6'}`}>
      {!hideHeader && (
        <NextViewTransition href={`/${category}`} className="flex justify-between">
          <h2 className={headerClassName || "py-2 text-muted capitalize"}>
            {displayText} {!hideCount && posts.length > 0 && `(${posts.length})`}
          </h2>
        </NextViewTransition>
      )}
      {category === "daily-notes" ? (
        posts.map((post, index) => {
          return (
            <React.Fragment key={post.slug}>
              {!(hideHeader && index === 0) && <Seperator />}
              <NextViewTransition href={`/${category}/${post.slug}`} className="flex w-full justify-between py-2">
                <p className="wrap max-w-[70%]">{post.title}</p>
                <p className="mt-0 text-muted min-w-32 flex justify-end">{formatter.date(new Date(post.time.created))}</p>
              </NextViewTransition>
            </React.Fragment>
          );
        })
      ) : (
        posts.map((post, index) => {
          return (
            <React.Fragment key={post.slug}>
              {!(hideHeader && index === 0) && <Seperator />}
              <NextViewTransition href={`/${category}/${post.slug}`} className="flex w-full justify-between py-2">
                <p className="wrap max-w-[70%]">{post.title}</p>
                {!hideHeader && <p className="mt-0 text-muted min-w-32 flex justify-end">{formatter.date(new Date(post.time.created))}</p>}
              </NextViewTransition>
            </React.Fragment>
          );
        })
      )}
    </div>
  );
};
