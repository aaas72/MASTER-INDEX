"use client";

import React from "react";

interface MatrixProps {
  data: (number | null)[][] | number[];
  className?: string;
}

export const Matrix = ({ data, className = "" }: MatrixProps) => {
  if (!data || data.length === 0) return null;

  return (
    <div className={`overflow-auto bg-white/80 backdrop-blur-sm p-4 shadow-xl border border-primary/10 ${className}`}>
      <table className="w-full border-collapse font-mono text-xs">
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className="p-3 bg-surface-container-high font-bold border border-outline-variant/10 text-center w-12">{i}</td>
              {Array.isArray(row) ? row.map((cell, j) => (
                <td key={j} className={`p-3 border border-outline-variant/10 text-center transition-colors ${cell !== null && cell !== 0 ? 'bg-primary/10 text-primary font-bold' : 'bg-white text-slate-400'}`}>
                  {cell !== null ? cell : '—'}
                </td>
              )) : (
                <td className="p-3 border border-outline-variant/10 text-center bg-primary/10 text-primary font-bold">{row}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
