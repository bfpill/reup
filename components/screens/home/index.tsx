import "@/styles/main.css";

import AsciiComponent from "@/components/custom/AsciiComponent";
import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import { Posts } from "@/components/posts";

import { Analytics } from "@vercel/analytics/react"
import { DaysOfSummer } from "@/components/custom/DaysOfSummer";

const Spacer = () => <div style={{ marginTop: "24px" }} />;

const CurrentlyReading = () => {
  const books = [
    { title: "Zen and the Art of Motorcycle Maintenance", cover: "/images/books/ZenAndTheArtOf.jpg", link: "/books/zenandtheartofmotorcyclemaintainance" },
    { title: "Rhythms of the Brain", cover: "/images/books/RhythmsOfTheBrain.jpg", link: "/books/rhythmsofthebrain" },
  ];

  return (
    <div className="flex flex-col">
      <h1 className="font-lora text-2xl">Currently Reading</h1>
      <div className="flex space-x-4 mt-10">
        {books.map((book) => (
          <a href={book.link} key={book.title} className="transform transition-transform duration-300 hover:scale-105">
            <img src={book.cover} alt={book.title} className="h-100 object-cover" style={{ width: 'auto', height: '30vw', maxHeight: '350px'}} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative p-8 overflow-x-hidden">
      <FadeIn.Container>
        <FadeIn.Item>
          <div className="flex justify-between">
            <div>
              <h1 className="font-lora text-3xl xl:mb-16 mb-0">Maxwell Adam</h1>
            </div>
          </div>
        </FadeIn.Item>
        <div className="flex xl:flex-row flex-col justify-between h-full gap-20">
          <FadeIn.Item>
            <div className="z-99 w-full overflow-x-none flex items-center justify-center mt-32">
              <AsciiComponent />
            </div>
          </FadeIn.Item>
          <div className="mt-10">
            <FadeIn.Item>
              <DaysOfSummer />
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
          </div>
        </div>
        <div className="mt-64">
          <FadeIn.Item>
            <Footer />
          </FadeIn.Item>
        </div>
        <FadeIn.Item>
          <div className="mt-32">
            <CurrentlyReading />
          </div>
        </FadeIn.Item>
      </FadeIn.Container>
      <Analytics />
    </div>
  );
}
