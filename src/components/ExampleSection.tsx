import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXAMPLES = [
  {
    title: '기본 타겟팅',
    copy: 'COMMON TARGETING',
    target: '연령, 성별, 지역 기반의 기본적인 타겟팅입니다. 예) 30대 여성 / 분당구 거주 고객 등 가장 기초적이면서도 확실한 분류를 제공합니다.',
  },
  {
    title: '세부 타겟팅',
    copy: 'BEHAVIORAL DATA',
    target: '부동산 관심, 골프/해외여행, 명품/수입차 구매력, 이사 예정 등 고객의 행동과 관심사 데이터를 기반으로 정교하게 타겟팅합니다.',
  },
  {
    title: '구매력 추정',
    copy: 'PURCHASING POWER',
    target: '카드 사용액 기반 구매력 추정 및 앱/웹 방문 이력 기반 관심사 분석을 통해 실질적인 구매 전환이 가능한 고객층을 선별합니다.',
  },
];

export default function ExampleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.example-card');
    cards?.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          id: `example-${i}`,
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    const handleJump = (e: any) => {
      const SECTION_ORDER = ['#intro', '#process', '#media', '#contact'];
      const jumpIndex = SECTION_ORDER.indexOf(e.detail);
      const myIndex = SECTION_ORDER.indexOf('#contact'); // It's just before contact
      if (jumpIndex >= myIndex && cards) {
        gsap.set(cards, { opacity: 1, scale: 1 });
        cards.forEach((_, i) => {
          ScrollTrigger.getById(`example-${i}`)?.kill();
        });
      }
    };

    window.addEventListener('anchor-jump', handleJump as EventListener);
    return () => window.removeEventListener('anchor-jump', handleJump as EventListener);
  }, []);

  return (
    <section className="py-32 px-6 md:px-20 bg-stone-bg">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 text-right">
          <h2 className="font-display text-5xl md:text-7xl tracking-tighter">어떻게 타겟팅 하나요?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXAMPLES.map((ex, i) => (
            <div key={i} className="example-card bg-white p-12 border border-black/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-[450px]">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-dark-ink">{ex.title}</h3>
              </div>
              
              <div className="w-16 h-px bg-black/10 mb-8" />
              
              <div className="flex-grow">
                <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed break-keep">
                  {ex.target}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
