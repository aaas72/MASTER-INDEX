"use client";

import { useEffect, useState, useRef } from "react";

const sections = [
  { id: "visualization", label: "Visualization" },
  { id: "analysis", label: "Computational Analysis" },
  { id: "logic", label: "Procedural Logic" },
  { id: "implementation", label: "Implementation" },
  { id: "pitfalls", label: "Theoretical Constraints" },
  { id: "applications", label: "Real-world Applications" },
  { id: "comparisons", label: "Comparative Analysis" },
  { id: "citations", label: "Academic References" },
];

export default function AlgorithmToc() {
  const [activeSection, setActiveSection] = useState("visualization");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0,
    });

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.current?.observe(element);
    });

    return () => observer.current?.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-8 flex flex-col gap-5 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
        <div className="mb-4 flex items-center gap-3 border-b border-outline-variant/20 pb-3">
          <div className="h-2 w-2 bg-primary" />
          <h3 className="font-bold text-on-surface tracking-[0.15em]">CONTENTS</h3>
        </div>

        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => scrollToSection(e, section.id)}
            className={`group pl-4 transition-colors duration-200 ${
              activeSection === section.id
                ? "border-l-[3px] border-primary font-bold text-primary"
                : "border-l-[3px] border-transparent text-slate-500 hover:text-black"
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>
  );
}
