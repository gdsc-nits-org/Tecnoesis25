import Image from "next/image";
interface TeamCardProps {
  photoUrl: string;
  name: string;
  designation: string;
}

const TeamCard1 = ({ photoUrl, name, designation }: TeamCardProps) => {
  const displayName = name.length > 15 ? `${name.slice(0, 12)}...` : name;
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative h-[15.4rem] w-[15.4rem]">
        {/* Decorative corner images */}
        <Image
          src="/Team/team3.png"
          alt="Team Member"
          width={20}
          height={15}
          className="z-1 absolute left-3 top-0"
        />
        <Image
          src="/Team/team1.svg"
          alt="Team Member"
          width={120}
          height={130}
          className="z-1 absolute -left-[2.4rem] top-[4.5rem]"
        />
        <Image
          src="/Team/team4.svg"
          alt="Team Member"
          width={70}
          height={70}
          className="absolute bottom-0 right-0 z-50"
        />
        <Image
          src="/Team/team2.svg"
          alt="Team Member"
          width={100}
          height={50}
          className="z-1 absolute -top-[1rem] right-0 translate-x-8"
        />

        {/* Main card with gradient border */}
        <div
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #ff0000 100%)",
            clipPath:
              "polygon(19% 0, 75% 0, 85% 7%, 85% 40%, 93% 44%, 93% 86%, 82% 96%, 22% 96%, 12% 91%, 12% 76%, 18% 70%, 18% 50%, 9% 45%, 9% 8%)",
          }}
          className="z-50 flex h-full w-full items-center justify-center overflow-hidden"
        >
          <div
            style={{
              clipPath:
                "polygon(19% 0, 75% 0, 85% 7%, 85% 40%, 93% 44%, 93% 86%, 82% 96%, 22% 96%, 12% 91%, 12% 76%, 18% 70%, 18% 50%, 9% 45%, 9% 8%)",
            }}
            className="h-[15rem] w-[15rem] overflow-hidden"
          >
            <Image
              src={photoUrl}
              alt="Team Member"
              width={300}
              height={300}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Name and designation */}
      <div className="flex flex-col text-nowrap text-center font-bankGothik text-[.9rem] text-white">
        <h2>{displayName}</h2>
        <h3>{designation}</h3>
      </div>
    </div>
  );
};

export default TeamCard1;
