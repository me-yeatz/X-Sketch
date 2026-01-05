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
  RotateCcw
} from 'lucide-react';

const AppClean: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'pen' | 'eraser' | 'pan'>('pen');
  const [brushSize, setBrushSize] = useState(5);
  const [color, setColor] = useState('#000000');
  const [strokes, setStrokes] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Start new stroke
    setStrokes(prev => [...prev, { tool: activeTool, color, size: brushSize, points: [{ x, y }] }]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Add point to current stroke
    setStrokes(prev => {
      const newStrokes = [...prev];
      const current = newStrokes[newStrokes.length - 1];
      current.points.push({ x, y });
      return newStrokes;
    });
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokes.forEach(stroke => {
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
  }, [strokes]);

  const clearCanvas = () => {
    setStrokes([]);
  };

  const undo = () => {
    setStrokes(prev => prev.slice(0, -1));
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-100 border-b border-gray-300 p-4 flex items-center gap-4">
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
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-sm">{brushSize}px</span>
        </div>
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
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight - 80}
          className="cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default AppClean;