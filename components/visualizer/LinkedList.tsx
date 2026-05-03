"use client";

import React from "react";

interface LinkedListProps {
  nodes: { value: number | string; state?: string }[];
  className?: string;
}

export const LinkedList = ({ nodes, className = "" }: LinkedListProps) => {
  const stateColor = (s?: string) => {
    if (s === "active") return "bg-primary text-white border-primary";
    if (s === "visited") return "bg-primary/20 text-primary border-primary/40";
    return "bg-white text-on-surface border-outline-variant/30";
  };

  return (
    <div className={`flex items-center gap-0 p-4 ${className}`}>
      {nodes.map((node, idx) => (
        <div key={idx} className="flex items-center">
          <div className={`w-16 h-16 border-2 flex items-center justify-center font-mono text-lg font-bold transition-all ${stateColor(node.state)}`}>
            {node.value}
          </div>
          {idx < nodes.length - 1 && (
            <div className="w-8 h-0.5 bg-primary/40 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-6 border-t-transparent border-b-transparent border-l-primary/40"></div>
            </div>
          )}
        </div>
      ))}
      {nodes.length > 0 && (
        <div className="ml-2 font-mono text-xs text-outline-variant uppercase">null</div>
      )}
    </div>
  );
};
