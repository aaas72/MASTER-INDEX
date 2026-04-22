import { Sidebar } from "@/components/shared";
import { MasterIndex } from "@/components/algorithms";

export default function AlgorithmsPage() {
  return (
    <>
      <Sidebar />
      <div className="ml-60 p-0">
        <div className="p-12 pb-0">
          <h1 className="text-4xl font-bold mb-4 font-sans uppercase">Algorithms</h1>
          <p className="text-slate-600 font-mono mb-8">الهدف: عرض "القائمة الكاملة" بأسلوب الجدول التقني أو الأرشيف الشامل للبحث السريع.</p>
        </div>
        <MasterIndex />
      </div>
    </>
  );
}