import React from "react";
import Image from "next/image";
import RegisterState2 from "../../public/RegisterState2.svg";
import TeamBorder1 from "../../public/teamBorder1.png";
import TeamBorder2 from "../../public/teamBorder2.png";
import TeamLogo1 from "../../public/teamLogo1.png";
import TeamLogo2 from "../../public/teamLogo2.png";
import Avatar from '../../public/Avatar.png'

const teamMembers = [
    {
        name: "Candice Wu",
        username: "@candice",
        isLeader: true,
    },
    {
        name: "Candice Wu",
        username: "@candice",
        isLeader: false,
    },
    {
        name: "Candice Wu",
        username: "@candice",
        isLeader: false,
    },
    {
        name: "Candice Wu",
        username: "@candice",
        isLeader: false,
    },
];

const TeamDetails = () => {
    return (
        <div className="relative h-screen w-screen overflow-hidden bg-grid-pattern">
            <div className="absolute inset-0 z-0 fade-mask" />

            {/* Register Button Top Right */}
            <button className="absolute top-6 right-6 z-50">
                <Image src={RegisterState2} alt="Register" width={250} height={80} />
            </button>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white space-y-6">
                <h1 className="text-6xl font-bankGothik uppercase tracking-widest font-bold">
                    TEAM DETAILS
                </h1>
                <h2 className="text-4xl font-bankGothik font-bold">
                    Team Name : <span className="text-red-600">CRUSHERS</span>
                </h2>

                {/* Team Members Card */}
                <div className="bg-black bg-opacity-30 p-6 rounded-md space-y-4">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-4 relative"
                        >
                            <div className="relative w-14 h-14">
                                {/* Logo Border (outer ring) */}
                                <Image
                                    src={member.isLeader ? TeamLogo2 : TeamLogo1}
                                    alt="Border"
                                    layout="fill"
                                    objectFit="contain"
                                />

                                {/* Avatar inside the border */}
                                <div className="absolute inset-0 rounded-full overflow-hidden">
                                    <Image
                                        src={Avatar}
                                        alt="Avatar"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-full"
                                    />
                                </div>
                            </div>

                            {/* Member Details with border frame */}
                            <div className="relative w-72 h-20">
                                <Image
                                    src={member.isLeader ? TeamBorder2 : TeamBorder1}
                                    alt="Border"
                                    layout="fill"
                                    objectFit="contain"
                                />
                                <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
                                    <p className="text-lg font-bankGothik font-semibold">{member.name}</p>
                                    <p className="text-sm font-bankGothik text-blue-400">{member.username}</p>
                                </div>
                                {member.isLeader && (
                                    <span className="absolute top-7 right-6 text-red-500 font-bankGothik font-bold text-sm">
                                        LEADER
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamDetails;
