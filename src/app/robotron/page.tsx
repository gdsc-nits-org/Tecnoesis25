import Navbar from '~/components/Navbar/Navbar';
import { AboutSection, ModuleSection, TeamsSection,Hero, Footer } from '../../components/robotron';


export default function RobotronPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <main className="pb-0">
        <Navbar/>
        <Hero/>
        <AboutSection />
        <ModuleSection />
        <TeamsSection />
        <Footer/>
      </main>
    </div>
  );
}
