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
  Minus
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
    <div className="h-screen bg-white flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-100 border-b border-gray-300 p-4 flex items-center gap-4 flex-wrap">
        {/* Tools */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTool('pen')}
            className={`p-2 rounded ${activeTool === 'pen' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => setActiveTool('eraser')}
            className={`p-2 rounded ${activeTool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}
          >
            <Eraser size={20} />
          </button>
          <button
            onClick={() => setActiveTool('pan')}
            className={`p-2 rounded ${activeTool === 'pan' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}
          >
            <Move size={20} />
          </button>
        </div>

        {/* Paper Types */}
        <div className="flex gap-2">
          <button
            onClick={() => setPaperType('plain')}
            className={`p-2 rounded ${paperType === 'plain' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}
          >
            <Minus size={20} />
          </button>
          <button
            onClick={() => setPaperType('lined')}
            className={`p-2 rounded ${paperType === 'lined' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}
          >
            <FileText size={20} />
          </button>
          <button
            onClick={() => setPaperType('dotted')}
            className={`p-2 rounded ${paperType === 'dotted' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}
          >
            <Circle size={20} />
          </button>
          <button
            onClick={() => setPaperType('grid')}
            className={`p-2 rounded ${paperType === 'grid' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}
          >
            <Grid size={20} />
          </button>
        </div>

        {/* Color and Size */}
        <div className="flex items-center gap-2">
          <Palette size={16} />
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-sm">{brushSize}px</span>
        </div>

        {/* Actions */}
        <div className="ml-auto flex gap-2">
          <button onClick={undo} className="p-2 bg-white hover:bg-gray-200 rounded">
            <Undo size={20} />
          </button>
          <button onClick={clearCanvas} className="p-2 bg-white hover:bg-gray-200 rounded">
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
      {/* Canvas */}
      <div className="flex-1 bg-white relative">
        <canvas
          ref={backgroundCanvasRef}
          width={window.innerWidth}
          height={window.innerHeight - 80}
          className="absolute inset-0"
        />
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight - 80}
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