'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { TeamCard } from './TeamCard';
import { TeamCard2 } from './TeamCard2';
import TeamHeading from './TeamHeading';

// Dynamically import Slider to avoid SSR issues
const Slider = dynamic(() => import('react-slick'), { ssr: false });

// Import slick carousel CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description?: string;
  socialLinks?: SocialLinks;
}

interface TeamData {
  marketing: TeamMember[];
  robowar: TeamMember[];
  robosoccer: TeamMember[];
  robodrift: TeamMember[];
  algomaze: TeamMember[];
  leadership: TeamMember[];
  teamHeads?: {
    marketing?: string;
    robowar?: string;
    robosoccer?: string;
    robodrift?: string;
    algomaze?: string;
  };
}

// Default empty data to prevent undefined errors
const defaultTeamData: TeamData = {
  marketing: [],
  robowar: [],
  robosoccer: [],
  robodrift: [],
  algomaze: [],
  leadership: [],
  teamHeads: {}
};

// Carousel settings for mobile
const mobileCarouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '20px',
  arrows: false,
  adaptiveHeight: true
};

export const TeamsSection = () => {
  const [teamData, setTeamData] = useState<TeamData>(defaultTeamData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load data on client side only
    const loadData = async () => {
      try {
        const data = await import('./teamData.json');
        const rawData = data.default as unknown as TeamData;

        setTeamData(rawData);
      } catch (err) {
        console.error('Failed to load team data:', err);
        setError('Failed to load team data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadData();
  }, []);

  // Shared slider settings
  const teamCardSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Reusable function for team sections
  const renderTeamSection = (title: string, teamKey: keyof TeamData, useTeamCard2 = true, teamHeads?: string, extraMarginTop?: string) => {
    const members = teamData[teamKey];

    // Ensure members is an array
    if (!Array.isArray(members)) {
      return null;
    }

    const CardComponent = useTeamCard2 ? TeamCard2 : TeamCard;

    return (
      <div className="mb-20">
        <h3 className={`text-2xl sm:text-3xl font-semibold text-center mb-8 font-orbitron ${extraMarginTop ?? ''}`}>
          {title}
        </h3>

        {/* Desktop */}
        <div className={`hidden sm:grid gap-56 justify-items-center ${
          members.length === 2 
            ? 'grid-cols-2 max-w-2xl mx-auto' 
            : 'grid-cols-2 lg:grid-cols-3'
        }`}>
          {members.map((member: TeamMember, i: number) => (
            <CardComponent
              key={i}
              name={member.name}
              role={member.role}
              image={member.image}
            />
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="sm:hidden overflow-hidden">
          <div className="w-full flex justify-center">
            <div className="w-[85vw] max-w-[320px]">
              <Slider {...(useTeamCard2 ? teamCardSettings : teamCardSettings)}>
                {members.map((member: TeamMember, i: number) => (
                  <div key={i} className="!flex justify-center py-6">
                    <div className={`scale-[0.85] origin-center w-[260px] h-auto ${useTeamCard2 ? '' : 'scale-[0.65]'}`}>
                      <CardComponent
                        name={member.name}
                        role={member.role}
                        image={member.image}
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <section 
        className="w-full bg-black text-white py-12 sm:py-20 relative"
        style={{
          backgroundImage: 'url(/robotron/team/teamsbackg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse text-center">
              <div className="h-8 bg-gray-700 rounded w-64 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-48 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        className="w-full bg-black text-white py-12 sm:py-20 relative"
        style={{
          backgroundImage: 'url(/robotron/team/teamsbackg.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-400 font-orbitron">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="w-full bg-black text-white py-12 sm:py-20 relative"
      style={{
        backgroundImage: 'url(/robotron/team/teamsbackg.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="mb-16">
          <TeamHeading>Team</TeamHeading>
        </div>

        {/* Leadership Section - Hierarchical Layout */}
        <div className="mb-40">
          <h3 className="text-xl sm:text-2xl font-semibold text-center mb-12 font-orbitron">
            Robotron Module Heads
          </h3>

          {/* Desktop - Hierarchical Layout */}
          <div className="hidden sm:block max-w-[1500px] mx-auto">
            {/* Chief Coordinator - Top Row (Centered) */}
            {teamData.leadership[0] && (
              <div className="flex justify-center mb-8">
                <TeamCard
                  name={teamData.leadership[0].name}
                  role={teamData.leadership[0].role}
                  image={teamData.leadership[0].image}
                />
              </div>
            )}

            {/* Two Convenors - Middle Row */}
            <div className="grid grid-cols-2 gap-56 justify-items-center max-w-[800px] mx-auto mb-8">
              {teamData.leadership[1] && (
                <div className="flex justify-center">
                  <TeamCard
                    name={teamData.leadership[1].name}
                    role={teamData.leadership[1].role}
                    image={teamData.leadership[1].image}
                  />
                </div>
              )}
              {teamData.leadership[2] && (
                <div className="flex justify-center">
                  <TeamCard
                    name={teamData.leadership[2].name}
                    role={teamData.leadership[2].role}
                    image={teamData.leadership[2].image}
                  />
                </div>
              )}
            </div>

            {/* Module Lead - Bottom Row (Centered) */}
            {teamData.leadership[3] && (
              <div className="flex justify-center">
                <TeamCard
                  name={teamData.leadership[3].name}
                  role={teamData.leadership[3].role}
                  image={teamData.leadership[3].image}
                />
              </div>
            )}
          </div>

          {/* Mobile - Carousel */}
          <div className="sm:hidden mb-2 px-4 overflow-hidden">
            <Slider {...mobileCarouselSettings}>
              {teamData.leadership.map((leader, index) => (
                <div key={index} className="px-2">
                  <div className="flex justify-center">
                    <div className="scale-90 origin-center">
                      <TeamCard
                        name={leader.name}
                        role={leader.role}
                        image={leader.image}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* ============ Marketing Heads ============ */}
        {renderTeamSection('Marketing Heads', 'marketing', false, undefined, 'mt-20')}

        {/* ============ 2. Robowar ============ */}
        {renderTeamSection('Robowar Heads', 'robowar', true)}

        {/* ============ 3. Robosoccer ============ */}
        {renderTeamSection('Robosoccer Heads', 'robosoccer', true)}

        {/* ============ 4. Robodrift ============ */}
        {renderTeamSection('Robodrift Heads', 'robodrift', true)}

        {/* ============ 5. Algomaze ============ */}
        {renderTeamSection('Algomaze Heads', 'algomaze', true)}
      </div>
    </section>
  );
};

export default TeamsSection;
