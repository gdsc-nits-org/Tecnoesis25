import { AboutSection, ModuleSection, TeamsSection,Hero } from '../../components/robotron';
import { TechnoesisHero } from '../../components/TechnoesisHero';

export default function RobotronPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pb-12">
        <Hero/>
        <AboutSection />
        <TechnoesisHero />
        <ModuleSection />
        <TeamsSection />
      </main>
    </div>
  );
}
