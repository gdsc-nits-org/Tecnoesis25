"use client";

import Image from "next/image";
import CustomButton from "./CustomButton";

interface EventCardProps {
  eventPoster: string;
  eventName: string;
  eventUrl?: string;
  registrationUrl?: string;
}

function EventCard({ eventPoster, eventName, eventUrl, registrationUrl }: EventCardProps) {
  return (
    <div className="group relative md:mb-6 h-full ">
      <Image
        className="shadow-lgz-200 absolute left-1/2 top-28 sm:top-36 group-hover:z-20 w-44 sm:w-52 -translate-x-1/2 transform transition-all duration-500 group-hover:-translate-y-6"
        src={eventPoster}
        alt="Event Poster"
        width={400}
        height={600}
      />
      <Image
        className="w-76 z-100 relative transition-all duration-500 group-hover:blur-sm  hidden  sm:block"
        src="/eventCardBG2.png"
        alt="Event Poster"
        width={400}
        height={300}
      />
      <Image
        className="max-w-72 z-100 relative transition-all duration-500 group-hover:blur-sm sm:hidden"
        src="/eventCardBGMobile.png"
        alt="Event Poster"
        width={400}
        height={300}
      />
      <div className="z-30 hidden sm:flex flex-col items-center justify-center opacity-0 transition-all duration-500 translate-y-24 group-hover:opacity-100">
        <h1 className="font-nyxerin text-white">{eventName}</h1>
        <CustomButton text="Register" width={200} href={registrationUrl} />
        <CustomButton text="View Details" width={200} href={eventUrl} />
      </div>
      <div className="z-30 flex sm:hidden flex-col items-center justify-center opacity-0 transition-all duration-500  group-hover:opacity-100">
        <h1 className="font-nyxerin text-white">{eventName}</h1>
        <CustomButton text="Register" width={160} href={registrationUrl} />
        <CustomButton text="View Details" width={160} href={eventUrl} />
      </div>
    </div>
  );
}

export default EventCard;
