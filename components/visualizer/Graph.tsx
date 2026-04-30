"use client";

import React from "react";
import { motion } from "framer-motion";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  state?: "default" | "active" | "visited" | "highlight";
}

interface Edge {
  from: string;
  to: string;
  weight?: string | number;
  directed?: boolean;
  state?: "default" | "active" | "highlight";
}

interface GraphProps {
  nodes: Node[];
  edges: Edge[];
  width?: number | string;
  height?: number | string;
  targetNodeId?: string;
  activeNodeId?: string;
  statusMessage?: string;
}

export const Graph = React.memo(({
  nodes,
  edges,
  width = "100%",
  height = 300,
  targetNodeId = "",
  activeNodeId = "",
  statusMessage = ""
}: GraphProps) => {
  return (
    <div className="relative border border-[#002FA7]/20 bg-white overflow-hidden shadow-[4px_4px_0px_#DCE6FF] flex flex-col items-center justify-center p-2" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox={`0 0 600 300`}>
        {/* Definition for arrows */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="20" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#002FA7" />
          </marker>
        </defs>

        {/* Edges */}
        {edges.map((edge, idx) => {
          const from = nodes.find(n => n.id === edge.from);
          const to = nodes.find(n => n.id === edge.to);
          if (!from || !to) return null;

          const isFromVisited = nodes.find(n => n.id === edge.from)?.state === "visited";
          const isToVisited = nodes.find(n => n.id === edge.to)?.state === "visited";
          const isFromActive = edge.from === activeNodeId;
          const isToActive = edge.to === activeNodeId;

          // An edge is part of the "Active Path" if it connects visited nodes or the current active node
          const isActivePath = (isFromVisited && isToVisited) || isFromActive || isToActive;
          const isHighlight = edge.state === "highlight";
          
          // Only dim if it's not part of the active exploration path
          const dimmed = (activeNodeId !== "" || nodes.some(n => n.state === "visited")) && !isActivePath && !isHighlight;

          return (
            <g key={`edge-${idx}`} className="transition-opacity duration-500">
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: dimmed ? 0.1 : 1,
                  stroke: isHighlight ? "#FF0000" : isActivePath ? "#002FA7" : "#CBD5E1"
                }}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                strokeWidth={isActivePath || isHighlight ? 3 : 1}
                markerEnd={edge.directed ? "url(#arrowhead)" : ""}
              />
              {edge.weight && (
                <text 
                  x={(from.x + to.x) / 2} 
                  y={(from.y + to.y) / 2 - 5} 
                  className={`font-mono text-[8px] fill-slate-400 ${dimmed ? 'opacity-10' : 'opacity-100'}`}
                  textAnchor="middle"
                >
                  {edge.weight}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isActive = node.id === activeNodeId || node.state === "active";
          const isVisited = node.state === "visited";
          const isTarget = node.id === targetNodeId;
          const dimmed = (activeNodeId !== "" || nodes.some(n => n.state === "visited")) && !isActive && !isVisited && !isTarget;
          
          return (
            <g key={node.id} className="transition-all duration-500">
              {isTarget && (
                <motion.circle
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  cx={node.x}
                  cy={node.y}
                  r={24}
                  fill="none"
                  stroke="#FF4D4D"
                  strokeWidth={2}
                  strokeDasharray="4 2"
                />
              )}
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ 
                  scale: isActive || isTarget ? 1.1 : 1,
                  fill: isTarget ? "#FF4D4D" : isActive ? "#002FA7" : isVisited ? "#DCE6FF" : "#FFFFFF",
                  opacity: dimmed ? 0.2 : 1,
                  stroke: isTarget ? "#FF4D4D" : "#002FA7",
                  strokeWidth: isTarget || isActive ? 3 : 2
                }}
                cx={node.x}
                cy={node.y}
                r={16}
              />
              <text
                x={node.x}
                y={node.y}
                dy=".3em"
                textAnchor="middle"
                className={`font-mono text-[10px] font-bold select-none transition-opacity duration-500 ${isActive ? 'fill-white' : 'fill-[#002FA7]'} ${dimmed ? 'opacity-20' : 'opacity-100'}`}
              >
                {node.label}
              </text>
              
              {/* Target Indicator Label */}
              {isTarget && (
                <foreignObject x={node.x - 20} y={node.y + 22} width={40} height={12}>
                  <div className="bg-[#FF4D4D] text-white text-[6px] px-1 font-black uppercase tracking-tighter text-center shadow-sm">
                    TARGET
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>

      {/* Logic Status Message */}
      {statusMessage && (
        <div className="absolute top-2 right-4 font-mono text-[9px] text-[#002FA7] bg-[#DCE6FF] px-2 py-0.5 font-bold animate-pulse z-20 shadow-sm">
          SIM_LOG: {statusMessage}
        </div>
      )}

      {/* Meta Label */}
      <div className="absolute top-2 left-4 font-mono text-[8px] text-[#002FA7] uppercase tracking-[0.3em] font-bold">
        Topological_Field:Graph_Map
      </div>
    </div>
  );
});

Graph.displayName = "DataVisualizer.Graph";
