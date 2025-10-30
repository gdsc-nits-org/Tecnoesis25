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
        className="flex min-h-screen w-screen flex-col items-center justify-center gap-12 bg-cover bg-center pt-8 md:flex-row lg:gap-20 lg:px-16"
        style={{ backgroundImage: "url('/about/bg.png')" }}
      >
        <div className="hidden max-w-[50%] md:block">
          <h1 className="font-nyxerin text-5xl text-[#c00303]">{event?.module.name}</h1>
          <h1 className="mb-2 font-nyxerin text-2xl text-white">{event?.name}</h1>
          <p className="mb-8 text-justify font-bankGothik text-sm text-white lg:text-[1rem] xl:text-lg">
            {event?.description}
          </p>
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
            <p className="leading-justify mb-8 text-justify font-bankGothik text-sm text-white lg:text-[1rem] xl:text-xl">
              {event?.description}
            </p>
            <p className="leading-justify mb-8 text-justify font-bankGothik text-sm text-white lg:text-[1rem] xl:text-lg">Registration fee: {event?.registrationFee}</p>
            {event && <CustomButton text="Register Now" width={200} href={`/teamRegistration/${event.id}`} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
