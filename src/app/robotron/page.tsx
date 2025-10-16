import React from 'react';
import { AboutSection } from '../../components/robotron';
import ModuleSection from '../../components/robotron/ModuleSection';

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
