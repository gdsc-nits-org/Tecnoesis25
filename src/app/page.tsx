"use client";
import Image from "next/image";
import Model from "~/components/Model";
import Countdown from "~/components/Countdown";
import Loader from "~/components/Loader";
import Tecnoesis from "~/components/Tecno";
import SocialIcons from "~/components/LandingFooter";

export default function Page() {
  return (
    <div className="h-screen w-screen bg-black">
      <div className="absolute left-[50%] h-80 w-[50vw] -translate-x-[50%] bg-transparent">
        <Tecnoesis bigScreen={true} />
      </div>
      <SocialIcons />
      <Loader />
      <Model />

      <div className="animate-fade-in pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-60 w-screen delay-1000">
        <Image
          className="absolute bottom-0 h-full w-full select-none"
          src="/abc.svg"
          width={300}
          height={100}
          alt="fkadshj"
        />
      </div>
      <Countdown />
    </div>
  );
}
