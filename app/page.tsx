import { Hero, VersusHub } from "@/components/home";
import { MasterIndex } from "@/components/algorithms";
import { Footer, Sidebar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Sidebar />
      <div className="ml-60">
        <Hero />
        <MasterIndex />
        <VersusHub />
        <Footer />
      </div>
    </>
  );
}
