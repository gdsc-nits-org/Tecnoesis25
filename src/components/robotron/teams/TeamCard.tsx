import React from "react";
import Image from "next/image";

interface TeamCardProps {
  name?: string;
  role?: string;
  image?: string;
  description?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export const TeamCard: React.FC<TeamCardProps> = ({ name, role, image }) => {
  // Default placeholder image if none provided
  const displayImage =
    image ??
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop&crop=face";

  return (
    <div className="group relative w-full max-w-xs">
      {/* Frame Background - 350x471px frame */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          backgroundImage: `url('/robotron/modules/teams/headframe.min.svg')`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "350px",
          height: "471px",
          zIndex: 30,
        }}
      />

      {/* Main Card - positioned inside frame */}
      <div
        className="relative flex h-full flex-col bg-transparent p-8"
        style={{ zIndex: 5 }}
      >
        {/* Rectangular Image at top */}
        <div className="mb-8">
          <div
            className="relative h-48 w-full overflow-hidden border-2 border-white/20 shadow-lg"
            style={{
              width: "260px",
              height: "325px",
              borderRadius: "10%",
              zIndex: 10,
            }}
          >
            <Image
              src={displayImage}
              alt={name ?? "Team Member"}
              className="h-full w-full object-cover"
              fill
              sizes="260px"
            />
          </div>
        </div>
      </div>

      {/* Name and Role Section - positioned absolutely above frame */}
      <div
        className="absolute bottom-0 left-8 right-0 flex h-16 items-center justify-center px-2 text-center"
        style={{ zIndex: 40 }}
      >
        {/* Name - visible by default, fades out on hover */}
        <h3 className="absolute inset-0 flex items-center justify-center font-orbitron text-xs font-bold leading-tight text-white drop-shadow-lg transition-all duration-500 ease-in-out group-hover:scale-95 group-hover:opacity-0 sm:text-sm md:whitespace-nowrap md:text-base lg:whitespace-nowrap lg:text-lg xl:whitespace-nowrap xl:text-xl">
          {name ?? "Team Member"}
        </h3>

        {/* Role - hidden by default, fades in on hover */}
        <p className="absolute inset-0 flex scale-105 items-center justify-center font-orbitron text-xs font-medium leading-tight text-white opacity-0 drop-shadow-lg transition-all duration-500 ease-in-out group-hover:scale-100 group-hover:opacity-100 sm:text-sm md:text-base lg:text-lg">
          {role ?? "Role"}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
