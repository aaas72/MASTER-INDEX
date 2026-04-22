import { Sidebar } from "@/components/shared";
import { AlgorithmTable } from "@/components/algorithms";

const categoryDescriptions: Record<string, string> = {
  "graph-theory":
    "A definitive collection of computational structures and traversals. This index maintains the rigorous hierarchy of nodes.",
  "sorting-search":
    "A curated ledger of sorting and search procedures focused on runtime behavior, partitioning logic, and retrieval efficiency.",
  "dynamic-programming":
    "A focused archive of state-transition strategies where overlapping subproblems and memoized decisions dominate complexity.",
  "computational-geometry":
    "A precision-oriented set of geometric procedures for spatial computation, intersection analysis, and planar optimization.",
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
  const categoryTitle = formatCategoryTitle(params.slug);
  const categoryDescription =
    categoryDescriptions[params.slug] ??
    "A categorized subset of the archive with indexed entries, complexity metadata, and implementation references.";

  return (
    <div className="min-h-screen bg-[#f7fafe]">
      <Sidebar />

      {/* Containerized Layout */}
      <main className="pl-64 pt-24 px-12 pb-20">
        <div className="max-w-[1440px] mx-auto">
          {/* Page Header */}
          <header className="mb-16">
            <h1 className="text-7xl font-black tracking-tighter font-sans text-black mb-4 uppercase">
              INDEX_01: {categoryTitle}_
            </h1>
            <div className="h-1 w-24 bg-primary-container"></div>
            <p className="mt-8 max-w-2xl text-lg text-on-surface-variant font-serif italic leading-relaxed">
              {categoryDescription}
            </p>
          </header>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-8 items-start">
            <AlgorithmTable />

            {/* Right Sidebar Stats */}
            <aside className="col-span-12 lg:col-span-4 space-y-8">
              <div className="bg-white border border-outline-variant/10 p-8 shadow-sm">
                <h3 className="font-mono font-bold text-xs tracking-widest uppercase mb-8 border-b-2 border-primary-container pb-2 inline-block">
                  Category Snapshot
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="font-mono text-[10px] text-outline uppercase tracking-wider mb-1">
                        Total Algorithms
                      </p>
                      <p className="font-sans text-3xl font-black text-black">14</p>
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
                          <p className="font-sans text-lg leading-snug font-black text-black break-words max-w-[14rem]">
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
                    </div>
                  </section>

                  <section>
                    <h4 className="font-mono text-[10px] font-bold tracking-[0.22em] text-outline uppercase mb-4">
                      Latest Research Entry
                    </h4>
                    <div className="flex items-start gap-4">
                      <div className="w-1 h-16 bg-primary-container shrink-0 mt-1"></div>
                      <div>
                        <p className="font-sans text-lg leading-snug font-black text-black break-words max-w-[14rem]">
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