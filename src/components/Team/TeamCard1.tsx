import Image from "next/image";
interface TeamCardProps {
  imageUrl: string;
  name: string;
  designation: string;
}

const TeamCard1 = ({ imageUrl, name, designation }: TeamCardProps) => {
    const displayName =
    name.length > 15 ? `${name.slice(0, 12)}...` : name;
    return (
        <>
        <Image src="/Team/team3.png" alt="Team Member" width={20} height={15} className="fixed translate-x-3"/>
        <Image src="/Team/team1.svg" alt="Team Member" width={120} height={130} className="fixed -translate-x-[2.4rem] translate-y-[4.5rem]"/>
        <Image src="/Team/team4.svg" alt="Team Member" width={70} height={70} className="fixed translate-x-[11rem] translate-y-[13rem] z-50" />
        <Image src="/Team/team2.svg" alt="Team Member" width={100} height={50} className="fixed translate-x-[11rem] -translate-y-[1rem]"/>
            <div style={{
                background: "linear-gradient(180deg, #ffffff 0%, #ff0000 100%)",
                clipPath:
                    "polygon(19% 0, 75% 0, 85% 7%, 85% 40%, 93% 44%, 93% 86%, 82% 96%, 22% 96%, 12% 91%, 12% 76%, 18% 70%, 18% 50%, 9% 45%, 9% 8%)",
            }}
                className="w-[15.4rem] h-[15.4rem] overflow-hidden flex items-center justify-center z-30 ">
                <div
                    style={{
                        clipPath:
                            "polygon(19% 0, 75% 0, 85% 7%, 85% 40%, 93% 44%, 93% 86%, 82% 96%, 22% 96%, 12% 91%, 12% 76%, 18% 70%, 18% 50%, 9% 45%, 9% 8%)",
                    }}
                    className="w-[15rem] h-[15rem] overflow-hidden"
                >
                    <Image
                        src={imageUrl}
                        alt="Team Member"
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
            <div className="flex flex-col font-bankGothik text-nowrap  text-white text-center -translate-x-5 text-[.9rem]">
                <h2>{displayName}</h2>
                <h3>{designation}</h3>

            </div>
        </>
    );
};

export default TeamCard1;
