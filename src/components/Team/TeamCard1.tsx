import Image from "next/image";

const TeamCard1 = () => {
    return (
        <div style={{
                    background:"linear-gradient(180deg, #ffffff 0%, #ff0000 100%)",
                    clipPath:
                        "polygon(19% 0, 75% 0, 85% 5%, 85% 40%, 93% 44%, 93% 86%, 82% 96%, 22% 96%, 12% 91%, 12% 76%, 18% 70%, 18% 50%, 9% 45%, 9% 5%)",
                }}
                className="w-[16rem] h-[15.5rem] overflow-hidden flex items-center justify-center">
            <div
                style={{
                    clipPath:
                        "polygon(19% 0, 75% 0, 85% 5%, 85% 40%, 93% 44%, 93% 86%, 82% 96%, 22% 96%, 12% 91%, 12% 76%, 18% 70%, 18% 50%, 9% 45%, 9% 5%)",
                }}
                className="w-[15rem] h-[15rem] overflow-hidden"
            >
                <Image
                    src="https://res.cloudinary.com/dgnlmdkyq/image/upload/v1745219644/WhatsApp_Image_2025-01-28_at_16.29.22_a6390c1a_mpbfhb.jpg"
                    alt="Team Member"
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
};

export default TeamCard1;
