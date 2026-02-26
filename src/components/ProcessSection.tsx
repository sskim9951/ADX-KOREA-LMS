import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { id: '01', title: '매체사 선택', desc: '통신사, 카드사, 포인트사 등 최적 매체 선정' },
  { id: '02', title: '타겟팅 설정', desc: '연령, 성별, 지역, 관심사, 소득수준 등 상세 설정' },
  { id: '03', title: '일정 협의 및 부킹', desc: '발송 가능 일자 확인 및 인벤토리 확보' },
  { id: '04', title: '타겟 모수 추출', desc: '설정된 타겟에 부합하는 실제 수신 대상자 추출' },
  { id: '05', title: '문구 전달 및 검수', desc: 'LMS 문구 및 이미지 검수 (제작 지원 가능)' },
  { id: '06', title: '최종 스케줄 확인', desc: '발송 전 최종 데이터 및 시간 재확인' },
  { id: '07', title: '발송 진행', desc: '약속된 시간에 타겟팅된 고객에게 메시지 발송' },
  { id: '08', title: '결과 보고', desc: '도달율, 클릭율 등 상세 캠페인 성과 분석 보고' },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.process-item');
    items?.forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          id: `process-${i}`,
          trigger: item,
          start: 'top 95%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    const handleJump = (e: any) => {
      const SECTION_ORDER = ['#intro', '#process', '#media', '#contact'];
      const jumpIndex = SECTION_ORDER.indexOf(e.detail);
      const myIndex = SECTION_ORDER.indexOf('#process');
      if (jumpIndex >= myIndex && items) {
        gsap.killTweensOf(items);
        gsap.set(items, { opacity: 1, y: 0 });
        items.forEach((_, i) => {
          ScrollTrigger.getById(`process-${i}`)?.kill();
        });
      }
    };

    window.addEventListener('anchor-jump', handleJump as EventListener);
    return () => window.removeEventListener('anchor-jump', handleJump as EventListener);
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-32 px-6 md:px-20 bg-stone-bg">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20">
          <div className="text-[10px] tracking-[0.5em] mb-4 opacity-50 uppercase">Process</div>
          <h2 className="font-display text-4xl md:text-6xl tracking-tighter">집행 절차</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5 shadow-2xl shadow-black/5">
          {STEPS.map((step) => (
            <div key={step.id} className="process-item bg-white p-10 flex flex-col justify-between h-64 hover:bg-dark-ink hover:text-stone-bg transition-all duration-500 group cursor-default">
              <div>
                <div className="text-3xl font-display opacity-10 group-hover:opacity-30 transition-opacity group-hover:text-stone-bg">{step.id}</div>
                <h3 className="text-xl font-bold mt-4 tracking-tight group-hover:text-white">{step.title}</h3>
              </div>
              <p className="text-sm text-gray-500 font-light leading-relaxed group-hover:text-gray-300 transition-colors">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
