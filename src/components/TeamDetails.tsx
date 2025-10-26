"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const TeamDetails: React.FC = () => {
  const [isPhone, setIsPhone] = useState(false);
  const [isIpad, setIsIpad] = useState(false);
  const [isLap, setIsLap] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      setIsPhone(width >= 320 && width <= 758);
      setIsIpad(width >= 759 && width <= 1024);
      setIsLap(width >= 1025);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) return null;

  
  const team = {
    name: "CRUSHERS",
    members: [
      { name: "Candice Wu", tag: "candice", leader: true },
      { name: "David Lee", tag: "david" },
      { name: "John Doe", tag: "john" },
      { name: "Amy Lin", tag: "amy" },
    ],
  };

  
  const CongratsPopup: React.FC<{
    eventName: string;
    members?: { name: string; tag: string; image?: string }[];
    onClose?: () => void;
  }> = ({ eventName, members = [], onClose }) => {
    const [isPhonePopup, setIsPhonePopup] = useState(false);
    const [isIpadPopup, setIsIpadPopup] = useState(false);
    const [isLapPopup, setIsLapPopup] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        if (typeof window === "undefined") return;
        const width = window.innerWidth;
        setIsPhonePopup(width >= 320 && width <= 758);
        setIsIpadPopup(width >= 759 && width <= 1300);
        setIsLapPopup(width >= 1301);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <>
        {/* LAPTOP VIEW */}
        {isLapPopup && (
          <div className="fixed inset-0 bg-black/95 saturate-20 flex items-center justify-center z-[99]">
            <div className="absolute top-[25vh] h-[50vh] w-[50vw] bg-black aspect-[16/9] flex flex-col items-center justify-between overflow-hidden">
              {/* Borders */}
              <div className="absolute top-0 left-0 w-full">
                <Image
                  src="/TeamDetails/bordertop.svg"
                  alt="Border Top"
                  width={900}
                  height={100}
                  className="object-contain w-full h-[5vh]"
                />
                <Image
                  src="/TeamDetails/missingborder1.svg"
                  alt="Border Addon"
                  width={900}
                  height={100}
                  className="object-contain w-[4vw] h-[6vh] absolute left-[16.2vw] bottom-0"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full">
                <Image
                  src="/TeamDetails/borderbottom.svg"
                  alt="Border Bottom"
                  width={900}
                  height={100}
                  className="object-contain w-full h-[5vh]"
                />
                <Image
                  src="/TeamDetails/missingborder2.svg"
                  alt="Border Addon"
                  width={900}
                  height={100}
                  className="object-contain w-[4vw] h-[6vh] absolute -bottom-[1vh] left-[30vw]"
                />
              </div>

              {/* Content */}
              <div className="relative top-[25vh] z-10 flex flex-col items-center text-center text-white px-[2vw] py-[2vh]">
                <Image
                  src="/TeamDetails/congratulations.svg"
                  alt="Congratulations"
                  width={400}
                  height={100}
                  className="mb-[2vh] w-[27vw] h-[4vh]"
                />
                <Image
                  src="/TeamDetails/message.svg"
                  alt="Message"
                  width={500}
                  height={50}
                  className="mb-[1vh] w-[28vw] h-[4vh]"
                />
                <span className="text-[1vw] font-bankGothik tracking-wider uppercase">
                  <span className="text-[1.4vw]">E</span>VENT{" "}
                  <span className="text-[1.4vw]">N</span>AME
                </span>
              </div>

              {onClose && (
                <button
                  onClick={onClose}
                  className="absolute top-2 right-12 text-2xl text-transparent"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* PHONE VIEW */}
        {isPhonePopup && (
          <div className="fixed inset-0 bg-transparent/80 flex items-center justify-center z-[99]">
            <div className="absolute top-[25vh] h-[40vh] w-[90vw] bg-transparent/40 opacity-100 flex flex-col items-center justify-between overflow-hidden">
              <div className="absolute top-0 left-0 w-full">
                <Image
                  src="/TeamDetails/bordertop.svg"
                  alt="Border Top"
                  width={700}
                  height={70}
                  className="object-contain w-full h-[4vh]"
                />
                <Image
                  src="/TeamDetails/missingborder1.svg"
                  alt="Border Addon"
                  width={900}
                  height={100}
                  className="object-contain w-[10vw] h-[6vh] absolute left-[25.3vw] -top-[1.2vh]"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full">
                <Image
                  src="/TeamDetails/borderbottom.svg"
                  alt="Border Bottom"
                  width={700}
                  height={70}
                  className="object-contain w-full h-[4vh]"
                />
                <Image
                  src="/TeamDetails/missingborder2.svg"
                  alt="Border Addon"
                  width={900}
                  height={100}
                  className="object-contain w-[10vw] h-[6vh] absolute left-[55vw] -bottom-[1.2vh]"
                />
              </div>

              {/* Content */}
              <div className="absolute top-[21vh] z-10 flex flex-col gap-[4vh] items-center text-center text-white">
                <Image
                  src="/TeamDetails/congratulations.svg"
                  alt="Congratulations"
                  width={250}
                  height={70}
                  className="w-[70vw] h-[6vh]"
                />
                <Image
                  src="/TeamDetails/messagemobile.svg"
                  alt="Message"
                  width={300}
                  height={40}
                  className="absolute top-[2vh] mb-[1vh] w-[55vw] h-[12vh]"
                />
                <span className="text-[5vw] font-bankGothik tracking-wider uppercase">
                  <span className="text-[6vw]">E</span>VENT{" "}
                  <span className="text-[6vw]">N</span>AME
                </span>
              </div>

              {onClose && (
                <button
                  onClick={onClose}
                  className="absolute top-2 right-0 text-3xl text-transparent"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* IPAD VIEW */}
        {isIpadPopup && (
          <div className="fixed inset-0 bg-transparent/80 flex items-center justify-center z-[99]">
            <div className="absolute top-[25vh] h-[55vh] w-[85vw] bg-transparent/40 opacity-100 flex flex-col items-center justify-between overflow-hidden">
              <div className="absolute top-0 left-0 w-full">
                <Image
                  src="/TeamDetails/bordertop.svg"
                  alt="Border Top"
                  width={700}
                  height={70}
                  className="object-contain w-full h-[4vh]"
                />
                <Image
                  src="/TeamDetails/missingborder1.svg"
                  alt="Border Addon"
                  width={900}
                  height={100}
                  className="object-contain w-[9vw] h-[6vh] absolute left-[24.4vw] -top-[1.3vh]"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full">
                <Image
                  src="/TeamDetails/borderbottom.svg"
                  alt="Border Bottom"
                  width={700}
                  height={70}
                  className="object-contain w-full h-[4vh]"
                />
                <Image
                  src="/TeamDetails/missingborder2.svg"
                  alt="Border Addon"
                  width={900}
                  height={100}
                  className="object-contain w-[9vw] h-[6vh] absolute left-[52vw] -bottom-[1.4vh]"
                />
              </div>

              <div className="absolute top-[34vh] z-10 flex flex-col gap-[4vh] items-center text-center text-white">
                <Image
                  src="/TeamDetails/congratulations.svg"
                  alt="Congratulations"
                  width={250}
                  height={70}
                  className="w-[60vw] h-[6vh]"
                />
                <Image
                  src="/TeamDetails/messagemobile.svg"
                  alt="Message"
                  width={300}
                  height={40}
                  className="absolute top-[2vh] mb-[1vh] w-[45vw] h-[12vh]"
                />
                <span className="text-[4vw] font-bankGothik tracking-wider uppercase">
                  <span className="text-[5vw]">E</span>VENT{" "}
                  <span className="text-[5vw]">N</span>AME
                </span>
              </div>

              {onClose && (
                <button
                  onClick={onClose}
                  className="absolute top-2 -right-4 text-7xl text-transparent"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {/* ================= LAPTOP VIEW ================= */}
      {isLap && (
        <section className="absolute w-full min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden ">
           {/* ================= Full Background ================= */}
     <div
      className="absolute inset-0 bg-[url('/TeamDetails/bg2.png')] bg-repeat bg-top z-30 overflow-hidden brightness-150"
      style={{
        backgroundSize: '95vw 140vh',
        backgroundPosition: '0 0',
        imageRendering: 'pixelated',
        opacity: 1,
      }}
    >
      {/* Shadow Overlay */}
      <div
        className="absolute inset-0 bg-[url('/TeamDetails/bg4.png')] bg-no-repeat bg-center  z-60"
        style={{
          backgroundSize: 'cover',
          opacity: 1,
          mixBlendMode: 'multiply',
          filter: 'brightness(0.6) contrast(0.9)',
        }}
      ></div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-70"
        style={{
          background: `radial-gradient(circle at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 90%)`,
          mixBlendMode: 'multiply',
        }}
      ></div>

      {/* Extra top & bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none z-80"
        style={{
          background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 30%),
                      linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 30%),
                      linear-gradient(to right, rgba(0,0,0,0.2) 0%, transparent 30%),
                      linear-gradient(to left, rgba(0,0,0,0.3) 0%, transparent 70%)`,
          mixBlendMode: 'multiply',
        }}
      ></div>
    </div>

    {/* ================= Middle Background ================= */}
    <div className="absolute top-[30%] left-[10vw] w-[75vw] h-[70%] overflow-hidden rounded-xl z-25">
      <Image
        src="/TeamDetails/bg1.png"
        alt="Middle decoration"
        fill
        className="object-cover opacity-100 brightness-125"
      />
    </div>

    {/* ================= Fullscreen Foreground (bg3) ================= */}
    <div className="absolute inset-0 w-full h-[150vh] -top-[30vh] left-[28vw] right-[5vw] overflow-hidden z-20">
      <Image
        src="/TeamDetails/bg3.png"
        alt="Foreground decoration"
        fill
        className="object-cover opacity-100 brightness-125"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0) 70%, rgba(0,0,0,0.4) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>

    {/* ================= Header ================= */}
    <div className="absolute top-[3vh] left-0 w-full h-[12vh] flex justify-between items-center px-[3vw] z-50">
      <Image
        src="/teamDetails/header1.svg"
        alt="Tecnoesis"
        width={200}
        height={80}
        className="object-contain w-[18vw]"
      />
      <Image
        src="/teamDetails/header2.svg"
        alt="Register Button"
        width={200}
        height={50}
        className="object-contain w-[18vw]"
      />
    </div>

    {/* ================= Title ================= */}
    <div className="absolute top-[16vh] text-center z-50 flex flex-col items-center gap-[0.3vh]">
      {/* TEAM DETAILS Heading */}
      <div className="relative w-[40vw] h-[10vh] md:h-[2.5vw]">
        <Image
          src="/teamDetails/header3.svg"
          alt="TEAM DETAILS"
          fill
          className="object-contain"
        />
      </div>

      {/* Team Name */}
      <div className="flex items-center">
        <div className="flex items-end text-[8vw] md:text-[2.2vw] font-bankGothik uppercase font-large tracking-[0.07em]">
          <span className="text-[8vw] md:text-[3vw] relative top-[0.8vh]">T</span>eam&nbsp;
          <span className="text-[8vw] md:text-[3vw] relative top-[0.8vh]">N</span>ame :&nbsp;
        </div>
        <div className="text-[#FF3B2E] text-[8vw] md:text-[3vw] font-bankGothik font-large relative top-[1.1vh] tracking-[0.1em] uppercase">
          {team.name}
        </div>
      </div>
    </div>

    {/* ================= Members List Container ================= */}
    <div className="relative top-[9vh] mt-[3vh] w-full max-w-[28vw] h-auto z-50 py-[3vh] px-[1vw] brightness-125">
      <div className="absolute h-[50vh] w-[28vw] -left-[1vw] overflow-hidden border border-black rounded-2xl bg-black/90">
        <Image
          src="/teamDetails/blackbox.svg"
          alt="Full Background"
          fill
          priority
          className="object-cover object-center opacity-90"
        />
        <div
          className="absolute inset-0 mix-blend-screen pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, rgba(30,0,0,0.1) 0%, rgba(30,0,0,0.2) 60%, rgba(10,0,0,0.8) 70%, transparent 100%)`,
          }}
        ></div>
      </div>

      {/* Members List */}
      <div className="relative w-full h-[50vh] flex flex-col justify-between gap-[1.5vh] p-[1.5vh] pt-[3vh] pr-[3vh] z-10">
        {team.members.map((member, i) => (
          <div key={i} className="relative flex items-center gap-[2vw] flex-1 min-h-0">
            {/* Avatar */}
            <Image
              src={member.leader ? "/teamDetails/icon1.svg" : "/teamDetails/icon2.svg"}
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full object-cover h-[3.5vw] w-[5vw]"
            />

            {/* Name Box */}
            <div className="relative w-[30vw] aspect-[6/1.5] flex items-center justify-between text-white">
              <img
                src={member.leader ? "/teamDetails/boxBorder1.svg" : "/teamDetails/boxBorder2.svg"}
                alt="Frame"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              />
              <div className="flex items-center w-full pl-[2.5vw] pr-[1.5vw] py-[2vh]">
                <div className="flex-1 min-w-0">
                  <p className="text-[0.7vw] font-bankGothik font-large uppercase leading-none truncate">
                    {member.name}
                  </p>

                </div>
                {member.leader && (
                  <div className="flex-shrink-0 ml-4">
                    <Image
                      src="/teamDetails/leader.svg"
                      alt="Leader Badge"
                      width={50}
                      height={50}
                      className="w-[3vw] h-auto"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ================= Buttons ================= */}
    <div className="absolute top-[80vh] flex gap-[13vw] mt-[7vh] z-50">
      <Image
        src="/teamDetails/proceed.svg"
        alt="Register"
        width={50}
        height={50}
        className="w-[15vw] h-auto brightness-125"
        onClick={() => setShowPopup(true)}
      />
      <Image
        src="/teamDetails/edit.svg"
        alt="Edit Details"
        width={50}
        height={50}
        className="w-[15vw] h-auto brightness-125"
      />
    </div>
    </section>

      )}

      {/* ================= IPAD VIEW ================= */}
      {isIpad && (
        <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-start overflow-hidden px-[5vw] py-[10vh] ">
         {/* ================= Full Background ================= */}
     <div
      className="absolute inset-0 bg-[url('/TeamDetails/gridmobile.svg')] brightness-50 bg-cover bg-center"
      style={{
        backgroundSize: '180vw 140vh',
        imageRendering: 'pixelated',
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
    </div>

    {/* ================= Title ================= */}
    <div className="absolute top-[4vh] text-center z-20 flex flex-col items-center gap-[0.2vh] brightness-75">
      {/* TEAM DETAILS Heading */}
      <div className="relative w-[65vw] h-[15vh]">
        <Image
          src="/teamDetails/header3.svg"
          alt="TEAM DETAILS"
          fill
          className="object-contain"
        />
      </div>

      {/* Team Name */}
      <div className="absolute top-[10vh] flex items-center">
        <div className="flex items-baseline font-bankGothik uppercase font-semibold leading-none">
          <span className="text-[6vw] align-baseline leading-[1]">T</span>
          <span className="relative text-[5vw] top-[0.1vh]">eam&nbsp;</span>
          <span className="text-[6vw] align-baseline leading-[1]">N</span>
          <span className="relative text-[5vw] top-[0.1vh] whitespace-nowrap">ame : &nbsp;</span>
        </div>
        <div className="text-[#FF3B2E] text-[7vw] font-bankGothik font-semibold relative top-[0.2vh] uppercase">
          {team.name}
        </div>
      </div>
    </div>

    {/* ================= Black Box ================= */}
    <div className="absolute top-[20vh] flex flex-col gap-[2vh] mt-[5vh] w-[90vw] z-10 border border-black rounded-2xl">
      {/* Background Image with Red Tint */}
      <div className="absolute -left-[3vw] w-[95vw] h-[60vh] inset-0 z-30 overflow-hidden bg-black border border-black rounded-2xl">
        <div className="w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="/teamDetails/blackbox.svg"
            alt="Full Background"
            fill
            priority
            className="object-cover object-center opacity-100"
          />
        </div>
      </div>

      {/* Members List */}
      <div className="relative flex flex-col gap-[3vh] p-[1vh] pt-[5vh] z-30">
        {team.members.map((member, i) => (
          <div key={i} className="relative flex items-center gap-[8vw] brightness-125">

            {/* Avatar */}
            <Image
              src={member.leader ? "/teamDetails/icon1.svg" : "/teamDetails/icon2.svg"}
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full object-cover h-[12.5vw] w-[12vw]"
            />

            {/* Name Box */}
            <div
              className="relative w-[65vw] h-[10vh] flex items-center justify-between text-white bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${member.leader
                  ? '/teamDetails/boxBorder1.svg'
                  : '/teamDetails/boxBorder2.svg'})`,
                backgroundSize: '100% 100%',
              }}
            >
              <div className="absolute z-10 flex gap-[28vw] items-center w-full pr-[2vw] pl-[8vw]">
                <div>
                  <p className="text-[2vw] font-bankGothik font-large uppercase leading-none whitespace-nowrap">
                    {member.name}
                  </p>
                  <p className="text-[1.5vw] text-[#38bdf8] font-bankGothik uppercase mt-[0.3vh] whitespace-nowrap">
                    <span  className="font-sans text-[2vw]">@</span>
                    {member.tag}
                  </p>
                </div>

                {member.leader && (
                  <Image
                    src="/teamDetails/leader.svg"
                    alt="Leader Badge"
                    width={50}
                    height={50}
                    className="w-[8vw] h-auto"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ================= Buttons ================= */}
    <div className="absolute top-[85vh] flex z-50">
      <Image
        src="/teamDetails/proceed.svg"
        alt="Register"
        width={50}
        height={50}
        className="w-[45vw] h-auto brightness-125"
        onClick={() => setShowPopup(true)}
      />
      <Image
        src="/teamDetails/edit.svg"
        alt="Edit Details"
        width={50}
        height={50}
        className="w-[45vw] h-auto brightness-125"
      />
    </div>
  </section>
)}


  
{/* ================= PHONE VIEW ================= */}
{isPhone && (
  <section className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-start overflow-hidden px-[5vw] py-[10vh] ">

    {/* ================= Full Background ================= */}
    <div
      className="absolute inset-0 bg-[url('/TeamDetails/gridmobile.svg')] brightness-50"
      style={{
        backgroundSize: '105vw h-full',
        backgroundPosition: '0 0',
        imageRendering: 'pixelated',
        opacity: 1,
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
    </div>

    {/* ================= Title ================= */}
    <div className="absolute top-[4vh] text-center z-20 flex flex-col items-center gap-[0.2vh] brightness-75">
      {/* TEAM DETAILS Heading */}
      <div className="relative w-[65vw] h-[15vh]">
        <Image
          src="/teamDetails/header3.svg"
          alt="TEAM DETAILS"
          fill
          className="object-contain"
        />
      </div>

      {/* Team Name */}
      <div className="absolute top-[10vh] flex items-center">
        <div className="flex items-baseline font-bankGothik uppercase font-large leading-none">
          <span className="text-[6vw] align-baseline leading-[1]">T</span>
          <span className="relative text-[5vw] top-[0.1vh]">eam&nbsp;</span>
          <span className="text-[6vw] align-baseline leading-[1]">N</span>
          <span className="relative text-[5vw] top-[0.1vh] whitespace-nowrap">ame : &nbsp;</span>
        </div>
        <div className="text-[#FF3B2E] text-[7vw] font-bankGothik font-medium relative top-[0.2vh] uppercase">
          {team.name}
        </div>
      </div>
    </div>

    {/* ================= Black Box ================= */}
    <div className="absolute top-[18vh] flex flex-col gap-[2vh] mt-[5vh] w-[90vw] z-10 border border-black rounded-2xl">
      {/* Background Image with Red Tint */}
      <div className="absolute -left-[3vw] w-[95vw] h-[50vh] inset-0 z-30 overflow-hidden bg-black border border-black rounded-2xl">
        <div className="w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="/teamDetails/blackbox.svg"
            alt="Full Background"
            fill
            priority
            className="object-cover object-center opacity-100"
          />
        </div>
      </div>

      {/* Members List */}
      <div className="relative flex flex-col gap-[2vh] p-[2vh] pt-[5vh] z-30">
        {team.members.map((member, i) => (
          <div key={i} className="relative flex items-center gap-[8vw]">

            {/* Avatar */}
            <Image
              src={member.leader ? "/teamDetails/icon1.svg" : "/teamDetails/icon2.svg"}
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full object-cover h-[12.5vw] w-[12vw]"
            />

            {/* Name Box */}
            <div
              className="relative w-full h-[8vh] flex items-center justify-between text-white bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${member.leader
                  ? '/teamDetails/boxBorder1.svg'
                  : '/teamDetails/boxBorder2.svg'})`,
                backgroundSize: '100% 100%',
              }}
            >
              <div className="absolute z-10 flex gap-[25vw] items-center w-full pr-[2vw] pl-[8vw]">
                <div>
                  <p className="text-[2vw] font-bankGothik font-large uppercase leading-none whitespace-nowrap">
                    {member.name}
                  </p>
                  <p className="text-[2vw] text-[#00A9FF] font-bankGothik uppercase mt-[0.3vh] truncate">
                    <span  className="font-sans text-[2vw]">@</span>{member.tag}
                  </p>
                </div>

                {member.leader && (
                  <Image
                    src="/teamDetails/leader.svg"
                    alt="Leader Badge"
                    width={50}
                    height={50}
                    className="w-[8vw] h-auto"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ================= Buttons ================= */}
    <div className="absolute top-[75vh] flex flex-col -space-y-[2.8vh] z-50">
      <Image
        src="/teamDetails/proceed.svg"
        alt="Register"
        width={50}
        height={50}
        className="w-[50vw] h-auto brightness-125"
        onClick={() => setShowPopup(true)}
      />
      <Image
        src="/teamDetails/edit.svg"
        alt="Edit Details"
        width={50}
        height={50}
        className="w-[50vw] h-auto brightness-125"
      />
    </div>
        </section>
      )}
      {/* ================= POPUP ================= */}
      {showPopup && (
        <CongratsPopup
          eventName="Robo Wars"
          members={[
            { name: "Candice Wu", tag: "@candice", image: "/TeamDetails/member1.png" },
            { name: "John Doe", tag: "@john", image: "/TeamDetails/member2.png" },
          ]}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default TeamDetails;



