"use client";
import { useState } from "react";
import TeamCard1 from "~/components/Team/TeamCard1";
import TeamCard2 from "~/components/Team/TeamCard2";
import Teamdata from "../../../../data/tech.json";

interface TeamMember {
  name: string;
  photoUrl: string;
  designation: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

const Team = () => {
  const TechLead = Teamdata.techLead as TeamMember[];
  const Head = Teamdata.heads as TeamMember[];
  const CoreTeam = Teamdata.members as TeamMember[];
  const [selectedTeam, setSelectedTeam] = useState<string | null>("Tech Team");
  const handleTeamClick = (team: string) => {
    setSelectedTeam(team);
  };
  console.log(`Navigating to ${selectedTeam} page...`);
  return (
    <div
      className="clip-angled flex min-h-screen w-screen animate-glowMove
        flex-col items-center
        justify-center bg-[#000000] bg-red-grid bg-[length:100%_100%,100%_100%,50px_50px,50px_50px,50px_50px] bg-fixed bg-[position:0_0,0_0,25px_25px,0_0,0_0] pt-28 font-nyxerin text-xl text-[#ffffff] md:pt-32"
    >
      <h1 className="mb-6 text-2xl font-bold mobile:text-3xl tablet:text-4xl laptop:text-7xl fourK:text-7xl">
        Team Page
      </h1>
      <div className="relative left-0 top-0 flex flex-row flex-nowrap items-center justify-center gap-2 md:gap-4">
        <div
          style={{
            display: "inline-block",
            position: "relative",
            padding: "5px",
            borderRadius: "10px",
            background:
              "radial-gradient(70% 50% at 50% 50%, rgba(139,117,217,0.32) 0%, rgba(139,117,217,0.14) 25%, rgba(0,0,0,0) 60%)",
            overflow: "visible",
          }}
        >
          <button
            style={{
              clipPath:
                "polygon(0% 70%, 10% 0%, 92% 0%, 100% 30%, 90% 100%, 8% 100%)",
              backgroundColor: "#cfcdffff",
              overflow: "visible",
            }}
            onClick={() => {
              handleTeamClick("Tech Team");
            }}
            className="shadow-violet-500/14 hover:shadow-violet-400/16 relative inline-block border border-slate-800 px-2 py-1 text-[10px] font-extrabold tracking-widest text-slate-900 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md active:scale-100 mobile:px-2 mobile:py-1 mobile:text-xs tablet:px-4 tablet:py-1.5 tablet:text-sm laptop:px-6 laptop:py-2 laptop:text-base xL:text-lg fourK:text-xl"
          >
            <span
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                minWidth: "90%",
                width: "90%",
                minHeight: "80%",
                height: "80%",
                boxShadow:
                  "inset 0 1px 4px rgba(255,255,255,0.45), 0 4px 12px rgba(139,117,217,0.14)",
                background:
                  "linear-gradient(160deg, rgba(207,205,255,0.95) 0%, rgba(109,24,228,0.9) 100%)",
                clipPath:
                  "polygon(0% 70%, 10% 0%, 92% 0%, 100% 30%, 90% 100%, 8% 100%)",
                filter: "blur(4px) saturate(1.03)",
                transform: "translateZ(0)",
                opacity: 0.85,
                pointerEvents: "none",
                zIndex: 0,
              }}
            ></span>

            <span className="relative">TECH TEAM</span>
          </button>
        </div>

        <div
          style={{
            display: "inline-block",
            position: "relative",
            padding: "5px",
            borderRadius: "10px",
            background:
              "radial-gradient(70% 50% at 50% 50%, rgba(139,117,217,0.32) 0%, rgba(139,117,217,0.14) 25%, rgba(0,0,0,0) 60%)",
            overflow: "visible",
          }}
        >
          <button
            style={{
              clipPath:
                "polygon(0% 70%, 10% 0%, 92% 0%, 100% 30%, 90% 100%, 8% 100%)",
              backgroundColor: "#cfcdffff",
              overflow: "visible",
            }}
            className="shadow-violet-500/14 hover:shadow-violet-400/16 relative inline-block border border-slate-800 px-2 py-1 text-[10px] font-extrabold tracking-widest text-slate-900 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md active:scale-100 mobile:px-2 mobile:py-1 mobile:text-xs tablet:px-4 tablet:py-1.5 tablet:text-sm laptop:px-6 laptop:py-2 laptop:text-base xL:text-lg fourK:text-xl"
            onClick={() => {
              handleTeamClick("Other Teams");
            }}
          >
            <span
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                minWidth: "90%",
                width: "90%",
                minHeight: "80%",
                height: "80%",
                boxShadow:
                  "inset 0 1px 4px rgba(255,255,255,0.45), 0 4px 12px rgba(139,117,217,0.14)",
                background:
                  "linear-gradient(160deg, rgba(207,205,255,0.95) 0%, rgba(109,24,228,0.9) 100%)",
                clipPath:
                  "polygon(0% 70%, 10% 0%, 92% 0%, 100% 30%, 90% 100%, 8% 100%)",
                filter: "blur(4px) saturate(1.03)",
                transform: "translateZ(0)",
                opacity: 0.85,
                pointerEvents: "none",
                zIndex: 0,
              }}
            ></span>

            <span className="relative">CORE TEAM</span>
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-5 px-2 py-4 mobile:px-4 mobile:py-6 tablet:py-8">
        {selectedTeam === "Tech Team" && TechLead[0] && (
          <div className="flex flex-col gap-40">
            {/* Tech Lead Section */}
            <div className="flex flex-col gap-16">
              <div className="flex justify-center">
                <TeamCard2
                  photoUrl={TechLead[0].photoUrl}
                  name={TechLead[0].name}
                  designation={TechLead[0].designation}
                  insta={TechLead[0].instagram}
                  facebook={TechLead[0].facebook}
                  linkedin={TechLead[0].linkedin}
                />
              </div>
              {/* Heads Section */}
              <div className="flex flex-wrap items-center justify-center gap-4 tablet:gap-8 lg:gap-16">
                {Head.map((head, index) => (
                  <TeamCard2
                    key={index}
                    photoUrl={head.photoUrl}
                    name={head.name}
                    designation={head.designation}
                    insta={head.instagram}
                    facebook={head.facebook}
                    linkedin={head.linkedin}
                  />
                ))}
              </div>
            </div>

            {/* Core Team Section */}
            <div className="flex flex-col gap-8">
              <p className="text-center font-nyxerin text-3xl">JUNIOR TEAM</p>
              <div className="flex flex-row flex-wrap justify-center gap-2 mobile:gap-4 tablet:gap-6 laptop:gap-8 xL:gap-10">
                {CoreTeam.map((member, index) => (
                  <TeamCard1
                    key={index}
                    photoUrl={member.photoUrl}
                    name={member.name}
                    designation={member.designation}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTeam === "Other Teams" && (
          <div className="flex flex-col gap-6">
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-2xl text-gray-400">
                Other Teams Coming Soon...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
