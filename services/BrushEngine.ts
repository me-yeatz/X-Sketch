
import { Point, Stroke, BrushType } from '../types';

export class BrushEngine {
  /**
   * Renders a stroke on the provided canvas context.
   * Supports multiple brush types with different rendering techniques.
   */
  public static drawStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
    if (stroke.points.length < 2) return;

    const brushType = stroke.brushType || 'smooth';

    switch (brushType) {
      case 'pencil':
        this.drawPencilStroke(ctx, stroke);
        break;
      case 'marker':
        this.drawMarkerStroke(ctx, stroke);
        break;
      case 'spray':
        this.drawSprayStroke(ctx, stroke);
        break;
      case 'calligraphy':
        this.drawCalligraphyStroke(ctx, stroke);
        break;
      case 'charcoal':
        this.drawCharcoalStroke(ctx, stroke);
        break;
      case 'watercolor':
        this.drawWatercolorStroke(ctx, stroke);
        break;
      case 'oil':
        this.drawOilStroke(ctx, stroke);
        break;
      case 'inkpen':
        this.drawInkPenStroke(ctx, stroke);
        break;
      case 'airbrush':
        this.drawAirbrushStroke(ctx, stroke);
        break;
      case 'smooth':
      default:
        this.drawSmoothStroke(ctx, stroke);
        break;
    }
  }

  /**
   * Smooth brush - Uses Quadratic Bezier curves for smooth ink
   */
  private static drawSmoothStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
    if (stroke.points.length < 2) return;

    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = stroke.color;
    ctx.globalAlpha = stroke.opacity;

    const points = stroke.points;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];

      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;

      const currentPressure = p2.pressure > 0 ? p2.pressure : 1.0;
      ctx.lineWidth = stroke.size * currentPressure;

      ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(midX, midY);
    }

    ctx.restore();
  }

  /**
   * Pencil brush - Textured, slightly rough edges
   */
  private static drawPencilStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
    ctx.save();
    ctx.strokeStyle = stroke.color;
    ctx.globalAlpha = stroke.opacity * 0.7;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const points = stroke.points;

    // Draw multiple thin lines with slight offsets for texture
    for (let offset = 0; offset < 3; offset++) {
      ctx.beginPath();
      ctx.lineWidth = stroke.size * 0.4;

      for (let i = 0; i < points.length; i++) {
        const jitter = (Math.random() - 0.5) * 0.5;
        const x = points[i].x + jitter;
        const y = points[i].y + jitter;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Marker brush - Bold, slightly transparent, flat edges
   */
  private static drawMarkerStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
    ctx.save();
    ctx.lineJoin = 'square';
    ctx.lineCap = 'square';
    ctx.strokeStyle = stroke.color;
    ctx.globalAlpha = stroke.opacity * 0.6;
    ctx.lineWidth = stroke.size * 1.5;

    const points = stroke.points;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Spray brush - Particle-based spray paint effect
   */
  private static drawSprayStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
    ctx.save();
    ctx.fillStyle = stroke.color;
    ctx.globalAlpha = stroke.opacity * 0.3;

    const points = stroke.points;
    const radius = stroke.size * 2;
    const density = 15;

    for (let i = 0; i < points.length; i++) {
      for (let j = 0; j < density; j++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        const x = points[i].x + Math.cos(angle) * distance;
        const y = points[i].y + Math.sin(angle) * distance;

        ctx.beginPath();
        ctx.arc(x, y, 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  /**
   * Calligraphy brush - Variable width with angle sensitivity
   */
  private static drawCalligraphyStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
    ctx.save();
    ctx.strokeStyle = stroke.color;
    ctx.globalAlpha = stroke.opacity;
    ctx.lineCap = 'butt';

    const points = stroke.points;

    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];

      // Calculate angle for width variation
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const angle = Math.atan2(dy, dx);

      // Width varies with angle (wider for horizontal strokes)
      const widthMultiplier = Math.abs(Math.cos(angle)) * 2 + 0.5;
      const currentPressure = p2.pressure > 0 ? p2.pressure : 1.0;
      ctx.lineWidth = stroke.size * widthMultiplier * currentPressure;

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Charcoal brush - Soft, smudgy, textured edges
   */
  private static drawCharcoalStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
    ctx.save();
    ctx.strokeStyle = stroke.color;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const points = stroke.points;

    // Draw multiple layers with varying opacity and width
    for (let layer = 0; layer < 4; layer++) {
      ctx.globalAlpha = stroke.opacity * (0.2 - layer * 0.04);
      ctx.lineWidth = stroke.size * (1 + layer * 0.3);

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        const jitter = (Math.random() - 0.5) * layer;
        ctx.lineTo(points[i].x + jitter, points[i].y + jitter);
      }
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Watercolor brush - Semi-transparent with color blending
   */
  private static drawWatercolorStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = stroke.color;
    ctx.globalAlpha = stroke.opacity * 0.4; // More transparent than other brushes
    ctx.lineWidth = stroke.size * 2; // Wider for watercolor effect

    const points = stroke.points;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];

      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;

      const currentPressure = p2.pressure > 0 ? p2.pressure : 1.0;
      ctx.lineWidth = (stroke.size * 2) * currentPressure;

      ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(midX, midY);
    }

    ctx.restore();
  }

  /**
   * Oil brush - Thick texture with color blending
   */
  private static drawOilStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = stroke.color;
    ctx.globalAlpha = stroke.opacity;
    ctx.lineWidth = stroke.size;

    const points = stroke.points;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    // Draw with texture effect by layering multiple strokes
    for (let layer = 0; layer < 3; layer++) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];

        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;

        const currentPressure = p2.pressure > 0 ? p2.pressure : 1.0;
        ctx.lineWidth = stroke.size * currentPressure;

        // Add slight texture variation
        const jitterX = (Math.random() - 0.5) * 0.5;
        const jitterY = (Math.random() - 0.5) * 0.5;

        ctx.quadraticCurveTo(p1.x + jitterX, p1.y + jitterY, midX + jitterX, midY + jitterY);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  /**
   * Ink Pen brush - Consistent width with sharp edges
   */
  private static drawInkPenStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
    ctx.save();
    ctx.lineJoin = 'miter';
    ctx.lineCap = 'square';
    ctx.strokeStyle = stroke.color;
    ctx.globalAlpha = stroke.opacity;
    ctx.lineWidth = stroke.size * 0.8; // Slightly thinner for precision

    const points = stroke.points;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    ctx.restore();
  }

  /**
   * Airbrush - Soft, gradient-like application with adjustable density
   */
  private static drawAirbrushStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
    ctx.save();
    ctx.fillStyle = stroke.color;
    ctx.globalAlpha = stroke.opacity * 0.3; // More transparent

    const points = stroke.points;
    const density = 20; // Number of particles per point
    const baseRadius = stroke.size;

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const currentPressure = point.pressure > 0 ? point.pressure : 1.0;
      const radius = baseRadius * currentPressure * 2;

      // Draw multiple particles around each point
      for (let j = 0; j < density; j++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        const x = point.x + Math.cos(angle) * distance;
        const y = point.y + Math.sin(angle) * distance;

        // Vary opacity based on distance from center for gradient effect
        const distRatio = distance / radius;
        ctx.globalAlpha = (stroke.opacity * 0.3) * (1 - distRatio);

        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  /**
   * Fast preview rendering for the current active stroke.
   */
  public static drawPreview(ctx: CanvasRenderingContext2D, points: Point[], color: string, size: number, opacity: number, brushType?: BrushType) {
    if (points.length < 2) return;

    // For preview, we'll use a simplified approach that mimics the selected brush type
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;

    switch (brushType) {
      case 'pencil':
        ctx.globalAlpha = opacity * 0.7;
        ctx.lineWidth = size * 0.4;
        // Draw multiple thin lines with slight offsets for texture
        for (let offset = 0; offset < 3; offset++) {
          ctx.beginPath();
          for (let i = 0; i < points.length; i++) {
            const jitter = (Math.random() - 0.5) * 0.5;
            const x = points[i].x + jitter;
            const y = points[i].y + jitter;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
        break;
      case 'marker':
        ctx.globalAlpha = opacity * 0.6;
        ctx.lineWidth = size * 1.5;
        ctx.lineJoin = 'square';
        ctx.lineCap = 'square';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        break;
      case 'spray':
        ctx.globalAlpha = opacity * 0.3;
        const radius = size * 2;
        const sprayDensity = 15;
        for (let i = 0; i < points.length; i++) {
          for (let j = 0; j < sprayDensity; j++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * radius;
            const x = points[i].x + Math.cos(angle) * distance;
            const y = points[i].y + Math.sin(angle) * distance;

            ctx.beginPath();
            ctx.arc(x, y, 0.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;
      case 'calligraphy':
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];

          // Calculate angle for width variation
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const angle = Math.atan2(dy, dx);

          // Width varies with angle (wider for horizontal strokes)
          const widthMultiplier = Math.abs(Math.cos(angle)) * 2 + 0.5;
          ctx.lineWidth = size * widthMultiplier;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
        break;
      case 'charcoal':
        // Draw multiple layers with varying opacity and width
        for (let layer = 0; layer < 4; layer++) {
          ctx.globalAlpha = opacity * (0.2 - layer * 0.04);
          ctx.lineWidth = size * (1 + layer * 0.3);

          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          for (let i = 1; i < points.length; i++) {
            const jitter = (Math.random() - 0.5) * layer;
            ctx.lineTo(points[i].x + jitter, points[i].y + jitter);
          }
          ctx.stroke();
        }
        break;
      case 'watercolor':
        ctx.globalAlpha = opacity * 0.4;
        ctx.lineWidth = size * 2;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];

          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;

          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(midX, midY);
        }
        break;
      case 'oil':
        // Draw with texture effect by layering multiple strokes
        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          for (let i = 1; i < points.length; i++) {
            const p1 = points[i - 1];
            const p2 = points[i];

            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;

            // Add slight texture variation
            const jitterX = (Math.random() - 0.5) * 0.5;
            const jitterY = (Math.random() - 0.5) * 0.5;

            ctx.quadraticCurveTo(p1.x + jitterX, p1.y + jitterY, midX + jitterX, midY + jitterY);
            ctx.stroke();
          }
        }
        break;
      case 'inkpen':
        ctx.lineJoin = 'miter';
        ctx.lineCap = 'square';
        ctx.lineWidth = size * 0.8;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        break;
      case 'airbrush':
        ctx.globalAlpha = opacity * 0.3;
        const airbrushDensity = 20;
        const baseRadius = size;

        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          const radius = baseRadius * 2;

          // Draw multiple particles around each point
          for (let j = 0; j < airbrushDensity; j++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * radius;
            const x = point.x + Math.cos(angle) * distance;
            const y = point.y + Math.sin(angle) * distance;

            // Vary opacity based on distance from center for gradient effect
            const distRatio = distance / radius;
            ctx.globalAlpha = (opacity * 0.3) * (1 - distRatio);

            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;
      case 'smooth':
      default:
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];

          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
        }
        ctx.stroke();
        break;
    }

    ctx.restore();
  }
}
