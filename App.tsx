
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Pencil,
  Eraser,
  Undo,
  Redo,
  Move,
  ChevronRight,
  ChevronLeft,
  Circle,
  ShieldAlert,
  Target,
  Upload,
  Grid,
  Maximize,
  RefreshCw,
  XCircle,
  Hand,
  Activity,
  Cpu,
  Database,
  Terminal,
  Globe,
  Share2,
  ArrowRight,
  // Added missing icons
  FileImage,
  FileText
} from 'lucide-react';
import {
  ToolType,
  BrushType,
  Stroke,
  Point,
  PalmRejectionLevel,
  PalmRejectionConfig,
  CanvasStyle,
  ExportFormat,
  Layer
} from './types';
import { PalmRejectionEngine } from './services/PalmRejectionEngine';
import { BrushEngine } from './services/BrushEngine';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  // --- State ---
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [activeTool, setActiveTool] = useState<ToolType>('pen');
  const [activeBrushType, setActiveBrushType] = useState<BrushType>('smooth');
  const [canvasStyle, setCanvasStyle] = useState<CanvasStyle>('plain');
  const [color, setColor] = useState('#A5D8FF'); // Cyber Cyan default
  const [size, setSize] = useState(4);
  const [opacity, setOpacity] = useState(1);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [importedImage, setImportedImage] = useState<HTMLImageElement | null>(null);
  
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const lastPanPoint = useRef({ x: 0, y: 0 });

  const [palmRejection, setPalmRejection] = useState<PalmRejectionConfig>({
    level: PalmRejectionLevel.MEDIUM,
    maxTouchWidth: 20,
    maxTouchHeight: 20,
    requirePressure: false,
    debugMode: false
  });
  
  const [rejectedEvents, setRejectedEvents] = useState<{ x: number, y: number, reason: string }[]>([]);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 }); // Default size, will be updated by useEffect

  // --- Refs ---
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentPoints = useRef<Point[]>([]);
  const activePointerId = useRef<number | null>(null);
  const palmEngine = useRef(new PalmRejectionEngine(palmRejection));

  // --- Initialization ---
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    palmEngine.current.updateConfig(palmRejection);
  }, [palmRejection]);

  // Update body class for scrolling behavior
  useEffect(() => {
    if (showLandingPage) {
      document.body.className = 'landing-page';
    } else {
      document.body.className = 'drawing-app';
    }
  }, [showLandingPage]);

  const renderBackground = useCallback(() => {
    const ctx = backgroundCanvasRef.current?.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvasSize;
    ctx.clearRect(0, 0, width, height);
    
    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);

    // Cyber Dark Base
    ctx.fillStyle = '#0A0A0C';
    ctx.fillRect(-panOffset.x, -panOffset.y, width, height);

    if (importedImage) {
      const scale = Math.min(width / importedImage.width, height / importedImage.height);
      const x = (width - importedImage.width * scale) / 2;
      const y = (height - importedImage.height * scale) / 2;
      ctx.globalAlpha = 0.4;
      ctx.drawImage(importedImage, x, y, importedImage.width * scale, importedImage.height * scale);
      ctx.globalAlpha = 1.0;
    }

    // Patterns
    if (canvasStyle === 'notes') {
      ctx.strokeStyle = 'rgba(114, 160, 193, 0.2)';
      ctx.lineWidth = 1;
      const spacing = 30;
      const startY = Math.floor(-panOffset.y / spacing) * spacing;
      for (let i = startY; i < height - panOffset.y + spacing; i += spacing) {
        ctx.beginPath();
        ctx.moveTo(-panOffset.x, i);
        ctx.lineTo(width - panOffset.x, i);
        ctx.stroke();
      }
    } else if (canvasStyle === 'dotted') {
      ctx.fillStyle = 'rgba(114, 160, 193, 0.3)';
      const spacing = 40;
      const startX = Math.floor(-panOffset.x / spacing) * spacing;
      const startY = Math.floor(-panOffset.y / spacing) * spacing;
      for (let x = startX; x < width - panOffset.x + spacing; x += spacing) {
        for (let y = startY; y < height - panOffset.y + spacing; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (canvasStyle === 'sketch') {
      // Dither overlay simulation
      ctx.fillStyle = 'rgba(114, 160, 193, 0.05)';
      for(let x=0; x<width; x+=4) {
        for(let y=0; y<height; y+=4) {
          if((x+y)%8 === 0) ctx.fillRect(x-panOffset.x, y-panOffset.y, 2, 2);
        }
      }
    }

    ctx.restore();
  }, [canvasSize, canvasStyle, importedImage, panOffset]);

  const renderDrawing = useCallback(() => {
    const ctx = drawingCanvasRef.current?.getContext('2d');
    if (!ctx) return;

    // Only clear and redraw when strokes change, not when canvas size changes
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);
    strokes.forEach(stroke => {
      ctx.globalCompositeOperation = stroke.tool === 'eraser' ? 'destination-out' : 'source-over';
      BrushEngine.drawStroke(ctx, stroke);
    });
    ctx.restore();
    ctx.globalCompositeOperation = 'source-over';
  }, [strokes, canvasSize, panOffset]);

  // Render background when canvas properties change
  useEffect(() => {
    renderBackground();
  }, [canvasStyle, importedImage, panOffset, canvasSize]);

  // Render drawing only when strokes change
  useEffect(() => {
    renderDrawing();
  }, [strokes, panOffset]);

  const undo = useCallback(() => {
    setStrokes(prev => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setRedoStack(r => [...r, last]);
      return prev.slice(0, -1);
    });
  }, []);

  const redo = useCallback(() => {
    setRedoStack(prev => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setStrokes(s => [...s, last]);
      return prev.slice(0, -1);
    });
  }, []);

  // Added exportCanvas implementation
  const exportCanvas = useCallback((format: ExportFormat) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    const ctx = canvas.getContext('2d');
    if (!ctx || !backgroundCanvasRef.current || !drawingCanvasRef.current) return;

    // Composite layers: Background then drawing
    ctx.drawImage(backgroundCanvasRef.current, 0, 0);
    ctx.drawImage(drawingCanvasRef.current, 0, 0);

    let mimeType = 'image/png';
    let ext = format as string;
    
    if (format === 'jpg') {
      mimeType = 'image/jpeg';
    } else if (format === 'svg' || format === 'pdf') {
      // Native canvas export only supports raster images directly. 
      // Falling back to PNG for SVG/PDF requests in this implementation.
      mimeType = 'image/png';
      ext = 'png';
      console.warn(`${format} export protocol requires external drivers. Defaulting to PNG.`);
    }

    const dataURL = canvas.toDataURL(mimeType);
    const link = document.createElement('a');
    link.download = `CYBER_DRIVE_BUFFER_${Date.now()}.${ext}`;
    link.href = dataURL;
    link.click();
  }, [canvasSize]);

  const clearSketches = useCallback(() => {
    if (confirm("PURGE DRAWING BUFFER?")) {
      setStrokes([]);
      setRedoStack([]);
    }
  }, []);

  const cleanWorkspace = useCallback(() => {
    if (confirm("RESET CYBER TERMINAL?")) {
      setStrokes([]);
      setRedoStack([]);
      setImportedImage(null);
      setPanOffset({ x: 0, y: 0 });
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    const { accept, reason } = palmEngine.current.shouldAcceptEvent(e);
    if (!accept) {
      if (palmRejection.debugMode) setRejectedEvents(p => [...p.slice(-5), { x: e.clientX, y: e.clientY, reason }]);
      return;
    }
    if (activePointerId.current !== null) return;
    activePointerId.current = e.pointerId;
    const rect = drawingCanvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (activeTool === 'pan') {
      isPanning.current = true;
      lastPanPoint.current = { x: e.clientX, y: e.clientY };
    } else {
      currentPoints.current = [{ x: x - panOffset.x, y: y - panOffset.y, pressure: e.pressure || 0.5, timestamp: Date.now() }];
    }
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (activePointerId.current !== e.pointerId) return;
    if (activeTool === 'pan' && isPanning.current) {
      const dx = e.clientX - lastPanPoint.current.x;
      const dy = e.clientY - lastPanPoint.current.y;
      setPanOffset(p => ({ x: p.x + dx, y: p.y + dy }));
      lastPanPoint.current = { x: e.clientX, y: e.clientY };
      return;
    }
    const rect = drawingCanvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const point = { x: (e.clientX - rect.left) - panOffset.x, y: (e.clientY - rect.top) - panOffset.y, pressure: e.pressure || 0.5, timestamp: Date.now() };
    currentPoints.current.push(point);
    const previewCtx = previewCanvasRef.current?.getContext('2d');
    if (previewCtx) {
      previewCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      previewCtx.save();
      previewCtx.translate(panOffset.x, panOffset.y);
      if (activeTool === 'eraser') {
          previewCtx.beginPath();
          previewCtx.arc(point.x, point.y, size/2, 0, Math.PI*2);
          previewCtx.strokeStyle = '#A5D8FF';
          previewCtx.stroke();
      } else if (activeTool !== 'pan') {
          BrushEngine.drawPreview(previewCtx, currentPoints.current, color, size, opacity, activeBrushType);
      }
      previewCtx.restore();
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (activePointerId.current !== e.pointerId) return;
    if (activeTool !== 'pan' && currentPoints.current.length > 1) {
      setStrokes(p => [...p, { id: Date.now().toString(), tool: activeTool, brushType: activeBrushType, color, size, opacity, points: [...currentPoints.current], layerId: 'base' }]);
      setRedoStack([]);
    }
    activePointerId.current = null;
    isPanning.current = false;
    currentPoints.current = [];
    const previewCtx = previewCanvasRef.current?.getContext('2d');
    if (previewCtx) previewCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  };

  return (
    <>
      {showLandingPage ? (
        <LandingPage onEnterApp={() => setShowLandingPage(false)} />
      ) : (
        <div className="relative w-full h-full bg-[#0A0A0C] flex flex-col overflow-hidden font-sans select-none text-[#E2E2D0] crt-flicker">

          {/* Header HUD */}
          <header className="h-16 bg-[#0A0A0C] border-b-2 border-[#72A0C1] flex items-center justify-between px-6 z-50">
            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                 <span className="pixel-font text-3xl leading-none tracking-widest text-[#A5D8FF]">CYBER DRIVE</span>
                 <span className="mono-font text-[9px] opacity-60 tracking-[0.3em]">RE-SKETCH_KERNEL.v3.1</span>
              </div>
              <div className="hidden md:flex gap-4 items-center">
                 <div className="h-8 w-[2px] bg-[#72A0C1]/30"></div>
                 <button onClick={undo} className="hover:text-[#A5D8FF] transition-colors"><Undo size={20} /></button>
                 <button onClick={redo} className="hover:text-[#A5D8FF] transition-colors"><Redo size={20} /></button>
                 <div className="h-8 w-[2px] bg-[#72A0C1]/30"></div>
                 <div className="flex flex-col mono-font text-[8px] leading-tight">
                    <span className="text-[#A5D8FF]">STABILITY: 99.8%</span>
                    <span className="text-[#E2E2D0]/50">LATENCY: 4ms</span>
                 </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
               <div className="flex flex-col items-end mr-4 hidden sm:flex">
                  <span className="pixel-font text-lg text-[#A5D8FF]">STATUS: RUN</span>
                  <span className="mono-font text-[8px] opacity-40">28/2 // 32/2 // 35/2</span>
               </div>
               <button
                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                 className="pixel-font text-xl border-2 border-[#72A0C1] px-4 py-1 hover:bg-[#72A0C1] hover:text-[#0A0A0C] transition-all"
               >
                 {isSidebarOpen ? 'DISCONNECT' : 'LINK_UI'}
               </button>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Terminal */}
            <aside
              style={{ width: isSidebarOpen ? '320px' : '0px' }}
              className="h-full bg-[#0A0A0C] border-r-2 border-[#72A0C1] transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="p-5 flex flex-col gap-6 min-w-[320px] custom-scrollbar overflow-y-auto">

                {/* 1. DATA CARD SECTION */}
                <div className="cyber-border p-4 bg-[#0A0A0C]">
                   <div className="flex justify-between items-center mb-4 border-b border-[#72A0C1] pb-2">
                      <span className="pixel-font text-2xl text-[#A5D8FF]">DATA CARD</span>
                      <Database size={18} className="text-[#72A0C1]" />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col">
                         <span className="mono-font text-[10px] opacity-50">STATUS:</span>
                         <span className="pixel-font text-lg">ACTIVE_DRIVE</span>
                      </div>
                      <div className="flex flex-col">
                         <span className="mono-font text-[10px] opacity-50">NAME:</span>
                         <span className="pixel-font text-lg">X_XPAD_USER</span>
                      </div>
                   </div>

                   {/* Pixel Dither Deco */}
                   <div className="w-full h-8 dither-bg border-t border-[#72A0C1] mt-4 opacity-40"></div>
                </div>

                {/* 2. SUBSTRATE DRIVE */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                     <Globe size={14} className="text-[#A5D8FF]" />
                     <span className="pixel-font text-xl uppercase tracking-tighter">Substrate_Link</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'plain', label: 'BLANK', icon: <Maximize size={14} /> },
                      { id: 'sketch', label: 'DITHER', icon: <FileImage size={14} /> },
                      { id: 'notes', label: 'RULED', icon: <FileText size={14} /> },
                      { id: 'dotted', label: 'MATRIX', icon: <Grid size={14} /> },
                    ].map(style => (
                      <button
                        key={style.id}
                        onClick={() => setCanvasStyle(style.id as CanvasStyle)}
                        className={`flex items-center gap-2 p-2 border-2 transition-all pixel-font text-lg ${canvasStyle === style.id ? 'bg-[#72A0C1] text-[#0A0A0C] border-[#72A0C1]' : 'border-[#72A0C1]/40 hover:border-[#A5D8FF]'}`}
                      >
                        {style.icon}
                        <span>{style.label}</span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* 3. TOOL PROTOCOLS */}
                <section>
                  <div className="flex items-center gap-2 mb-3">
                     <Terminal size={14} className="text-[#A5D8FF]" />
                     <span className="pixel-font text-xl uppercase tracking-tighter">Command_Module</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'pen', icon: <Pencil size={18} />, label: 'PEN' },
                      { id: 'brush', icon: <Circle size={18} />, label: 'WAX' },
                      { id: 'eraser', icon: <Eraser size={18} />, label: 'VOID' },
                      { id: 'pan', icon: <Hand size={18} />, label: 'NAV' },
                    ].map(tool => (
                      <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id as ToolType)}
                        className={`flex flex-col items-center p-3 border-2 transition-all ${activeTool === tool.id ? 'bg-[#A5D8FF] text-[#0A0A0C] border-[#A5D8FF]' : 'border-[#72A0C1]/40 hover:bg-[#72A0C1]/10'}`}
                      >
                        {tool.icon}
                        <span className="pixel-font text-lg">{tool.label}</span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* 3.5 BRUSH TYPES - Only shown when brush tool is selected */}
                {activeTool === 'brush' && (
                  <section>
                    <div className="flex items-center gap-2 mb-3">
                       <Activity size={14} className="text-[#A5D8FF]" />
                       <span className="pixel-font text-xl uppercase tracking-tighter">Brush_Type</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'smooth', label: 'SMOOTH', icon: <Target size={14} /> },
                        { id: 'pencil', label: 'PENCIL', icon: <Pencil size={14} /> },
                        { id: 'marker', label: 'MARKER', icon: <ShieldAlert size={14} /> },
                        { id: 'spray', label: 'SPRAY', icon: <Activity size={14} /> },
                        { id: 'calligraphy', label: 'CALIG', icon: <Circle size={14} /> },
                        { id: 'charcoal', label: 'CHARCOAL', icon: <XCircle size={14} /> },
                        { id: 'watercolor', label: 'WATER', icon: <RefreshCw size={14} /> },
                        { id: 'oil', label: 'OIL', icon: <Cpu size={14} /> },
                        { id: 'inkpen', label: 'INKPEN', icon: <Target size={14} /> },
                        { id: 'airbrush', label: 'AIRBRUSH', icon: <Globe size={14} /> },
                      ].map(brush => (
                        <button
                          key={brush.id}
                          onClick={() => setActiveBrushType(brush.id as BrushType)}
                          className={`flex items-center gap-2 p-2 border-2 transition-all pixel-font text-sm ${activeBrushType === brush.id ? 'bg-[#A5D8FF] text-[#0A0A0C] border-[#A5D8FF]' : 'border-[#72A0C1]/40 hover:border-[#A5D8FF]'}`}
                        >
                          {brush.icon}
                          <span>{brush.label}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* 4. CALIBRATION */}
                <section className="flex flex-col gap-4">
                   <div className="p-3 cyber-border-thin bg-[#72A0C1]/5">
                      <span className="mono-font text-[9px] opacity-40 uppercase tracking-widest block mb-2">Beam_Width</span>
                      <input
                        type="range" min="1" max="100" step="1"
                        value={size}
                        onChange={(e) => setSize(Number(e.target.value))}
                        className="w-full accent-[#A5D8FF] h-2 bg-[#72A0C1]/20 appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between mono-font text-[10px] font-bold mt-1 text-[#A5D8FF]">
                        <span>{size} PX</span>
                        <span>MAX_100</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-5 gap-1">
                      {['#A5D8FF', '#E2E2D0', '#EF4444', '#72A0C1', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#1A1A1A'].map(c => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          className={`aspect-square border-2 ${color === c ? 'border-[#A5D8FF] scale-110 shadow-[0_0_10px_#A5D8FF]' : 'border-[#72A0C1]/40'}`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                   </div>
                </section>

                {/* 5. BUFFER OPS */}
                <section className="mt-auto pt-4 border-t border-[#72A0C1]/30">
                   <div className="grid grid-cols-2 gap-2">
                      <button onClick={clearSketches} className="pixel-font text-lg border-2 border-red-500 text-red-500 p-2 hover:bg-red-500 hover:text-white transition-all">PURGE_INK</button>
                      <button onClick={cleanWorkspace} className="pixel-font text-lg border-2 border-[#72A0C1] text-[#72A0C1] p-2 hover:bg-[#72A0C1] hover:text-[#0A0A0C] transition-all">SYS_RESET</button>
                   </div>
                   <div className="mt-2 grid grid-cols-4 gap-1">
                      {['PNG', 'JPG', 'SVG', 'PDF'].map(fmt => (
                        <button
                          key={fmt}
                          onClick={() => exportCanvas(fmt.toLowerCase() as ExportFormat)}
                          className="border border-[#72A0C1]/40 mono-font text-[9px] py-1 hover:bg-[#A5D8FF] hover:text-[#0A0A0C]"
                        >
                          {fmt}
                        </button>
                      ))}
                   </div>
                </section>

              </div>
            </aside>

            {/* Drawing Workspace */}
            <main className="flex-1 relative bg-[#0A0A0C] overflow-hidden">

              {/* Retro Globe Deco (Static SVG background style) */}
              <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
                 <Globe size={800} strokeWidth={0.2} />
              </div>

              <canvas ref={backgroundCanvasRef} width={canvasSize.width} height={canvasSize.height} className="absolute inset-0 z-[1]" />
              <canvas ref={drawingCanvasRef} width={canvasSize.width} height={canvasSize.height} className="absolute inset-0 z-[2]" />
              <canvas
                ref={previewCanvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                className="absolute inset-0 z-[3] pointer-events-auto touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              />

              {/* Metadata HUD Overlays */}
              <div className="absolute top-6 left-6 pointer-events-none z-10 flex flex-col gap-1">
                 <div className="bg-[#A5D8FF] text-[#0A0A0C] pixel-font text-sm px-2 py-0.5 w-fit">CONNECTION_STABILITY: UNSTABLE</div>
                 <div className="w-48 h-1 bg-[#72A0C1]/20">
                    <div className="h-full bg-[#A5D8FF] w-2/3"></div>
                 </div>
                 <div className="mono-font text-[9px] opacity-40">ENCRYPTION: AES-256_ACTIVE</div>
              </div>

              <div className="absolute top-6 right-6 pointer-events-none z-10 flex flex-col items-end gap-1">
                 <span className="pixel-font text-2xl text-[#A5D8FF]">DRIVE: {activeTool.toUpperCase()}</span>
                 <span className="mono-font text-[9px] opacity-40">COORD: {Math.round(panOffset.x)},{Math.round(panOffset.y)}</span>
                 <div className="flex gap-1 mt-2">
                    {[1,2,3,4,5].map(i => <div key={i} className={`w-3 h-1 ${i <= 3 ? 'bg-[#A5D8FF]' : 'bg-[#72A0C1]/20'}`}></div>)}
                 </div>
              </div>

              {/* Quick Controls */}
              <div className="absolute bottom-10 right-10 z-30 flex gap-3">
                 <button
                   onClick={() => setPalmRejection(p => ({ ...p, debugMode: !p.debugMode }))}
                   className={`w-14 h-14 border-2 border-[#72A0C1] flex items-center justify-center transition-all ${palmRejection.debugMode ? 'bg-[#A5D8FF] text-[#0A0A0C]' : 'bg-[#0A0A0C] text-[#A5D8FF] hover:bg-[#72A0C1]/20'}`}
                 >
                   <Target size={24} />
                 </button>
                 <button
                   onClick={() => setPanOffset({ x: 0, y: 0 })}
                   className="w-14 h-14 border-2 border-[#72A0C1] flex items-center justify-center bg-[#0A0A0C] text-[#A5D8FF] hover:bg-[#72A0C1]/20 transition-all"
                 >
                   <Maximize size={24} />
                 </button>
              </div>

              {/* Rejected Event Markers */}
              {rejectedEvents.map((evt, idx) => (
                <div key={idx} className="absolute z-40 pointer-events-none flex flex-col items-center" style={{ left: evt.x-15, top: evt.y-15 }}>
                  <div className="w-8 h-8 border border-red-500 animate-ping"></div>
                  <span className="bg-red-500 text-white mono-font text-[7px] px-1 mt-1 uppercase">{evt.reason}</span>
                </div>
              ))}
            </main>
          </div>

          {/* Footer Tape */}
          <footer className="h-10 bg-[#72A0C1] text-[#0A0A0C] flex items-center px-6 z-50 overflow-hidden">
             <div className="flex gap-12 animate-[scroll_20s_linear_infinite] whitespace-nowrap pixel-font text-lg">
                <span>DRIVE BEYOND THE HORIZON WHERE PAST MEETS FUTURE</span>
                <span>SYSTEM_LINK_STABLE // USER_001_ACTIVE</span>
                <span>DATA_X_TRANSFER_READY // PIN_CALIBRATION_COMPLETE</span>
                <span>DRIVE BEYOND THE HORIZON WHERE PAST MEETS FUTURE</span>
                <span>SYSTEM_LINK_STABLE // USER_001_ACTIVE</span>
             </div>
          </footer>

          {/* Styles for the footer animation */}
          <style>{`
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          {/* Palm Protocol Alert */}
          {palmRejection.level === PalmRejectionLevel.STYLUS_ONLY && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[100] bg-red-600 text-white px-6 py-2 border-2 border-white pixel-font text-xl shadow-[6px_6px_0px_#0A0A0C] animate-pulse">
              STYLUS_EXCLUSIVE_PROTOCOL_ACTIVE // CRITICAL_MODE
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;
