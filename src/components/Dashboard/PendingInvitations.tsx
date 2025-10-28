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

  // TODO: REMOVE - Hardcoded test data
  const TEST_MODE = true;
  const mockData: teamResponse[] = [
    {
      id: "test-1",
      role: "MEMBER",
      registrationStatus: "PENDING",
      team: {
        id: "team-1",
        registrationStatus: "PENDING",
        teamName: "Code Warriors",
        extraInformation: [],
        members: [
          {
            id: "member-1",
            registrationStatus: "PENDING",
            role: "LEADER",
            user: {
              id: "user-1",
              username: "john_doe",
              firstName: "John",
              middleName: "A",
              lastName: "Doe",
              imageUrl: "/Avatar.png",
            },
          },
        ],
      },
    },
    {
      id: "test-2",
      role: "MEMBER",
      registrationStatus: "PENDING",
      team: {
        id: "team-2",
        registrationStatus: "PENDING",
        teamName: "Tech Titans",
        extraInformation: [],
        members: [
          {
            id: "member-2",
            registrationStatus: "PENDING",
            role: "LEADER",
            user: {
              id: "user-2",
              username: "jane_smith",
              firstName: "Jane",
              middleName: "B",
              lastName: "Smith",
              imageUrl: "/Avatar.png",
            },
          },
        ],
      },
    },
  ];
  const mockEventNames = ["Hackathon 2025", "Code Sprint Challenge"];
  const displayData = TEST_MODE ? mockData : data;
  // END TODO

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
    // TODO: REMOVE - Use mock data in test mode
    if (TEST_MODE) {
      setEventnames(mockEventNames);
      return;
    }
    // END TODO

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
    <div className="relative ml-auto mr-8 w-[450px] lg:w-[500px]">
      {/* Border Image */}
      <Image
        src="/dashboard/pending_border.png"
        alt="Pending Invitations Border"
        width={500}
        height={550}
        className="pointer-events-none absolute inset-0 z-10 h-auto w-full object-contain"
        priority
      />

      {/* Content with Border */}
      <div
        className="relative z-0 flex flex-col items-center"
        style={{
          height: "500px",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          padding: "40px 25px",
        }}
      >
        {/* Header */}
        <div className="mb-6 flex w-full items-center justify-center text-center">
          <h1
            className="font-nyxerin uppercase"
            style={{
              width: "100%",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "28px",
              letterSpacing: "0.19em",
              background:
                "linear-gradient(137.95deg, #7A96AC 2.28%, #EAEFF3 19.8%, #C2D4E1 32.94%, #FFFFFF 50.16%, #D4DEE5 62.15%, #ABBDC8 78.69%, #BCCAD7 95.24%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            PENDING REQUESTS [{displayData.length}]
          </h1>
        </div>

        {/* Scrollable Content Container - Max 2 visible */}
        <div
          className="flex w-full flex-col gap-5 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500"
          style={{
            maxHeight: "220px",
          }}
        >
          {displayData.map((item, index) => (
            <div
              key={index}
              className="relative w-full flex-shrink-0"
              style={{
                minHeight: "90px",
              }}
            >
              {/* Parallelogram Border */}
              <Image
                src="/dashboard/pending_event_border.png"
                alt="Event Border"
                width={450}
                height={90}
                className="pointer-events-none absolute inset-0 z-[5] h-full w-full object-contain"
              />

              {/* Event Info */}
              <div className="relative z-10 flex h-full items-center justify-between px-20 py-4">
                <div className="flex flex-1 flex-col gap-1 pr-8">
                  {/* Event Name */}
                  <div
                    className="break-words font-orbitron text-white"
                    style={{
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: "15px",
                      lineHeight: "19px",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {eventnames[index]}
                  </div>

                  {/* Team Name */}
                  <div
                    className="break-words font-orbitron text-white opacity-80"
                    style={{
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "10px",
                      lineHeight: "13px",
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
                  className="group relative flex-shrink-0 transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <Image
                    src="/dashboard/pending_accept.png"
                    alt="Accept"
                    width={115}
                    height={40}
                    className="h-auto w-[115px] transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingInvitations;
