import algorithmsData from "@/data/algorithms.json";
import CategoryClient from "./CategoryClient";

// We need this metadata for generating static params
const categorySlugs = [
  "pathfinding-networks",
  "searching",
  "sorting",
  "trees-hierarchies",
  "dynamic-programming",
  "sorting-search",
  "graph-theory"
];

export async function generateStaticParams() {
  const categories = new Set(categorySlugs);
  Object.values(algorithmsData).forEach((algo: any) => {
    const slug = algo.metadata.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, "-");
    categories.add(slug);
  });
  
  return Array.from(categories).map((slug) => ({
    slug: slug,
  }));
}

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  return <CategoryClient slug={params.slug} />;
}
