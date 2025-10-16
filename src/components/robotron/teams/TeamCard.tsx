import React from 'react';

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

export const TeamCard: React.FC<TeamCardProps> = ({
  name,
  role,
  image,
  description,
  socialLinks
}) => {
  // Default placeholder image if none provided
  const displayImage = image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop&crop=face';

  return (
    <div className="relative group w-full max-w-xs">
      {/* Frame Background - 350x471px frame with higher z-index */}
      <div
        className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          backgroundImage: `url('/robotron/modules/teams/headframe.svg')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '350px',
          height: '471px',
          zIndex: 10,
        }}
      />

      {/* Main Card - positioned inside frame */}
      <div className="relative bg-transparent h-full flex flex-col p-8" style={{ zIndex: 20 }}>
        {/* Rectangular Image at top */}
        <div className="mb-8">
          <div className="w-full h-48 overflow-hidden border-2 border-white/20 shadow-lg relative" style={{
            width: '260px',
            height: '325px',
            borderRadius: '10%', // Extremely rounded corners for PFP
            zIndex: 5, // Lower than frame
          }}>
            <img
              src={displayImage}
              alt={name || "Team Member"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name in red section - responsive positioning */}
        <div className="mt-auto text-center px-2">
          <h3 className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold font-orbitron drop-shadow-lg leading-tight md:whitespace-nowrap lg:whitespace-nowrap xl:whitespace-nowrap">
            {name || "Team Member"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
