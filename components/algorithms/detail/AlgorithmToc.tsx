"use client";

import { useEffect, useState, useRef } from "react";

const sections = [
  { id: "visualization", label: "Visualization" },
  { id: "proof", label: "Mathematical Proof" },
  { id: "implementation", label: "Implementation" },
  { id: "benchmarks", label: "Benchmarks" },
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
    <nav className="relative hidden w-48 shrink-0 lg:block">
      <div className="sticky top-24 flex flex-col gap-4 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
        <div className="mb-2 flex items-center gap-2 border-b border-outline-variant/30 pb-2">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <h3 className="font-bold text-on-surface">Contents</h3>
        </div>

        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => scrollToSection(e, section.id)}
            className={`group relative border-l-2 pl-4 transition-all duration-300 ease-in-out ${
              activeSection === section.id
                ? "translate-x-1 border-primary font-bold text-primary"
                : "border-transparent text-on-surface-variant hover:border-outline-variant hover:text-on-surface"
            }`}
          >
            {activeSection === section.id && (
              <span className="absolute left-[-2px] top-0 h-full w-[2px] bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]" />
            )}
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
