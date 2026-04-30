"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface InfiniteCanvasProps {
  children: ReactNode;
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  gridSize?: number;
  className?: string;
}

export const InfiniteCanvas = React.memo(({
  children,
  initialZoom = 1,
  minZoom = 0.2,
  maxZoom = 3,
  gridSize = 24,
  className = ""
}: InfiniteCanvasProps) => {
  const [zoom, setZoom] = useState(initialZoom);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for high-performance panning
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(prev => Math.min(Math.max(prev + delta, minZoom), maxZoom));
    }
  };

  return (
    <div 
      ref={containerRef}
      onWheel={handleWheel}
      className={`relative w-full h-full overflow-hidden bg-[#F8FAFC] cursor-grab active:cursor-grabbing border border-[#E2E8F0] ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, #CBD5E1 1px, transparent 1px)`,
        backgroundSize: `${gridSize * zoom}px ${gridSize * zoom}px`,
        backgroundPosition: `${x.get()}px ${y.get()}px`,
      }}
    >
      <motion.div
        drag
        dragMomentum={false}
        style={{ x, y, scale: zoom }}
        className="absolute inset-0 origin-center flex items-center justify-center pointer-events-none"
      >
        <div className="pointer-events-auto">
          {children}
        </div>
      </motion.div>

      {/* Zoom Indicator - Neo-Formalist Style */}
      <div className="absolute bottom-6 right-6 bg-white border border-[#002FA7] px-3 py-1 font-mono text-[10px] font-bold text-[#002FA7] tracking-widest uppercase shadow-[2px_2px_0px_#002FA7]">
        Zoom: {Math.round(zoom * 100)}%
      </div>
    </div>
  );
});

InfiniteCanvas.displayName = "DataVisualizer.InfiniteCanvas";
