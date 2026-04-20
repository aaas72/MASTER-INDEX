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
  
  // نستخدم useRef لتجنب تكرار التنفيذ غير الضروري
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 1. تعريف وظيفة المراقب
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // إذا كان القسم ظاهراً بنسبة أكثر من 50%
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    // 2. إعداد الخيارات (تحديد متى نعتبر القسم "نشطاً")
    // rootMargin: "-20% 0px -70% 0px" تعني أننا نركز على الجزء العلوي من الشاشة
    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0,
    });

    // 3. مراقبة جميع الأقسام المعرفة في القائمة
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.current?.observe(element);
    });

    // تنظيف المراقب عند إغلاق الصفحة
    return () => observer.current?.disconnect();
  }, []);

  // وظيفة للتمرير السلس عند النقر
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // مساحة للهيدر العلوي إذا وجد
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
    <nav className="hidden lg:block w-48 shrink-0 relative">
      <div className="sticky top-24 flex flex-col gap-4 font-mono text-xs text-on-surface-variant uppercase tracking-widest">
        <div className="flex items-center gap-2 mb-2 border-b border-outline-variant/30 pb-2">
           <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
           <h3 className="text-on-surface font-bold">Contents</h3>
        </div>
        
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => scrollToSection(e, section.id)}
            className={`group relative pl-4 border-l-2 transition-all duration-300 ease-in-out ${
              activeSection === section.id
                ? "text-primary border-primary font-bold translate-x-1"
                : "text-on-surface-variant border-transparent hover:text-on-surface hover:border-outline-variant"
            }`}
          >
            {/* مؤشر بصري صغير يظهر فقط عند النشاط */}
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