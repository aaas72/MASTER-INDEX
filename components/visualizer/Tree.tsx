"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface TreeNode {
  id: string;
  value: any;
  children?: TreeNode[];
  state?: "default" | "active" | "visited";
}

interface TreeProps {
  root: TreeNode;
  width?: number | string;
  height?: number | string;
  targetNodeId?: string;
  statusMessage?: string;
}

export const Tree = React.memo(({
  root,
  width = "100%",
  height = 300,
  targetNodeId,
  statusMessage
}: TreeProps) => {
  const controls = useAnimation();
  const isProcessing = statusMessage && statusMessage !== "";

  // 1. Calculate Layout (Fixed Node Sizes)
  const { nodes, lines, activePos } = useMemo(() => {
    const nodeList: any[] = [];
    const lineList: any[] = [];
    let currentActivePos = { x: 300, y: 40 };

    const traverse = (node: TreeNode, x: number, y: number, spread: number, depth: number) => {
      const isActive = node.state === "active";
      const isTarget = node.id === targetNodeId || (targetNodeId && String(node.value) === targetNodeId);
      
      // CAMERA LOGIC: Only follow the node currently being processed (Active)
      if (isActive) {
        currentActivePos = { x, y };
      }

      nodeList.push({ ...node, x, y, depth, isTarget, isActive });

      if (node.children) {
        node.children.forEach((child, idx) => {
          const childX = x - spread / 2 + (idx * spread) / (node.children!.length - 1 || 1);
          const childY = y + 80; // Fixed vertical step for readability
          
          lineList.push({ from: { x, y }, to: { x: childX, y: childY }, childState: child.state });
          traverse(child, childX, childY, spread / 1.8, depth + 1);
        });
      }
    };

    if (root) traverse(root, 300, 40, 240, 0);

    return { nodes: nodeList, lines: lineList, activePos: currentActivePos };
  }, [root, targetNodeId]);

  // 2. Smart Camera Follow
  // Whenever activePos changes, we move the container to center that position
  useEffect(() => {
    const centerX = 300; // Half of our standard SVG width
    const centerY = 150; // Half of our height
    
    controls.start({
      x: centerX - activePos.x,
      y: centerY - activePos.y,
      transition: { type: "spring", stiffness: 80, damping: 20 }
    });
  }, [activePos, controls]);

  return (
    <div 
      className="relative border border-[#002FA7]/20 bg-white overflow-hidden shadow-[4px_4px_0px_#DCE6FF] flex flex-col items-center justify-center p-2 cursor-grab active:cursor-grabbing group" 
      style={{ width, height }}
    >
      <svg className="w-full h-full overflow-visible" viewBox="0 0 600 300">
        <motion.g 
          drag
          dragMomentum={true}
          dragTransition={{ power: 0.2, timeConstant: 200 }}
          onDragStart={() => controls.stop()}
          animate={controls} 
          className="pointer-events-auto"
        >
          {/* Render Links */}
          {lines.map((line, idx) => {
            const isChildActive = line.childState === "active";
            const isChildVisited = line.childState === "visited";
            
            // Highlight the specific path being carved out
            const isActivePath = isChildActive || isChildVisited;
            const dimmed = isProcessing && !isActivePath;

            return (
              <motion.line
                key={`link-${idx}`}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: dimmed ? 0.05 : 1,
                  stroke: isActivePath ? "#002FA7" : "#CBD5E1",
                  strokeWidth: isActivePath ? 4 : 1.5
                }}
                x1={line.from.x}
                y1={line.from.y}
                x2={line.to.x}
                y2={line.to.y}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Render Nodes */}
          {nodes.map((node) => {
            const isActive = node.isActive;
            const isVisited = node.state === "visited";
            const isTarget = node.isTarget;
            const dimmed = isProcessing && !isActive && !isVisited && !isTarget;

            return (
              <motion.g 
                key={node.id}
                initial={{ scale: 0 }} 
                animate={{ 
                  scale: isTarget ? [1, 1.1, 1] : 1,
                  opacity: dimmed ? 0.2 : 1,
                  x: node.x,
                  y: node.y
                }}
                transition={{
                  scale: isTarget ? { repeat: Infinity, duration: 1.5 } : { duration: 0.5 }
                }}
              >
                <motion.rect
                  animate={{
                    fill: isTarget ? "#002FA7" : isActive ? "#002FA7" : isVisited ? "#DCE6FF" : "#FFFFFF",
                    stroke: isTarget ? "#002FA7" : "#002FA7",
                    strokeWidth: isActive || isTarget ? 3 : 2,
                    filter: isTarget ? "drop-shadow(0px 0px 8px rgba(0, 47, 167, 0.4))" : "none"
                  }}
                  x={-24}
                  y={-20}
                  width={48}
                  height={40}
                  className="transition-colors duration-300"
                />
                <text
                  dy=".3em"
                  textAnchor="middle"
                  className={`font-mono text-[11px] font-black select-none pointer-events-none transition-colors duration-300 ${isActive || isTarget ? 'fill-white' : 'fill-[#002FA7]'}`}
                >
                  {node.value}
                </text>

                {isTarget && (
                   <foreignObject x={-24} y={22} width={48} height={14}>
                      <div className="bg-[#FF4D4D] text-white text-[7px] px-1 font-black uppercase tracking-tighter text-center">
                        TARGET
                      </div>
                   </foreignObject>
                )}
              </motion.g>
            );
          })}
        </motion.g>
      </svg>
      
      {/* Logic Status Message */}
      {statusMessage && (
        <div className="absolute top-2 right-4 font-mono text-[9px] text-[#002FA7] bg-[#DCE6FF] px-2 py-0.5 font-bold animate-pulse z-20 shadow-sm border-l-2 border-[#002FA7]">
          SIM_LOG: {statusMessage}
        </div>
      )}

      <div className="absolute top-2 left-4 font-mono text-[8px] text-[#002FA7] uppercase tracking-[0.3em] font-bold pointer-events-none">
        Hierarchy_Topology:Smart_Focus
      </div>

      <div className="absolute bottom-2 right-4 font-mono text-[6px] text-[#002FA7]/40 uppercase tracking-widest pointer-events-none">
        Auto-Focus Camera Active • Interactive Pan
      </div>
    </div>
  );
});

Tree.displayName = "DataVisualizer.Tree";
