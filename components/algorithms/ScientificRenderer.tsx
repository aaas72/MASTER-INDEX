"use client";

import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

interface ScientificRendererProps {
  content: string;
  isBlock?: boolean;
  className?: string;
}

/**
 * A smart component that renders technical and mathematical content.
 * It automatically parses LaTeX delimiters ($...$) for inline math
 * and handles pure LaTeX strings for block math.
 */
export default function ScientificRenderer({ 
  content, 
  isBlock = false, 
  className = "" 
}: ScientificRendererProps) {
  if (!content) return null;

  // If it's a pure LaTeX string (often used in complexity fields) and isBlock is true
  const isPureMath = !content.includes(" ") && (content.includes("\\") || content.includes("^"));
  
  if (isBlock || (isPureMath && !content.includes("$"))) {
    return (
      <div className={`scientific-block py-2 ${className}`}>
        <BlockMath math={content.replace(/\$/g, "")} />
      </div>
    );
  }

  // Handle mixed text with $ delimiters
  const parts = content.split(/(\$.*?\$)/g);
  
  return (
    <span className={`scientific-inline leading-relaxed ${className}`}>
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$")) {
          return (
            <InlineMath 
              key={i} 
              math={part.substring(1, part.length - 1)} 
            />
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
