"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { TeamCard } from "./TeamCard";
import { TeamCard2 } from "./TeamCard2";
import TeamHeading from "./TeamHeading";
import teamDataJson from "./teamData.json";

// Dynamically import Slider to avoid SSR issues
const Slider = dynamic(() => import("react-slick"), { ssr: false });

// Import slick carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

// Load team data statically for better performance
const teamDataStatic = teamDataJson as unknown as TeamData;

// Carousel settings for mobile - Leadership section
const leadershipCarouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "0px",
  arrows: false,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 2500,
};

export const TeamsSection = React.memo(() => {
  // Use static data instead of async loading
  const teamData = useMemo(() => teamDataStatic, []);

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
  const renderTeamSection = (
    title: string,
    teamKey: keyof TeamData,
    useTeamCard2 = true,
    teamHeads?: string,
    extraMarginTop?: string,
  ) => {
    const members = teamData[teamKey];

    // Ensure members is an array
    if (!Array.isArray(members)) {
      return null;
    }

    const CardComponent = useTeamCard2 ? TeamCard2 : TeamCard;

    return (
      <div className="mb-20">
        <h3
          className={`mb-8 text-center font-orbitron text-2xl font-semibold sm:text-3xl ${extraMarginTop ?? ""}`}
        >
          {title}
        </h3>

        {/* Desktop */}
        <div
          className={`hidden justify-items-center gap-12 sm:grid ${
            members.length === 2
              ? "mx-auto max-w-4xl grid-cols-2"
              : "mx-auto max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {members.map((member: TeamMember, i: number) => (
            <div key={i} className="flex items-center justify-center">
              <CardComponent
                name={member.name}
                role={member.role}
                image={member.image}
              />
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="overflow-hidden sm:hidden">
          <div className="flex w-full justify-center">
            <div className="mx-auto w-full max-w-[350px]">
              <Slider {...(useTeamCard2 ? teamCardSettings : teamCardSettings)}>
                {members.map((member: TeamMember, i: number) => (
                  <div key={i} className="px-2">
                    <div className="flex items-center justify-center">
                      <div
                        className={`mx-auto origin-center ${useTeamCard2 ? "scale-[0.85]" : "scale-90"}`}
                      >
                        <CardComponent
                          name={member.name}
                          role={member.role}
                          image={member.image}
                        />
                      </div>
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

  return (
    <section
      className="robotron-teams-section relative w-full bg-black py-12 text-white sm:py-20"
      style={{
        backgroundImage: "url(/robotron/team/teamsbackg.min.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="mb-16">
          <TeamHeading>Team</TeamHeading>
        </div>

        {/* Leadership Section - Hierarchical Layout */}
        <div className="mb-40">
          <h3 className="mb-12 text-center font-orbitron text-xl font-semibold sm:text-2xl">
            Robotron Module Heads
          </h3>

          {/* Desktop - Hierarchical Layout */}
          <div className="mx-auto hidden max-w-[1500px] sm:block">
            {/* Chief Coordinator - Top Row (Centered) */}
            {teamData.leadership[0] && (
              <div className="mb-12 flex justify-center">
                <TeamCard
                  name={teamData.leadership[0].name}
                  role={teamData.leadership[0].role}
                  image={teamData.leadership[0].image}
                />
              </div>
            )}

            {/* Two Convenors - Middle Row */}
            <div className="mx-auto mb-12 grid max-w-4xl grid-cols-2 justify-items-center gap-12">
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
          <div className="mb-2 overflow-hidden sm:hidden">
            <div className="flex w-full justify-center">
              <div className="mx-auto w-full max-w-[350px]">
                <Slider {...leadershipCarouselSettings}>
                  {teamData.leadership.map((leader, index) => (
                    <div key={index} className="px-2">
                      <div className="flex items-center justify-center">
                        <div className="mx-auto origin-center scale-90">
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
          </div>
        </div>

        {/* ============ Marketing Heads ============ */}
        {renderTeamSection(
          "Marketing Heads",
          "marketing",
          false,
          undefined,
          "mt-20",
        )}

        {/* ============ 2. Robowar ============ */}
        {renderTeamSection("Robowar Heads", "robowar", true)}

        {/* ============ 3. Robosoccer ============ */}
        {renderTeamSection("Robosoccer Heads", "robosoccer", true)}

        {/* ============ 4. Robodrift ============ */}
        {renderTeamSection("Robodrift Heads", "robodrift", true)}

        {/* ============ 5. Algomaze ============ */}
        {renderTeamSection("Algomaze Heads", "algomaze", true)}
      </div>
    </section>
  );
});

TeamsSection.displayName = "TeamsSection";

export default TeamsSection;
