import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MEDIA_GROUPS = [
  {
    category: '통신사',
    items: ['KT', 'SKT', 'LG U+'],
    examples: ['분양 웹사이트 접속 이력', '경쟁사 앱/웹 방문 이력', 'T맵 목적지 이력', '결제 이력 기반 소비 분석'],
  },
  {
    category: '카드사',
    items: ['신한카드', '국민카드', '하나카드', '롯데카드', '삼성카드', 'BC카드'],
    examples: ['연소득 추정', '카드 사용액', '카테고리별 소비 분석', '구매력 상위 고객'],
  },
  {
    category: '포인트/멤버십',
    items: ['CJ ONE', 'L.POINT', '신세계포인트', 'H.POINT'],
    examples: ['포인트 적립/사용 기반 관심사', '3040 여성 중심 타겟', '구매력 높은 고객층'],
  },
  {
    category: '유틸리티/플랫폼',
    items: ['T-MAP', 'CJ 대한통운', '직방 / 호갱노노'],
    examples: ['카카오톡 채널 메시지', '앱 푸쉬 메시지', '부동산 특화 타겟팅'],
  },
];

export default function MediaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const groups = sectionRef.current?.querySelectorAll('.media-group');
    groups?.forEach((group, i) => {
      gsap.from(group, {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          id: `media-${i}`,
          trigger: group,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    const handleJump = (e: any) => {
      const SECTION_ORDER = ['#intro', '#process', '#media', '#contact'];
      const jumpIndex = SECTION_ORDER.indexOf(e.detail);
      const myIndex = SECTION_ORDER.indexOf('#media');
      if (jumpIndex >= myIndex && groups) {
        gsap.killTweensOf(groups);
        gsap.set(groups, { opacity: 1, x: 0 });
        groups.forEach((_, i) => {
          ScrollTrigger.getById(`media-${i}`)?.kill();
        });
      }
    };

    window.addEventListener('anchor-jump', handleJump as EventListener);
    return () => window.removeEventListener('anchor-jump', handleJump as EventListener);
  }, []);

  return (
    <section id="media" ref={sectionRef} className="py-32 px-6 md:px-20 bg-dark-ink text-stone-bg">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20">
          <div className="text-[10px] tracking-[0.5em] mb-4 opacity-50 uppercase">Media List</div>
          <h2 className="font-display text-4xl md:text-6xl tracking-tighter">발송 가능 매체</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {MEDIA_GROUPS.map((group, i) => (
            <div key={i} className="media-group border-l border-white/10 pl-8 py-4">
              <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-tighter">{group.category}</h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {group.items.map((item, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 text-xs tracking-widest uppercase">
                    {item}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                <div className="text-[10px] opacity-30 uppercase tracking-widest mb-2">Targeting Examples</div>
                {group.examples.map((ex, idx) => (
                  <div key={idx} className="text-sm font-light text-gray-400 flex items-center gap-2">
                    <div className="w-1 h-1 bg-moss-accent rounded-full" />
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
