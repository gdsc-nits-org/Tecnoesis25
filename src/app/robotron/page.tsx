import { AboutSection, ModuleSection, TeamsSection } from '../../components/robotron';

export default function RobotronPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pb-12">
        <AboutSection />
        <ModuleSection />
        <TeamsSection />
      </main>
    </div>
  );
}
