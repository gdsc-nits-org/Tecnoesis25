"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { env } from "~/env";
import { z, ZodError } from "zod";
import CustomButton from "~/components/CustomButton";
import { Command } from "cmdk";
import RegisterState1 from "../../../../../public/RegisterState1.svg";
import RegisterState2 from "../../../../../public/RegisterState2.svg";
import arrowRight from "../../../../../public/about/arrowR.png";
import TeamBorder1 from "../../../../../public/teamBorder1.png";
import TeamBorder2 from "../../../../../public/teamBorder2.png";
import TeamLogo1 from "../../../../../public/teamLogo1.png";
import TeamLogo2 from "../../../../../public/teamLogo2.png";
import Avatar from "../../../../../public/Avatar.png";
import CongratulationBorder from "../../../../../public/congratulationBorder.png";
import CrossSign from "../../../../../public/CrossSign.svg";

export const runtime = "edge";

/* ----------------------------- Command Menu ----------------------------- */
const CommandMenu = ({
  allUsers,
  value,
  setValue,
}: {
  allUsers: UserResponse[];
  value: string;
  setValue: (username: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  const handleChange = (newValue: string) => setValue(newValue);

  const handleBlur = () => {
    if (!selectedUser || selectedUser.username !== value) {
      setSelectedUser(null);
      handleChange("");
    }
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {!isOpen && (
        <input
          className="h-10 w-full rounded-lg border border-red-700 bg-transparent text-center text-white shadow-[0_0_10px_#ff0000] focus:shadow-[0_0_20px_#ff3333] outline-none transition"
          onClick={() => setIsOpen(true)}
          placeholder="Search username..."
          value={value}
        />
      )}

      {isOpen && (
        <>
          <div
            className="fixed left-0 top-0 h-full w-full"
            onClick={handleBlur}
          ></div>
          <Command
            className="text-white"
            label="Command Menu"
            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          >
            <Command.Input
              autoFocus
              placeholder="Search username..."
              className="h-10 w-full rounded-lg border border-red-700 bg-transparent text-center text-white shadow-[0_0_10px_#ff0000] focus:shadow-[0_0_20px_#ff3333] outline-none"
              value={value}
              onValueChange={handleChange}
            />
            <Command.List className="absolute left-0 top-full mt-2 w-full rounded-lg border border-red-700 bg-black/70 text-center backdrop-blur-md shadow-lg">
              <Command.Empty>No results found.</Command.Empty>
              <Command.Group>
                {allUsers?.map((user, idx) => (
                  <Command.Item
                    key={idx}
                    className="cursor-pointer px-6 py-2 hover:bg-red-700/40 transition"
                    onSelect={() => {
                      setSelectedUser(user);
                      handleChange(user.username);
                      setIsOpen(false);
                    }}
                  >
                    {user.firstName} {user.lastName} - {user.username} (
                    {user.registrationId})
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </>
      )}
    </div>
  );
};

/* ------------------------------- Interfaces ------------------------------ */
interface Event {
  id: string;
  name: string;
  maxTeamSize: number;
  minTeamSize: number;
}

interface UserResponse {
  collegeName?: string;
  email?: string;
  firebaseId?: string;
  firstName: string;
  id?: string;
  imageUrl?: string;
  lastName: string;
  middleName?: string;
  phoneNumber?: string;
  registrationId: string;
  username: string;
}

interface GetEventAPIResponse {
  status: string;
  msg: Event;
}

const userDataSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  members: z.array(z.string()),
});

interface TeamData {
  teamName: string;
  members: string[];
  extraInformation?: string[];
}

interface EventParams {
  id: string;
}

/* ---------------------------- Main Component ---------------------------- */
const RegisterTeam = ({ params }: { params: EventParams }) => {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    teamName: "",
    teamLeader: "",
    member1: "",
    member2: "",
    member3: "",
  });
  
   const teamMembers = [
    {
      name: "Candice Wu",
      username: "@candice",
      isLeader: true,
    },
    {
      name: "James Li",
      username: "@jamesli",
      isLeader: false,
    },
    {
      name: "Sofia Patel",
      username: "@sofiap",
      isLeader: false,
    },
    {
      name: "Nate Kim",
      username: "@natek",
      isLeader: false,
    },
  ];

  const [isSoloEvent, setIsSoloEvent] = useState<boolean>(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [allUsers, setAllUsers] = useState<UserResponse[]>([]);
  const [teamLeader, setTeamLeader] = useState<string>("Loading...");
  const [members, setMembers] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const fieldsWithEdit = ["member1", "member2", "member3"];

  /* --------------------------- Fetch event data --------------------------- */
  // useEffect(() => {
  //   const fetchEventData = async () => {
  //     try {
  //       const { data } = await axios.get<GetEventAPIResponse>(
  //         `${env.NEXT_PUBLIC_API_URL}/api/event/${params.id}`,
  //       );
  //       setEvent(data.msg);
  //       setIsSoloEvent(data.msg.maxTeamSize == 1);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   void fetchEventData();
  // }, [params.id]);

  /* --------------------------- Fetch all users --------------------------- */
  // useEffect(() => {
  //   void (async () => {
  //     const token = await user?.getIdToken();
  //     if (!token) return;
  //     try {
  //       const { data } = await axios.get<{ msg: UserResponse[] }>(
  //         `${env.NEXT_PUBLIC_API_URL}/api/user/`,
  //         { headers: { Authorization: `Bearer ${token}` } },
  //       );
  //       setAllUsers(data.msg);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   })();

  //   void (async () => {
  //     const token = await user?.getIdToken();
  //     if (!token) return;
  //     try {
  //       const { data } = await axios.get<{ msg: UserResponse }>(
  //         `${env.NEXT_PUBLIC_API_URL}/api/user/me`,
  //         { headers: { Authorization: `Bearer ${token}` } },
  //       );
  //       setTeamLeader(data.msg.username);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   })();
  // }, [user]);

  /* ----------------------------- Handlers ----------------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMemberSelect = (username: string, index: number) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = username;
      setFormData((prevData) => ({ ...prevData, members: updated }));
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setFormData((prevData) => ({ ...prevData, members }));

    // Move to next step (team preview)
    setStep(2);
  };



  const handleConfirm = async () => {
    // toast.promise(
    //   (async () => {
    //     try {
    //       if (!user) throw new Error("User not authenticated");
    //       const validatedData = userDataSchema.parse(formData);
    //       const filteredMembers = validatedData.members.filter(
    //         (m) => m !== teamLeader,
    //       );
    //       const token = await user.getIdToken();

    //       await axios.post(
    //         `${env.NEXT_PUBLIC_API_URL}/api/team/event/${params.id}/add`,
    //         {
    //           name: validatedData.teamName,
    //           members: filteredMembers,
    //           extraInformation: "Team registered successfully.",
    //         },
    //         {
    //           headers: { Authorization: `Bearer ${token}` },
    //         },
    //       );

          setStep(3);
    //     } catch (err) {
    //       if (err instanceof ZodError) {
    //         const zodErrors = err.errors.reduce(
    //           (acc, current) => ({
    //             ...acc,
    //             [String(current.path[0])]: current.message,
    //           }),
    //           {} as Record<string, string>,
    //         );
    //         setFormErrors(zodErrors);
    //         throw err;
    //       }

    //       if (axios.isAxiosError(err)) {
    //         const msg = err.response?.data?.msg ?? "Registration failed.";
    //         throw new Error(msg);
    //       }

    //       throw new Error("Unexpected error during registration.");
    //     }
    //   })(),
    //   {
    //     loading: "Registering...",
    //     success: "Registration successful!",
    //     error: (e) =>
    //       e instanceof Error ? e.message : "An unknown error occurred.",
    //   },
    // );
  };

  // if (loading || !event)
  //   return (
  //     <div className="flex h-screen w-screen items-center justify-center text-xl text-white">
  //       Loading...
  //     </div>
  //   );

  // if (!user) {
  //   toast.error("Sign in to register for the event");
  //   router.push("/home");
  // }

  /* Render Steps */
  return (
    <div className="min-h-screen w-full bg-black bg-[url('/grid-bg.png')] bg-cover bg-center text-white font-[Orbitron] tracking-widest flex flex-col items-center justify-center px-6 py-12">
      {/* STEP 1 */}
      {step === 1 && (
        <div className="relative h-screen w-screen overflow-hidden bg-grid-pattern">
          <div className="absolute inset-0 z-0 fade-mask" />

          {/* Top Right Register Button */}
          <button
            onClick={(e) => handleSubmit(e)}
            className="absolute top-6 right-6 z-50 group transition-transform duration-300 hover:scale-105 hover:rotate-1"
          >
            <div className="relative">
              <Image
                src={RegisterState1}
                alt="Register"
                width={250}
                height={80}
                className="transition duration-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_20px_#ff0000]"
              />
            </div>
          </button>

          {/* Registration Form */}
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-white space-y-4">
            <h1 className="text-6xl font-bankGothik uppercase tracking-widest font-weight: 700">
              Registration Form
            </h1>
            <h2 className="text-4xl font-bankGothik font-weight: 700">
              Event : <span className="text-red-600">ROBOTRON</span>
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 mt-8"
            >
              {[
                { label: "Team Name", name: "teamName", type: "text" },
                { label: "Team Leader", name: "teamLeader", type: "text" },
                { label: "Member 1", name: "member1", type: "text" },
                { label: "Member 2", name: "member2", type: "text" },
                { label: "Member 3", name: "member3", type: "text" },
              ].map(({ label, name, type }) => (
                <div key={name} className="flex items-center space-x-2 relative">
                  <label
                    htmlFor={name}
                    className="bg-[#8B75D980] px-6 py-3 uppercase text-md tracking-wide font-semibold flex-shrink-0 w-60 font-bankGothik text-center"
                  >
                    {label}
                  </label>

                  <div className="absolute left-[calc(14.35rem)] top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <Image src={arrowRight} alt="Right Arrow" width={15} height={15} />
                  </div>

                  {fieldsWithEdit.includes(name) ? (
                    <div className="relative flex-grow">
                      <input
                        id={name}
                        name={name}
                        type={type}
                        onChange={handleChange}
                        value={formData[name as keyof typeof formData]}
                        className="w-full bg-[#A4000040] bg-opacity-70 placeholder-red-400 text-white font-bankGothik py-3 px-4 pl-10 pr-20 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                        placeholder={label}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-[#26232f] text-[#B5A2FF] px-3 py-1 font-bankGothik font-semibold"
                      >
                        Edit
                      </button>
                    </div>
                  ) : (
                    <input
                      id={name}
                      name={name}
                      type={type}
                      onChange={handleChange}
                      value={formData[name as keyof typeof formData]}
                      className="flex-grow bg-[#A4000040] bg-opacity-70 placeholder-red-400 text-white font-bankGothik py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                      placeholder={label}
                      required
                    />
                  )}
                </div>
              ))}
            </form>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="relative h-screen w-screen overflow-hidden bg-grid-pattern">
          {/* Register Button Top Right */}
          <button
            onClick={() => handleConfirm()}
            className="absolute top-6 right-6 z-50 group transition-transform duration-300 hover:scale-105 hover:rotate-1"
          >
            <div className="relative">
              <Image
                src={RegisterState2}
                alt="Confirm"
                width={250}
                height={80}
                className="transition duration-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_20px_#ff0000]"
              />
            </div>
          </button>

          <div className="relative z-10 flex flex-col justify-center items-center h-full text-white space-y-6">
            <h1 className="text-6xl uppercase tracking-widest font-bold">
              TEAM DETAILS
            </h1>
            <h2 className="text-4xl font-bold">
              Team Name : <span className="text-red-600">{formData.teamName || "CRUSHERS"}</span>
            </h2>

            <div className="bg-black bg-opacity-30 p-6 rounded-md space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center space-x-4 relative">
                  <div className="relative w-14 h-14">
                    <Image
                      src={member.isLeader ? TeamLogo2 : TeamLogo1}
                      alt="Border"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <Image
                        src={Avatar}
                        alt="Avatar"
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  </div>

                  <div className="relative w-72 h-20">
                    <Image
                      src={member.isLeader ? TeamBorder2 : TeamBorder1}
                      alt="Border"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
                      <p className="text-lg font-semibold">{member.name}</p>
                      <p className="text-sm text-blue-400">{member.username}</p>
                    </div>
                    {member.isLeader && (
                      <span className="absolute top-7 right-6 text-red-500 font-bold text-sm">
                        LEADER
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: CONGRATULATIONS POPUP */}
      {step === 3 && (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-50 z-20" />
          <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[58rem] h-[36rem]">
            <div className="relative w-full h-full">
              <Image
                src={CongratulationBorder}
                alt="Congratulation Border"
                fill
                className="object-contain absolute inset-0"
              />

              <button
                onClick={() => router.push("/dashboard")}
                className="absolute top-3 right-0 z-40"
              >
              </button>

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white space-y-2">
                <h1 className="text-4xl font-bold">Congratulations!</h1>
                <p className="text-2xl font-semibold">
                  You have successfully registered for the event.
                </p>
                <p className="text-2xl text-[#F40004] font-semibold">ROBOTRON</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterTeam;


