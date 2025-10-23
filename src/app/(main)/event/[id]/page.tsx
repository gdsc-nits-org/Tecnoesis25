"use client";

import Image from "next/image";
import { ArrowBigLeft } from "lucide-react";
import axios from "axios";
import { env } from "~/env";
import { useEffect, useState } from "react";
import Link from "next/link";
import CustomButton from "~/components/CustomButton";
import EventCard from "~/components/EventCard";

interface Eventresponse {
  id: string;
  name: string;
  posterImage: string;
  maxTeamSize: number;
  minTeamSize: number;
  attendanceIncentive: number;
  registrationIncentive: number;
  prizeDescription: string;
  stagesDescription: string;
  description: string;
  venue: string;
  lat: number;
  lng: number;
  thirdPartyURL: string;
  registrationStartTime: string;
  registrationEndTime: string;
  extraQuestions: string[];
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
  id: "string";
}

const EventPage = ({ params }: { params: EventParams }) => {
  const [event, setEvent] = useState<Eventresponse>();
  //   useEffect(() => {
  //     const fetchEvents = async () => {
  //       try {
  //         const { data } = await axios.get<{ msg: Eventresponse }>(
  //           `${env.NEXT_PUBLIC_API_URL}/api/event/${params.id}`,
  //         );
  //         setEvent(data.msg);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     void fetchEvents();
  //   }, [params]);

  return (
    <div>
      <div
        className="flex min-h-screen w-screen flex-col items-center justify-center gap-12 bg-cover bg-center pt-8 md:flex-row lg:gap-20 lg:px-16"
        style={{ backgroundImage: "url('/about/bg.png')" }}
      >
        <div className="hidden max-w-[50%] md:block">
          <h1 className="font-nyxerin text-5xl text-[#c00303]">Robowars</h1>
          <h1 className="mb-2 font-nyxerin text-2xl text-white">Robotron</h1>
          <p className="mb-8 text-justify font-bankGothik text-sm text-white lg:text-[1rem] xl:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            unde id cupiditate voluptatum. Debitis nostrum omnis commodi soluta,
            sit ipsam maxime optio non, exercitationem pariatur necessitatibus
            eum modi nesciunt eveniet. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Molestias odit tempore minima corporis reiciendis
            animi consequatur doloribus dignissimos, sit voluptas blanditiis hic
            obcaecati, repellat distinctio? Quaerat totam dolor doloremque
            culpa.
          </p>
          <CustomButton text="Register Now" width={200} />
        </div>
        <div className="flex h-auto w-[90%] flex-col items-center justify-center pt-16 md:block md:w-[35%] md:flex-row md:pt-0 lg:w-[40%]">
          <div className="mb-4 flex flex-col items-center justify-center md:hidden">
            <h1 className="font-nyxerin text-3xl text-[#c00303]">Robowars</h1>
            <h1 className="mb-2 font-nyxerin text-xl text-white">Robotron</h1>
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
              <Image
                src="/eventCardDemoPhoto.png"
                alt="Screen"
                width={1200}
                height={900}
                className="
            /* optional visual
            enhancements */
            h-full

            w-full object-cover shadow-[inset_0_0_60px_rgba(0,0,0,0.6)] transition-transform duration-700
            [clip-path:polygon(50%_0%,96%_4%,100%_35%,100%_70%,96%_96%,50%_100%,4%_96%,0%_70%,0%_35%,4%_4%)]
            group-hover:scale-105
          "
              />
            </div>
          </div>
          <div className="mt-8 flex max-w-[20rem] flex-col items-center justify-center px-4 md:hidden">
            <p className="leading-justify mb-8 text-justify font-bankGothik text-sm text-white lg:text-[1rem] xl:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
              unde id cupiditate voluptatum. Debitis nostrum omnis commodi
              soluta, sit ipsam maxime optio non, exercitationem pariatur
              necessitatibus eum modi nesciunt eveniet. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Molestias odit tempore minima
              corporis reiciendis animi consequatur doloribus dignissimos, sit
              voluptas blanditiis hic obcaecati, repellat distinctio? Quaerat
              totam dolor doloremque culpa.
            </p>
            <CustomButton text="Register Now" width={200} />
          </div>
        </div>
      </div>
      <div
        className="mt-8 flex w-full flex-col items-center justify-center bg-cover bg-center md:mt-0"
        style={{ backgroundImage: "url('/about/bg.png')" }}
      >
        <h1 className="text-center font-nyxerin text-4xl text-[#c00303] sm:text-5xl">
          MORE MODULES
        </h1>
        <div className="flex flex-col flex-wrap items-center justify-evenly md:flex-row">
          <EventCard
            eventPoster="/eventCardDemoPhoto.png"
            eventName="Event 1"
          />
          <EventCard
            eventPoster="/eventCardDemoPhoto.png"
            eventName="Event 2"
          />
          <EventCard
            eventPoster="/eventCardDemoPhoto.png"
            eventName="Event 3"
          />
          <EventCard
            eventPoster="/eventCardDemoPhoto.png"
            eventName="Event 4"
          />
          <EventCard
            eventPoster="/eventCardDemoPhoto.png"
            eventName="Event 5"
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
