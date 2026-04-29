import { Hero, VersusHub } from "@/components/home";
import { MasterIndex } from "@/components/algorithms";
import { SidebarLayout } from "@/components/shared";

export default function Home() {
  return (
    <SidebarLayout>
      <Hero />
      <MasterIndex />
      <VersusHub />
    </SidebarLayout>
  );
}
