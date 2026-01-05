import React from 'react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#E2E2D0] font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-[#0A0A0C] border-b-[3px] border-[#72A0C1] px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 text-2xl flex items-center justify-center">✏️</div>
          <span className="text-lg font-bold text-[#E2E2D0] uppercase tracking-tighter">X-SKETCH</span>
          <span className="text-xs font-bold text-[#A5D8FF] ml-1">PRO</span>
        </div>
        <div className="flex gap-6 items-center">
          <a href="#features" className="text-[#E2E2D0] no-underline font-bold text-xs uppercase tracking-wider border-[2px] border-transparent py-1.5 px-3 hover:text-[#A5D8FF] hover:border-[#A5D8FF] hover:bg-[rgba(165,216,255,0.1)] transition-all">
            FEATURES
          </a>
          <a href="https://github.com/me-yeatz/X-Sketch" target="_blank" className="text-[#E2E2D0] no-underline font-bold text-xs uppercase tracking-wider border-[2px] border-transparent py-1.5 px-3 hover:text-[#A5D8FF] hover:border-[#A5D8FF] hover:bg-[rgba(165,216,255,0.1)] transition-all">
            GITHUB
          </a>
          <button
            onClick={onEnterApp}
            className="bg-[#72A0C1] text-[#0A0A0C] border-[3px] border-[#A5D8FF] py-2.5 px-5 font-bold text-xs uppercase tracking-wider inline-block shadow-[4px_4px_0_#A5D8FF]"
          >
            LAUNCH_APP
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen grid grid-cols-2 gap-16 items-center px-16 pt-36 pb-20 max-w-[1600px] mx-auto mt-20">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 bg-[#0A0A0C] text-[#A5D8FF] py-2.5 px-4.5 border-[2px] border-[#A5D8FF] w-fit font-bold text-xs uppercase tracking-widest">
            <span>⚡</span>
            <span className="text-[#A5D8FF]">ADVANCED_SKETCHING_SYSTEM</span>
          </div>
          <h1 className="text-[80px] font-black leading-none uppercase tracking-tighter text-[#E2E2D0]">
            X-SKETCH <span className="text-[#A5D8FF]">PRO</span>
          </h1>
          <p className="text-lg leading-[1.6] text-[#E2E2D0] opacity-80 max-w-[560px] font-sans">
            Professional-grade sketching application optimized for Android tablets.
            Featuring multi-layer palm rejection, low-latency ink rendering, and a robust brush engine.
          </p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={onEnterApp}
              className="bg-[#A5D8FF] text-[#0A0A0C] border-[3px] border-[#72A0C1] py-4 px-8 font-bold text-sm uppercase tracking-wider text-decoration-none inline-block shadow-[6px_6px_0_#72A0C1] hover:bg-[#72A0C1] hover:shadow-[8px_8px_0_#A5D8FF] hover:translate-x-[-8px] hover:-translate-y-[8px] transition-all"
            >
              LAUNCH_X-SKETCH
            </button>
            <a
              href="https://github.com/me-yeatz/X-Sketch"
              target="_blank"
              className="bg-[#0A0A0C] text-[#A5D8FF] border-[3px] border-[#72A0C1] py-4 px-8 font-bold text-sm uppercase tracking-wider text-decoration-none inline-block shadow-[6px_6px_0_#72A0C1] hover:bg-[#A5D8FF] hover:text-[#0A0A0C] hover:shadow-[8px_8px_0_#72A0C1] hover:translate-x-[-8px] hover:-translate-y-[8px] transition-all"
            >
              VIEW_SOURCE
            </a>
          </div>
          <div className="flex gap-12 mt-4 pt-6 border-t-[2px] border-[#72A0C1]">
            <div className="flex flex-col gap-1">
              <div className="text-[32px] font-black text-[#A5D8FF] uppercase font-bold">10+</div>
              <div className="text-xs font-black text-[#E2E2D0] uppercase tracking-widest opacity-60">BRUSH_TYPES</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[32px] font-black text-[#A5D8FF] uppercase font-bold">4ms</div>
              <div className="text-xs font-black text-[#E2E2D0] uppercase tracking-widest opacity-60">LATENCY</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-[32px] font-black text-[#A5D8FF] uppercase font-bold">99.8%</div>
              <div className="text-xs font-black text-[#E2E2D0] uppercase tracking-widest opacity-60">STABILITY</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="bg-[#0A0A0C] border-[3px] border-[#A5D8FF] shadow-[16px_16px_0_#72A0C1] w-full max-w-[540px]">
            <div className="bg-[#72A0C1] py-3 px-4 flex items-center gap-2 border-b-[3px] border-[#A5D8FF]">
              <div className="w-[14px] h-[14px] rounded-full border-[2px] border-[#0A0A0C] bg-[#A5D8FF]"></div>
              <div className="w-[14px] h-[14px] rounded-full border-[2px] border-[#0A0A0C] bg-[#E2E2D0]"></div>
              <div className="w-[14px] h-[14px] rounded-full border-[2px] border-[#0A0A0C] bg-[#EF4444]"></div>
              <span className="text-[#0A0A0C] text-xs font-black ml-3 uppercase tracking-wider">CYBER_DRIVE_OS // TERMINAL</span>
            </div>
            <div className="p-5">
              <div className="flex gap-2 mb-4">
                <div className="bg-[#0A0A0C] border-[2px] border-[#72A0C1] text-[#E2E2D0] py-2 px-4 text-xs font-black uppercase tracking-wider">PEN</div>
                <div className="bg-[#0A0A0C] border-[2px] border-[#72A0C1] text-[#E2E2D0] py-2 px-4 text-xs font-black uppercase tracking-wider">BRUSH</div>
                <div className="bg-[#0A0A0C] border-[2px] border-[#72A0C1] text-[#E2E2D0] py-2 px-4 text-xs font-black uppercase tracking-wider">ERASER</div>
              </div>
              <div className="bg-[#0D0D10] border-[2px] border-[#72A0C1] h-[280px] relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(114,160,193,0.1)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(114,160,193,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>
                <div className="absolute border-[3px] border-[#A5D8FF] rounded-[50%] opacity-80 demo-stroke-1" style={{ width: '200px', height: '80px', top: '60px', left: '60px', transform: 'rotate(-15deg)' }}></div>
                <div className="absolute border-[3px] border-[#72A0C1] rounded-[50%] opacity-80 demo-stroke-2" style={{ width: '180px', height: '60px', top: '120px', left: '200px', transform: 'rotate(10deg)' }}></div>
                <div className="absolute border-[3px] border-[#E2E2D0] rounded-[50%] opacity-80 demo-stroke-3" style={{ width: '150px', height: '50px', top: '180px', left: '100px', transform: 'rotate(-5deg)' }}></div>
              </div>
              <div className="bg-[#0A0A0C] border-[2px] border-[#72A0C1] py-2.5 px-4 mt-3 flex justify-between items-center">
                <span className="text-[#A5D8FF] text-xs font-black uppercase tracking-wider">STATUS: RUN // LATENCY: 4ms</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
