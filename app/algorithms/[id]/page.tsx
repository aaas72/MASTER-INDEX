import algorithmsData from "@/data/algorithms.json";
import AlgorithmClient from "./AlgorithmClient";

export async function generateStaticParams() {
  return Object.keys(algorithmsData).map((id) => ({
    id: id,
  }));
}

export default function AlgorithmDetailPage({ params }: { params: { id: string } }) {
  return <AlgorithmClient algorithmId={params.id} />;
}