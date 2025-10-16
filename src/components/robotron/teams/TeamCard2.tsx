'use client';

import React, { useState } from 'react';

interface TeamCard2Props {
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

export const TeamCard2: React.FC<TeamCard2Props> = ({
  name,
  role,
  image,
  description,
  socialLinks
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const displayImage = image && !imageError
    ? image
    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80';

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <div className="relative mx-auto" style={{ width: '317px', height: '415px' }}>
      {/* Outer Frame - Red to Gray Gradient with Clipped Corners */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #ef4444 0%, #6b7280 100%)',
          clipPath: 'polygon(8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 8%)',
          padding: '15px',
        }}
      >
        {/* Inner Black Frame with Clipped Corners */}
        <div
          className="relative w-full h-full bg-black"
          style={{
            clipPath: 'polygon(6% 0%, 94% 0%, 100% 6%, 100% 94%, 94% 100%, 6% 100%, 0% 94%, 0% 6%)',
            padding: '30px',
          }}
        >
          {/* SVG Background Frame - Inside Inner Frame */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/robotron/team/bgframe2.svg')`,
              backgroundSize: '118% 117%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              zIndex: 1,
            }}
          />
          {/* Card Content */}
          <div className="relative w-full h-full flex flex-col items-center justify-between" style={{ zIndex: 10 }}>
            {/* Image Container with Purple/Gray Border and Clipped Corners */}
            <div className="relative mx-auto mt-8" style={{ width: '80%', aspectRatio: '1/1' }}>
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #9ca3af 0%, #a78bfa 50%, #9ca3af 100%)',
                  clipPath: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)',
                  padding: '12px',
                }}
              >
                {/* Image with Clipped Corners */}
                <div
                  className="w-full h-full overflow-hidden"
                  style={{
                    clipPath: 'polygon(4% 0%, 96% 0%, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0% 96%, 0% 4%)',
                  }}
                >
                  {imageLoading && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                      <div className="text-white text-sm font-orbitron">Loading...</div>
                    </div>
                  )}
                  <img
                    src={displayImage}
                    alt={name || "Team Member"}
                    className="w-full h-full object-cover"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{
                      opacity: imageLoading ? 0 : 1,
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Name Section */}
            <div className="text-center mb-8 px-4">
              <h3
                className="text-white font-normal"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 400,
                  fontSize: '30px',
                  lineHeight: '35px',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  maxWidth: '100%',
                }}
              >
                {name || "TEAM MEMBER"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard2;
