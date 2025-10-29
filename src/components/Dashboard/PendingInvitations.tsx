"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { env } from "~/env";
import { toast } from "sonner";
import Image from "next/image";

interface teamResponse {
  id: string;
  role: string;
  registrationStatus: string;
  team: {
    id: string;
    registrationStatus: string;
    teamName: string;
    extraInformation: string[];
    members: {
      id: string;
      registrationStatus: string;
      role: string;
      user: {
        id: string;
        username: string;
        firstName: string;
        middleName: string;
        lastName: string;
        imageUrl: string;
      };
    }[];
  };
}

interface TeamInfoAboutEvents {
  teamName: string;
  registrationStatus: string;
  event: {
    name: string;
    venue: string;
    lat: string;
    lng: string;
    module: {
      name: string;
    };
  };
}

interface PendingInvitationsProps {
  data: teamResponse[];
  token: string;
}

const PendingInvitations = ({ data, token }: PendingInvitationsProps) => {
  const [eventnames, setEventnames] = useState<string[]>([]);

  const handleAccept = (teamid: string) => {
    async function changeStatus() {
      const response = await axios.patch(
        `${env.NEXT_PUBLIC_API_URL}/api/team/${teamid}/respond`,
        {
          status: "REGISTERED",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response;
    }
    toast.promise(changeStatus(), {
      loading: "Updating status...",
      success: () => {
        window.location.reload();
        return "Invitation Accepted";
      },
      error: () => "Error updating status. Please try again.",
    });
  };

  useEffect(() => {
    async function fetchEventNames(teams: teamResponse[]) {
      try {
        const fetchedEventNames = await Promise.all(
          teams.map(async (team) => {
            const { data } = await axios.get<{ msg: TeamInfoAboutEvents }>(
              `${env.NEXT_PUBLIC_API_URL}/api/team/${team.team.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            return data.msg.event.name;
          }),
        );
        setEventnames(fetchedEventNames);
      } catch (error) {
        console.error("Error fetching event names", error);
      }
    }
    void fetchEventNames(data);
  }, [data, token]);

  return (
    <div className="relative w-full max-w-[450px] sm:max-w-[500px] lg:ml-auto lg:mr-8 lg:w-[500px] group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      {/* Content with Border */}
      <div
        className="relative flex flex-col items-center rounded-2xl transition-all duration-500 hover:scale-[1.02]"
        style={{
          height: "450px",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          padding: "30px 20px",
          border: "3px solid #D10003",
        }}
      >
        {/* Animated glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
          background: 'radial-gradient(circle at center, rgba(209, 0, 3, 0.2) 0%, transparent 70%)',
          animation: 'pulse 2s ease-in-out infinite'
        }} />

        {/* Header */}
        <div className="mb-4 flex w-full items-center justify-center text-center sm:mb-6 relative z-10">
          <h1
            className="font-nyxerin uppercase transition-all duration-300 hover:scale-105"
            style={{
              width: "100%",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "clamp(18px, 4vw, 24px)",
              lineHeight: "1.2",
              letterSpacing: "0.15em",
              background:
                "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            PENDING REQUESTS [{data.length}]
          </h1>
        </div>

        {/* Scrollable Content Container */}
        <div
          className="flex w-full flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide sm:gap-5 relative z-10"
          style={{
            maxHeight: "220px",
          }}
        >
          {data.length === 0 ? (
            <div className="flex items-center justify-center h-full text-white/60 font-orbitron text-sm">
              No pending invitations
            </div>
          ) : (
            data.map((item, index) => (
              <div
                key={index}
                className="relative w-full flex-shrink-0 animate-slide-up hover:scale-[1.02] transition-transform duration-300"
                style={{
                  minHeight: "100px",
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Parallelogram Border */}
                <Image
                  src="/dashboard/pending_event_border.png"
                  alt="Event Border"
                  width={450}
                  height={90}
                  className="pointer-events-none absolute inset-0 z-[5] h-full w-full object-contain transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                />

                {/* Event Info */}
                <div className="relative z-10 flex h-full items-center justify-between py-4 pl-12 pr-6 sm:px-14 sm:py-4 md:px-20">
                  <div className="flex flex-1 flex-col gap-1 pr-2 sm:pr-4 md:pr-8">
                    {/* Event Name */}
                    <div
                      className="break-words font-orbitron text-white transition-colors duration-300 hover:text-[#FF4040]"
                      style={{
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: "clamp(8px, 2.5vw, 15px)",
                        lineHeight: "1.3",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {eventnames[index] ?? "Loading..."}
                    </div>

                    {/* Team Name */}
                    <div
                      className="break-words font-orbitron text-white opacity-80 transition-opacity duration-300 hover:opacity-100"
                      style={{
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "clamp(6px, 1.8vw, 10px)",
                        lineHeight: "1.3",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      Team: {item.team.teamName}
                    </div>
                  </div>

                  {/* Accept Button */}
                  <button
                    onClick={() => handleAccept(item.team.id)}
                    className="group/btn relative ml-1 mr-2 flex-shrink-0 transition-all duration-300 hover:scale-110 active:scale-95 sm:ml-2 sm:mr-2"
                  >
                    <Image
                      src="/dashboard/pending_accept.png"
                      alt="Accept"
                      width={135}
                      height={48}
                      className="h-auto w-[85px] transition-all duration-300 group-hover/btn:brightness-110 group-hover/btn:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] sm:w-[110px] md:w-[135px]"
                    />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingInvitations;
