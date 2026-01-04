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
  Globe,
  Menu,
  X
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFE0] text-[#32292F] font-sans relative overflow-x-hidden">
      {/* Ambient Background Blobs */}
      <div className="ambient-blob blob-1"></div>
      <div className="ambient-blob blob-2"></div>
      <div className="ambient-blob blob-3"></div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container glass">
          <div className="nav-brand">
            <div className="nav-logo">
              <Globe className="w-6 h-6 stroke-[#FFAB91] fill-none" strokeWidth={2} />
            </div>
            <span className="nav-title">X-Sketch</span>
          </div>
          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`} id="navLinks">
            <a href="#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#brushes" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Brushes</a>
            <a href="#canvas" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Canvas</a>
            <button onClick={onEnterApp} className="nav-cta">Open App</button>
          </div>
          <button 
            className="mobile-menu-btn" 
            id="mobileMenuBtn" 
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[#32292F] fill-none" strokeWidth={1.5} />
            ) : (
              <Menu className="w-6 h-6 stroke-[#32292F] fill-none" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-badge glass-light">
            <Pencil className="w-4 h-4 stroke-[#FFAB91] fill-none" strokeWidth={2} />
            Advanced Sketching
          </div>
          <h1 className="hero-title">X-Sketch Pro</h1>
          <p className="hero-tagline">Design your art. Sketch your vision.</p>
          <p className="hero-subtitle">
            Professional-grade sketching application optimized for Android tablets. 
            Featuring multi-layer palm rejection, low-latency ink rendering, and a robust brush engine.
          </p>
          <div className="hero-buttons">
            <button onClick={onEnterApp} className="btn-primary">
              Enter X-Sketch <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <a href="https://github.com/me-yeatz/X-Sketch" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              View on GitHub
            </a>
          </div>
          <div className="hero-screenshot glass">
            <div className="w-full h-64 md:h-96 flex items-center justify-center border-2 border-[#8A9A5B] rounded-xl bg-[#0A0A0C] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
                <Globe size={400} strokeWidth={0.2} className="text-[#72A0C1]" />
              </div>
              <div className="text-center z-10">
                <div className="text-[#A5D8FF] text-xl md:text-2xl font-bold mb-2">X-SKETCH INTERFACE</div>
                <div className="text-[#72A0C1] text-sm md:text-base">CYBER DRIVE SKETCHING ENVIRONMENT</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge glass-light">Features</span>
            <h2 className="section-title">Everything you need</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card glass">
              <div className="feature-icon">
                <Brush className="w-7 h-7 stroke-[#FFAB91] fill-none" strokeWidth={1.5} />
              </div>
              <h3 className="feature-title">10 Brush Types</h3>
              <p className="feature-desc">
                From smooth ink to watercolor, oil, airbrush and more. Each brush responds to pressure and movement.
              </p>
            </div>
            <div className="feature-card glass">
              <div className="feature-icon">
                <Target className="w-7 h-7 stroke-[#FFAB91] fill-none" strokeWidth={1.5} />
              </div>
              <h3 className="feature-title">Palm Rejection</h3>
              <p className="feature-desc">
                Advanced palm rejection engine optimized for Android tablets. Prevents accidental touches during sketching.
              </p>
            </div>
            <div className="feature-card glass">
              <div className="feature-icon">
                <Layers className="w-7 h-7 stroke-[#FFAB91] fill-none" strokeWidth={1.5} />
              </div>
              <h3 className="feature-title">Layer Support</h3>
              <p className="feature-desc">
                Multi-layer canvas with opacity controls. Organize your artwork with dedicated layer management.
              </p>
            </div>
            <div className="feature-card glass">
              <div className="feature-icon">
                <Palette className="w-7 h-7 stroke-[#FFAB91] fill-none" strokeWidth={1.5} />
              </div>
              <h3 className="feature-title">Color System</h3>
              <p className="feature-desc">
                Full color palette with opacity controls. Cyber-themed color options optimized for digital art.
              </p>
            </div>
            <div className="feature-card glass">
              <div className="feature-icon">
                <Download className="w-7 h-7 stroke-[#FFAB91] fill-none" strokeWidth={1.5} />
              </div>
              <h3 className="feature-title">Export Options</h3>
              <p className="feature-desc">
                Export to PNG, JPG, SVG, and PDF formats. High-quality output for all your creative needs.
              </p>
            </div>
            <div className="feature-card glass">
              <div className="feature-icon">
                <Monitor className="w-7 h-7 stroke-[#FFAB91] fill-none" strokeWidth={1.5} />
              </div>
              <h3 className="feature-title">Tablet Optimized</h3>
              <p className="feature-desc">
                Designed specifically for Android tablets like the Infinix XPad. Full stylus and touch support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brushes Section */}
      <section className="showcase" id="brushes">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge glass-light">Brush Types</span>
            <h2 className="section-title">Advanced brush engine</h2>
          </div>
          <div className="showcase-content">
            <div className="showcase-text">
              <ul className="showcase-list">
                <li>
                  <span className="showcase-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                  <span>Smooth - Uses Quadratic Bezier curves for smooth ink</span>
                </li>
                <li>
                  <span className="showcase-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                  <span>Pencil - Textured, slightly rough edges</span>
                </li>
                <li>
                  <span className="showcase-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                  <span>Marker - Bold, slightly transparent, flat edges</span>
                </li>
                <li>
                  <span className="showcase-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                  <span>Spray - Particle-based spray paint effect</span>
                </li>
                <li>
                  <span className="showcase-check"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                  <span>Calligraphy - Variable width with angle sensitivity</span>
                </li>
              </ul>
            </div>
            <div className="showcase-image glass-light">
              <div className="w-full h-64 flex items-center justify-center border-2 border-[#8A9A5B] rounded-xl bg-[#0A0A0C] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
                  <Globe size={400} strokeWidth={0.2} className="text-[#72A0C1]" />
                </div>
                <div className="text-center z-10">
                  <div className="text-[#A5D8FF] text-lg font-bold mb-2">BRUSH PREVIEW</div>
                  <div className="text-[#72A0C1] text-sm">VARIOUS BRUSH TYPES</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Canvas Styles Section */}
      <section className="platforms" id="canvas">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge glass-light">Canvas Options</span>
            <h2 className="section-title">Multiple background styles</h2>
          </div>
          <div className="platforms-grid">
            <div className="platform-card glass">
              <div className="platform-icon">
                <Maximize className="w-10 h-10 stroke-[#32292F] fill-none" strokeWidth={1.5} />
              </div>
              <h3 className="platform-name">Plain</h3>
            </div>
            <div className="platform-card glass">
              <div className="platform-icon">
                <Grid className="w-10 h-10 stroke-[#32292F] fill-none" strokeWidth={1.5} />
              </div>
              <h3 className="platform-name">Dotted</h3>
            </div>
            <div className="platform-card glass">
              <div className="platform-icon">
                <Activity className="w-10 h-10 stroke-[#32292F] fill-none" strokeWidth={1.5} />
              </div>
              <h3 className="platform-name">Sketch</h3>
            </div>
            <div className="platform-card glass">
              <div className="platform-icon">
                <Database className="w-10 h-10 stroke-[#32292F] fill-none" strokeWidth={1.5} />
              </div>
              <h3 className="platform-name">Notes</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-container glass">
          <h2 className="cta-title">Ready to sketch?</h2>
          <p className="cta-subtitle">No sign-up required. Optimized for Android tablets. Just open and start creating.</p>
          <div className="cta-buttons">
            <button onClick={onEnterApp} className="btn-primary">
              Launch X-Sketch Pro <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <a href="https://github.com/me-yeatz/X-Sketch" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              View Source
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">X-Sketch Pro by <a href="https://github.com/me-yeatz" target="_blank" rel="noopener noreferrer">@me-yeatz</a> | <a href="https://github.com/me-yeatz/X-Sketch" target="_blank" rel="noopener noreferrer">Open Source</a></p>
      </footer>

      <style jsx>{`
        /* Ambient Background Blobs */
        .ambient-blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          animation: float 20s infinite ease-in-out;
          pointer-events: none;
        }

        .blob-1 {
          width: 40vw;
          height: 40vw;
          top: -10%;
          left: -10%;
          background: rgba(255, 171, 145, 0.3);
        }

        .blob-2 {
          width: 35vw;
          height: 35vw;
          bottom: -5%;
          right: -5%;
          background: rgba(138, 154, 91, 0.2);
          animation-delay: 2s;
        }

        .blob-3 {
          width: 25vw;
          height: 25vw;
          top: 50%;
          left: 50%;
          background: rgba(255, 245, 209, 0.6);
          animation-delay: 4s;
        }

        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }

        /* Glass Panel */
        .glass {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 24px;
        }

        .glass-light {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 32px;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 24px;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-logo {
          width: 40px;
          height: 40px;
          background: var(--charcoal);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-title {
          font-family: 'Cinzel', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--charcoal);
          letter-spacing: 1px;
        }

        .nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav-link {
          color: var(--charcoal);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }

        .nav-link:hover {
          opacity: 1;
        }

        .nav-cta {
          background: var(--charcoal);
          color: var(--bone);
          border: none;
          padding: 12px 24px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .nav-cta:hover {
          background: var(--charcoal-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(50, 41, 47, 0.2);
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 120px 32px 80px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          margin-bottom: 24px;
          font-size: 12px;
          font-weight: 600;
          color: var(--charcoal);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .hero-title {
          font-family: 'Cinzel', serif;
          font-size: 72px;
          font-weight: 700;
          line-height: 1.1;
          color: var(--charcoal);
          margin-bottom: 8px;
          letter-spacing: -1px;
        }

        .hero-tagline {
          font-family: 'Cinzel', serif;
          font-size: 24px;
          font-weight: 400;
          color: var(--charcoal-light);
          margin-bottom: 24px;
          letter-spacing: 2px;
        }

        .hero-subtitle {
          font-size: 18px;
          font-weight: 400;
          color: var(--charcoal);
          opacity: 0.7;
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto 40px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 60px;
        }

        .btn-primary {
          background: var(--charcoal);
          color: var(--bone);
          border: none;
          padding: 16px 32px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(50, 41, 47, 0.15);
          display: inline-flex;
          align-items: center;
        }

        .btn-primary:hover {
          background: var(--charcoal-light);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(50, 41, 47, 0.25);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.6);
          color: var(--charcoal);
          border: 1px solid rgba(50, 41, 47, 0.2);
          padding: 16px 32px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(50, 41, 47, 0.1);
        }

        .hero-screenshot {
          width: 100%;
          max-width: 900px;
          border-radius: 20px;
          box-shadow: 0 40px 100px rgba(50, 41, 47, 0.2);
        }

        /* Features Section */
        .features {
          padding: 100px 32px;
          position: relative;
          z-index: 1;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .section-badge {
          display: inline-block;
          padding: 8px 16px;
          margin-bottom: 16px;
          font-size: 12px;
          font-weight: 600;
          color: var(--charcoal);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .section-title {
          font-family: 'Cinzel', serif;
          font-size: 48px;
          font-weight: 700;
          color: var(--charcoal);
          letter-spacing: -1px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .feature-card {
          padding: 32px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(50, 41, 47, 0.1);
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          background: var(--charcoal);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .feature-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--charcoal);
        }

        .feature-desc {
          font-size: 14px;
          color: var(--charcoal);
          opacity: 0.7;
          line-height: 1.7;
        }

        /* Showcase Section */
        .showcase {
          padding: 100px 32px;
          position: relative;
          z-index: 1;
        }

        .showcase-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          margin-top: 48px;
        }

        .showcase-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .showcase-list li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          font-size: 16px;
          color: var(--charcoal);
        }

        .showcase-check {
          width: 28px;
          height: 28px;
          background: var(--sage);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .showcase-check svg {
          width: 16px;
          height: 16px;
          stroke: white;
          fill: none;
          stroke-width: 2.5;
        }

        .showcase-image {
          padding: 24px;
        }

        .showcase-image img {
          width: 100%;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(50, 41, 47, 0.15);
        }

        /* Platforms Section */
        .platforms {
          padding: 100px 32px;
          position: relative;
          z-index: 1;
        }

        .platforms-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 48px;
        }

        .platform-card {
          padding: 40px 24px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .platform-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(50, 41, 47, 0.1);
        }

        .platform-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .platform-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--charcoal);
        }

        /* CTA Section */
        .cta {
          padding: 100px 32px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .cta-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 64px;
        }

        .cta-title {
          font-family: 'Cinzel', serif;
          font-size: 48px;
          font-weight: 700;
          color: var(--charcoal);
          margin-bottom: 16px;
        }

        .cta-subtitle {
          font-size: 18px;
          color: var(--charcoal);
          opacity: 0.7;
          margin-bottom: 40px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        /* Footer */
        .footer {
          padding: 32px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .footer-text {
          color: var(--charcoal);
          font-size: 14px;
          opacity: 0.6;
        }

        .footer-text a {
          color: var(--charcoal);
          text-decoration: none;
          font-weight: 500;
        }

        .footer-text a:hover {
          opacity: 1;
        }

        /* Mobile Menu */
        .mobile-menu-btn {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .platforms-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .nav {
            padding: 12px 20px;
          }

          .nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .nav-links.mobile-open {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 80px;
            left: 20px;
            right: 20px;
            padding: 24px;
            gap: 20px;
            background: rgba(243, 239, 224, 0.9);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.5);
          }

          .hero {
            padding: 100px 20px 60px;
          }

          .hero-title {
            font-size: 42px;
          }

          .hero-tagline {
            font-size: 18px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .hero-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
            margin-left: auto;
            margin-right: auto;
          }

          .btn-primary, .btn-secondary {
            text-align: center;
            width: 100%;
          }

          .features {
            padding: 60px 20px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 32px;
          }

          .showcase {
            padding: 60px 20px;
          }

          .showcase-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .platforms {
            padding: 60px 20px;
          }

          .platforms-grid {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .cta {
            padding: 60px 20px;
          }

          .cta-container {
            padding: 40px 24px;
          }

          .cta-title {
            font-size: 32px;
          }

          .cta-buttons {
            flex-direction: column;
            max-width: 300px;
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 36px;
          }

          .platforms-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;