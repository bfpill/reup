import { Link as LabeledLink } from "@/components/link";
import * as FadeIn from "@/components/motion/staggers/fade";
import * as Theme from "@/components/theme";
import { getData } from "@/markdown/utils/mdx";
import clsx from "clsx";
import { Link as NextViewTransition } from "next-view-transitions";
import AboutMe from "./about-me.mdx";
import Header from "./header.mdx";

interface PostProps {
  category: string;
}

const Posts = ({ category }: PostProps) => {
  const path = decodeURIComponent(category).toLowerCase();
  const route = `app/${path}/posts`;

  if (!route) {
    console.error(`Invalid category: ${category}`);
    return null;
  }

  const posts = getData(route).sort((a, b) => {
    return new Date(b.time.created).getTime() - new Date(a.time.created).getTime();
  });

  const formatter = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div className="mt-6 flex flex-col">
      <h2 className="pb-2 text-gray-8">
        {category} {posts.length > 0 && `(${posts.length})`}
      </h2>

      {posts.map((post, index) => {
        return (
          <div
            key={post.slug}
            className={clsx({
              "border-b border-b-gray-4 dark:border-b-gray-4": index !== posts.length - 1,
              "border-t border-t-gray-4": index === 0,
            })}
          >
            <NextViewTransition href={`/${path}/${post.slug.replace(/\s+/g, "-")}`} className="flex w-full justify-between py-2">
              <p>{post.title}</p>
              <p className="text-gray-8">{formatter.format(new Date(post.time.created))}</p>
            </NextViewTransition>
          </div>
        );
      })}
    </div>
  );
};

const MDXHeader = () => {
  return (
    <FadeIn.Item>
      <Header />
    </FadeIn.Item>
  );
};

const MDXAboutMe = () => {
  return (
    <FadeIn.Item>
      <AboutMe />
    </FadeIn.Item>
  );
};

const Experiments = () => {
  return (
    <FadeIn.Item>
      <Posts category="Experiments" />
    </FadeIn.Item>
  );
};

const Thoughts = () => {
  return (
    <FadeIn.Item>
      <Posts category="Thoughts" />
    </FadeIn.Item>
  );
};

const Guides = () => {
  return (
    <FadeIn.Item>
      <Posts category="Guides" />
    </FadeIn.Item>
  );
};

const Footer = () => {
  return (
    <FadeIn.Item>
      <div className="flex w-full items-center justify-between border-t border-t-gray-4 pt-2">
        <div className="px-[2px] text-gray-8 text-xs tracking-[0.01px]">
          Built with <LabeledLink href="https://nextjs.org/" text="Next.js" underline />
        </div>
        <div className="text-gray-8 text-xs tracking-[0.01px]">
          <Theme.Switch />
        </div>
      </div>
    </FadeIn.Item>
  );
};

export default function Home() {
  return (
    <FadeIn.Container>
      <MDXHeader />
      <MDXAboutMe />
      <Guides />
      <Experiments />
      <Thoughts />
      <Footer />
    </FadeIn.Container>
  );
}