import "@/styles/main.css";

import AsciiComponent from "@/components/custom/AsciiComponent";
import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import { Posts } from "@/components/posts";

import { Analytics } from "@vercel/analytics/react"
import { DaysOfSummer } from "@/components/custom/DaysOfSummer";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export default function Home() {
  return (
    <div className="relative">
      <FadeIn.Container>
        <FadeIn.Item>
          <div className="flex justify-between">
            <div>
              <h1>Maxwell Adam</h1>
            </div>
          </div>
        </FadeIn.Item>
        <FadeIn.Item>
          <div className="z-99 w-full pr-20 -mt-20 mb-4">
            <AsciiComponent />
          </div>
        </FadeIn.Item>
        <FadeIn.Item>
        <DaysOfSummer/>
        </FadeIn.Item>
        <FadeIn.Item>
          <Posts category="me" />
        </FadeIn.Item>
        <FadeIn.Item>
          <Posts category="papers" />
        </FadeIn.Item>
        <FadeIn.Item>
          <Posts category="writing" />
        </FadeIn.Item>
        <FadeIn.Item>
          <Posts category="daily-notes" />
        </FadeIn.Item>
        <Spacer />
        <FadeIn.Item>
          <Footer />
        </FadeIn.Item>
      </FadeIn.Container>
      <Analytics />
    </div>
  );
}
