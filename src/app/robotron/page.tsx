import { AboutSection, ModuleSection, TeamsSection,Hero } from '../../components/robotron';
import { RobotronHero } from '../../components/RobotronHero';

export default function RobotronPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pb-12">
        <Hero/>
        <AboutSection />
        <RobotronHero />
        <ModuleSection />
        <TeamsSection />
      </main>
    </div>
  );
}
