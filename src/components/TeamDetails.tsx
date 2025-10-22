"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import RegisterState2 from "../../public/RegisterState2.svg";
import TeamBorder1 from "../../public/teamBorder1.png";
import TeamBorder2 from "../../public/teamBorder2.png";
import TeamLogo1 from "../../public/teamLogo1.png";
import TeamLogo2 from "../../public/teamLogo2.png";
import Avatar from '../../public/Avatar.png';
import CongratulationBorder from '../../public/congratulationBorder.png';
import CrossSign from '../../public/CrossSign.svg';

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
    const [isRegistered, setIsRegistered] = useState(false);
    const handleRegister = () => {
        setIsRegistered(true);
    };
    useEffect(() => {
    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === "Enter" && isRegistered) {
            setIsRegistered(false);
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
        window.removeEventListener("keydown", handleKeyDown);
    };
}, [isRegistered]);

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-grid-pattern">
            {isRegistered && (
                <div className="absolute inset-0 bg-black bg-opacity-50 z-20" />
            )}

            {isRegistered && (
                <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[58rem] h-[36rem]">
                    <div className="relative w-full h-full">
                        <Image
                            src={CongratulationBorder}
                            alt="Congratulation Border"
                            layout="fill"
                            objectFit="contain"
                            className="absolute inset-0"
                        />

                        <button
                            onClick={() => setIsRegistered(false)}
                            className="absolute top-3 right-0 z-40"
                        >
                            <Image
                                src={CrossSign}
                                alt="Close"
                                width={32}
                                height={32}
                            />
                        </button>

                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white space-y-2">
                            <h1 className="text-4xl font-bankGothik font-bold">
                                Congratulations!
                            </h1>
                            <p className="text-2xl font-bankGothik font-semibold">
                                You have successfully registered for the event.
                            </p>
                            <p className="text-2xl font-bankGothik text-[#F40004] font-semibold">
                                Event name.
                            </p>
                        </div>
                    </div>
                </div>
            )}


            {/* Register Button Top Right */}
            {!isRegistered && (
                <button
                    className="absolute top-6 right-6 z-50"
                    onClick={handleRegister}
                >
                    <Image src={RegisterState2} alt="Register" width={250} height={80} />
                </button>
            )}

            <div className={`relative z-10 flex flex-col justify-center items-center h-full text-white space-y-6 transition-all duration-300 ${isRegistered ? 'blur-sm' : ''}`}>
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
                                <Image
                                    src={member.isLeader ? TeamLogo2 : TeamLogo1}
                                    alt="Border"
                                    layout="fill"
                                    objectFit="contain"
                                />

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
