import { Sidebar } from "@/components/shared";
import { AlgorithmTable } from "@/components/algorithms";

type CategoryMetadata = {
  label: string;
  description: string;
  totalAlgorithms: string;
  primaryComplexity: string;
  accentClass: string;
};

const categoryMetadata: Record<string, CategoryMetadata> = {
  "graph-theory":
    {
      label: "Graph Theory",
      description:
        "A definitive collection of computational structures and traversals. This index maintains the rigorous hierarchy of nodes.",
      totalAlgorithms: "14",
      primaryComplexity: "O(V + E)",
      accentClass: "bg-primary-container",
    },
  "sorting-search":
    {
      label: "Sorting & Search",
      description:
        "A curated ledger of sorting and search procedures focused on runtime behavior, partitioning logic, and retrieval efficiency.",
      totalAlgorithms: "22",
      primaryComplexity: "O(N log N)",
      accentClass: "bg-primary",
    },
  "dynamic-programming":
    {
      label: "Dynamic Programming",
      description:
        "A focused archive of state-transition strategies where overlapping subproblems and memoized decisions dominate complexity.",
      totalAlgorithms: "31",
      primaryComplexity: "O(N^2)",
      accentClass: "bg-secondary",
    },
  "computational-geometry":
    {
      label: "Computational Geometry",
      description:
        "A precision-oriented set of geometric procedures for spatial computation, intersection analysis, and planar optimization.",
      totalAlgorithms: "8",
      primaryComplexity: "O(N log N)",
      accentClass: "bg-tertiary-container",
    },
};

const formatCategoryTitle = (slug: string) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function CategoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const metadata =
    categoryMetadata[params.slug] ??
    {
      label: formatCategoryTitle(params.slug),
      description:
        "A categorized subset of the archive with indexed entries, complexity metadata, and implementation references.",
      totalAlgorithms: "--",
      primaryComplexity: "--",
      accentClass: "bg-primary-container",
    };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />

      {/* Containerized Layout */}
      <main className="px-12 pb-20 pl-64 pt-24">
        <div className="mx-auto max-w-[1440px]">
          {/* Page Header */}
          <header className="mb-16">
            <h1 className="page-title mb-4 uppercase">
              INDEX_01: {metadata.label}_
            </h1>
            <div className={`h-1 w-24 ${metadata.accentClass}`}></div>
            <p className="body-copy mt-8 max-w-2xl italic">
              {metadata.description}
            </p>
          </header>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-8 items-start">
            <AlgorithmTable categorySlug={params.slug} />

            {/* Right Sidebar Stats */}
            <aside className="col-span-12 lg:col-span-4 space-y-8">
              <div className="bg-surface-container-lowest border border-outline-variant/10 p-8 shadow-sm">
                <h3 className="font-mono font-bold text-xs tracking-widest uppercase mb-8 border-b-2 border-primary-container pb-2 inline-block">
                  Category Snapshot
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                        <p className="font-mono text-[10px] text-outline uppercase tracking-wider mb-1">
                        Total Algorithms
                      </p>
                      <p className="font-sans text-3xl font-black text-on-surface">
                        {metadata.totalAlgorithms}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-10 space-y-10">
                  <section>
                    <h4 className="font-mono text-[10px] font-bold tracking-[0.22em] text-outline uppercase mb-4">
                      Most Accessed
                    </h4>
                    <div className="bg-surface-container p-6 border border-outline-variant/15">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-sans text-lg leading-snug font-black text-on-surface break-words max-w-[14rem]">
                            A* Pathfinding
                          </p>
                          <p className="mt-4 font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-on-surface-variant">
                            Queries: 12.4k
                          </p>
                        </div>
                        <span className="material-symbols-outlined text-primary-container text-xl">
                          call_made
                        </span>
                      </div>
                      <div className="mt-6 border-t border-outline-variant/15 pt-4 font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
                        Primary Complexity: {metadata.primaryComplexity}
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="font-mono text-[10px] font-bold tracking-[0.22em] text-outline uppercase mb-4">
                      Latest Research Entry
                    </h4>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-16 bg-primary-container shrink-0 mt-1"></div>
                      <div>
                          <p className="font-sans text-lg leading-snug font-black text-on-surface break-words max-w-[14rem]">
                          Hopcroft-Karp Bipartite
                        </p>
                        <p className="mt-4 font-mono text-[10px] font-bold tracking-[0.18em] uppercase text-on-surface-variant">
                          Added by: admin_r3
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
                <button className="w-full mt-10 border-2 border-primary-container text-primary-container py-3 font-mono text-[11px] font-bold hover:bg-primary-container hover:text-white transition-all">
                  GENERATE REPORT [PDF]
                </button>
              </div>
            </aside>
          </div>

          {/* Footer Component */}
          <footer className="mt-24 pt-12 border-t border-outline-variant/30 grid grid-cols-4 gap-8">
            <div className="col-span-2 text-[10px] font-mono text-outline uppercase">
              © 2026 ALGO.ARCHIVE FOUNDATION.
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}