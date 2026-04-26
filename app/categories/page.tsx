import { Sidebar } from "@/components/shared";
import Link from "next/link";
import algorithmsData from "@/data/algorithms.json";

export default function CategoriesPage() {
  const algorithms = Object.values(algorithmsData);
  const categoriesMap = algorithms.reduce((acc, algo) => {
    if (!acc[algo.category]) {
      acc[algo.category] = { count: 0, algorithms: [] };
    }
    acc[algo.category].count++;
    acc[algo.category].algorithms.push(algo);
    return acc;
  }, {} as Record<string, { count: number; algorithms: typeof algorithms }>);

  const categories = Object.entries(categoriesMap).map(([name, data], index) => {
    const slug = name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
    return { name, slug, count: data.count, index: index + 1 };
  });

  return (
    <div className="font-body text-on-surface antialiased selection:bg-primary-container selection:text-white flex min-h-screen bg-surface">
      <Sidebar />
      {/* Main Content Canvas */}
      <main className="ml-60 w-full flex flex-col">
        {/* TopAppBar */}
        <header className="fixed top-0 right-0 w-[calc(100%-15rem)] z-40 flex justify-between items-center px-8 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b-0 transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-6">
            <span className="text-lg font-black tracking-widest text-black dark:text-white uppercase font-sans">
              TAXONOMIC CLASSIFICATION
            </span>
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex gap-6">
              <a
                className="font-mono text-sm tracking-wider text-[#002FA7] border-b-2 border-[#002FA7] hover:opacity-80 transition-opacity pb-1"
                href="#"
              >
                Browse by Paradigm_
              </a>
            </nav>
            <div className="flex items-center gap-4 border-l border-outline-variant/20 pl-6">
              <button className="text-primary hover:opacity-80 transition-opacity">
                <span className="material-symbols-outlined">sort</span>
              </button>
              <button className="text-primary hover:opacity-80 transition-opacity">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
              <button className="text-primary hover:opacity-80 transition-opacity">
                <span className="material-symbols-outlined">settings_ethernet</span>
              </button>
              <div className="w-8 h-8 bg-surface-container-high rounded-none ml-4 overflow-hidden border border-outline-variant/20">
                <img
                  alt="User Profile"
                  className="w-full h-full object-cover"
                  data-alt="black and white portrait of man in sharp focus professional lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2PaJI1NIzEpJ4WX0Lg93Old-eXmNj6dzafjsiZIrYnt76Kj6PILg7DLD8E2EOW_Ep5cbJCuWgZfYblIwlrlhwJiqkeZNTz6PMIZg6iGuctUFjNrQD3T25nO9i1I1WpxPUYLUQUsAtoLGhRmeC1opa1iXq9FXhrSe6_KSWN2MbdxitxnRnPBMOS7Pr5paKg0QhjfL05JkLUOQDDvjRpL3ToHbKjHi4LaMMqzwdVFb9ekVQ2LhUaBgyPLk1mPH2NB5fZvObwlDJHg"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="pt-20 px-12 pb-24 w-full max-w-7xl mx-auto flex-1 flex flex-col gap-10">
          {/* Hero Section */}
          <section className="flex flex-col gap-6 w-full mt-2">
            <div className="flex justify-between items-end w-full border-b border-outline-variant/20 pb-8">
              <div className="flex flex-col gap-2 max-w-3xl">
                <span className="page-kicker">
                  TAXONOMIC CLASSIFICATION
                </span>
                <h1 className="page-title uppercase">
                  Browse by Paradigm_
                </h1>
              </div>
              {/* Controls */}
              <div className="flex items-center gap-4 mb-2">
                <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
                  Sort By:
                </span>
                <div className="flex bg-surface-container-low border border-outline-variant/20 p-1">
                  <button className="px-4 py-1.5 bg-surface-container-lowest text-primary font-mono text-xs tracking-wider border border-outline-variant/20">
                    Alpha
                  </button>
                  <button className="px-4 py-1.5 text-on-surface-variant font-mono text-xs tracking-wider hover:bg-surface-container-lowest/50 transition-colors">
                    Pop
                  </button>
                  <button className="px-4 py-1.5 text-on-surface-variant font-mono text-xs tracking-wider hover:bg-surface-container-lowest/50 transition-colors">
                    Cmplx
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                className="group flex flex-col h-80 bg-surface-container-lowest border border-outline-variant/20 hover:bg-primary-container transition-colors duration-300 relative overflow-hidden"
                href={`/categories/${cat.slug}`}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary group-hover:bg-white transition-colors duration-300"></div>
                <div className="flex justify-between p-4 border-b border-outline-variant/20 group-hover:border-white/20 transition-colors duration-300">
                  <span className="font-mono text-xs text-on-surface-variant group-hover:text-white/70">
                    CAT_0{cat.index}
                  </span>
                  <span className="material-symbols-outlined text-primary group-hover:text-white text-sm">
                    arrow_outward
                  </span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
                  <div className="w-16 h-16 border-2 border-primary group-hover:border-white flex items-center justify-center transition-colors duration-300">
                    <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-colors duration-300">
                      category
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-xl text-center text-black group-hover:text-white uppercase tracking-tight">
                    {cat.name}
                  </h3>
                </div>
                <div className="p-4 bg-surface-container-low group-hover:bg-primary/50 transition-colors duration-300 flex flex-col gap-1 border-t border-outline-variant/20 group-hover:border-white/20">
                  <span className="font-mono text-[10px] text-on-surface-variant group-hover:text-white/70 uppercase tracking-widest">
                    [Count: {cat.count.toString().padStart(2, '0')} Algorithms]
                  </span>
                  <span className="font-mono text-[10px] text-primary group-hover:text-white/90 uppercase tracking-widest">
                    [System Indexed]
                  </span>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}