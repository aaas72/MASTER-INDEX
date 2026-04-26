import { Sidebar } from "@/components/shared";
import { MasterIndex } from "@/components/algorithms";

export default function AlgorithmsPage() {
  return (
    <>
      <Sidebar />
      <div className="ml-60 p-0">
        <div className="p-12 pb-0">
          <h1 className="page-title-sm mb-4 uppercase">Algorithms</h1>
          <p className="body-copy mb-8 max-w-3xl">Display the complete master list in a technical ledger or comprehensive archive format for rapid search.</p>
        </div>
        <MasterIndex />
      </div>
    </>
  );
}