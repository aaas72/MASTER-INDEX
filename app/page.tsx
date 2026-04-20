import Hero from "@/components/Hero";
import MasterIndex from "@/components/MasterIndex";
import VersusHub from "@/components/VersusHub";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <>
      <Sidebar />
      <div className="ml-64">
        <Hero />
        <MasterIndex />
        <VersusHub />
        <Footer />
      </div>
    </>
  );
}
