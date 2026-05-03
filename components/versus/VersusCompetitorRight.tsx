import { BlockMath } from "react-katex";

import { Algorithm } from "@/types/algorithm";

type VersusCompetitorRightProps = {
	algorithm: Algorithm;
	isWinner: boolean;
	visualizer?: React.ReactNode;
	summaryPoints?: string[];
};

const toMathNotation = (value: any) => {
	if (!value || typeof value !== 'string') return "";
	return value.replaceAll("log", "\\log ").replaceAll("^2", "^{2}");
};

export default function VersusCompetitorRight({
	algorithm,
	isWinner,
	visualizer,
	summaryPoints,
}: VersusCompetitorRightProps) {
	return (
		<section className="flex-1 p-8 flex flex-col  bg-surface-container-low">
			<div className="flex justify-between items-start mb-12">
				<div className="text-left">
					<span className="font-mono text-xs font-bold text-on-surface-variant uppercase tracking-widest border border-outline-variant px-2 py-1 bg-surface-container-lowest mb-2 inline-block">
						CHALLENGER_02
					</span>
					<h2 className="font-sans text-4xl font-bold text-on-surface mt-2">
						{algorithm.metadata.title.en.replaceAll(" ", "")}
					</h2>
					<p className="font-mono text-sm text-secondary mt-1">
						{algorithm.metadata.category}
					</p>
				</div>
				<div
					className={`bg-[#dde1ff] text-[#001e73] font-mono text-xs px-3 py-1 font-bold flex items-center gap-2 border border-[#b8c4ff] ${
						isWinner ? "" : "opacity-50 grayscale"
					}`}
				>
					<span
						className="material-symbols-outlined text-sm"
						style={{ fontVariationSettings: "'FILL' 1" }}
					>
						emoji_events
					</span>
					WINNER (SPACE)
				</div>
			</div>

			{/* Complexity Matrix */}
			<div className="mb-12">
				<h3 className="font-mono text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-outline-variant/30 pb-2 text-left">
					Complexity Matrix
				</h3>
				<div className="grid grid-cols-2 gap-4">
					<div className="bg-surface-container-lowest p-6 flex flex-col justify-center items-center">
						<span className="font-mono text-xs text-on-surface-variant uppercase mb-2">
							Time Complexity
						</span>
						<div className="font-mono text-on-surface text-lg">
							<BlockMath math={toMathNotation(algorithm.complexity.time.average.label)} />
						</div>
					</div>
					<div className="bg-surface-container-lowest p-6 flex flex-col justify-center items-center">
						<span className="font-mono text-xs text-on-surface-variant uppercase mb-2">
							Space Complexity
						</span>
						<div className="font-mono text-primary text-lg">
							<BlockMath math={toMathNotation(algorithm.complexity.space.label)} />
						</div>
					</div>
					<div className="bg-surface-container-lowest p-6 flex flex-col justify-center items-center col-span-2">
						<span className="font-mono text-xs text-on-surface-variant uppercase mb-2">
							Stability Status
						</span>
						<div className="font-mono text-error text-sm font-bold uppercase tracking-widest">
							{algorithm.metadata.tags.includes("stable") ? "STABLE_COMPILATION" : "UNSTABLE_LOGIC"}
						</div>
					</div>
				</div>
			</div>

			<div className="mb-12 bg-surface-container-lowest px-4 py-5">
				<h3 className="font-mono text-sm font-bold uppercase tracking-wider mb-3 text-left">
					Mathematical Signal
				</h3>
				<div className="font-mono text-sm text-on-surface overflow-x-auto">
					<BlockMath math={"O(f(n)) \\rightarrow \\Omega(g(n))"} />
				</div>
			</div>

			{/* Architecture Specs */}
			<div>
				<h3 className="font-mono text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-outline-variant/30 pb-2 text-left">
					Architecture Specs
				</h3>
				<ul className="space-y-3 font-mono text-sm">
					<li className="flex items-center justify-between p-3 bg-surface-container-lowest">
						<span className="text-on-surface">Stable</span>
						<div className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-none bg-[#002FA7] block"></span>
							<span className="text-primary font-bold uppercase text-xs">
								{algorithm.metadata.tags.includes("stable") ? "True" : "False"}
							</span>
						</div>
					</li>
					<li className="flex items-center justify-between p-3 bg-surface-container-lowest">
						<span className="text-on-surface">In-Place</span>
						<div className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-none bg-error block"></span>
							<span className="text-error font-bold uppercase text-xs">
								{algorithm.metadata.tags.includes("in-place") ? "True" : "False"}
							</span>
						</div>
					</li>
					<li className="flex items-center justify-between p-3 bg-surface-container-lowest">
						<span className="text-on-surface">Method</span>
						<span className="text-on-surface-variant font-bold uppercase text-xs">
							{algorithm.metadata.category}
						</span>
					</li>
				</ul>
			</div>

			{/* Final State Snapshot */}
			{visualizer && (
				<div className="mt-12">
					<h3 className="font-mono text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-outline-variant/30 pb-2">
						Final_Runtime_Snapshot
					</h3>
					<div className="bg-white shadow-inner overflow-hidden flex items-center justify-center min-h-[250px] w-full">
						<div className="w-full h-full">
							{visualizer}
						</div>
					</div>
					{summaryPoints && summaryPoints.length > 0 && (
						<div className="mt-6 p-4 bg-primary/5 border-l-4 border-l-primary">
							<h4 className="font-mono text-[10px] font-bold text-primary uppercase mb-3 flex items-center gap-2">
								<span className="w-1.5 h-1.5 bg-primary"></span>
								Strategic_Insight_Nodes
							</h4>
							<ul className="space-y-2">
								{summaryPoints.map((point, idx) => (
									<li key={idx} className="flex gap-2 items-start font-mono text-[10px] text-on-surface-variant leading-relaxed">
										<span className="text-primary mt-1 text-[8px]">▶</span>
										<span>{point}</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)}
		</section>
	);
}
