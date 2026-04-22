import { Sidebar } from "@/components/shared";

export default function SettingsPage() {
  return (
    <>
      <Sidebar />
      <div className="ml-60 p-12">
        <h1 className="text-4xl font-bold mb-4 font-sans uppercase">Settings</h1>
        <p className="text-slate-600 font-mono mb-8">الهدف: تخصيص البيئة وضبط واجهة المستخدم.</p>
        
        <div className="space-y-6 max-w-xl">
          <div className="p-6 border border-slate-200">
            <h2 className="font-bold mb-2">التبديل بين الوضع الليلي والنهاري</h2>
            <p className="text-sm text-slate-500">Dark / Light Mode</p>
          </div>
          <div className="p-6 border border-slate-200">
            <h2 className="font-bold mb-2">لغة العرض</h2>
            <p className="text-sm text-slate-500">العربية / الإنجليزية</p>
          </div>
          <div className="p-6 border border-slate-200">
            <h2 className="font-bold mb-2">إعدادات المحاكي</h2>
            <p className="text-sm text-slate-500">السرعة، والألوان المستخدمة في הـ Visualization.</p>
          </div>
        </div>
      </div>
    </>
  );
}