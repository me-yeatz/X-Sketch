import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Pencil,
  Eraser,
  Undo,
  Redo,
  Move,
  Palette,
  Settings,
  Download,
  RotateCcw,
  FileText,
  Grid,
  Circle,
  Minus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PalmRejectionEngine } from './services/PalmRejectionEngine';
import { PalmRejectionLevel } from './types';

type PaperType = 'plain' | 'lined' | 'dotted' | 'grid';

const AppClean: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'pen' | 'eraser' | 'pan'>('pen');
  const [brushSize, setBrushSize] = useState(2);
  const [color, setColor] = useState('#000000');
  const [strokes, setStrokes] = useState<any[]>([]);
  const [paperType, setPaperType] = useState<PaperType>('plain');
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const isPanning = useRef(false);
  const lastPanPoint = useRef({ x: 0, y: 0 });
  const palmRejection = useRef(new PalmRejectionEngine({
    level: PalmRejectionLevel.MEDIUM,
    maxTouchWidth: 20,
    maxTouchHeight: 20,
    requirePressure: false,
    debugMode: false
  }));

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sketch-strokes');
    if (saved) {
      setStrokes(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('sketch-strokes', JSON.stringify(strokes));
  }, [strokes]);

  // Draw paper background
  const drawPaperBackground = useCallback(() => {
    const canvas = backgroundCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);

    if (paperType === 'lined') {
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      for (let y = 30; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    } else if (paperType === 'dotted') {
      ctx.fillStyle = '#d1d5db';
      for (let x = 20; x < canvas.width; x += 20) {
        for (let y = 20; y < canvas.height; y += 20) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (paperType === 'grid') {
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      const spacing = 20;
      for (let x = spacing; x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = spacing; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }
    // plain does nothing
    ctx.restore();
  }, [paperType, panOffset]);

  useEffect(() => {
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight - 80;
      if (backgroundCanvasRef.current) {
        backgroundCanvasRef.current.width = width;
        backgroundCanvasRef.current.height = height;
      }
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
      drawPaperBackground();
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [drawPaperBackground]);

  const handleMouseDown = (e: React.PointerEvent) => {
    const touch = e.pointerType === 'touch';
    if (touch && !palmRejection.current.shouldAcceptEvent({
      pointerType: e.pointerType,
      width: e.width,
      height: e.height,
      pressure: e.pressure
    }).accept) {
      return;
    }
    if (activeTool === 'pan') {
      isPanning.current = true;
      lastPanPoint.current = { x: e.clientX, y: e.clientY };
    } else {
      isDrawing.current = true;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - panOffset.x;
      const y = e.clientY - rect.top - panOffset.y;
      // Start new stroke
      setStrokes(prev => [...prev, { tool: activeTool, color, size: brushSize, points: [{ x, y }] }]);
    }
  };

  const handleMouseMove = (e: React.PointerEvent) => {
    if (isPanning.current) {
      const dx = e.clientX - lastPanPoint.current.x;
      const dy = e.clientY - lastPanPoint.current.y;
      setPanOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      lastPanPoint.current = { x: e.clientX, y: e.clientY };
    } else if (isDrawing.current) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - panOffset.x;
      const y = e.clientY - rect.top - panOffset.y;
      // Add point to current stroke
      setStrokes(prev => {
        const newStrokes = [...prev];
        const current = newStrokes[newStrokes.length - 1];
        current.points.push({ x, y });
        return newStrokes;
      });
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    isPanning.current = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);
    strokes.forEach(stroke => {
      ctx.globalCompositeOperation = stroke.tool === 'eraser' ? 'destination-out' : 'source-over';
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      stroke.points.forEach((point: any, i: number) => {
        if (i === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });
    ctx.restore();
    ctx.globalCompositeOperation = 'source-over';
  }, [strokes, panOffset]);

  const clearCanvas = () => {
    setStrokes([]);
  };

  const undo = () => {
    setStrokes(prev => prev.slice(0, -1));
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 flex flex-col shadow-sm transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          {sidebarOpen ? (
            <>
              <h1 className="text-xl font-semibold text-gray-900">SketchPad</h1>
              <p className="text-sm text-gray-600">Professional Drawing Tool</p>
            </>
          ) : (
            <div className="flex justify-center">
              <Pencil size={24} className="text-gray-600" />
            </div>
          )}
        </div>

        {/* Tools Section */}
        <div className="p-4 border-b border-gray-200">
          {sidebarOpen ? (
            <>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveTool('pen')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    activeTool === 'pen'
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Pencil size={20} className="mx-auto mb-1" />
                  <span className="text-xs">Pen</span>
                </button>
                <button
                  onClick={() => setActiveTool('eraser')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    activeTool === 'eraser'
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Eraser size={20} className="mx-auto mb-1" />
                  <span className="text-xs">Eraser</span>
                </button>
                <button
                  onClick={() => setActiveTool('pan')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    activeTool === 'pan'
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Move size={20} className="mx-auto mb-1" />
                  <span className="text-xs">Pan</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => setActiveTool('pen')}
                className={`w-full p-2 rounded-lg border-2 transition-all ${
                  activeTool === 'pen'
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <Pencil size={16} className="mx-auto" />
              </button>
              <button
                onClick={() => setActiveTool('eraser')}
                className={`w-full p-2 rounded-lg border-2 transition-all ${
                  activeTool === 'eraser'
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <Eraser size={16} className="mx-auto" />
              </button>
              <button
                onClick={() => setActiveTool('pan')}
                className={`w-full p-2 rounded-lg border-2 transition-all ${
                  activeTool === 'pan'
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <Move size={16} className="mx-auto" />
              </button>
            </div>
          )}
        </div>

        {/* Paper Types */}
        <div className="p-4 border-b border-gray-200">
          {sidebarOpen ? (
            <>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Paper</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPaperType('plain')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    paperType === 'plain'
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Minus size={20} className="mx-auto mb-1" />
                  <span className="text-xs">Plain</span>
                </button>
                <button
                  onClick={() => setPaperType('lined')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    paperType === 'lined'
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FileText size={20} className="mx-auto mb-1" />
                  <span className="text-xs">Lined</span>
                </button>
                <button
                  onClick={() => setPaperType('dotted')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    paperType === 'dotted'
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Circle size={20} className="mx-auto mb-1" />
                  <span className="text-xs">Dotted</span>
                </button>
                <button
                  onClick={() => setPaperType('grid')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    paperType === 'grid'
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Grid size={20} className="mx-auto mb-1" />
                  <span className="text-xs">Grid</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => setPaperType('plain')}
                className={`w-full p-2 rounded-lg border-2 transition-all ${
                  paperType === 'plain'
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <Minus size={16} className="mx-auto" />
              </button>
              <button
                onClick={() => setPaperType('lined')}
                className={`w-full p-2 rounded-lg border-2 transition-all ${
                  paperType === 'lined'
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileText size={16} className="mx-auto" />
              </button>
              <button
                onClick={() => setPaperType('dotted')}
                className={`w-full p-2 rounded-lg border-2 transition-all ${
                  paperType === 'dotted'
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <Circle size={16} className="mx-auto" />
              </button>
              <button
                onClick={() => setPaperType('grid')}
                className={`w-full p-2 rounded-lg border-2 transition-all ${
                  paperType === 'grid'
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <Grid size={16} className="mx-auto" />
              </button>
            </div>
          )}
        </div>

        {/* Brush Settings */}
        <div className="p-4 border-b border-gray-200">
          {sidebarOpen ? (
            <>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Brush</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Color</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-8 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Size: {brushSize}px</label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-8 border border-gray-300 rounded"
              />
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full"
                style={{ writingMode: 'bt-lr' }}
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 mt-auto">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={undo} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Undo size={16} className="mx-auto" />
            </button>
            <button onClick={clearCanvas} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <RotateCcw size={16} className="mx-auto" />
            </button>
          </div>
          <button className="w-full mt-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download size={16} className="inline mr-1" />
            Export
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-white relative overflow-hidden">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 left-4 z-10 p-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        <canvas
          ref={backgroundCanvasRef}
          className="absolute inset-0"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-crosshair"
          onPointerDown={handleMouseDown}
          onPointerMove={handleMouseMove}
          onPointerUp={handleMouseUp}
          onPointerLeave={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default AppClean;