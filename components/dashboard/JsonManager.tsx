"use client";

import React, { useState, useEffect } from 'react';
import algorithmsData from '@/data/algorithms.json';

type Algorithm = any;

const ALGO_TEMPLATE = {
  "id": "new-algorithm",
  "metadata": {
    "title": "New Algorithm",
    "subtitle": "Brief description",
    "category": "Sorting",
    "tags": ["Tag1"],
    "stability": "stable"
  },
  "complexity": {
    "time": { "best": "\\Theta(1)", "average": "\\Theta(n)", "worst": "\\Theta(n)" },
    "space": { "average": "\\Theta(1)", "notes": "" }
  },
  "documentation": {
    "description": "",
    "how_it_works": [],
    "applications": [],
    "pitfalls": []
  },
  "implementations": [
    { "language": "pseudocode", "snippet": "", "explanation": "" }
  ],
  "visualizer_config": { "type": "bars" },
  "citations": []
};

export const JsonManager = () => {
  const [algos, setAlgos] = useState<Record<string, Algorithm>>(algorithmsData);
  const [selectedId, setSelectedId] = useState<string | null>(Object.keys(algorithmsData)[0] || null);
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (selectedId && algos[selectedId]) {
      setJsonText(JSON.stringify(algos[selectedId], null, 2));
      setError(null);
    }
  }, [selectedId, algos]);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonText(e.target.value);
    try {
      JSON.parse(e.target.value);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddNew = () => {
    const newId = `new-algo-${Date.now()}`;
    const newAlgos = { ...algos, [newId]: { ...ALGO_TEMPLATE, id: newId } };
    setAlgos(newAlgos);
    setSelectedId(newId);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    const newAlgos = { ...algos };
    delete newAlgos[selectedId];
    setAlgos(newAlgos);
    setSelectedId(Object.keys(newAlgos)[0] || null);
  };

  const handleRequestSave = () => {
    if (error) return;
    try {
      const parsed = JSON.parse(jsonText);
      const newAlgos = { ...algos, [selectedId!]: parsed };
      setAlgos(newAlgos);
      alert("Changes applied to UI state. Please ask the AI to update the actual 'algorithms.json' file with these changes.");
    } catch (err) {
      setError("Invalid JSON structure.");
    }
  };

  const filteredAlgos = Object.entries(algos).filter(([id, algo]) => 
    id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (algo.metadata?.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-160px)]">
      {/* Sidebar: Algo List */}
      <div className="lg:col-span-3 bg-white border border-[#C4C5D6] flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">Algorithm_List</h3>
            <button 
              onClick={handleAddNew}
              className="w-6 h-6 bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>
          <div className="relative">
            <input 
              type="text"
              placeholder="Search algorithms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 font-mono text-[10px] outline-none focus:border-primary transition-colors"
            />
            <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              search
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-slim-scrollbar">
          {filteredAlgos.length > 0 ? filteredAlgos.map(([id, algo]) => (
            <button
              key={id}
              onClick={() => setSelectedId(id)}
              className={`w-full text-left p-4 border-b border-slate-50 transition-colors group ${
                selectedId === id ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-slate-50'
              }`}
            >
              <p className={`font-sans font-bold text-xs uppercase ${selectedId === id ? 'text-primary' : 'text-on-surface'}`}>
                {algo.metadata?.title || id}
              </p>
              <p className="font-mono text-[9px] text-slate-400 uppercase tracking-tighter mt-1">#{id}</p>
            </button>
          )) : (
            <div className="p-8 text-center text-slate-400">
              <p className="font-mono text-[9px] uppercase tracking-widest">No_Results_Found</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content: JSON Editor */}
      <div className="lg:col-span-9 bg-white border border-[#C4C5D6] flex flex-col overflow-hidden">
        {selectedId ? (
          <>
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">Editor_Console</h3>
                {error && (
                  <span className="font-mono text-[9px] text-red-500 uppercase font-bold animate-pulse">
                    :: Syntax_Error: {error}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleDelete}
                  className="px-4 py-1.5 border border-red-200 text-red-500 font-mono text-[9px] font-bold uppercase tracking-widest hover:bg-red-50 transition-colors"
                >
                  Delete_Algo
                </button>
                <button 
                  onClick={handleRequestSave}
                  disabled={!!error}
                  className={`px-6 py-1.5 bg-primary text-white font-mono text-[9px] font-bold uppercase tracking-widest transition-all ${
                    error ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/80'
                  }`}
                >
                  Apply_Changes
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <textarea
                value={jsonText}
                onChange={handleJsonChange}
                className="w-full h-full p-6 font-mono text-[12px] leading-relaxed text-[#0A1022] outline-none resize-none bg-[#EFF2F6] border-t border-slate-100"
                spellCheck={false}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <span className="material-symbols-outlined text-4xl font-light">data_object</span>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]">Select_an_algorithm_to_manage</p>
          </div>
        )}
      </div>
    </div>
  );
};
