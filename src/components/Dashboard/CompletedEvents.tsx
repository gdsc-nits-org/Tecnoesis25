"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { env } from "~/env";
import { Check, X } from "lucide-react";
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

interface EventTableProps {
  index: number;
  opened: boolean;
  item: teamResponse;
}

interface CompletedEventsProps {
  data: teamResponse[];
  token: string;
}

const EventTable = ({ index, opened, item, onClose }: EventTableProps & { onClose: () => void }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!opened || !mounted) return null;

  const modalContent = (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
        style={{ cursor: 'none' }}
      />

      {/* Popup Modal */}
      <div 
        className="fixed left-1/2 top-1/2 z-[9998] w-[90vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in-95 duration-300"
        style={{ cursor: 'none' }}
      >
        {/* Modal Border/Background */}
        <div
          className="rounded-lg p-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(122, 150, 172, 0.25) 0%, rgba(171, 189, 200, 0.2) 50%, rgba(188, 202, 215, 0.25) 100%)",
            border: "2px solid rgba(122, 150, 172, 0.4)",
            boxShadow:
              "0 20px 60px 0 rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Table Content */}
          <div className="relative" style={{ cursor: 'none' }}>
            <table key={index} className="w-full table-auto" style={{ cursor: 'none' }}>
              <thead>
                <tr
                  className="border-b"
                  style={{
                    borderColor: "rgba(122, 150, 172, 0.4)",
                  }}
                >
                  <th className="px-3 py-3 text-left font-orbitron text-sm font-semibold uppercase tracking-wider text-[#EAEFF3]">
                    Name
                  </th>
                  <th className="px-3 py-3 text-left font-orbitron text-sm font-semibold uppercase tracking-wider text-[#EAEFF3]">
                    Username
                  </th>
                  <th className="px-3 py-3 text-left font-orbitron text-sm font-semibold uppercase tracking-wider text-[#EAEFF3]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {item.team.members.map((member, idx) => (
                  <tr
                    key={idx}
                    className="border-b transition-colors duration-200 hover:bg-white/5 last:border-b-0"
                    style={{
                      borderColor: "rgba(122, 150, 172, 0.2)",
                      cursor: 'none',
                    }}
                  >
                    <td className="px-3 py-4 font-outfit text-sm text-[#C2D4E1]">
                      {member.user.firstName} {member.user.middleName}{" "}
                      {member.user.lastName}
                    </td>
                    <td className="px-3 py-4 font-outfit text-sm text-[#C2D4E1]">
                      {member.user.username}
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        {member.registrationStatus === "REGISTERED" ? (
                          <>
                            <Check className="h-5 w-5 text-green-400" />
                            <span className="font-outfit text-sm text-green-400">
                              Registered
                            </span>
                          </>
                        ) : (
                          <>
                            <X className="h-5 w-5 text-amber-400" />
                            <span className="font-outfit text-sm text-amber-400">
                              Pending
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

const CompletedEvents = ({ data, token }: CompletedEventsProps) => {
  // TODO: REMOVE - Hardcoded test data
  const TEST_MODE = true;
  const mockData: teamResponse[] = [
    {
      id: "completed-1",
      role: "LEADER",
      registrationStatus: "REGISTERED",
      team: {
        id: "team-3",
        registrationStatus: "REGISTERED",
        teamName: "Debug Dragons",
        extraInformation: [],
        members: [
          {
            id: "member-3",
            registrationStatus: "REGISTERED",
            role: "LEADER",
            user: {
              id: "user-3",
              username: "alice_wonder",
              firstName: "Alice",
              middleName: "C",
              lastName: "Wonder",
              imageUrl: "/Avatar.png",
            },
          },
          {
            id: "member-4",
            registrationStatus: "REGISTERED",
            role: "MEMBER",
            user: {
              id: "user-4",
              username: "bob_builder",
              firstName: "Bob",
              middleName: "D",
              lastName: "Builder",
              imageUrl: "/Avatar.png",
            },
          },
        ],
      },
    },
    {
      id: "completed-2",
      role: "MEMBER",
      registrationStatus: "REGISTERED",
      team: {
        id: "team-4",
        registrationStatus: "REGISTERED",
        teamName: "Binary Beasts",
        extraInformation: [],
        members: [
          {
            id: "member-5",
            registrationStatus: "REGISTERED",
            role: "LEADER",
            user: {
              id: "user-5",
              username: "charlie_dev",
              firstName: "Charlie",
              middleName: "E",
              lastName: "Developer",
              imageUrl: "/Avatar.png",
            },
          },
          {
            id: "member-6",
            registrationStatus: "PENDING",
            role: "MEMBER",
            user: {
              id: "user-6",
              username: "diana_coder",
              firstName: "Diana",
              middleName: "F",
              lastName: "Coder",
              imageUrl: "/Avatar.png",
            },
          },
        ],
      },
    },
  ];
  const mockEventNames = ["AI Workshop", "Web Dev Bootcamp"];
  const displayData = TEST_MODE ? mockData : data;
  // END TODO

  const [opened, setOpened] = useState<boolean[]>(Array(displayData.length).fill(false));
  const [eventnames, setEventnames] = useState<string[]>([]);

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

  const handleOpen = (index: number) => {
    setOpened((prev) => {
      const newOpened = [...prev];
      newOpened[index] = !newOpened[index];
      return newOpened;
    });
  };

  return (
    <div className="relative ml-auto mr-8 w-[450px] lg:w-[500px]">
      {/* Border Image */}
      <Image
        src="/dashboard/pending_border.png"
        alt="Events Registered Border"
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
            EVENTS REGISTERED [{displayData.length}]
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
            <div key={index} className="relative w-full flex-shrink-0">
              <div
                className="relative"
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

                  {/* View Team Button */}
                  <button
                    onClick={() => handleOpen(index)}
                    className="group relative flex-shrink-0 transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Image
                      src="/dashboard/viewteam_button.png"
                      alt="View Team"
                      width={115}
                      height={40}
                      className="h-auto w-[115px] transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                    />
                  </button>
                </div>
              </div>

              {/* Expandable Team Table */}
              <EventTable 
                opened={opened[index]!} 
                index={index} 
                item={item}
                onClose={() => handleOpen(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompletedEvents;
