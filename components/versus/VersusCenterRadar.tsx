import { BlockMath, InlineMath } from "react-katex";
import { useMemo } from "react";

type VersusCenterRadarProps = {
	leftName: string;
	rightName: string;
	speedDeltaPercent: number;
};

export default function VersusCenterRadar({
	leftName,
	rightName,
	speedDeltaPercent,
}: VersusCenterRadarProps) {
	
	// Helper to calculate polygon points based on 6-axis data (0.1 to 0.9)
	const calculatePoints = (values: number[]) => {
		const center = 50;
		const radius = 45;
		return values.map((val, i) => {
			const angle = (i * 60 - 90) * (Math.PI / 180);
			const r = radius * val;
			const x = center + r * Math.cos(angle);
			const y = center + r * Math.sin(angle);
			return `${x.toFixed(2)},${y.toFixed(2)}`;
		}).join(" ");
	};

	// Generate dynamic data points for the two competitors
	// Axis 0: Speed (Low N), Axis 1: Speed (Mid N), Axis 2: Speed (High N)
	// Axis 3: Memory Efficiency, Axis 4: Code Stability, Axis 5: Complexity Optimization
	const leftPoints = useMemo(() => {
		const speedFactor = speedDeltaPercent > 0 ? 0.4 + (speedDeltaPercent / 200) : 0.6;
		return calculatePoints([speedFactor, 0.7, 0.5, 0.8, 0.6, 0.75]);
	}, [speedDeltaPercent]);

	const rightPoints = useMemo(() => {
		const speedFactor = speedDeltaPercent < 0 ? 0.4 + (Math.abs(speedDeltaPercent) / 200) : 0.6;
		return calculatePoints([0.5, speedFactor, 0.8, 0.5, 0.7, 0.6]);
	}, [speedDeltaPercent]);

	return (
		<section className="border-2 border-outline-variant/30 bg-surface-container-lowest p-6 md:p-8">
			<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,2fr)] items-start gap-8">
				<div className="min-w-0 bg-surface border border-outline-variant/20 p-4 md:p-6">
					<div className="flex items-center justify-between mb-4">
						<span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant font-black">
							Benchmarks Radar_Vector
						</span>
						<span className="font-mono text-xs uppercase tracking-widest text-primary font-black">
							{leftName} vs {rightName}
						</span>
					</div>
					<div className="relative w-full max-w-[820px] h-[360px] mx-auto flex items-center justify-center">
						<svg className="w-full h-full max-h-[300px]" viewBox="0 0 100 100">
							{/* Background Hexagons */}
							<polygon
								fill="none"
								points="50,5 95,25 95,75 50,95 5,75 5,25"
								stroke="#e2e4f0"
								strokeWidth="0.5"
							></polygon>
							<polygon
								fill="none"
								points="50,16.25 83.75,32.5 83.75,67.5 50,83.75 16.25,67.5 16.25,32.5"
								stroke="#e2e4f0"
								strokeWidth="0.5"
							></polygon>
							<polygon
								fill="none"
								points="50,27.5 72.5,40 72.5,60 50,72.5 27.5,60 27.5,40"
								stroke="#e2e4f0"
								strokeWidth="0.5"
							></polygon>
							
							{/* Axis Lines */}
							<line x1="50" y1="5" x2="50" y2="95" stroke="#eceef7" strokeWidth="0.5" />
							<line x1="5" y1="25" x2="95" y2="75" stroke="#eceef7" strokeWidth="0.5" />
							<line x1="5" y1="75" x2="95" y2="25" stroke="#eceef7" strokeWidth="0.5" />

							{/* Dynamic Data Polygons */}
							<polygon
								fill="rgba(0, 47, 167, 0.25)"
								points={leftPoints}
								stroke="#002FA7"
								strokeWidth="1.2"
								className="transition-all duration-700 ease-out"
							></polygon>
							<polygon
								fill="rgba(82, 92, 137, 0.25)"
								points={rightPoints}
								stroke="#525c89"
								strokeWidth="1.2"
								className="transition-all duration-700 ease-out"
							></polygon>
						</svg>
						
						{/* Labels (Kept the design exactly but made them clear) */}
						<div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-white px-2 py-0.5 border border-primary/20 text-primary font-bold">
							<InlineMath math="N = 10^3" />
						</div>
						<div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-white px-2 py-0.5 border border-primary/20 text-primary font-bold">
							<InlineMath math="N = 10^6" />
						</div>
						<div className="absolute top-1/2 right-4 -translate-y-1/2 text-[10px] font-mono bg-white px-2 py-0.5 border border-primary/20 text-primary font-bold">
							<InlineMath math="N = 10^4" />
						</div>
					</div>
				</div>
				<div className="w-full bg-surface border border-outline-variant/20 p-4 md:p-6">
					<h3 className="font-mono text-sm uppercase tracking-wider text-primary font-black mb-4">
						Signal Analysis
					</h3>
					<div className="space-y-4 font-mono text-xs text-on-surface-variant">
						<div className="border-2 border-primary/10 p-4 bg-primary/5 text-center">
							<span className="block text-[8px] uppercase font-black text-primary/40 mb-1">Delta_Velocity_Magnitude</span>
							<BlockMath math={`\\Delta_{speed}= ${speedDeltaPercent.toFixed(1)}\\%`} />
						</div>
						<div className="border-2 border-primary/10 p-4 bg-primary/5 text-center">
							<span className="block text-[8px] uppercase font-black text-primary/40 mb-1">Comparative_Efficiency_Ratio</span>
							<BlockMath math={`S_{${leftName.replaceAll(" ", "")}} < S_{${rightName.replaceAll(" ", "")}}`} />
						</div>
						<div className="text-[10px] leading-relaxed text-center opacity-60">
							The polygon geometry represents the equilibrium between time complexity and resource allocation.
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
