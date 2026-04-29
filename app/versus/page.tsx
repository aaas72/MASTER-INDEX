"use client";

import { useMemo, useState, useEffect } from "react";
import { FullWidthLayout } from "@/components/shared";
import {
  VersusAlgorithmSelector,
  VersusHeader,
  VersusCompetitorLeft,
  VersusCompetitorRight,
  VersusCenterRadar,
} from "@/components/versus";
import algorithmsData from "@/data/algorithms.json";
import { runRealBenchmark, type BenchmarkResult } from "@/utils/benchmark-engine";

type VersusAlgorithm = {
  id: string;
  title: { en: string };
  category: string;
  complexity: {
    time: { best: string; average: string; worst: string };
    space: string;
    stable: boolean;
    in_place: boolean;
  };
  content: {
    proof_latex: string;
  };
  benchmarks: {
    input_size: number;
    execution_time_ms: number;
  }[];
};

const typedAlgorithmsData = algorithmsData as unknown as Record<string, VersusAlgorithm>;

export default function VersusHubPage() {
  const [activeCategory, setActiveCategory] = useState("Sorting");
  const [scenario, setScenario] = useState("Random");
  const [isExecuting, setIsExecuting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const algorithmEntries = useMemo(
    () => Object.entries(typedAlgorithmsData).filter(([_, algo]) => 
      algo.benchmarks && algo.benchmarks.length > 0 && algo.category === activeCategory
    ),
    [activeCategory],
  );

  const [leftAlgorithmId, setLeftAlgorithmId] = useState("");
  const [rightAlgorithmId, setRightAlgorithmId] = useState("");

  // Sync selection when category changes
  useEffect(() => {
    if (algorithmEntries.length > 0) {
      setLeftAlgorithmId(algorithmEntries[0][0]);
      setRightAlgorithmId(algorithmEntries[1] ? algorithmEntries[1][0] : algorithmEntries[0][0]);
      setShowResults(false);
    }
  }, [algorithmEntries]);

  const leftAlgorithm = typedAlgorithmsData[leftAlgorithmId];
  const rightAlgorithm = typedAlgorithmsData[rightAlgorithmId];

  const [timer, setTimer] = useState(0);
  const [realResults, setRealResults] = useState<{
    left: BenchmarkResult | null;
    right: BenchmarkResult | null;
  }>({ left: null, right: null });

  const handleExecute = async () => {
    if (!leftAlgorithmId || !rightAlgorithmId) return;

    setIsExecuting(true);
    setShowResults(false);
    setTimer(2.0);
    
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 0.1 ? 0 : prev - 0.1));
    }, 100);

    try {
      const inputSize = activeCategory === "Sorting" ? 2500 : 5000;
      const [leftRes, rightRes] = await Promise.all([
        runRealBenchmark(leftAlgorithmId, scenario, inputSize),
        runRealBenchmark(rightAlgorithmId, scenario, inputSize)
      ]);

      setRealResults({ left: leftRes, right: rightRes });
      
      setTimeout(() => {
        clearInterval(interval);
        setIsExecuting(false);
        setShowResults(true);
      }, 500);
    } catch (error) {
      console.error("Benchmark failed:", error);
      setIsExecuting(false);
      clearInterval(interval);
    }
  };

  const leftBenchmark = realResults.left || { execution_time_ms: 0, input_size: 0 };
  const rightBenchmark = realResults.right || { execution_time_ms: 0, input_size: 0 };

  const leftIsWinner = leftBenchmark.execution_time_ms <= rightBenchmark.execution_time_ms;
  const rightIsWinner = rightBenchmark.execution_time_ms <= leftBenchmark.execution_time_ms;

  const slowerTime = Math.max(leftBenchmark.execution_time_ms, rightBenchmark.execution_time_ms);
  const fasterTime = Math.min(leftBenchmark.execution_time_ms, rightBenchmark.execution_time_ms);
  const speedDeltaPercent = slowerTime > 0 ? ((slowerTime - fasterTime) / slowerTime) * 100 : 0;

  const options = algorithmEntries.map(([id, algo]) => ({ id, name: algo.title.en }));

  const handleLeftAlgorithmChange = (nextLeftId: string) => {
    setLeftAlgorithmId(nextLeftId);
    setShowResults(false);
    if (nextLeftId === rightAlgorithmId) {
      const other = algorithmEntries.find(([id]) => id !== nextLeftId);
      if (other) setRightAlgorithmId(other[0]);
    }
  };

  const handleRightAlgorithmChange = (nextRightId: string) => {
    setRightAlgorithmId(nextRightId);
    setShowResults(false);
    if (nextRightId === leftAlgorithmId) {
      const other = algorithmEntries.find(([id]) => id !== nextRightId);
      if (other) setLeftAlgorithmId(other[0]);
    }
  };

  return (
    <FullWidthLayout>
      <header className="mb-8 shrink-0">
        <h1 className="page-title-sm uppercase">VERSUS_HUB Calibration</h1>
        <p className="body-copy mt-2">Configure your comparative analysis parameters below.</p>
      </header>

      <VersusHeader activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <div className="mt-6">
        <label className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-3 block">
          [Selection_Matrix] Select Competitors & Scenario
        </label>
        <VersusAlgorithmSelector
          algorithmOptions={options}
          leftAlgorithmId={leftAlgorithmId}
          rightAlgorithmId={rightAlgorithmId}
          onLeftAlgorithmChange={handleLeftAlgorithmChange}
          onRightAlgorithmChange={handleRightAlgorithmChange}
          onExecute={handleExecute}
          isExecuting={isExecuting}
          scenario={scenario}
          onScenarioChange={setScenario}
        />
      </div>

      <div className="mt-8 flex-1 flex flex-col gap-6 relative min-h-0 transition-all duration-500">
        {!leftAlgorithm || !rightAlgorithm ? (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-outline-variant/30 font-mono text-on-surface-variant uppercase tracking-widest text-sm bg-surface-container-low/50 min-h-[300px]">
            Insufficient data for comparison in this category
          </div>
        ) : !showResults && !isExecuting ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-surface-container-low/30 border-2 border-outline-variant/5 min-h-[300px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.6em] text-on-surface-variant/40">Awaiting Simulation Trigger</p>
          </div>
        ) : isExecuting ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-surface-container-low/20 backdrop-blur-sm relative overflow-hidden min-h-[300px]">
            <div className="flex items-center gap-4 mb-6">
              {[0, 1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="w-3 h-3 bg-primary animate-[pulse_1.5s_infinite_ease-in-out]"
                  style={{ 
                    animationDelay: `${i * 0.15}s`,
                    opacity: 1 - (i * 0.15)
                  }}
                />
              ))}
            </div>
            <div className="text-center">
              <div className="font-mono text-xl font-bold text-on-surface-variant/40 mb-2 tracking-widest">{timer.toFixed(1)}<span className="text-xs ml-1">s</span></div>
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-on-surface-variant animate-pulse">Synchronizing_Runtime...</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-2 border-2 border-outline-variant/30 bg-surface-container-lowest overflow-hidden shrink-0">
              <VersusCompetitorLeft algorithm={leftAlgorithm} isWinner={leftIsWinner} />
              <VersusCompetitorRight algorithm={rightAlgorithm} isWinner={rightIsWinner} />
            </div>
            <VersusCenterRadar leftName={leftAlgorithm.title.en} rightName={rightAlgorithm.title.en} speedDeltaPercent={speedDeltaPercent} />
            <div className="shrink-0 flex justify-between font-mono text-xs text-on-surface-variant uppercase border-t border-outline-variant/20 pt-6 pb-4">
              <div className="space-y-1">
                <p>Data Source: Local Runtime Environment</p>
                <p className="text-primary font-bold">ΔPerformance Velocity: {speedDeltaPercent.toFixed(1)}%</p>
              </div>
              <div className="text-right space-y-1">
                <p>Sample Complexity: N={Math.max(leftBenchmark.input_size, rightBenchmark.input_size).toLocaleString('en-US')}</p>
                <p>Status: Analysis Complete</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </FullWidthLayout>
  );
}
