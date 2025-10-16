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
      {/* Frame Background - 350x471px frame */}
      <div
        className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          backgroundImage: `url('/robotron/modules/teams/headframe.svg')`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '350px',
          height: '471px',
          zIndex: 30,
        }}
      />

      {/* Main Card - positioned inside frame */}
      <div className="relative bg-transparent h-full flex flex-col p-8" style={{ zIndex: 5 }}>
        {/* Rectangular Image at top */}
        <div className="mb-8">
          <div className="w-full h-48 overflow-hidden border-2 border-white/20 shadow-lg relative" style={{
            width: '260px',
            height: '325px',
            borderRadius: '10%',
            zIndex: 10,
          }}>
            <img
              src={displayImage}
              alt={name || "Team Member"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Name and Role Section - positioned absolutely above frame */}
      <div 
        className="absolute bottom-0 left-8 right-0 text-center px-2 h-16 flex items-center justify-center"
        style={{ zIndex: 40 }}
      >
        {/* Name - visible by default, fades out on hover */}
        <h3 className="absolute inset-0 flex items-center justify-center text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold font-orbitron drop-shadow-lg leading-tight transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:scale-95 md:whitespace-nowrap lg:whitespace-nowrap xl:whitespace-nowrap">
          {name || "Team Member"}
        </h3>
        
        {/* Role - hidden by default, fades in on hover */}
        <p className="absolute inset-0 flex items-center justify-center text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium font-orbitron drop-shadow-lg leading-tight opacity-0 scale-105 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-100">
          {role || "Role"}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
