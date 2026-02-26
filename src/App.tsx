import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import PortfolioStack from './components/PortfolioStack';
import ProcessSection from './components/ProcessSection';
import MediaSection from './components/MediaSection';
import ExampleSection from './components/ExampleSection';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor links for smooth scroll and immediate visibility
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const targetId = anchor.hash;
        const targetElement = document.querySelector(targetId) as HTMLElement;
        
        if (targetElement) {
          e.preventDefault();
          
          // Dispatch custom event to tell components to skip animation
          window.dispatchEvent(new CustomEvent('anchor-jump', { detail: targetId }));
          
          lenis.scrollTo(targetElement, {
            offset: -100,
            duration: 1.2,
            immediate: false,
          });
          
          // Update URL hash without jumping
          window.history.pushState(null, '', targetId);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <Navbar />

      <main className="relative z-10 bg-stone-bg mb-[100vh] shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
        <Hero />
        <Intro />
        <ExampleSection />
        <ProcessSection />
        <MediaSection />
        <PortfolioStack />
        
        {/* Final Section / Footer Trigger */}
        <section id="contact" className="py-40 bg-stone-bg text-center flex flex-col items-center justify-center relative z-10">
          <div className="text-[10px] tracking-[0.5em] mb-4 opacity-50 uppercase">Why Us</div>
          <h2 className="font-display text-3xl md:text-5xl mb-8 tracking-tighter">왜 타겟문자를 사용해야할까요?</h2>
          <div className="max-w-xl text-gray-600 font-light mb-16 leading-relaxed px-6 break-keep">
            알 수 없는 번호로 발송된 문자는 스팸으로 인식되어 브랜드 이미지에 부정적인 영향을 줄 수 있습니다. 
            통신사·카드사 등 신뢰도 높은 대표번호로 발송하여 브랜드 신뢰도를 유지하면서 정확한 고객에게만 도달하십시오.
          </div>
          
          <div className="flex flex-col items-center gap-6 mt-12">
            <span className="text-sm md:text-base tracking-[0.2em] font-bold uppercase opacity-80">광고문의하기</span>
            <div className="flex flex-col items-center animate-bounce">
              <div className="h-16 w-px bg-black/30" />
              <div className="w-2.5 h-2.5 border-b-2 border-r-2 border-black/30 rotate-45 -mt-1.5" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
