import "@/styles/main.css";

import AsciiComponent from "@/components/custom/AsciiComponent";
import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import { Posts } from "@/components/posts";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

export default function Home() {
  return (
    <div>
      <FadeIn.Container>
        <FadeIn.Item>
          <div className="flex justify-between">
            <div>
              <h1>Maxwell Adam</h1>
            </div>
          </div>
        </FadeIn.Item>
        <Spacer />
        <div className="z-99 w-full pr-20">
          <AsciiComponent />
        </div>
        <FadeIn.Item>
          <Posts category="me" />
        </FadeIn.Item>
        <FadeIn.Item>
          <Posts category="papers" />
        </FadeIn.Item>
        <FadeIn.Item>
          <Posts category="writing" />
        </FadeIn.Item>
        <Spacer />
        <FadeIn.Item>
          <Footer />
        </FadeIn.Item>
      </FadeIn.Container>
    </div>
  );
}
