import { Sidebar } from "@/components/shared";

export default function SettingsPage() {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex-1 p-12 min-w-0">
        <h1 className="page-title-sm mb-4 uppercase">Settings</h1>
        <p className="body-copy mb-8">Objective: Environment customization and user interface adjustments.</p>
        
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