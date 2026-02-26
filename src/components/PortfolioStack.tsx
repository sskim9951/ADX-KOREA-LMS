import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    title: '타겟 문자 광고 통신사 예시',
    description: '● 행동 데이터 기반 타겟팅 가능\n● 분양 웹사이트 접속 이력\n● 경쟁 업체 앱/웹 접속 이력\n● 결제 이력\n● 분양현장 통화이력(SKT 티전화)\n● 네비게이션 입력 장소(SKT 티맵)',
    image: 'https://lh3.googleusercontent.com/d/1PA3kVyFpKZ_ACA12p731d_0I_McIcctD',
  },
  {
    id: '02',
    title: '타겟 문자 광고 카드사 예시',
    description: '● 연소득 추정\n● 카드 사용액\n● 카테고리별 카드 사용액으로 관심사 추정\n● 카드 사용시간, 지역 등 생활 데이터 기반 관심사 추정\n● 구매력 분석, 고소득자 추정',
    image: 'https://lh3.googleusercontent.com/d/1Q6KFnJ4nnTJPNegHMu0kUFqDbr0hBgGQ',
  },
  {
    id: '03',
    title: '타겟 문자 광고 맴버십/포인트사 예시',
    description: '● 포인트 적립 및 사용량을 통한 소득 및 관심사 추정\n● 구매력 높은 3040 여성 이용자 타겟 가능',
    image: 'https://lh3.googleusercontent.com/d/1EQBiv_XLLrO74Gt2QiFe2L2tgcwz0eIB',
  },
];

export default function PortfolioStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.card-item');
    
    cards.forEach((card, i) => {
      const nextCard = cards[i + 1];
      if (nextCard) {
        gsap.to(card.querySelector('.card-inner'), {
          scale: 0.9,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top bottom',
            end: 'top 10vh',
            scrub: true,
          },
        });
      }
    });
  }, []);

  return (
    <section className="bg-dark-ink text-stone-bg py-20 px-6">
      <div className="text-center mb-20">
        <div className="text-[10px] tracking-[0.5em] mb-4 opacity-50 uppercase">Examples</div>
        <h2 className="font-display text-4xl md:text-6xl tracking-tighter">발송 예시</h2>
      </div>

      <div ref={containerRef} className="max-w-[1400px] mx-auto relative pb-[10vh]">
        {PROJECTS.map((project) => (
          <div key={project.id} className="card-item sticky top-[10vh] h-[80vh] w-full flex items-center justify-center mb-[5vh]">
            <div className="card-inner w-[95%] md:w-[90%] h-full bg-[#1a1a1a] border border-white/10 overflow-hidden grid md:grid-cols-[1fr_1.2fr] shadow-2xl">
              <div className="p-8 md:p-16 flex flex-col justify-between z-10">
                <div>
                  <div className="text-5xl font-display mb-2 text-stone-bg opacity-20 tracking-tighter">{project.id}</div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tighter break-keep">{project.title}</h3>
                </div>
                <div className="text-gray-400 font-light leading-relaxed max-w-sm whitespace-pre-line text-sm md:text-base">
                  {project.description}
                </div>
                <div className="text-left tracking-[0.2em] text-[10px] uppercase border-b border-white/30 pb-2 w-max opacity-50">
                  ADX TARGET LMS
                </div>
              </div>
              <div className="relative h-full overflow-hidden bg-white flex items-center justify-center p-4">
                <img
                  src={project.image}
                  className="w-full h-full object-contain"
                  alt={project.title}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
