import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const text = "We craft digital experiences that transcend the ordinary. A relentless pursuit of innovation where meticulous engineering meets unapologetic aesthetic precision.";
  const words = text.split(" ");

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;

    const wordElements = textRef.current.querySelectorAll('.manifesto-word');

    gsap.to(wordElements, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=350%",
        pin: true,
        scrub: 1,
      },
      color: "#ffffff",
      WebkitTextStrokeColor: "#ffffff",
      stagger: 0.2,
      ease: "power1.inOut"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden py-24 mt-32 md:mt-64">
      <div className="max-w-[90vw] md:max-w-[80vw] mx-auto">
        <h2 
          ref={textRef}
          className="text-4xl md:text-6xl lg:text-[5.5vw] leading-[1.1] tracking-tight font-serif uppercase text-center"
        >
          {words.map((word, i) => (
            <React.Fragment key={i}>
              <span 
                className="manifesto-word text-transparent"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}
              >
                {word}
              </span>
              {i < words.length - 1 && " "}
            </React.Fragment>
          ))}
        </h2>
      </div>
    </section>
  );
}
