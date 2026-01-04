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
  Target,
  Activity,
  Cpu,
  Grid3X3,
  Maximize2,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#E2E2D0] font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0C]/95 backdrop-blur-md border-b border-[#72A0C1]/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#72A0C1] rounded-lg flex items-center justify-center">
                <Pencil className="w-4 h-4 text-[#0A0A0C]" />
              </div>
              <span className="text-xl font-bold text-[#A5D8FF]">X-SKETCH</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-[#E2E2D0]/70 hover:text-[#A5D8FF] transition-colors">Features</a>
              <a href="#brushes" className="text-[#E2E2D0]/70 hover:text-[#A5D8FF] transition-colors">Brushes</a>
            <a href="#canvas" className="text-[#E2E2D0]/70 hover:text-[#A5D8FF] transition-colors">Canvas</a>
            <a href="#about" className="text-[#E2E2D0]/70 hover:text-[#A5D8FF] transition-colors">About</a>
            <button
                onClick={onEnterApp}
                className="bg-[#72A0C1] text-[#0A0A0C] px-6 py-2 rounded-lg font-semibold hover:bg-[#A5D8FF] transition-colors"
              >
                Enter App
              </button>
            </div>
            <button className="md:hidden text-[#E2E2D0]">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#72A0C1]/10 border border-[#72A0C1]/30 rounded-full px-4 py-2 mb-8">
            <Target className="w-4 h-4 text-[#A5D8FF]" />
            <span className="text-sm font-medium text-[#A5D8FF]">ADVANCED SKETCHING</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            X-SKETCH <span className="text-[#A5D8FF]">PRO</span>
          </h1>

          <p className="text-xl text-[#E2E2D0]/70 mb-8 max-w-2xl mx-auto">
            Professional-grade sketching application optimized for Android tablets.
            Featuring multi-layer palm rejection, low-latency ink rendering, and a robust brush engine.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onEnterApp}
              className="bg-[#A5D8FF] text-[#0A0A0C] px-8 py-4 rounded-xl font-semibold hover:bg-[#A5D8FF]/90 transition-colors flex items-center justify-center gap-2"
            >
              Launch X-Sketch Pro
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="https://github.com/me-yeatz/X-Sketch"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#72A0C1]/50 text-[#A5D8FF] px-8 py-4 rounded-xl font-semibold hover:bg-[#72A0C1]/10 transition-colors flex items-center justify-center gap-2"
            >
              View on GitHub
            </a>
          </div>

          {/* Mock Interface Screenshot */}
          <div className="max-w-4xl mx-auto bg-[#0A0A0C] border border-[#72A0C1]/30 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#72A0C1]/5 to-transparent"></div>
            <div className="relative text-center py-12">
              <div className="text-[#A5D8FF] text-2xl font-bold mb-4">X-SKETCH INTERFACE</div>
              <div className="text-[#72A0C1] text-lg">CYBER DRIVE SKETCHING ENVIRONMENT</div>
              <div className="flex justify-center gap-8 mt-8">
                <div className="text-center">
                  <div className="text-[#A5D8FF] font-semibold">STATUS</div>
                  <div className="text-[#E2E2D0]/70">RUN</div>
                </div>
                <div className="text-center">
                  <div className="text-[#A5D8FF] font-semibold">STABILITY</div>
                  <div className="text-[#E2E2D0]/70">99.8%</div>
                </div>
                <div className="text-center">
                  <div className="text-[#A5D8FF] font-semibold">LATENCY</div>
                  <div className="text-[#E2E2D0]/70">4ms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#0A0A0C]/50" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-[#E2E2D0]/70">Advanced tools for professional digital sketching</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#72A0C1]/5 border border-[#72A0C1]/20 rounded-xl p-6 hover:bg-[#72A0C1]/10 transition-colors">
              <div className="w-12 h-12 bg-[#A5D8FF] rounded-lg flex items-center justify-center mb-4">
                <Brush className="w-6 h-6 text-[#0A0A0C]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">10 Brush Types</h3>
              <p className="text-[#E2E2D0]/70">From smooth ink to watercolor, oil, airbrush and more. Each brush responds to pressure and movement.</p>
            </div>

            <div className="bg-[#72A0C1]/5 border border-[#72A0C1]/20 rounded-xl p-6 hover:bg-[#72A0C1]/10 transition-colors">
              <div className="w-12 h-12 bg-[#A5D8FF] rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-[#0A0A0C]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Palm Rejection</h3>
              <p className="text-[#E2E2D0]/70">Advanced palm rejection engine optimized for Android tablets. Prevents accidental touches during sketching.</p>
            </div>

            <div className="bg-[#72A0C1]/5 border border-[#72A0C1]/20 rounded-xl p-6 hover:bg-[#72A0C1]/10 transition-colors">
              <div className="w-12 h-12 bg-[#A5D8FF] rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-[#0A0A0C]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Layer Support</h3>
              <p className="text-[#E2E2D0]/70">Multi-layer canvas with opacity controls. Organize your artwork with dedicated layer management.</p>
            </div>

            <div className="bg-[#72A0C1]/5 border border-[#72A0C1]/20 rounded-xl p-6 hover:bg-[#72A0C1]/10 transition-colors">
              <div className="w-12 h-12 bg-[#A5D8FF] rounded-lg flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-[#0A0A0C]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Color System</h3>
              <p className="text-[#E2E2D0]/70">Full color palette with opacity controls. Cyber-themed color options optimized for digital art.</p>
            </div>

            <div className="bg-[#72A0C1]/5 border border-[#72A0C1]/20 rounded-xl p-6 hover:bg-[#72A0C1]/10 transition-colors">
              <div className="w-12 h-12 bg-[#A5D8FF] rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-[#0A0A0C]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Export Options</h3>
              <p className="text-[#E2E2D0]/70">Export to PNG, JPG, SVG, and PDF formats. High-quality output for all your creative needs.</p>
            </div>

            <div className="bg-[#72A0C1]/5 border border-[#72A0C1]/20 rounded-xl p-6 hover:bg-[#72A0C1]/10 transition-colors">
              <div className="w-12 h-12 bg-[#A5D8FF] rounded-lg flex items-center justify-center mb-4">
                <Monitor className="w-6 h-6 text-[#0A0A0C]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tablet Optimized</h3>
              <p className="text-[#E2E2D0]/70">Designed specifically for Android tablets like the Infinix XPad. Full stylus and touch support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brushes Section */}
      <section className="py-20 px-6" id="brushes">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Advanced Brush Engine</h2>
            <p className="text-xl text-[#E2E2D0]/70">Precision tools for every creative need</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#A5D8FF] rounded flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-[#0A0A0C]" />
                </div>
                <div>
                  <div className="font-semibold text-[#A5D8FF]">Smooth</div>
                  <div className="text-[#E2E2D0]/70">Uses Quadratic Bezier curves for smooth ink</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#A5D8FF] rounded flex items-center justify-center flex-shrink-0">
                  <Pencil className="w-4 h-4 text-[#0A0A0C]" />
                </div>
                <div>
                  <div className="font-semibold text-[#A5D8FF]">Pencil</div>
                  <div className="text-[#E2E2D0]/70">Textured, slightly rough edges</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#A5D8FF] rounded flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4 text-[#0A0A0C]" />
                </div>
                <div>
                  <div className="font-semibold text-[#A5D8FF]">Marker</div>
                  <div className="text-[#E2E2D0]/70">Bold, slightly transparent, flat edges</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#A5D8FF] rounded flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-[#0A0A0C]" />
                </div>
                <div>
                  <div className="font-semibold text-[#A5D8FF]">Spray</div>
                  <div className="text-[#E2E2D0]/70">Particle-based spray paint effect</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-[#A5D8FF] rounded flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-[#0A0A0C]" />
                </div>
                <div>
                  <div className="font-semibold text-[#A5D8FF]">Calligraphy</div>
                  <div className="text-[#E2E2D0]/70">Variable width with angle sensitivity</div>
                </div>
              </div>
            </div>

            <div className="bg-[#72A0C1]/5 border border-[#72A0C1]/20 rounded-xl p-8 text-center">
              <div className="text-[#A5D8FF] text-xl font-bold mb-4">BRUSH PREVIEW</div>
              <div className="text-[#72A0C1] mb-6">VARIOUS BRUSH TYPES</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-[#E2E2D0]/70">Watercolor</div>
                <div className="text-[#E2E2D0]/70">Oil</div>
                <div className="text-[#E2E2D0]/70">Ink Pen</div>
                <div className="text-[#E2E2D0]/70">Airbrush</div>
                <div className="text-[#E2E2D0]/70">Charcoal</div>
                <div className="text-[#E2E2D0]/70">Digital</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Canvas Styles Section */}
      <section className="py-20 px-6 bg-[#0A0A0C]/50" id="canvas">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Multiple Background Styles</h2>
            <p className="text-xl text-[#E2E2D0]/70">Choose your creative environment</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#72A0C1]/5 border border-[#72A0C1]/20 rounded-xl p-6 text-center hover:bg-[#72A0C1]/10 transition-colors">
              <div className="w-12 h-12 bg-[#A5D8FF] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Maximize2 className="w-6 h-6 text-[#0A0A0C]" />
              </div>
              <h3 className="text-lg font-semibold">Plain</h3>
            </div>

            <div className="bg-[#72A0C1]/5 border border-[#72A0C1]/20 rounded-xl p-6 text-center hover:bg-[#72A0C1]/10 transition-colors">
              <div className="w-12 h-12 bg-[#A5D8FF] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Grid3X3 className="w-6 h-6 text-[#0A0A0C]" />
              </div>
              <h3 className="text-lg font-semibold">Dotted</h3>
            </div>

            <div className="bg-[#72A0C1]/5 border border-[#72A0C1]/20 rounded-xl p-6 text-center hover:bg-[#72A0C1]/10 transition-colors">
              <div className="w-12 h-12 bg-[#A5D8FF] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-[#0A0A0C]" />
              </div>
              <h3 className="text-lg font-semibold">Sketch</h3>
            </div>

            <div className="bg-[#72A0C1]/5 border border-[#72A0C1]/20 rounded-xl p-6 text-center hover:bg-[#72A0C1]/10 transition-colors">
              <div className="w-12 h-12 bg-[#A5D8FF] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-6 h-6 text-[#0A0A0C]" />
              </div>
              <h3 className="text-lg font-semibold">Notes</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Sketch?</h2>
          <p className="text-xl text-[#E2E2D0]/70 mb-8">No sign-up required. Optimized for Android tablets. Just open and start creating.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onEnterApp}
              className="bg-[#A5D8FF] text-[#0A0A0C] px-8 py-4 rounded-xl font-semibold hover:bg-[#A5D8FF]/90 transition-colors flex items-center justify-center gap-2"
            >
              Launch X-Sketch Pro
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="https://github.com/me-yeatz/X-Sketch"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#72A0C1]/50 text-[#A5D8FF] px-8 py-4 rounded-xl font-semibold hover:bg-[#72A0C1]/10 transition-colors flex items-center justify-center gap-2"
            >
              View Source
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#72A0C1]/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#E2E2D0]/60">
            X-Sketch Pro by <a href="https://github.com/me-yeatz" className="text-[#A5D8FF] hover:text-[#A5D8FF]/80">@me-yeatz</a> | <a href="https://github.com/me-yeatz/X-Sketch" className="text-[#A5D8FF] hover:text-[#A5D8FF]/80">Open Source</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;