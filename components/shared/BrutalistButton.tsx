"use client";

import React from "react";

interface BrutalistButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: string;
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "surface";
  className?: string;
}

/**
 * BrutalistButton: A standardized action component following the 
 * platform's neo-formalist and brutalist design language.
 */
const BrutalistButton = ({ 
  children, 
  icon, 
  isLoading, 
  loadingText = "PROCESSING", 
  variant = "surface",
  className = "",
  disabled,
  ...props 
}: BrutalistButtonProps) => {
  const baseClasses = "group relative overflow-hidden py-3 px-6 transition-all active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const variantClasses = variant === "primary" 
    ? "bg-on-surface text-surface hover:bg-primary" 
    : "bg-on-surface text-surface hover:bg-primary";

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-3 font-mono text-[11px] font-black uppercase tracking-widest">
        {isLoading ? (
          <div className="flex items-center gap-3">
            <span>{loadingText}</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-current animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-current animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-current animate-bounce" />
            </div>
          </div>
        ) : (
          <>
            {children}
            {icon && <span className="material-symbols-outlined text-sm">{icon}</span>}
          </>
        )}
      </span>
      {/* Hover slide effect */}
      <div className="absolute inset-0 translate-y-full bg-white/10 transition-transform group-hover:translate-y-0" />
    </button>
  );
};

export default BrutalistButton;
