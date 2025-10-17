import Image from "next/image";
interface TeamCardProps {
  photoUrl: string;
  name: string;
  designation: string;
}

const TeamCard1 = ({ photoUrl, name, designation }: TeamCardProps) => {
    const displayName =
    name.length > 15 ? `${name.slice(0, 12)}...` : name;
    return (
        <div className="relative flex flex-col items-center justify-center">
            <div className="relative w-[15.4rem] h-[15.4rem]">
                {/* Decorative corner images */}
                <Image src="/Team/team3.png" alt="Team Member" width={20} height={15} className="absolute top-0 left-3 z-1"/>
                <Image src="/Team/team1.svg" alt="Team Member" width={120} height={130} className="absolute -left-[2.4rem] top-[4.5rem] z-1"/>
                <Image src="/Team/team4.svg" alt="Team Member" width={70} height={70} className="absolute right-0 bottom-0 z-50" />
                <Image src="/Team/team2.svg" alt="Team Member" width={100} height={50} className="absolute right-0 translate-x-8 -top-[1rem] z-1"/>
                
                {/* Main card with gradient border */}
                <div style={{
                    background: "linear-gradient(180deg, #ffffff 0%, #ff0000 100%)",
                    clipPath:
                        "polygon(19% 0, 75% 0, 85% 7%, 85% 40%, 93% 44%, 93% 86%, 82% 96%, 22% 96%, 12% 91%, 12% 76%, 18% 70%, 18% 50%, 9% 45%, 9% 8%)",
                }}
                    className="w-full h-full overflow-hidden flex items-center justify-center z-50">
                    <div
                        style={{
                            clipPath:
                                "polygon(19% 0, 75% 0, 85% 7%, 85% 40%, 93% 44%, 93% 86%, 82% 96%, 22% 96%, 12% 91%, 12% 76%, 18% 70%, 18% 50%, 9% 45%, 9% 8%)",
                        }}
                        className="w-[15rem] h-[15rem] overflow-hidden"
                    >
                        <Image
                            src={photoUrl}
                            alt="Team Member"
                            width={300}
                            height={300}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
            
            {/* Name and designation */}
            <div className="flex flex-col font-bankGothik text-nowrap text-white text-center text-[.9rem]">
                <h2>{displayName}</h2>
                <h3>{designation}</h3>
            </div>
        </div>
    );
};

export default TeamCard1;
