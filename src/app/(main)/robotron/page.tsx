import {
  AboutSection,
  ModuleSection,
  TeamsSection,
  Hero,
  Footer,
} from "../../../components/robotron";

export default function RobotronPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <main className="pb-0">
        <Hero />
        <AboutSection />
        <ModuleSection />
        <TeamsSection />
        <Footer />
      </main>
    </div>
  );
}
