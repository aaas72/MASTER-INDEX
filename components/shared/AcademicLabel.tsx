import React from "react";

interface AcademicLabelProps {
  prefix: string;
  index?: number;
  className?: string;
  children?: React.ReactNode;
}

export const AcademicLabel: React.FC<AcademicLabelProps> = ({ prefix, index, className = "", children }) => {
  return (
    <div className={`px-4 py-2 bg-surface-container-low border border-outline-variant/20 flex items-center justify-center text-[10px] font-mono font-bold text-primary tracking-tighter whitespace-nowrap shrink-0 min-w-[100px] shadow-sm ${className}`}>
      <span>{prefix}</span>
      {index !== undefined && <span className="opacity-40 ml-1">.{index.toString().padStart(2, '0')}</span>}
      {children}
    </div>
  );
};
