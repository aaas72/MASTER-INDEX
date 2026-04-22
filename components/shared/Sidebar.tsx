"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path || pathname?.startsWith(`${path}/`);
    if (isActive) {
      return "flex items-center px-6 py-4 bg-[#002FA7] text-white font-mono transition-colors duration-200";
    }
    return "flex items-center px-6 py-4 text-slate-600 font-mono hover:bg-[#e0e3e7] transition-colors duration-150";
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-60 flex-col border-r border-outline-variant/20 bg-[#f7fafe] p-0 pt-20">
      <div className="px-6 py-8 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">
              terminal
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-black uppercase font-sans">
              MASTER INDEX
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">
              LIBRARIAN GUIDE
            </span>
          </div>
        </div>
      </div>
      <nav className="flex-grow flex flex-col">
        <Link
          className={getLinkClasses("/categories")}
          href="/categories"
          title="التصنيف الهيكلي: استكشاف المجالات بالكامل (مثل: Graph Theory)"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            category
          </span>
          <span className="text-xs uppercase tracking-widest">Categories</span>
        </Link>
        <Link
          className={getLinkClasses("/algorithms")}
          href="/algorithms"
          title="الأرشيف الشامل: القائمة الكاملة والفلترة المتقدمة"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            terminal
          </span>
          <span className="text-xs uppercase tracking-widest">Algorithms</span>
        </Link>
        <Link
          className={getLinkClasses("/archive")}
          href="/archive"
          title="التوثيق التاريخي: الوصول للإصدارات السابقة والمراجع الأكاديمية"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            inventory_2
          </span>
          <span className="text-xs uppercase tracking-widest">Archives</span>
        </Link>
        <Link
          className={`mt-auto ${getLinkClasses("/settings")}`}
          href="/settings"
          title="تخصيص البيئة: تغيير السمة، اللغة، وإعدادات المحاكي"
        >
          <span className="material-symbols-outlined mr-3 text-lg">
            settings
          </span>
          <span className="text-xs uppercase tracking-widest">Settings</span>
        </Link>
      </nav>
      <div className="p-6">
        <button className="w-full border border-[#002FA7] text-[#002FA7] py-3 text-xs font-mono uppercase tracking-widest hover:bg-[#002FA7] hover:text-white transition-all">
          New Entry
        </button>
      </div>
    </aside>
  );
}