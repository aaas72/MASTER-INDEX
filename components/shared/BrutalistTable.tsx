"use client";

import React from "react";

export type TableColumn<T> = {
  header: string;
  key: string;
  align?: "left" | "right";
  render?: (item: T) => React.ReactNode;
};

interface BrutalistTableProps<T> {
  title?: string;
  subtitle?: string;
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
}

/**
 * BrutalistTable: A highly reusable, standardized table component 
 * following the platform's neo-formalist design system.
 */
export default function BrutalistTable<T>({ 
  title, 
  subtitle, 
  columns, 
  data, 
  className = "" 
}: BrutalistTableProps<T>) {
  return (
    <section className={`border border-outline-variant/10 bg-surface-container-lowest overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <div className="flex items-center justify-between border-b border-outline-variant/20 p-6">
          {title && (
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-outline">
              {title}
            </h2>
          )}
          {subtitle && (
            <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
              {subtitle}
            </span>
          )}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="border-b border-outline-variant/30 bg-surface-container-low">
            <tr>
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className={`px-6 py-4 font-mono text-[10px] uppercase text-outline ${col.align === "right" ? "text-right" : ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {data.map((item, rowIdx) => (
              <tr key={rowIdx} className="group transition-colors hover:bg-surface-container-low">
                {columns.map((col, colIdx) => (
                  <td 
                    key={colIdx} 
                    className={`px-6 py-5 ${col.align === "right" ? "text-right" : ""}`}
                  >
                    {col.render ? col.render(item) : String((item as any)[col.key] || "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
