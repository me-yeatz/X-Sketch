
export type ToolType = 'pen' | 'brush' | 'eraser' | 'pan';
export type BrushType = 'smooth' | 'pencil' | 'marker' | 'spray' | 'calligraphy' | 'charcoal' | 'watercolor' | 'oil' | 'inkpen' | 'airbrush';
export type CanvasStyle = 'plain' | 'sketch' | 'notes' | 'dotted';
export type ExportFormat = 'png' | 'jpg' | 'svg' | 'pdf';

export interface Point {
  x: number;
  y: number;
  pressure: number;
  timestamp: number;
}

export interface Stroke {
  id: string;
  tool: ToolType;
  brushType?: BrushType;
  color: string;
  size: number;
  opacity: number;
  points: Point[];
  layerId: string;
}

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
}

export enum PalmRejectionLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  STYLUS_ONLY = 'STYLUS_ONLY'
}

export interface PalmRejectionConfig {
  level: PalmRejectionLevel;
  maxTouchWidth: number;
  maxTouchHeight: number;
  requirePressure: boolean;
  debugMode: boolean;
}
