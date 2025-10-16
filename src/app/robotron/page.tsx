import React from 'react';
import { AboutSection } from '../../components/robotron';
import { Hero } from '../../components/robotron';

export default function RobotronPage() {
  return (
    <div className="relative bg-black text-white">
      <main className="relative">
        {/* Hero Section with scroll container */}
        <Hero />
        
        {/* About Section - appears after scrolling through Hero */}
        <div className="relative z-50 bg-black">
          <AboutSection />
        </div>
      </main>
    </div>
  );
}
