"use client";

import Image from "next/image";
import { useState, useEffect, use } from "react";

import { env } from "~/env";
import { ZodError } from "zod";
import { Command } from "cmdk";
import { toast } from "sonner";
import axios from "axios";
import { auth } from "~/app/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CustomButton from "~/components/CustomButton";
import arrowRight from "../../../../../public/about/arrowR.png";
import TeamBorder1 from "../../../../../public/teamBorder1.png";
import TeamBorder2 from "../../../../../public/teamBorder2.png";
import TeamLogo1 from "../../../../../public/teamLogo1.png";
import TeamLogo2 from "../../../../../public/teamLogo2.png";
import Avatar from "../../../../../public/Avatar.png";
import CongratulationBorder from "../../../../../public/congratulationBorder.png";
import Link from "next/link";
import Login from "~/components/GoogleAuth";

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
          className="h-7 md:h-10 w-full rounded-lg border border-red-700 bg-transparent text-center text-white shadow-[0_0_10px_#ff0000] focus:shadow-[0_0_20px_#ff3333] outline-none transition text-xs md:text-base"
          onClick={() => setIsOpen(true)}
          placeholder="Search username..."
          value={value}
          readOnly
        />
      )}

      {isOpen && (
        <>
          <div
            className="fixed left-0 top-0 h-full w-full z-[100]"
            onClick={handleBlur}
          ></div>
          <Command
            className="text-white relative z-[101]"
            label="Command Menu"
            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          >
            <Command.Input
              autoFocus
              placeholder="Search username..."
              className="h-7 md:h-10 w-full rounded-lg border border-red-700 bg-black text-center text-white shadow-[0_0_10px_#ff0000] focus:shadow-[0_0_20px_#ff3333] outline-none text-xs md:text-base"
              value={value}
              onValueChange={handleChange}
            />
            <Command.List className="absolute left-0 top-full mt-2 w-full max-h-60 overflow-y-auto rounded-lg border border-red-700 bg-black/95 text-center backdrop-blur-md shadow-lg z-[102]">
              <Command.Empty className="py-4 text-gray-400 text-xs md:text-base">No results found.</Command.Empty>
              <Command.Group>
                {allUsers?.map((user, idx) => (
                  <Command.Item
                    key={idx}
                    className="cursor-pointer px-6 py-2 hover:bg-red-700/40 transition text-xs md:text-base"
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
  description: string;
  maxTeamSize: number;
  minTeamSize: number;
  registrationFee: number;
  upiQrCode: string;
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

interface EventParams {
  id: string;
}

/* ---------------------------- Main Component ---------------------------- */

const RegisterTeam = ({ params }: { params: Promise<EventParams> }) => {
  const { id } = use(params);
  const [user, loading] = useAuthState(auth);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<{
    teamName: string;
    teamLeader: string;
    transactionId: string;
    [key: string]: string | string[];
  }>({
    teamName: "",
    teamLeader: "",
    members: [] as string[],
    transactionId: "",
  });
  const [verificationPhoto, setVerificationPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [teamLeader, setTeamLeader] = useState<string>("Loading...");
  const [allUsers, setAllUsers] = useState<UserResponse[]>([]);

  // Early authentication check (after hooks)
  const showAuthRequired = !user && !loading;

  /* --------------------------- Fetch event data --------------------------- */
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const { data } = await axios.get<GetEventAPIResponse>(
          `${env.NEXT_PUBLIC_API_URL}/api/event/${id}`,
        );
        setEvent(data.msg);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchEventData();
  }, [id]);

  /* --------------------------- Fetch all users --------------------------- */
  useEffect(() => {
    void (async () => {
      const token = await user?.getIdToken();
      if (!token) return;
      try {
        const { data } = await axios.get<{ msg: UserResponse[] }>(
          `${env.NEXT_PUBLIC_API_URL}/api/user/`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setAllUsers(data.msg);
      } catch (e) {
        console.error(e);
      }
    })();

    void (async () => {
      const token = await user?.getIdToken();
      if (!token) return;
      try {
        const { data } = await axios.get<{ msg: UserResponse }>(
          `${env.NEXT_PUBLIC_API_URL}/api/user/me`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setTeamLeader(data.msg.username);
      } catch (e) {
        console.error(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ----------------------------- Handlers ----------------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPEG, PNG, or WebP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setVerificationPhoto(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Collect all member usernames from dynamic fields
    const memberUsernames = Object.entries(formData)
      .filter(([key, value]) => key.startsWith("member") && typeof value === "string" && value.trim() !== "")
      .map(([_, username]) => username as string);

    setFormData((prevData) => ({ ...prevData, members: memberUsernames }));

    // Validate payment fields if registration fee > 0
    if (event && event.registrationFee > 0) {
      if (!formData.transactionId?.trim()) {
        toast.error('Transaction ID is required for paid events');
        return;
      }
      if (!verificationPhoto) {
        toast.error('Payment verification screenshot is required');
        return;
      }
    }

    // Move to next step (team preview)
    setStep(2);
  };



  const handleConfirm = async () => {
    toast.promise(
      (async () => {
        try {
          if (!user) throw new Error("User not authenticated");
          if (!event) throw new Error("Event data not loaded");

          const membersList = Array.isArray(formData.members) ? formData.members : [];
          const filteredMembers = membersList.filter(
            (m: string) => m !== teamLeader,
          );
          const token = await user.getIdToken();

          // Create FormData for multipart/form-data
          const formDataToSend = new FormData();

          // Add members
          filteredMembers.forEach((member) => {
            formDataToSend.append('members', member);
          });

          // Add extraInformation
          formDataToSend.append('extraInformation', JSON.stringify([]));

          // Only add team name for team events (maxTeamSize > 1)
          if (event.maxTeamSize > 1) {
            if (!formData.teamName?.trim()) {
              throw new Error("Team name is required for team events");
            }
            formDataToSend.append('name', formData.teamName);
          }

          // Add payment details if registration fee > 0
          if (event.registrationFee > 0) {
            if (formData.transactionId?.trim()) {
              formDataToSend.append('transactionId', formData.transactionId);
            }
            if (verificationPhoto) {
              formDataToSend.append('verificationPhoto', verificationPhoto);
            }
          }

          await axios.post(
            `${env.NEXT_PUBLIC_API_URL}/api/team/event/${id}/add`,
            formDataToSend,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            },
          );

          setStep(3);
        } catch (err) {
          if (err instanceof ZodError) {
            console.error("Validation errors:", err.errors);
            throw err;
          }

          if (axios.isAxiosError(err)) {
            const msg = (err.response?.data as { msg?: string })?.msg ?? "Registration failed.";
            throw new Error(msg);
          }

          throw new Error("Unexpected error during registration.");
        }
      })(),
      {
        loading: "Registering...",
        success: "Registration successful!",
        error: (e) =>
          e instanceof Error ? e.message : "An unknown error occurred.",
      },
    );
  };




  if (loading || showAuthRequired)
    return (
      <div className="flex h-screen font-bankGothik w-screen items-center justify-center text-xl text-white">
        {loading ? (
          "Loading..."
        ) : (
          <main className="flex min-h-screen items-center justify-center bg-black px-6">
            <div className="max-w-md text-center">
              <h1 className="mb-4 font-bankGothik text-3xl font-bold text-white">
                AUTHENTICATION REQUIRED
              </h1>
              <p className="mb-6 font-bankGothik text-lg text-gray-300">
                Please sign in.
              </p>
              <div className="flex items-center justify-center">
                <Login />
              </div>
            </div>
          </main>
        )}
      </div>
    );

  /* Render Steps */
  return (
    <div className="min-h-screen clip-angled w-screen animate-glowMove bg-[#000000] bg-red-grid bg-[length:100%_100%,100%_100%,50px_50px,50px_50px,50px_50px] bg-fixed bg-[position:0_0,0_0,25px_25px,0_0,0_0] text-white font-[Orbitron] tracking-widest flex flex-col items-center justify-start px-6 py-12 overflow-hidden pt-[5rem]">
      {/* STEP 1 */}
      {step === 1 && (
        <div className="relative w-full max-w-7xl overflow-y-auto">
          {/* Registration Form */}
          <div className="relative z-10 flex flex-col justify-start items-center min-h-screen text-white space-y-2 md:space-y-4 px-4 text-left py-8">
            <h1 className="text-xl lg:text-6xl font-bankGothik uppercase tracking-widest font-weight: 700 text-nowrap">
              Registration Form
            </h1>
            <h2 className="text-xl lg:text-4xl font-bankGothik font-weight: 700">
              Event : <span className="text-red-600">{event?.name}</span>
            </h2>
            <div className="text-base lg:text-xl text-left font-bankGothik text-gray-300">
              Team Size: <span className="text-white text-2xl">{event?.minTeamSize}</span> - <span className="text-white text-2xl">{event?.maxTeamSize}</span> members
            </div>
            
            {/* Registration Fee Display - Variable or Fixed */}
            <div className="text-base lg:text-3xl font-bankGothik text-gray-300">
              {event?.description?.includes('Registration Fee: Variable') ? (
                (() => {
                  const lines = event.description.split(/\r?\n|(?=o\s*₹)/g);
                  const noteIndex = lines.findIndex(line => line.includes('Registration Fee: Variable'));
                  const fees = lines.slice(noteIndex + 1).filter(line => /₹\d+/.test(line));
                  
                  return (
                    <div className="flex flex-col space-y-2">
                      <span>Registration Fee: <span className="text-white">Variable</span></span>
                      <ul className="list-disc ml-6 text-sm lg:text-xl text-white">
                        {fees.map((fee, idx) => (
                          <li key={idx}>{fee.replace(/^o\s*/, '')}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })()
              ) : (
                <>
                  Registration Fee: <span className="text-white">{event?.registrationFee}</span> INR
                </>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-2 md:space-y-6 mt-4 md:mt-8 w-full max-w-[95%] md:max-w-3xl"
            >
              {/* Team Name field - only show if not solo event */}
              {event && event.maxTeamSize > 1 && (
                <div className="flex items-center gap-2 md:gap-4 relative w-full">
                  <label
                    htmlFor="teamName"
                    className="bg-[#8B75D980] px-2 md:px-6 py-1.5 md:py-3 uppercase text-[10px] md:text-md tracking-wide font-semibold flex-shrink-0 w-36 md:w-56 font-bankGothik text-center"
                  >
                    Team Name
                  </label>
                  <div className="absolute left-[9.2rem] md:left-[14.5rem] top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                    <Image src={arrowRight} alt="Right Arrow" width={10} height={10} className="md:w-[15px] md:h-[15px]" />
                  </div>
                  <input
                    id="teamName"
                    name="teamName"
                    type="text"
                    onChange={handleChange}
                    value={formData.teamName}
                    className="flex-grow min-w-0 bg-[#A4000040] bg-opacity-70 placeholder-red-400 text-white font-bankGothik py-1.5 md:py-3 px-2 pl-4 md:px-4 md:pl-10 text-xs md:text-base focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                    placeholder="Team Name"
                    required
                  />
                </div>
              )}

              {/* Team Leader field - auto-filled, read-only */}
              <div className="flex items-center gap-2 md:gap-4 relative w-full">
                <label
                  htmlFor="teamLeader"
                  className="bg-[#8B75D980] px-2 md:px-6 py-1.5 md:py-3 uppercase text-[10px] md:text-md tracking-wide font-semibold flex-shrink-0 w-36 md:w-56 font-bankGothik text-center"
                >
                  Team Leader
                </label>
                <div className="absolute left-[9.2rem] md:left-[14.5rem] top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                  <Image src={arrowRight} alt="Right Arrow" width={10} height={10} className="md:w-[15px] md:h-[15px]" />
                </div>
                <input
                  id="teamLeader"
                  name="teamLeader"
                  type="text"
                  value={teamLeader}
                  className="flex-grow min-w-0 bg-[#A4000040] bg-opacity-70 placeholder-red-400 text-white font-bankGothik py-1.5 md:py-3 px-2 pl-4 md:px-4 md:pl-10 text-xs md:text-base focus:outline-none focus:ring-2 focus:ring-red-600 transition cursor-not-allowed"
                  placeholder="Team Leader"
                  readOnly
                  required
                />
              </div>

              {/* Dynamic member fields based on maxTeamSize - 1 (excluding leader) */}
              {event && Array.from({ length: event.maxTeamSize - 1 }, (_, index) => {
                const memberNum = index + 1;
                const fieldName = `member${memberNum}`;
                return (
                  <div key={fieldName} className="flex items-center gap-2 md:gap-4 relative w-full">
                    <label
                      htmlFor={fieldName}
                      className="bg-[#8B75D980] px-2 md:px-6 py-1.5 md:py-3 uppercase text-[10px] md:text-md tracking-wide font-semibold flex-shrink-0 w-36 md:w-56 font-bankGothik text-center"
                    >
                      Member {memberNum}
                    </label>
                    <div className="absolute left-[9.2rem] md:left-[14.5rem] top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                      <Image src={arrowRight} alt="Right Arrow" width={10} height={10} className="md:w-[15px] md:h-[15px]" />
                    </div>
                    <div className="relative flex-grow min-w-0">
                      <CommandMenu
                        allUsers={allUsers}
                        value={String(formData[fieldName] ?? "")}
                        setValue={(username: string) => {
                          setFormData((prevData) => ({
                            ...prevData,
                            [fieldName]: username,
                          }));
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Payment fields - only show if registration fee > 0 */}
              {event && event.registrationFee > 0 && (
                <>
                  <div className="pt-4 border-t border-red-700/30">
                    <h3 className="text-center text-lg md:text-2xl font-bankGothik text-red-500 mb-4">
                      Payment Details
                    </h3>
                  </div>

                  {/* UPI QR Code Display */}
                  {event?.upiQrCode && (
                    <div className="flex flex-col items-center space-y-2 my-4 p-4 bg-white/10 rounded-lg border border-red-700/50">
                      <p className="text-sm md:text-base font-bankGothik text-cyan-400">
                        Scan QR Code to Pay ₹{event?.registrationFee}
                      </p>
                      <div className="relative w-48 h-48 md:w-64 md:h-64 bg-white rounded-lg p-2">
                        <Image
                          src={event?.upiQrCode}
                          alt="UPI QR Code for Payment"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <p className="text-xs md:text-sm text-gray-400 text-center">
                        After payment, enter transaction ID and upload screenshot below
                      </p>
                    </div>
                  )}

                  {/* Transaction ID */}
                  <div className="flex items-center space-x-1 md:space-x-2 relative">
                    <label
                      htmlFor="transactionId"
                      className="bg-[#8B75D980] px-2 md:px-6 py-1.5 md:py-3 uppercase text-[10px] md:text-md tracking-wide font-semibold flex-shrink-0 w-28 md:w-60 font-bankGothik text-center"
                    >
                      Transaction ID
                    </label>

                    <div className="absolute left-[6.8rem] md:left-[calc(14.35rem)] top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                      <Image src={arrowRight} alt="Right Arrow" width={10} height={10} className="md:w-[15px] md:h-[15px]" />
                    </div>

                    <input
                      id="transactionId"
                      name="transactionId"
                      type="text"
                      onChange={handleChange}
                      value={formData.transactionId ?? ""}
                      className="flex-grow bg-[#A4000040] bg-opacity-70 placeholder-red-400 text-white font-bankGothik py-1.5 md:py-3 px-2 pl-4 md:px-4 md:pl-10 text-xs md:text-base focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                      placeholder="Enter Transaction ID"
                      required
                    />
                  </div>

                  {/* Payment Screenshot Upload */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-1 md:space-x-2 relative">
                      <label
                        htmlFor="verificationPhoto"
                        className="bg-[#8B75D980] px-2 md:px-6 py-1.5 md:py-3 uppercase text-[10px] md:text-md tracking-wide font-semibold flex-shrink-0 w-28 md:w-60 font-bankGothik text-center cursor-pointer"
                      >
                        Payment Proof
                      </label>

                      <div className="absolute left-[6.8rem] md:left-[calc(14.35rem)] top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                        <Image src={arrowRight} alt="Right Arrow" width={10} height={10} className="md:w-[15px] md:h-[15px]" />
                      </div>

                      <div className="flex-grow bg-[#A4000040] bg-opacity-70 py-1.5 md:py-3 px-2 pl-4 md:px-4 md:pl-10">
                        <input
                          id="verificationPhoto"
                          name="verificationPhoto"
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={handleFileChange}
                          className="hidden"
                          required
                        />
                        <label
                          htmlFor="verificationPhoto"
                          className="cursor-pointer text-white font-bankGothik text-xs md:text-base flex items-center justify-between"
                        >
                          <span className="text-red-400">
                            {verificationPhoto ? (verificationPhoto.name.length > 20 ? `${verificationPhoto.name.slice(0, 20)}...` : verificationPhoto.name) : "Upload Payment Screenshot"}
                          </span>
                          <span className="text-cyan-400 text-xs">
                            {verificationPhoto ? "✓ Uploaded" : "Max 5MB"}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Image Preview */}
                    {photoPreview && (
                      <div className="flex justify-center mt-4">
                        <div className="relative w-full max-w-md h-48 md:h-64 border-2 border-red-700 rounded-lg overflow-hidden">
                          <Image
                            src={photoPreview}
                            alt="Payment verification preview"
                            fill
                            className="object-contain"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setVerificationPhoto(null);
                              setPhotoPreview(null);
                            }}
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </form>
            <CustomButton
              text="Register"
              onClick={() => {
                const form = document.querySelector('form');
                if (form) {
                  form.requestSubmit();
                }
              }}
              className="mt-6"
              width={150}
              height={50}
              fontSize={18}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="relative w-full max-w-7xl overflow-y-auto">
          <div className="relative z-10 flex flex-col justify-start items-center min-h-screen text-white space-y-3 md:space-y-6 px-4 py-8">
            <h1 className="text-2xl md:text-6xl uppercase tracking-widest font-bold">
              TEAM DETAILS
            </h1>
            <h2 className="text-lg md:text-4xl font-bold">
              Team Name : <span className="text-red-600">{formData.teamName || teamLeader}</span>
            </h2>
            <div className="text-xs md:text-xl font-bankGothik text-gray-300">
              Team Size Requirements: <span className="text-cyan-400">{event?.minTeamSize}</span> - <span className="text-cyan-400">{event?.maxTeamSize}</span> members
            </div>

            {/* Payment Information Display */}
            {event && event.registrationFee > 0 && (
              <div className="bg-red-900/20 border border-red-700 p-3 md:p-4 rounded-md w-full max-w-[95%] md:max-w-2xl mb-4">
                <h3 className="text-center text-lg md:text-xl font-bankGothik text-red-400 mb-2">
                  Payment Information
                </h3>
                <div className="space-y-2 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transaction ID:</span>
                    <span className="text-white font-mono">{formData.transactionId}</span>
                  </div>
                  {photoPreview && (
                    <div className="mt-2">
                      <p className="text-gray-400 mb-2">Payment Verification:</p>
                      <div className="relative w-full h-32 md:h-40 border border-red-700 rounded overflow-hidden">
                        <Image
                          src={photoPreview}
                          alt="Payment verification"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-black bg-opacity-30 p-3 md:p-6 rounded-md space-y-2 md:space-y-4 w-full max-w-[95%] md:max-w-2xl">
              {/* Team Leader */}
              {teamLeader && (
                <div className="flex items-center space-x-2 md:space-x-4 relative">
                  <div className="relative w-10 h-10 md:w-14 md:h-14 flex-shrink-0">
                    <Image
                      src={TeamLogo2}
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

                  <div className="relative w-52 h-14 md:w-72 md:h-20 flex-shrink-0">
                    <Image
                      src={TeamBorder2}
                      alt="Border"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute top-1/2 left-3 md:left-6 transform -translate-y-1/2">
                      <p className="text-sm md:text-lg font-semibold truncate max-w-[120px] md:max-w-none">{allUsers.find(u => u.username === teamLeader)?.firstName ?? teamLeader}</p>
                      <p className="text-xs md:text-sm text-blue-400 truncate max-w-[120px] md:max-w-none">@{teamLeader}</p>
                    </div>
                    <span className="absolute top-4 md:top-7 right-3 md:right-6 text-red-500 font-bold text-[10px] md:text-sm">
                      LEADER
                    </span>
                  </div>
                </div>
              )}

              {/* Team Members */}
              {Object.entries(formData)
                .filter(([key, value]) => key.startsWith("member") && typeof value === "string" && value.trim() !== "")
                .map(([key, username]) => {
                  const user = allUsers.find(u => u.username === username);
                  return (
                    <div key={key} className="flex items-center space-x-2 md:space-x-4 relative">
                      <div className="relative w-10 h-10 md:w-14 md:h-14 flex-shrink-0">
                        <Image
                          src={TeamLogo1}
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

                      <div className="relative w-52 h-14 md:w-72 md:h-20 flex-shrink-0">
                        <Image
                          src={TeamBorder1}
                          alt="Border"
                          fill
                          className="object-contain"
                        />
                        <div className="absolute top-1/2 left-3 md:left-6 transform -translate-y-1/2">
                          <p className="text-sm md:text-lg font-semibold truncate max-w-[180px] md:max-w-none">{user?.firstName ?? username}</p>
                          <p className="text-xs md:text-sm text-blue-400 truncate max-w-[180px] md:max-w-none">@{username}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Register Button Below Team Details */}
            <CustomButton
              text="Confirm"
              onClick={() => handleConfirm()}
              className="mt-8"
              width={200}
              height={50}
              fontSize={18}
            />
          </div>
        </div>
      )}

      {/* STEP 3: CONGRATULATIONS POPUP */}
      {step == 3 && (
        <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[90%] md:w-[58rem] h-[600px] sm:h-[500px] md:h-[36rem] px-4">
          <div className="relative w-full h-full scale-[0.9] md:scale-[.75]">
            <Image
              src={CongratulationBorder}
              alt="Congratulation Border"
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white space-y-2 translate-y-6 lg:translate-y-0 md:space-y-4 px-4">
              <h1 className="text-xl md:text-4xl font-nyxerinfont-bold">Congratulations!</h1>
              <p className="text-sm md:text-2xl font-bankGothik text-red-600 font-semibold">
                You have successfully registered for the event.
              </p>
              <p className="text-sm md:text-2xl text-[#F40004] font-nyxerin font-semibold">{event?.name}</p>
              <Link href="/dashboard">
                <CustomButton
                  text="Go to Dashboard"
                  height={100}
                  width={250}
                  fontSize={14}
                  className="scale-50 md:scale-75 lg:scale-100 -translate-y-4 lg:-translate-y-0"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterTeam;


