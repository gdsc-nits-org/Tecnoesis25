"use client";

import { useEffect, useState } from "react";
import EventCard from "~/components/EventCard";
import axios from "axios";
import { env } from "~/env";

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
  registrationStartTime: string;
  registrationEndTime: string;
  extraQuestions: string[];
  thirdPartyURL: string;
}
interface EventDesc {
  id: number;
  name: string;
  description: string;
  iconImage: string;
  coverImage: string;
  thirdPartyUrl: string;
}

interface EventParams {
  id: string;
}

function AllEventsPage({ params }: { params: EventParams }) {
  const [events, setEvents] = useState<Eventresponse[]>([]);
  const [moduleName, setModuleName] = useState<string>("ROBOTRON");

  //    useEffect(() => {
  //     const fetchEvent = async () => {
  //       try {
  //         const { data } = await axios.get<{ msg: Eventresponse[] }>(
  //           `${env.NEXT_PUBLIC_API_URL}/api/module/${params.id}/event`,
  //         );
  //         setEvents(data.msg);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     };
  //     void fetchEvent();
  //   }, [params]);

  //   useEffect(() => {
  //     const fetchEventDec = async () => {
  //       try {
  //         const { data } = await axios.get<{ msg: EventDesc }>(
  //           `${env.NEXT_PUBLIC_API_URL}/api/module/${params.id}`,
  //         );
  //         setModuleName(data.msg.name);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     };
  //     void fetchEventDec();
  //   }, [params]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 lg:px-20 pt-24 sm:pt-32">
      <h1 className="text-[#c00303] font-nyxerin text-4xl sm:text-5xl">{moduleName}</h1>
      <div className="flex flex-col flex-wrap items-center justify-evenly md:flex-row">
        <EventCard eventPoster="/eventCardDemoPhoto.png" eventName="Event 1"/>
        <EventCard eventPoster="/eventCardDemoPhoto.png" eventName="Event 2"/>
        <EventCard eventPoster="/eventCardDemoPhoto.png" eventName="Event 3"/>
        <EventCard eventPoster="/eventCardDemoPhoto.png" eventName="Event 4"/>
        <EventCard eventPoster="/eventCardDemoPhoto.png" eventName="Event 5"/>
      </div>
    </div>
  );
}

export default AllEventsPage;
