"use client";

import { useMemo, useState } from "react";
import { Sidebar } from "@/components/shared";
import {
  VersusAlgorithmSelector,
  VersusHeader,
  VersusCompetitorLeft,
  VersusCompetitorRight,
  VersusCenterRadar,
} from "@/components/versus";
import algorithmsData from "@/data/algorithms.json";

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

const findLargestBenchmark = (algorithm: VersusAlgorithm) => {
  return algorithm.benchmarks.reduce((largest, current) => {
    if (current.input_size > largest.input_size) {
      return current;
    }
    return largest;
  }, algorithm.benchmarks[0]);
};

export default function VersusHubPage() {
  const algorithmEntries = useMemo(
    () => Object.entries(typedAlgorithmsData).filter(([_, algo]) => algo.benchmarks && algo.benchmarks.length > 0),
    [],
  );

  const [leftAlgorithmId, setLeftAlgorithmId] = useState(
    algorithmEntries[0]?.[0] ?? "",
  );
  const [rightAlgorithmId, setRightAlgorithmId] = useState(
    algorithmEntries[1]?.[0] ?? algorithmEntries[0]?.[0] ?? "",
  );

  const leftAlgorithm = typedAlgorithmsData[leftAlgorithmId];
  const rightAlgorithm = typedAlgorithmsData[rightAlgorithmId];

  if (!leftAlgorithm || !rightAlgorithm) {
    return null;
  }

  const leftBenchmark = findLargestBenchmark(leftAlgorithm);
  const rightBenchmark = findLargestBenchmark(rightAlgorithm);

  const leftIsWinner =
    leftBenchmark.execution_time_ms <= rightBenchmark.execution_time_ms;
  const rightIsWinner =
    rightBenchmark.execution_time_ms <= leftBenchmark.execution_time_ms;

  const slowerTime = Math.max(
    leftBenchmark.execution_time_ms,
    rightBenchmark.execution_time_ms,
  );
  const fasterTime = Math.min(
    leftBenchmark.execution_time_ms,
    rightBenchmark.execution_time_ms,
  );
  const speedDeltaPercent = ((slowerTime - fasterTime) / slowerTime) * 100;

  const options = algorithmEntries.map(([id, algo]) => ({
    id,
    name: algo.title.en,
  }));

  const handleLeftAlgorithmChange = (nextLeftId: string) => {
    setLeftAlgorithmId(nextLeftId);
    if (nextLeftId === rightAlgorithmId) {
      setRightAlgorithmId(leftAlgorithmId);
    }
  };

  const handleRightAlgorithmChange = (nextRightId: string) => {
    setRightAlgorithmId(nextRightId);
    if (nextRightId === leftAlgorithmId) {
      setLeftAlgorithmId(rightAlgorithmId);
    }
  };

  return (
    <>
      <Sidebar />
      <div
        className="max-w-[1440px] mx-auto flex flex-col overflow-hidden bg-surface pl-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(196, 197, 214, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(196, 197, 214, 0.2) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 p-8 relative flex flex-col h-full overflow-hidden">
            <header className="mb-8 shrink-0">
              <h1 className="page-title-sm uppercase">
                VERSUS_HUB Calibration
              </h1>
              <p className="body-copy mt-2">
                Comparative analysis of sorting methodologies under randomized
                load conditions.
              </p>
            </header>
            <VersusAlgorithmSelector
              algorithmOptions={options}
              leftAlgorithmId={leftAlgorithmId}
              rightAlgorithmId={rightAlgorithmId}
              onLeftAlgorithmChange={handleLeftAlgorithmChange}
              onRightAlgorithmChange={handleRightAlgorithmChange}
            />
            <VersusHeader />

            {/* Competitors + Full-Width Radar */}
            <div className="flex-1 flex flex-col gap-6 relative min-h-0">
              <div className="grid grid-cols-2 border-2 border-outline-variant/30 bg-surface-container-lowest overflow-hidden min-h-0">
                <VersusCompetitorLeft
                  algorithm={leftAlgorithm}
                  isWinner={leftIsWinner}
                />
                <VersusCompetitorRight
                  algorithm={rightAlgorithm}
                  isWinner={rightIsWinner}
                />
              </div>
              <VersusCenterRadar
                leftName={leftAlgorithm.title.en}
                rightName={rightAlgorithm.title.en}
                speedDeltaPercent={speedDeltaPercent}
              />
            </div>

            <div className="mt-4 shrink-0 flex justify-between font-mono text-xs text-on-surface-variant uppercase">
              <span>
                Data Source: Local Runtime | ΔSpeed = {speedDeltaPercent.toFixed(1)}%
              </span>
              <span>
                N(max): {Math.max(leftBenchmark.input_size, rightBenchmark.input_size).toLocaleString('en-US')}
              </span>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
