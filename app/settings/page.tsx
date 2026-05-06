import { Sidebar } from "@/components/shared";

export default function SettingsPage() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex-1 p-12 min-w-0">
        <div className="w-full border-b border-outline-variant/10 pb-6 mb-8 flex flex-col gap-2">
          <h1 className="font-sans text-3xl font-black text-black uppercase tracking-tight">
            System Settings
          </h1>
          <p className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
            ENVIRONMENT_CUSTOMIZATION // USER_INTERFACE_ADJUSTMENTS
          </p>
        </div>
        
        <div className="space-y-6 max-w-xl">
          <div className="p-6 border border-slate-200">
            <h2 className="section-title mb-2">Toggle Dark / Light Mode</h2>
            <p className="body-copy text-sm">System Theme</p>
          </div>
          <div className="p-6 border border-slate-200">
            <h2 className="section-title mb-2">Display Language</h2>
            <p className="body-copy text-sm">English</p>
          </div>
          <div className="p-6 border border-slate-200">
            <h2 className="section-title mb-2">Simulator Settings</h2>
            <p className="body-copy text-sm">Speed and colors used in the Visualization.</p>
          </div>
        </div>
      </div>
    </div>
  );
}