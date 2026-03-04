import "@/styles/main.css";

import { Footer } from "@/components/footer";
import * as FadeIn from "@/components/motion/staggers/fade";
import { Posts } from "@/components/posts";

import { Analytics } from "@vercel/analytics/react"
import { ArchiveSection } from "./archive-section";

const papers = [
  {
    title: "The Loss Kernel: A Geometric Probe for Deep Learning Interpretability",
    description: "We introduce the loss kernel, an interpretability method for measuring similarity between data points according to a trained neural network. The kernel is the covariance matrix of per-sample losses computed under a distribution of low-loss-preserving parameter perturbations.",
    authors: "Maxwell Adam*, Zach Furman*, Jesse Hoogland",
    venue: null,
    link: "https://arxiv.org/abs/2509.26537",
  },
  {
    title: "Bayesian Influence Functions for Hessian-Free Data Attribution",
    description: "We propose the local Bayesian influence function (BIF), an extension of classical influence functions that replaces Hessian inversion with loss landscape statistics that can be estimated via stochastic-gradient MCMC sampling.",
    authors: "Philipp Alexander Kreer*, Wilson Wu, Maxwell Adam, Zach Furman, Jesse Hoogland",
    venue: "ICLR 2026",
    link: "https://arxiv.org/abs/2509.26544",
  },
  {
    title: "Influence Dynamics and Stagewise Data Attribution",
    description: "We introduce a framework for stagewise data attribution grounded in singular learning theory. We predict that influence can change non-monotonically, including sign flips and sharp peaks at developmental transitions. We first validate these predictions in a toy model, then at scale in language models, where token-level influence changes align with known developmental stages.",
    authors: "Jin Hwa Lee*, Matthew Smith*, Maxwell Adam, Jesse Hoogland",
    venue: "ICLR 2026",
    link: "https://arxiv.org/abs/2509.26544",
  },
];

const highlightName = (authors: string) => {
  const parts = authors.split(/(Maxwell Adam\*?)/);
  return parts.map((part, i) => 
    part.match(/Maxwell Adam\*?/) 
      ? <span key={i} className="text-blue">{part}</span>
      : part
  );
};

const Papers = () => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-sm uppercase tracking-wider mt-2">Papers</h2>
      {papers.map((paper) => (
        <a
          key={paper.title}
          href={paper.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <h3 className="group-hover:opacity-60 transition-opacity">
            <span className="font-lora text-xl">{paper.title}</span>
            {paper.venue && <span className="text-sm ml-2 opacity-50">{paper.venue}</span>}
          </h3>
          <p className="text-sm mt-2 leading-relaxed">{paper.description}</p>
          <p className="text-xs mt-2">{highlightName(paper.authors)}</p>
        </a>
      ))}
    </div>
  );
};


export default function Home() {
  return (
    <div className="flex flex-col" style={{ backgroundColor: '#ffffff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap');
        html, body { background-color: #ffffff !important; }
        .home-content, .home-content *:not(.text-blue) { color: #000000 !important; }
        .home-content .text-blue { color: #2563eb !important; }
        .home-content a:hover { opacity: 0.6; }
        .home-content .border-border { border-color: #d1d5db !important; }
        .gothic-text { font-family: 'UnifrakturMaguntia', cursive; font-weight: 400; }
      `}</style>
      <div className="min-h-screen flex items-center justify-center px-8 py-16">
        <FadeIn.Container>
          <div className="w-full max-w-4xl home-content">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Left column - 1/3 */}
              <div className="md:w-2/5 order-1">
                <FadeIn.Item>
                  <h1 className="font-lora text-3xl tracking-tighter" style={{ color: '#000000' }}>Maxwell Adam</h1>
                </FadeIn.Item>
                <FadeIn.Item>
                  <div className="mt-8">
                    <a href="/me/resume" className="flex items-center justify-between py-2 group">
                      <span className="group-hover:opacity-60 transition-opacity">My Resume</span>
                      <span className="relative group-hover:opacity-60 transition-opacity" style={{ width: '2.5rem', height: '2.5rem' }}>
                        <span className="font-lora" style={{ fontSize: '1.2rem', position: 'absolute', top: '-0.1rem', left: '0.4rem' }}>ℜ</span>
                        <span style={{ fontSize: '1.8rem', position: 'absolute', top: '0.4rem', left: '0.7rem' }}>↗</span>
                      </span>
                    </a>
                  </div>
                </FadeIn.Item>
                
                <div className="hidden md:block">
                  <FadeIn.Item>
                    <div className="mt-8">
                      <Posts category="stuff" headerText="Posts" hideCount headerClassName="text-sm uppercase tracking-wider py-2" />
                    </div>
                  </FadeIn.Item>
                </div>
              </div>
              
              {/* Right column - 2/3 */}
              <div className="md:w-3/5 order-2">
                <FadeIn.Item>
                  <Papers />
                </FadeIn.Item>
              </div>
              
              {/* Mobile only - stuff at bottom */}
              <div className="md:hidden order-3">
                <FadeIn.Item>
                  <Posts category="stuff" headerText="Posts" hideCount headerClassName="text-sm uppercase tracking-wider py-2" />
                </FadeIn.Item>
              </div>
            </div>
          </div>
        </FadeIn.Container>
      </div>
      
      <FadeIn.Container>
        <div className="px-8 pb-8 home-content flex flex-col items-center">
          <div className="w-full max-w-4xl">
            <FadeIn.Item>
              <Footer />
            </FadeIn.Item>
            <FadeIn.Item>
              <ArchiveSection>
                <Posts category="writing" />
              </ArchiveSection>
            </FadeIn.Item>
          </div>
        </div>
      </FadeIn.Container>
      <Analytics />
    </div>
  );
}
