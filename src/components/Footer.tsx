import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const anim = gsap.from(contentRef.current, {
      y: 100,
      opacity: 0.5,
      scale: 0.9,
      scrollTrigger: {
        trigger: '#contact',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    const handleJump = (e: any) => {
      const SECTION_ORDER = ['#intro', '#process', '#media', '#contact'];
      const jumpIndex = SECTION_ORDER.indexOf(e.detail);
      const myIndex = SECTION_ORDER.indexOf('#contact');
      if (jumpIndex >= myIndex) {
        gsap.set(contentRef.current, { y: 0, opacity: 1, scale: 1 });
        anim.kill();
      }
    };

    window.addEventListener('anchor-jump', handleJump as EventListener);
    return () => window.removeEventListener('anchor-jump', handleJump as EventListener);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xnjbopkg', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('문의가 접수되었습니다. 담당자가 곧 연락드리겠습니다.');
        form.reset();
        setAgreed(false);
      } else {
        alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full h-screen z-0 bg-[#111] text-white flex flex-col justify-center items-center overflow-hidden">
      <div ref={contentRef} className="relative z-10 w-full max-w-7xl px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Info */}
          <div className="text-left">
            <div className="text-[10px] tracking-[0.5em] mb-4 text-white uppercase font-bold">CONTACT US</div>
            <h2 className="font-display text-[8vw] md:text-[5vw] leading-tight tracking-tighter mb-12 text-white">
              광고 상담 및 문의
            </h2>
            
            <div className="space-y-8 text-[10px] tracking-[0.2em] uppercase text-gray-200">
              <div>
                <div className="opacity-80 mb-2 text-white font-bold">Email</div>
                <div className="text-white text-base font-medium">sskim@adxkorea.com</div>
              </div>
              <div>
                <div className="opacity-80 mb-2 text-white font-bold">Tel</div>
                <div className="text-white text-base font-medium">031-605-0308</div>
              </div>
              <div>
                <div className="opacity-80 mb-2 text-white font-bold">Website</div>
                <div className="text-white text-base font-medium">www.adxkorea.com</div>
              </div>
            </div>

            <div className="mt-16 space-y-2 text-[9px] text-gray-300 tracking-[0.2em] uppercase hidden lg:block">
              <div className="flex items-center gap-4">
                <span>주식회사 에이디엑스</span>
                <span className="opacity-30">|</span>
                <span>사업자 등록번호 : 312-87-03667</span>
              </div>
              <div className="flex items-center gap-4">
                <span>Tel : 031-605-0308</span>
                <span className="opacity-30">|</span>
                <span>E-mail : sskim@adxkorea.com</span>
              </div>
              <div>경기도 성남시 분당구 대왕판교로 660 유스페이스1 A동 지하1층</div>
              <div className="pt-4 opacity-40">© 2025 ADX KOREA | TARGET LMS ADVERTISING</div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-black/40 border border-white/10 p-8 md:p-10 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">담당자명</label>
                  <input required name="name" type="text" className="w-full bg-transparent border-b border-white/30 py-2 focus:border-moss-accent outline-none transition-colors text-sm text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">회사명</label>
                  <input required name="company" type="text" className="w-full bg-transparent border-b border-white/30 py-2 focus:border-moss-accent outline-none transition-colors text-sm text-white" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">이메일</label>
                  <input required name="email" type="email" className="w-full bg-transparent border-b border-white/30 py-2 focus:border-moss-accent outline-none transition-colors text-sm text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">연락처</label>
                  <input required name="phone" type="tel" className="w-full bg-transparent border-b border-white/30 py-2 focus:border-moss-accent outline-none transition-colors text-sm text-white" />
                </div>
              </div>
              
              <div className="pt-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 rounded border-white/30 bg-transparent checked:bg-moss-accent transition-all cursor-pointer" 
                  />
                  <span className="text-[11px] tracking-tight text-gray-300 group-hover:text-white transition-colors">
                    개인정보 수집 및 이용에 동의합니다
                  </span>
                </label>
              </div>

              <div className="bg-black/60 p-4 rounded text-[9px] leading-relaxed text-gray-400 max-h-32 overflow-y-auto border border-white/10">
                <p className="font-bold text-gray-300 mb-2">개인정보 수집 및 이용 동의</p>
                <p className="mb-2">■ 개인정보 수집목적 및 이용목적: 문의접수</p>
                <p className="mb-2">■ 수집하는 개인정보 항목: 담당자명, 회사명, 이메일, 연락처 등</p>
                <p>■ 개인정보의 보유기간 및 이용기간: 관계 법령의 규정에 따라 귀하의 개인정보를 보존할 의무가 있는 경우가 아닌 한, 회사는 위의 수집 및 이용목적을 달성할 때까지 귀하의 개인정보를 보유 및 이용합니다.</p>
                <p className="mt-2 text-[8px] text-gray-500">* 귀하는 위와 같은 일반 개인정보의 수집 및 이용을 거부할 수 있습니다. 다만, 일반 개인정보의 필수적 수집 및 이용에 동의하지 않을 경우 문의 및 메시지 서비스 이용이 불가능합니다.</p>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-moss-accent hover:text-white transition-all duration-500"
              >
                상담 신청하기
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 space-y-2 text-[8px] text-gray-300 tracking-[0.1em] uppercase lg:hidden text-center">
          <div>주식회사 에이디엑스 | 사업자 등록번호 : 312-87-03667</div>
          <div>Tel : 031-605-0308 | E-mail : sskim@adxkorea.com</div>
          <div>경기도 성남시 분당구 대왕판교로 660 유스페이스1 A동 지하1층</div>
          <div className="pt-4 opacity-60">© 2025 ADX KOREA | TARGET LMS ADVERTISING</div>
        </div>
      </div>
      
      {/* Background Image */}
      <img
        src="https://lh3.googleusercontent.com/d/1-esQiI-Wlqkyb8m-7uKMm1XQ_P6gPl3z"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        alt="Footer Background"
        referrerPolicy="no-referrer"
      />
    </footer>
  );
}
