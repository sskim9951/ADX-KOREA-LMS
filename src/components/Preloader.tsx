import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(barRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut',
    })
      .to(textRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
      })
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
      });
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-dark-ink z-[10000] flex flex-col justify-center items-center text-white"
    >
      <div
        ref={textRef}
        className="font-display text-[8vw] md:text-[5vw] font-bold tracking-tighter"
      >
        ADX
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-white w-0" ref={barRef} />
    </div>
  );
}
