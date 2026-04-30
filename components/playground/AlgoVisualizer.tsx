"use client";

import React from "react";
import { motion } from "framer-motion";

interface NodePoint {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
  weight?: number;
}

interface AlgoVisualizerProps {
  type: "bars" | "graph";
  bars?: number[];
  nodes?: NodePoint[];
  edges?: Edge[];
  zoom: number;
  canvasWidth?: number;
  canvasHeight?: number;
  isDrawingMode?: boolean;
  selectedNodeId?: string | null;
  onStageClick?: (e: React.MouseEvent) => void;
  onPointerMove?: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp?: () => void;
  onNodePointerDown?: (e: React.PointerEvent<HTMLButtonElement>, id: string) => void;
  onNodeDoubleClick?: (id: string) => void;
  mouseX?: any; // MotionValue
  mouseY?: any; // MotionValue
  barsDragControls?: any;
  isLongPressingBars?: boolean;
  onBarsPointerDown?: (e: React.PointerEvent) => void;
  onBarsPointerUp?: () => void;
  containerClass?: string;
  isMini?: boolean;
}

export default function AlgoVisualizer({
  type,
  bars = [],
  nodes = [],
  edges = [],
  zoom,
  canvasWidth,
  canvasHeight,
  isDrawingMode = false,
  selectedNodeId = null,
  onStageClick,
  onPointerMove,
  onPointerUp,
  onNodePointerDown,
  onNodeDoubleClick,
  mouseX,
  mouseY,
  barsDragControls,
  isLongPressingBars,
  onBarsPointerDown,
  onBarsPointerUp,
  containerClass = "",
  isMini = false
}: AlgoVisualizerProps) {
  const isGraphMode = type === "graph";
  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  const width = canvasWidth || (isMini ? 600 : 4000);
  const height = canvasHeight || (isMini ? 400 : 4000);

  return (
    <div 
      onClick={onStageClick} 
      onPointerMove={onPointerMove} 
      onPointerUp={onPointerUp} 
      className={`relative origin-top-left will-change-transform blueprint-grid ${containerClass}`} 
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        transform: `scale(${zoom})`,
        backgroundImage: 'radial-gradient(circle, rgba(15, 23, 42, 0.45) 0.8px, transparent 1px)',
        backgroundSize: isMini ? '12px 12px' : '24px 24px'
      }}
    >
      <section className={`relative w-full h-full ${isDrawingMode ? 'cursor-none' : 'cursor-default'}`}>
        {isDrawingMode && mouseX && mouseY && (
          <motion.div 
            style={{ x: mouseX, y: mouseY }}
            className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-[#002FA7]/40 rounded-full pointer-events-none z-50 flex items-center justify-center bg-[#002FA7]/5 will-change-transform"
          >
            <span className="material-symbols-outlined text-[#002FA7]/40 text-[10px]">add</span>
          </motion.div>
        )}

        {isGraphMode && (
          <svg className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true">
            {selectedNode && isDrawingMode && mouseX && mouseY && (
              <motion.line 
                x1={selectedNode.x} 
                y1={selectedNode.y} 
                x2={mouseX} 
                y2={mouseY} 
                stroke="#002FA7" 
                strokeWidth={2/zoom} 
                strokeDasharray="4 4" 
                className="animate-[dash_1s_linear_infinite]" 
              />
            )}
            {edges.map((edge, idx) => {
              const fromNode = nodes.find(n => n.id === edge.from);
              const toNode = nodes.find(n => n.id === edge.to);
              if (!fromNode || !toNode) return null;
              return <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} key={`${edge.from}-${edge.to}-${idx}`} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} stroke="#002FA7" strokeWidth={1.5/zoom} strokeOpacity="0.5" />;
            })}
          </svg>
        )}

        {!isGraphMode && (
          <motion.div 
            drag={!!barsDragControls}
            dragListener={false}
            dragControls={barsDragControls}
            dragMomentum={false}
            onPointerDown={onBarsPointerDown}
            onPointerUp={onBarsPointerUp}
            onContextMenu={(e) => e.preventDefault()}
            className={`absolute flex items-end gap-[1px] will-change-transform ${isLongPressingBars ? 'cursor-grabbing opacity-80' : 'cursor-grab'} ${isMini ? 'inset-0 p-4 pb-8' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px]'}`}
          >
            {bars.map((value, index) => {
              const max = Math.max(...bars, 1);
              const height = `${Math.max((value / max) * 100, 8)}%`;
              return (
                <div 
                  key={`${value}-${index}`} 
                  className={`group relative flex-1 border border-[#002FA7]/20 bg-[#DCE6FF] ${isLongPressingBars ? '' : 'transition-all duration-300'}`} 
                  style={{ height }}
                >
                  {/* Values only show if space permits */}
                  {!isMini && <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#002FA7] opacity-100 whitespace-nowrap">{value}</span>}
                  {isMini && bars.length <= 20 && <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] font-bold text-[#002FA7] opacity-60">{value}</span>}
                </div>
              );
            })}
          </motion.div>
        )}

        {isGraphMode && nodes.map((node) => {
          const isSelected = selectedNodeId === node.id;
          return (
            <motion.button 
              layoutId={node.id} 
              key={node.id} 
              onDoubleClick={() => onNodeDoubleClick?.(node.id)} 
              onPointerDown={(e) => onNodePointerDown?.(e, node.id)} 
              className={`node-button absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 border text-[9px] font-bold transition-all shadow-md z-20 flex items-center justify-center will-change-transform ${isSelected ? 'bg-[#002FA7] text-white border-[#002FA7] scale-110 z-30' : 'bg-white text-[#002FA7] border-[#002FA7] hover:bg-[#F0F4FF]'}`} 
              style={{ left: node.x, top: node.y }}
            >
              {node.label}
            </motion.button>
          );
        })}
      </section>
    </div>
  );
}
