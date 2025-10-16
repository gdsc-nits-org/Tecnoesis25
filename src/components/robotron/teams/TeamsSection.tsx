import React from 'react';
import { TeamCard } from './TeamCard';
import { TeamCard2 } from './TeamCard2';

// Define TypeScript interface for team data
interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

interface TeamData {
  teamMembers: TeamMember[];
}

// Import JSON data
const teamData: TeamData = require('./teamData.json');

export const TeamsSection = () => {
  return (
    <section id="teams" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Our talented team of developers, designers, and innovators working together
            to create amazing experiences.
          </p>
        </div>

        {/* Display Both Cards - One Below the Other */}
        <div className="flex flex-col items-center space-y-8">
          {/* TeamCard (Original Design) */}
          <div className="max-w-sm">
            <TeamCard
              name={teamData.teamMembers[0].name}
              role={teamData.teamMembers[0].role}
              image={teamData.teamMembers[0].image}
              description={teamData.teamMembers[0].description}
              socialLinks={teamData.teamMembers[0].socialLinks}
            />
          </div>

          {/* TeamCard2 (Updated Design) */}
          <div className="max-w-sm">
            <TeamCard2
              name={teamData.teamMembers[1]?.name || "TEAM MEMBER"}
              role="Updated Card Design"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamsSection;
