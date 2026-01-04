import React from 'react';
import { 
  Pencil, 
  Brush, 
  Palette, 
  Download, 
  Zap, 
  Shield, 
  Layers, 
  Monitor,
  ArrowRight,
  Maximize,
  Grid,
  Target,
  Activity,
  Cpu,
  Database,
  Globe
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen flex flex-col scanlines bg-[#0A0A0C] text-[#E2E2D0] font-sans">
      {/* Navigation */}
      <nav className="h-16 bg-[#0A0A0C] border-b-2 border-[#72A0C1] flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="pixel-font text-2xl leading-none tracking-widest text-[#A5D8FF]">CYBER DRIVE</span>
            <span className="mono-font text-[8px] opacity-60 tracking-[0.2em]">X-SKETCH.v3.1</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/me-yeatz/X-Sketch" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[10px] mono uppercase font-bold hover:text-[#A5D8FF] transition-colors hidden sm:block"
          >
            GitHub
          </a>
          <button 
            onClick={onEnterApp} 
            className="pixel-font text-sm border-2 border-[#72A0C1] px-4 py-1 hover:bg-[#72A0C1] hover:text-[#0A0A0C] transition-all"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b-2 border-[#72A0C1] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-[10px] mono uppercase tracking-[0.3em] text-[#A5D8FF] font-bold mb-4">
            ADVANCED TABLET SKETCHING
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter mb-6 pixel-font">
            X-Sketch Pro
          </h1>
          <p className="text-base md:text-lg opacity-80 max-w-3xl mx-auto leading-relaxed mb-10">
            Professional-grade sketching application optimized for Android tablets. 
            Featuring multi-layer palm rejection, low-latency ink rendering, and a robust brush engine.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button 
              onClick={onEnterApp} 
              className="pixel-font text-base border-2 border-[#A5D8FF] bg-[#A5D8FF] text-[#0A0A0C] px-8 py-3 hover:bg-[#0A0A0C] hover:text-[#A5D8FF] transition-all flex items-center gap-2"
            >
              Enter System <ArrowRight className="w-4 h-4" />
            </button>
            <a href="https://github.com/me-yeatz/X-Sketch" target="_blank" rel="noopener noreferrer">
              <button className="pixel-font text-base border-2 border-[#72A0C1] px-8 py-3 hover:bg-[#72A0C1] hover:text-[#0A0A0C] transition-all">
                View Source
              </button>
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] mono uppercase font-bold text-[#72A0C1]">
            <span>React 19</span>
            <span className="w-1 h-1 bg-[#A5D8FF]"></span>
            <span>TypeScript</span>
            <span className="w-1 h-1 bg-[#A5D8FF]"></span>
            <span>Canvas API</span>
            <span className="w-1 h-1 bg-[#A5D8FF]"></span>
            <span>Tablet Optimized</span>
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="border-b-2 border-[#72A0C1] bg-[#0A0A0C] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] mono uppercase tracking-[0.3em] text-[#72A0C1] font-bold mb-2">
              CYBER INTERFACE
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight pixel-font">Retro-Futuristic Design</h2>
          </div>
          
          <div className="relative">
            {/* Browser Frame */}
            <div className="border-2 border-[#72A0C1] bg-[#0A0A0C]">
              {/* Browser Header */}
              <div className="border-b-2 border-[#72A0C1] px-4 py-2 flex items-center gap-2 bg-[#72A0C1]/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#A5D8FF] border border-[#72A0C1]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#72A0C1] border border-[#72A0C1]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#E2E2D0] border border-[#72A0C1]"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-[#0A0A0C] border border-[#72A0C1] px-3 py-1 text-[10px] mono text-[#72A0C1] max-w-md mx-auto text-center">
                    x-sketch.cyber-drive.local
                  </div>
                </div>
              </div>
              {/* Screenshot Placeholder */}
              <div className="p-4 bg-[#0A0A0C]">
                <div className="border-2 border-[#72A0C1] aspect-video flex items-center justify-center bg-[#0A0A0C] relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
                    <Globe size={400} strokeWidth={0.2} className="text-[#72A0C1]" />
                  </div>
                  <div className="text-center z-10">
                    <div className="text-[#A5D8FF] pixel-font text-xl mb-2">X-SKETCH INTERFACE</div>
                    <div className="text-[#72A0C1] mono-font text-sm">CYBER DRIVE SKETCHING ENVIRONMENT</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Shadow */}
            <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-[#72A0C1] -z-10 bg-[#72A0C1]/20"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b-2 border-[#72A0C1] bg-[#0A0A0C] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] mono uppercase tracking-[0.3em] text-[#72A0C1] font-bold mb-2">
              CORE FEATURES
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight pixel-font">Advanced Sketching Tools</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="border-2 border-[#72A0C1] p-6 hover:bg-[#72A0C1]/10 transition-colors group">
              <div className="w-12 h-12 border-2 border-[#72A0C1] flex items-center justify-center mb-4 group-hover:bg-[#A5D8FF] group-hover:text-[#0A0A0C] transition-colors">
                <Brush className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black uppercase mb-2 pixel-font">10 Brush Types</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                From smooth ink to watercolor, oil, airbrush and more. Each brush responds to pressure and movement.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border-2 border-[#72A0C1] p-6 hover:bg-[#72A0C1]/10 transition-colors group">
              <div className="w-12 h-12 border-2 border-[#72A0C1] flex items-center justify-center mb-4 group-hover:bg-[#A5D8FF] group-hover:text-[#0A0A0C] transition-colors">
                Target className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black uppercase mb-2 pixel-font">Palm Rejection</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Advanced palm rejection engine optimized for Android tablets. Prevents accidental touches during sketching.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border-2 border-[#72A0C1] p-6 hover:bg-[#72A0C1]/10 transition-colors group">
              <div className="w-12 h-12 border-2 border-[#72A0C1] flex items-center justify-center mb-4 group-hover:bg-[#A5D8FF] group-hover:text-[#0A0A0C] transition-colors">
                Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black uppercase mb-2 pixel-font">Layer Support</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Multi-layer canvas with opacity controls. Organize your artwork with dedicated layer management.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="border-2 border-[#72A0C1] p-6 hover:bg-[#72A0C1]/10 transition-colors group">
              <div className="w-12 h-12 border-2 border-[#72A0C1] flex items-center justify-center mb-4 group-hover:bg-[#A5D8FF] group-hover:text-[#0A0A0C] transition-colors">
                Palette className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black uppercase mb-2 pixel-font">Color System</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Full color palette with opacity controls. Cyber-themed color options optimized for digital art.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="border-2 border-[#72A0C1] p-6 hover:bg-[#72A0C1]/10 transition-colors group">
              <div className="w-12 h-12 border-2 border-[#72A0C1] flex items-center justify-center mb-4 group-hover:bg-[#A5D8FF] group-hover:text-[#0A0A0C] transition-colors">
                Download className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black uppercase mb-2 pixel-font">Export Options</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Export to PNG, JPG, SVG, and PDF formats. High-quality output for all your creative needs.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="border-2 border-[#72A0C1] p-6 hover:bg-[#72A0C1]/10 transition-colors group">
              <div className="w-12 h-12 border-2 border-[#72A0C1] flex items-center justify-center mb-4 group-hover:bg-[#A5D8FF] group-hover:text-[#0A0A0C] transition-colors">
                Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black uppercase mb-2 pixel-font">Tablet Optimized</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Designed specifically for Android tablets like the Infinix XPad. Full stylus and touch support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Canvas Styles Section */}
      <section className="border-b-2 border-[#72A0C1] bg-[#0A0A0C] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] mono uppercase tracking-[0.3em] text-[#72A0C1] font-bold mb-2">
              CANVAS OPTIONS
            </p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight pixel-font">Multiple Background Styles</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="border-2 border-[#72A0C1] p-6 text-center">
              <div className="w-16 h-16 border border-[#72A0C1] mx-auto mb-4 flex items-center justify-center bg-[#0A0A0C]">
                <Maximize className="w-8 h-8 text-[#A5D8FF]" />
              </div>
              <h3 className="text-base font-black uppercase pixel-font mb-2">Plain</h3>
              <p className="text-sm opacity-80">Clean canvas for unrestricted drawing</p>
            </div>

            <div className="border-2 border-[#72A0C1] p-6 text-center">
              <div className="w-16 h-16 border border-[#72A0C1] mx-auto mb-4 flex items-center justify-center bg-[#0A0A0C]">
                <Grid className="w-8 h-8 text-[#A5D8FF]" />
              </div>
              <h3 className="text-base font-black uppercase pixel-font mb-2">Dotted</h3>
              <p className="text-sm opacity-80">Grid pattern for precise sketching</p>
            </div>

            <div className="border-2 border-[#72A0C1] p-6 text-center">
              <div className="w-16 h-16 border border-[#72A0C1] mx-auto mb-4 flex items-center justify-center bg-[#0A0A0C]">
                <Activity className="w-8 h-8 text-[#A5D8FF]" />
              </div>
              <h3 className="text-base font-black uppercase pixel-font mb-2">Sketch</h3>
              <p className="text-sm opacity-80">Dither pattern for traditional feel</p>
            </div>

            <div className="border-2 border-[#72A0C1] p-6 text-center">
              <div className="w-16 h-16 border border-[#72A0C1] mx-auto mb-4 flex items-center justify-center bg-[#0A0A0C]">
                <Database className="w-8 h-8 text-[#A5D8FF]" />
              </div>
              <h3 className="text-base font-black uppercase pixel-font mb-2">Notes</h3>
              <p className="text-sm opacity-80">Ruled lines for note-taking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="border-b-2 border-[#72A0C1] bg-[#0A0A0C] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] mono uppercase tracking-[0.3em] text-[#72A0C1] font-bold mb-2">
            TECHNOLOGY STACK
          </p>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight pixel-font mb-10">
            Built for Performance
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 border-2 border-[#A5D8FF] flex items-center justify-center mx-auto mb-4 bg-[#A5D8FF] text-[#0A0A0C]">
                <Cpu className="w-7 h-7" />
              </div>
              <h4 className="font-black uppercase text-sm pixel-font mb-1">React 19</h4>
              <p className="text-xs opacity-60 mono-font">Modern UI framework</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 border-2 border-[#A5D8FF] flex items-center justify-center mx-auto mb-4 bg-[#A5D8FF] text-[#0A0A0C]">
                <Database className="w-7 h-7" />
              </div>
              <h4 className="font-black uppercase text-sm pixel-font mb-1">Canvas API</h4>
              <p className="text-xs opacity-60 mono-font">High-performance drawing</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 border-2 border-[#A5D8FF] flex items-center justify-center mx-auto mb-4 bg-[#A5D8FF] text-[#0A0A0C]">
                <Shield className="w-7 h-7" />
              </div>
              <h4 className="font-black uppercase text-sm pixel-font mb-1">Local Storage</h4>
              <p className="text-xs opacity-60 mono-font">Your data stays private</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 border-2 border-[#A5D8FF] flex items-center justify-center mx-auto mb-4 bg-[#A5D8FF] text-[#0A0A0C]">
                <Globe className="w-7 h-7" />
              </div>
              <h4 className="font-black uppercase text-sm pixel-font mb-1">PWA Ready</h4>
              <p className="text-xs opacity-60 mono-font">Installable on any device</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#A5D8FF] text-[#0A0A0C] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight pixel-font mb-4">
            Ready to Sketch?
          </h2>
          <p className="text-base opacity-90 mb-8 max-w-md mx-auto">
            No sign-up required. Optimized for Android tablets. Just open and start creating.
          </p>
          <button
            onClick={onEnterApp}
            className="pixel-font text-lg border-2 border-[#0A0A0C] bg-[#0A0A0C] text-[#A5D8FF] px-10 py-4 hover:bg-[#A5D8FF] hover:text-[#0A0A0C] transition-all inline-flex items-center gap-3"
          >
            Launch X-Sketch Pro <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-10 bg-[#72A0C1] text-[#0A0A0C] flex items-center px-6 overflow-hidden">
        <div className="flex gap-12 animate-[scroll_20s_linear_infinite] whitespace-nowrap pixel-font text-lg">
          <span>DRIVE BEYOND THE HORIZON WHERE PAST MEETS FUTURE</span>
          <span>SYSTEM_LINK_STABLE // USER_001_ACTIVE</span>
          <span>DATA_X_TRANSFER_READY // PIN_CALIBRATION_COMPLETE</span>
          <span>DRIVE BEYOND THE HORIZON WHERE PAST MEETS FUTURE</span>
          <span>SYSTEM_LINK_STABLE // USER_001_ACTIVE</span>
        </div>
      </footer>

      {/* Footer animation style */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;