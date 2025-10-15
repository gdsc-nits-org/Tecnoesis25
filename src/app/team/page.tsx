"use client";
import { useState } from "react";
import TeamCard2 from "~/components/team/TeamCard2";
const Team = () => {
    const [selectedTeam, setSelectedTeam] = useState<string | null>("Tech Team");
    const handleTeamClick = (team: string) => {
        setSelectedTeam(team);
    }
    console.log(`Navigating to ${selectedTeam} page...`);
    return (
        <div className="absolute top-0 left-0 w-screen text-[#ffffff] bg-[#000000] bg-red-grid bg-[length:100%_100%,100%_100%,50px_50px,50px_50px,50px_50px]
        bg-[position:0_0,0_0,25px_25px,0_0,0_0]
        clip-angled animate-glowMove min-h-screen flex items-center justify-center flex-col font-nyxerin text-xl z-[10]">
            <h1 className="text-2xl mobile:text-3xl tablet:text-4xl laptop:text-5xl fourK:text-7xl font-bold">Team Page</h1>
            <div className="relative top-0 left-0 flex flex-row items-center justify-center gap-2 md:gap-4 flex-nowrap">
                <div
                    style={{
                        display: 'inline-block',
                        position: 'relative',
                        padding: '5px',
                        borderRadius: '10px',
                        background: 'radial-gradient(70% 50% at 50% 50%, rgba(139,117,217,0.32) 0%, rgba(139,117,217,0.14) 25%, rgba(0,0,0,0) 60%)',
                        overflow: 'visible'
                    }}
                >
                    <button
                        style={{
                            clipPath: "polygon(0% 70%, 10% 0%, 92% 0%, 100% 30%, 90% 100%, 8% 100%)",
                            backgroundColor: '#cfcdffff',
                            overflow: 'visible'
                        }}
                        onClick={() => { handleTeamClick("Tech Team") }}
                        className="relative inline-block text-slate-900 font-extrabold tracking-widest text-[10px] mobile:text-xs tablet:text-sm laptop:text-base xL:text-lg fourK:text-xl py-1 px-2 mobile:py-1 mobile:px-2 tablet:py-1.5 tablet:px-4 laptop:py-2 laptop:px-6 border border-slate-800 shadow-lg shadow-violet-500/14 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:shadow-violet-400/16 active:scale-100"
                    >
                        <span
                            style={{
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                minWidth: '90%',
                                width: '90%',
                                minHeight: '80%',
                                height: '80%',
                                boxShadow: 'inset 0 1px 4px rgba(255,255,255,0.45), 0 4px 12px rgba(139,117,217,0.14)',
                                background: 'linear-gradient(160deg, rgba(207,205,255,0.95) 0%, rgba(109,24,228,0.9) 100%)',
                                clipPath: 'polygon(0% 70%, 10% 0%, 92% 0%, 100% 30%, 90% 100%, 8% 100%)',
                                filter: 'blur(4px) saturate(1.03)',
                                transform: 'translateZ(0)',
                                opacity: 0.85,
                                pointerEvents: 'none',
                                zIndex: 0
                            }}
                        ></span>

                        <span className="relative">
                            TECH TEAM
                        </span>
                    </button>
                </div>

                <div
                    style={{
                        display: 'inline-block',
                        position: 'relative',
                        padding: '5px',
                        borderRadius: '10px',
                        background: 'radial-gradient(70% 50% at 50% 50%, rgba(139,117,217,0.32) 0%, rgba(139,117,217,0.14) 25%, rgba(0,0,0,0) 60%)',
                        overflow: 'visible'
                    }}
                >
                    <button
                        style={{
                            clipPath: "polygon(0% 70%, 10% 0%, 92% 0%, 100% 30%, 90% 100%, 8% 100%)",
                            backgroundColor: '#cfcdffff',
                            overflow: 'visible'
                        }}
                        className="relative inline-block text-slate-900 font-extrabold tracking-widest text-[10px] mobile:text-xs tablet:text-sm laptop:text-base xL:text-lg fourK:text-xl py-1 px-2 mobile:py-1 mobile:px-2 tablet:py-1.5 tablet:px-4 laptop:py-2 laptop:px-6 border border-slate-800 shadow-lg shadow-violet-500/14 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:shadow-violet-400/16 active:scale-100"
                        onClick={() => { handleTeamClick("Other Teams") }}
                    >
                        <span
                            style={{
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                                minWidth: '90%',
                                width: '90%',
                                minHeight: '80%',
                                height: '80%',
                                boxShadow: 'inset 0 1px 4px rgba(255,255,255,0.45), 0 4px 12px rgba(139,117,217,0.14)',
                                background: 'linear-gradient(160deg, rgba(207,205,255,0.95) 0%, rgba(109,24,228,0.9) 100%)',
                                clipPath: 'polygon(0% 70%, 10% 0%, 92% 0%, 100% 30%, 90% 100%, 8% 100%)',
                                filter: 'blur(4px) saturate(1.03)',
                                transform: 'translateZ(0)',
                                opacity: 0.85,
                                pointerEvents: 'none',
                                zIndex: 0
                            }}
                        ></span>

                        <span className="relative">
                            OTHER TEAMS
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap text-[#ffffff]">
                <TeamCard2 />
            </div>
        </div>
    );
}

export default Team;