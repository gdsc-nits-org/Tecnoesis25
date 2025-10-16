import { AboutSection, ModuleSection } from '../../components/robotron';

export default function RobotronPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pb-12">
        <AboutSection />
        <ModuleSection />
      </main>
    </div>
  );
}
