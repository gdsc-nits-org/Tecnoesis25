"use client";

import Image from "next/image";
import { ArrowBigLeft } from "lucide-react";
import axios from "axios";
import { env } from "~/env";
import { useEffect, useState, use } from "react";
import CustomButton from "~/components/CustomButton";


export const runtime = "edge";

interface Eventresponse {
  id: string;
  name: string;
  posterImage: string;
  maxTeamSize: number;
  minTeamSize: number;
  prizeDescription: string;
  stagesDescription: string;
  description: string;
  venue: string;
  thirdPartyURL: string;
  registrationStartTime: string;
  registrationEndTime: string;
  registrationFee: number;
  module: {
    id: number;
    name: string;
    description: string;
    iconImage: string;
    coverImage: string;
    thirdPartyURL: string;
  };
}
interface EventParams {
  id: string;
}

const EventPage = ({ params }: { params: Promise<EventParams> }) => {
  const resolvedParams = use(params);
  const [event, setEvent] = useState<Eventresponse>();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get<{ msg: Eventresponse }>(
          `${env.NEXT_PUBLIC_API_URL}/api/event/${resolvedParams.id}`,
        );
        setEvent(data.msg);
      } catch (err) {
        console.log(err);
      }
    };
    void fetchEvents();
  }, [resolvedParams.id]);

  return (
    <div>
      <div
        className="flex min-h-screen w-screen mt-[5rem] flex-col items-center justify-center gap-12 bg-cover bg-center pt-8 md:flex-row lg:gap-20 lg:px-16"
        style={{ backgroundImage: "url('/about/bg.png')" }}
      >
        <div className="hidden max-w-[50%] md:block">
          <h1 className="font-nyxerin text-5xl text-[#c00303]">{event?.module.name}</h1>
          <h1 className="mb-2 font-nyxerin text-2xl text-white">{event?.name}</h1>
          <div className="mb-8 text-justify font-orbitron text-sm text-white lg:text-[1rem] xl:text-lg">
            {event?.description.includes('Registration Fee: Variable') ? (
              (() => {
                const lines = event.description.split(/\r?\n|(?=o\s*₹)/g);
                const noteIndex = lines.findIndex(line => line.includes('Registration Fee: Variable'));
                // Main content before NOTE
                const mainContent = lines.slice(0, noteIndex).join(' ');
                // Find NOTE and Registration Fee line
                const noteLine = lines[noteIndex] ?? '';
                let notePart = '';
                let regFeePart = '';
                if (noteLine.includes('NOTE:')) {
                  const split = noteLine.split('NOTE:');
                  notePart = 'NOTE:';
                  regFeePart = split[1]?.trim() ?? '';
                } else {
                  regFeePart = noteLine;
                }
                // If regFeePart contains 'Registration Fee', split it out
                let regFeeLabel = '';
                let regFeeRest = '';
                if (regFeePart.includes('Registration Fee')) {
                  const feeSplit = regFeePart.split('Registration Fee:');
                  regFeeLabel = 'Registration Fee:';
                  regFeeRest = feeSplit[1]?.trim() ?? '';
                } else {
                  regFeeRest = regFeePart;
                }
                const fees = lines.slice(noteIndex + 1).filter(line => /₹\d+/.test(line));
                return <>
                  <span>{mainContent}</span>
                  {notePart && <><br /><span>{notePart}</span></>}
                  {regFeeLabel && <><br /><span>{regFeeLabel}</span></>}
                  {regFeeRest && <><br /><span>{regFeeRest}</span></>}
                  <ul className="list-disc ml-6 mt-2">
                    {fees.map((fee, idx) => <li key={idx}>{fee.replace(/^o\s*/, '')}</li>)}
                  </ul>
                </>;
              })()
            ) : event?.description}
            <div className="flex flex-col pt-5 pb-5 text-base lg:text-xl font-orbitron text-gray-300">
              <span>
                Registration Start:{" "}
                <span className="text-white">
                  {event?.registrationStartTime ? new Date(event.registrationStartTime).toLocaleString(
                    "en-US",
                    {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "UTC",
                    },
                  ) : "N/A"}{" "}
                </span>
              </span>
              <span>
                Registration End:{" "}
                <span className="text-white">
                  {event?.registrationEndTime ? new Date(event.registrationEndTime).toLocaleString(
                    "en-US",
                    {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "UTC",
                    },
                  ) : "N/A"}{" "}
                </span>
              </span>
            </div>
            <div className="mb-8 text-justify font-orbitron text-sm text-white lg:text-[1rem] xl:text-lg flex flex-col">
              <p>Prizes: {event?.prizeDescription}</p>
              <p>VENUE: {event?.venue}</p>
            </div>
          </div>
          {event && <CustomButton text="Register Now" width={200} href={`/teamRegistration/${event.id}`} />}
        </div>
        <div className="flex h-auto w-[90%] flex-col items-center justify-center pt-16 md:block md:w-[35%] md:flex-row md:pt-0 lg:w-[40%]">
          <div className="mb-4 flex flex-col items-center justify-center md:hidden">
            <h1 className="font-nyxerin text-3xl text-[#c00303]">{event?.module.name}</h1>
            <h1 className="mb-2 font-nyxerin text-xl text-white">{event?.name}</h1>
          </div>
          <div className="relative h-auto w-auto">
            <Image
              className="h-full w-full pl-4 md:pl-0"
              src="/eventsTVFrame.png"
              alt="Frame"
              width={300}
              height={500}
            />
            <div className="absolute left-[15%] md:left-[10%] top-[20%] md:top-[18%] h-[64%] md:h-[68%] w-[68%] md:w-[72%] overflow-hidden">
              {event && (
                <Image
                  src={event.posterImage}
                  alt="Screen"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover shadow-[inset_0_0_60px_rgba(0,0,0,0.6)] transition-transform duration-700
                    [clip-path:polygon(50%_0%,96%_4%,100%_35%,100%_70%,96%_96%,50%_100%,4%_96%,0%_70%,0%_35%,4%_4%)]
                    group-hover:scale-105"
                />
              )}
            </div>
          </div>
          <div className="mt-8 flex max-w-[20rem] flex-col items-center justify-center px-4 md:hidden">
            <div className="leading-justify mb-8 text-justify font-orbitron text-sm text-white lg:text-[1rem] xl:text-xl">
              {event?.description.includes('Registration Fee: Variable') ? (
                (() => {
                  const lines = event.description.split(/\r?\n|(?=o\s*₹)/g);
                  const noteIndex = lines.findIndex(line => line.includes('Registration Fee: Variable'));
                  // Main content before NOTE
                  const mainContent = lines.slice(0, noteIndex).join(' ');
                  // Find NOTE and Registration Fee line
                  const noteLine = lines[noteIndex] ?? '';
                  let notePart = '';
                  let regFeePart = '';
                  if (noteLine.includes('NOTE:')) {
                    const split = noteLine.split('NOTE:');
                    notePart = 'NOTE:';
                    regFeePart = split[1]?.trim() ?? '';
                  } else {
                    regFeePart = noteLine;
                  }
                  // If regFeePart contains 'Registration Fee', split it out
                  let regFeeLabel = '';
                  let regFeeRest = '';
                  if (regFeePart.includes('Registration Fee')) {
                    const feeSplit = regFeePart.split('Registration Fee:');
                    regFeeLabel = 'Registration Fee:';
                    regFeeRest = feeSplit[1]?.trim() ?? '';
                  } else {
                    regFeeRest = regFeePart;
                  }
                  const fees = lines.slice(noteIndex + 1).filter(line => /₹\d+/.test(line));
                  return <>
                    <span>{mainContent}</span>
                    {notePart && <><br /><span>{notePart}</span></>}
                    {regFeeLabel && <><br /><span>{regFeeLabel}</span></>}
                    {regFeeRest && <><br /><span>{regFeeRest}</span></>}
                    <ul className="list-disc ml-6 mt-2">
                      {fees.map((fee, idx) => <li key={idx}>{fee.replace(/^o\s*/, '')}</li>)}
                    </ul>
                  </>;
                })()
              ) : event?.description}
            </div>
            <div className="flex flex-col pt-4 pb-4 text-base lg:text-xl font-orbitron text-gray-300">
              <span>
                Registration Start:{" "}
                <span className="text-white">
                  {event?.registrationStartTime ? new Date(event.registrationStartTime).toLocaleString(
                    "en-US",
                    {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "UTC",
                    },
                  ) : "N/A"}{" "}
                </span>
              </span>
              <span>
                Registration End:{" "}
                <span className="text-white">
                  {event?.registrationEndTime ? new Date(event.registrationEndTime).toLocaleString(
                    "en-US",
                    {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "UTC",
                    },
                  ) : "N/A"}{" "}
                </span>
              </span>
            </div>
            <div className="mb-8 text-justify font-orbitron text-sm text-white lg:text-[1rem] xl:text-lg flex flex-col">
              <p>Prizes: {event?.prizeDescription}</p>
              <p>VENUE: {event?.venue}</p>
            </div>
            {event && <CustomButton text="Register Now" width={200} href={`/teamRegistration/${event.id}`} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
