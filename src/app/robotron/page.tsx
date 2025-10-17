import { AboutSection, ModuleSection, TeamsSection,Hero, Footer } from '../../components/robotron';


export default function RobotronPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <main className="pb-12">
        <Hero/>
        <AboutSection />
        <ModuleSection />
        <TeamsSection />
        <Footer/>
      </main>
    </div>
  );
}
