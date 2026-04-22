import { BlockMath } from "react-katex";

type VersusAlgorithm = {
	title: { en: string };
	category: string;
	complexity: {
		time: { best: string; average: string; worst: string };
		space: string;
		stable: boolean;
		in_place: boolean;
	};
	content: { proof_latex: string };
};

type VersusCompetitorRightProps = {
	algorithm: VersusAlgorithm;
	isWinner: boolean;
};

const toMathNotation = (value: string) =>
	value.replaceAll("log", "\\log ").replaceAll("^2", "^{2}");

export default function VersusCompetitorRight({
	algorithm,
	isWinner,
}: VersusCompetitorRightProps) {
	return (
		<section className="flex-1 p-8 flex flex-col  bg-surface-container-low">
			<div className="flex justify-between items-start mb-12">
				<div className="text-left">
					<span className="font-mono text-xs font-bold text-on-surface-variant uppercase tracking-widest border border-outline-variant px-2 py-1 bg-surface-container-lowest mb-2 inline-block">
						CHALLENGER_02
					</span>
					<h2 className="font-sans text-4xl font-bold text-on-surface mt-2">
						{algorithm.title.en.replaceAll(" ", "")}
					</h2>
					<p className="font-mono text-sm text-secondary mt-1">
						{algorithm.category}
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
					<div className="bg-surface-container-lowest p-6 border border-outline-variant/20 flex flex-col justify-center items-center">
						<span className="font-mono text-xs text-on-surface-variant uppercase mb-2">
							Average Time
						</span>
						<div className="font-mono text-on-surface text-lg">
							<BlockMath math={toMathNotation(algorithm.complexity.time.average)} />
						</div>
					</div>
					<div className="bg-surface-container-lowest p-6 border border-outline-variant/20 flex flex-col justify-center items-center">
						<span className="font-mono text-xs text-on-surface-variant uppercase mb-2">
							Worst Time
						</span>
						<div className="font-mono text-primary text-lg">
							<BlockMath math={toMathNotation(algorithm.complexity.time.worst)} />
						</div>
					</div>
					<div className="bg-surface-container-lowest p-6 border border-outline-variant/20 flex flex-col justify-center items-center col-span-2">
						<span className="font-mono text-xs text-on-surface-variant uppercase mb-2">
							Space Complexity
						</span>
						<div className="font-mono text-error text-lg">
							<BlockMath math={toMathNotation(algorithm.complexity.space)} />
						</div>
					</div>
				</div>
			</div>

			<div className="mb-12 bg-surface-container-lowest border border-outline-variant/20 px-4 py-5">
				<h3 className="font-mono text-sm font-bold uppercase tracking-wider mb-3 text-left">
					Mathematical Signal
				</h3>
				<div className="font-mono text-sm text-on-surface overflow-x-auto">
					<BlockMath math={algorithm.content.proof_latex} />
				</div>
			</div>

			{/* Architecture Specs */}
			<div>
				<h3 className="font-mono text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-outline-variant/30 pb-2 text-left">
					Architecture Specs
				</h3>
				<ul className="space-y-3 font-mono text-sm">
					<li className="flex items-center justify-between p-3 bg-surface-container-lowest border border-outline-variant/20">
						<span className="text-on-surface">Stable</span>
						<div className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-none bg-[#002FA7] block"></span>
							<span className="text-primary font-bold uppercase text-xs">
								{algorithm.complexity.stable ? "True" : "False"}
							</span>
						</div>
					</li>
					<li className="flex items-center justify-between p-3 bg-surface-container-lowest border border-outline-variant/20">
						<span className="text-on-surface">In-Place</span>
						<div className="flex items-center gap-2">
							<span className="w-2 h-2 rounded-none bg-error block"></span>
							<span className="text-error font-bold uppercase text-xs">
								{algorithm.complexity.in_place ? "True" : "False"}
							</span>
						</div>
					</li>
					<li className="flex items-center justify-between p-3 bg-surface-container-lowest border border-outline-variant/20">
						<span className="text-on-surface">Method</span>
						<span className="text-on-surface-variant font-bold uppercase text-xs">
							{algorithm.category}
						</span>
					</li>
				</ul>
			</div>
		</section>
	);
}
