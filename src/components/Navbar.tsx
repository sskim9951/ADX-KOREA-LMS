import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full p-6 md:p-8 flex justify-between items-center z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent'
    }`}>
      <div className="font-display font-bold text-xl tracking-tighter text-stone-900">ADX</div>
      <div className="hidden md:flex gap-12 items-start">
        <a href="#intro" className="flex flex-col items-start group transition-colors text-stone-900">
          <span className="text-[8px] tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Service</span>
          <span className="text-sm font-bold tracking-tighter">서비스 소개</span>
        </a>
        <a href="#process" className="flex flex-col items-start group transition-colors text-stone-900">
          <span className="text-[8px] tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Process</span>
          <span className="text-sm font-bold tracking-tighter">집행 프로세스</span>
        </a>
        <a href="#media" className="flex flex-col items-start group transition-colors text-stone-900">
          <span className="text-[8px] tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Media</span>
          <span className="text-sm font-bold tracking-tighter">매체 리스트</span>
        </a>
        <a href="#contact" className="flex flex-col items-start group transition-colors text-stone-900">
          <span className="text-[8px] tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Contact</span>
          <span className="text-sm font-bold tracking-tighter">광고 문의</span>
        </a>
      </div>
      <div className="md:hidden text-[10px] tracking-[0.2em] uppercase text-stone-900">메뉴</div>
    </nav>
  );
}
