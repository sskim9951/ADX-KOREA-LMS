import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef1 = useRef<HTMLSpanElement>(null);
  const textRef2 = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Parallax
    gsap.to(imgRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: imgRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Entrance
    gsap.to([textRef1.current, textRef2.current], {
      y: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.5,
    });

    gsap.to(subtitleRef.current, {
      opacity: 1,
      duration: 1,
      delay: 1,
    });
  }, []);

  return (
    <section id="hero" className="h-screen relative flex items-center justify-center overflow-hidden">
      <img
        ref={imgRef}
        src="https://lh3.googleusercontent.com/d/1r0Ih2LwtToVKT6dN309GMBOW-m-g_f5z"
        className="absolute inset-0 w-full h-full object-cover brightness-75"
        alt="Hero"
        referrerPolicy="no-referrer"
      />
      <div className="relative z-10 text-center text-white mix-difference">
        <h1 className="font-display text-[12vw] md:text-[10vw] leading-none overflow-hidden">
          <span ref={textRef1} className="block translate-y-full tracking-tighter">
            타겟 문자
          </span>
        </h1>
        <h1 className="font-display text-[12vw] md:text-[10vw] leading-none overflow-hidden">
          <span ref={textRef2} className="block translate-y-full tracking-tighter">
            발송 서비스
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className="mt-8 text-xs md:text-sm tracking-[0.5em] opacity-0 uppercase"
        >
          정교한 데이터 기반 타겟팅의 힘
        </p>
      </div>
    </section>
  );
}
