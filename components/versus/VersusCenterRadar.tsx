import { BlockMath, InlineMath } from "react-katex";

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
	return (
		<section className="border-2 border-outline-variant/30 bg-surface-container-lowest p-6 md:p-8">
			<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,2fr)] items-start gap-8">
				<div className="min-w-0 bg-surface border border-outline-variant/20 p-4 md:p-6">
					<div className="flex items-center justify-between mb-4">
						<span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
							Benchmarks Radar
						</span>
						<span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">
							{leftName} vs {rightName}
						</span>
					</div>
					<div className="relative w-full max-w-[820px] h-[360px] mx-auto">
						<svg className="w-full h-full opacity-80" viewBox="0 0 100 100">
							<polygon
								fill="none"
								points="50,5 95,25 95,75 50,95 5,75 5,25"
								stroke="#c4c5d6"
								strokeWidth="0.8"
							></polygon>
							<polygon
								fill="none"
								points="50,16 84,32 84,68 50,84 16,68 16,32"
								stroke="#c4c5d6"
								strokeWidth="0.8"
							></polygon>
							<polygon
								fill="none"
								points="50,28 72,39 72,61 50,72 28,61 28,39"
								stroke="#c4c5d6"
								strokeWidth="0.8"
							></polygon>
							<line x1="50" y1="5" x2="50" y2="95" stroke="#d6d8e5" strokeWidth="0.7" />
							<line x1="5" y1="25" x2="95" y2="75" stroke="#d6d8e5" strokeWidth="0.7" />
							<line x1="5" y1="75" x2="95" y2="25" stroke="#d6d8e5" strokeWidth="0.7" />

							<polygon
								fill="rgba(0, 47, 167, 0.2)"
								points="50,10 90,40 60,86 10,72 28,30"
								stroke="#002FA7"
								strokeWidth="1.4"
							></polygon>
							<polygon
								fill="rgba(82, 92, 137, 0.2)"
								points="50,20 74,30 84,64 50,90 18,62"
								stroke="#525c89"
								strokeWidth="1.4"
							></polygon>
						</svg>
						<div className="absolute top-0 left-1/2 -translate-x-1/2 text-base md:text-lg bg-surface px-3 py-1 border border-outline-variant/30 text-on-surface">
							<InlineMath math="N = 10^3" />
						</div>
						<div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-base md:text-lg bg-surface px-3 py-1 border border-outline-variant/30 text-on-surface">
							<InlineMath math="N = 10^6" />
						</div>
						<div className="absolute top-1/2 right-0 -translate-y-1/2 text-base md:text-lg bg-surface px-3 py-1 border border-outline-variant/30 text-on-surface">
							<InlineMath math="N = 10^4" />
						</div>
					</div>
				</div>
				<div className="w-full bg-surface border border-outline-variant/20 p-4 md:p-6">
					<h3 className="font-mono text-sm uppercase tracking-wider text-on-surface mb-4">
						Signal Details
					</h3>
					<div className="space-y-4 font-mono text-xs text-on-surface-variant">
						<div className="border border-outline-variant/20 p-3 bg-surface-container-low text-base md:text-lg">
							<BlockMath math={`\\Delta_{speed}= ${speedDeltaPercent.toFixed(1)}\\%`} />
						</div>
						<div className="border border-outline-variant/20 p-3 bg-surface-container-low text-base md:text-lg">
							<BlockMath math={`S_{${leftName.replaceAll(" ", "")}} < S_{${rightName.replaceAll(" ", "")}}`} />
						</div>
						<div className="text-[11px] leading-relaxed">
							Larger polygon area indicates better overall balance across benchmark dimensions.
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
