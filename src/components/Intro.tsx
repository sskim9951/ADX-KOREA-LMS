import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const splitElements = sectionRef.current?.querySelectorAll('.split-animate');
    const allInners: HTMLElement[] = [];
    
    splitElements?.forEach((el) => {
      const text = el.textContent || '';
      const words = text.split(' ');
      el.innerHTML = '';
      
      words.forEach((word) => {
        const wordWrap = document.createElement('span');
        wordWrap.className = 'word-wrap';
        wordWrap.innerHTML = `<span class="word-inner inline-block translate-y-[110%]">${word}&nbsp;</span>`;
        el.appendChild(wordWrap);
      });

      const inners = Array.from(el.querySelectorAll('.word-inner')) as HTMLElement[];
      allInners.push(...inners);

      gsap.to(inners, {
        y: '0%',
        duration: 1,
        ease: 'power3.out',
        stagger: 0.02,
        scrollTrigger: {
          id: `intro-split-${allInners.length}`,
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    const handleJump = (e: any) => {
      const SECTION_ORDER = ['#intro', '#process', '#media', '#contact'];
      const jumpIndex = SECTION_ORDER.indexOf(e.detail);
      const myIndex = SECTION_ORDER.indexOf('#intro');
      if (jumpIndex >= myIndex) {
        gsap.set(allInners, { y: '0%' });
        ScrollTrigger.getAll().forEach(st => {
          if (st.vars.id?.toString().startsWith('intro-split-')) {
            st.kill();
          }
        });
      }
    };

    window.addEventListener('anchor-jump', handleJump as EventListener);
    return () => window.removeEventListener('anchor-jump', handleJump as EventListener);
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="py-32 px-6 md:px-20 grid md:grid-cols-2 gap-16 max-w-[1800px] mx-auto bg-stone-bg"
    >
      <div>
        <h2 className="font-display text-4xl md:text-6xl leading-tight tracking-tighter split-animate">
          타겟문자란?
        </h2>
      </div>
      <div className="text-lg md:text-xl font-light leading-relaxed text-gray-700">
        <div className="split-animate">
          <p className="mb-12">
            타겟문자광고는 무작위 대량 발송이 아닌, <br />
            원하는 고객에게만 정확하게 도달하는 정교한 타겟팅 서비스입니다.
          </p>
        </div>
        <div className="h-px w-full bg-black/10 my-12" />
        <div className="text-gray-700 split-animate">
          <p className="text-2xl md:text-4xl font-bold tracking-tighter leading-snug">
            불법적으로 수집된 DB가 아닌, <br />
            통신사, 카드사, 포인트사 고객들 중<br />
            마케팅 수신 동의 고객 DB만을 활용하여, <br />
            신뢰도 높은 마케팅을 실현합니다.<br /><br />
            평균 메세지 확인율은 약 90%이상입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
