
// Added React import to support React.PointerEvent type
import React from 'react';
import { PalmRejectionConfig, PalmRejectionLevel } from '../types';

export class PalmRejectionEngine {
  private config: PalmRejectionConfig;

  constructor(config: PalmRejectionConfig) {
    this.config = config;
  }

  public updateConfig(newConfig: Partial<PalmRejectionConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Evaluates a PointerEvent and decides if it should be accepted as input.
   * Optimized for Android tablet sensors (width/height/pressure/pointerType).
   */
  public shouldAcceptEvent(event: React.PointerEvent | PointerEvent): { accept: boolean; reason: string } {
    const { pointerType, width, height, pressure } = event;

    // 1. Stylus Rule: Always accept stylus input if it's within standard bounds
    if (pointerType === 'pen') {
      return { accept: true, reason: 'STYLUS_DETECTED' };
    }

    // 2. Stylus-Only Mode: Reject everything else
    if (this.config.level === PalmRejectionLevel.STYLUS_ONLY) {
      return { accept: false, reason: 'STYLUS_ONLY_MODE' };
    }

    // 3. Multi-touch handling (context handled by component state)
    
    // 4. Physical Dimension Check (Palm Detection)
    // Contact area threshold varies by sensitivity level
    let widthThreshold = this.config.maxTouchWidth;
    let heightThreshold = this.config.maxTouchHeight;

    switch (this.config.level) {
      case PalmRejectionLevel.HIGH:
        widthThreshold = 12; // Very strict, likely only fingertips
        heightThreshold = 12;
        break;
      case PalmRejectionLevel.MEDIUM:
        widthThreshold = 20;
        heightThreshold = 20;
        break;
      case PalmRejectionLevel.LOW:
        widthThreshold = 40; // More forgiving
        heightThreshold = 40;
        break;
    }

    // In modern Android Chrome, width and height of contact point are provided in CSS pixels
    if (width > widthThreshold || height > heightThreshold) {
      return { accept: false, reason: `PALM_SIZE_DETECTED (${Math.round(width)}x${Math.round(height)})` };
    }

    // 5. Stationary Check
    // (Handled by checking distance moved in first 50ms, usually implemented in component)

    return { accept: true, reason: 'VALID_TOUCH' };
  }
}
