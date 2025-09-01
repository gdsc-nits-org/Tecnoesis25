'use client';
import Image from "next/image";
import Model from "~/components/VideoObj";
import Countdown from "~/components/Countdown";
import Loader from "~/components/Loader";

export default function Page() {
  // const [isAnimating, setIsAnimating] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsAnimating(false);
  //   }, 10000);
  // }, []);

  return (
    <div className="h-screen w-screen">
      <Loader />
      <Model />
      <div
        className="animate-fade-in fixed bottom-0 left-0 right-0 h-60 w-screen z-20 delay-1000 pointer-events-none"
      >
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
