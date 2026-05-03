"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Point {
  x: number;
  y: number;
  id: string;
  state?: "default" | "active" | "highlight";
}

interface Line {
  from: Point;
  to: Point;
}

interface GeometryProps {
  points: Point[];
  hullLines: Line[];
  width?: number | string;
  height?: number | string;
  statusMessage?: string;
}

export const Geometry = React.memo(({
  points,
  hullLines,
  width = "100%",
  height = 300,
  statusMessage
}: GeometryProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isProcessing = statusMessage && statusMessage !== "";

  return (
    <div 
      className="relative overflow-visible flex flex-col items-center justify-center p-2 group" 
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Blueprint Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
        backgroundImage: "radial-gradient(#002FA7 0.5px, transparent 0.5px)", 
        backgroundSize: "20px 20px" 
      }} />
      
      <svg className="w-full h-full relative z-10 overflow-visible" viewBox={`0 0 600 300`}>
        {/* Render Hull Lines */}
        {hullLines.map((line, idx) => (
          <motion.line
            key={`line-${idx}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 1,
              stroke: "#002FA7",
              strokeWidth: 2
            }}
            x1={line.from.x}
            y1={line.from.y}
            x2={line.to.x}
            y2={line.to.y}
            strokeDasharray="4 2"
          />
        ))}

        {/* Render Points */}
        {points.map((point, index) => {
          const isActive = point.state === "active";
          const isHighlight = point.state === "highlight";
          const dimmed = isProcessing && !isActive && !isHighlight;
          
          return (
            <g key={point.id} className="transition-opacity duration-500">
              {isHighlight && (
                <motion.circle
                  animate={{ scale: [1, 2, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  cx={point.x}
                  cy={point.y}
                  r={12}
                  fill="#FF4D4D"
                />
              )}
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ 
                   scale: isActive || isHighlight ? 1.2 : 1,
                   opacity: dimmed ? 0.2 : 1,
                   fill: isHighlight ? "#FF4D4D" : isActive ? "#002FA7" : "#FFFFFF",
                   stroke: "#002FA7",
                   strokeWidth: isActive || isHighlight ? 2 : 1
                }}
                cx={point.x}
                cy={point.y}
                r={isActive ? 6 : 4}
              />

              {/* Visitation Order Badge (Shown on Hover) */}
              <AnimatePresence>
                {isHovered && (isHighlight || isActive) && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0.5, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: -18 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <circle cx={point.x - 12} cy={point.y - 12} r={8} fill="#002FA7" className="shadow-sm" />
                    <text
                      x={point.x - 12}
                      y={point.y - 12}
                      dy=".3em"
                      textAnchor="middle"
                      className="fill-white font-mono text-[8px] font-black"
                    >
                      {index + 1}
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>

              {(isActive || isHighlight) && (
                <motion.text
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  x={point.x + 10}
                  y={point.y - 10}
                  className="font-mono text-[8px] fill-[#002FA7] font-black select-none pointer-events-none"
                >
                  P[{index}]:({Math.round(point.x)}, {Math.round(point.y)})
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Logic Status Message */}
      {statusMessage && (
        <div className="absolute top-2 right-4 font-mono text-[9px] text-[#002FA7] bg-[#DCE6FF] px-2 py-0.5 font-bold animate-pulse z-20 shadow-sm border-l-2 border-[#002FA7]">
          SIM_LOG: {statusMessage}
        </div>
      )}

      <div className="absolute top-2 left-4 font-mono text-[8px] text-[#002FA7] uppercase tracking-[0.3em] font-bold">
        Spatial_Sequence_Engine
      </div>
      
      {/* Interaction Hint */}
      <div className={`absolute bottom-2 right-4 font-mono text-[6px] text-[#002FA7]/40 uppercase tracking-widest transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        Hover to reveal sequence
      </div>
      
      {/* Coordinate Axis Indicator */}
      <div className="absolute bottom-4 left-4 flex gap-4 font-mono text-[7px] text-[#002FA7]/40 uppercase font-bold">
        <div className="flex items-center gap-1">
          <span className="w-3 h-[1.5px] bg-[#002FA7]/30"></span> X_Plane
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-[1.5px] bg-[#002FA7]/30"></span> Y_Vector
        </div>
      </div>
    </div>
  );
});

Geometry.displayName = "DataVisualizer.Geometry";
