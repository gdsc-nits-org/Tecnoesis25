import Image from "next/image";
import { GraduationCap, Phone, MapPin, Camera } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { auth } from "~/app/utils/firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { env } from "~/env";
import { toast } from "sonner";

interface UserResponse {
    balance: number;
    collegeName: string;
    email: string;
    firebaseId: string;
    firstName: string;
    id: string;
    imageUrl: string;
    lastName: string;
    middleName: string;
    phoneNumber: string;
    registrationId: string;
    username: string;
}

const Profile = () => {
    const router = useRouter();
    const [_user] = useAuthState(auth);
    const [signOut] = useSignOut(auth);
    const [user, setUser] = useState<UserResponse>();

    const fetchUser = async (token: string) => {
        try {
            const { data } = await axios.get<{ msg: UserResponse }>(
                `${env.NEXT_PUBLIC_API_URL}/api/user/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return data.msg;
        } catch (e) {
            console.error(e);
            return;
        }
    };

    useEffect(() => {
        void (async () => {
            const token = await _user?.getIdToken();
            if (!token) return;
            const res = await fetchUser(token);
            if (res) {
                setUser(res);
            }
        })();
    }, [_user]);

    if (!_user) {
        toast.error("User not SignedIn")
        router.push('/home')
    }

    return (
        <div className="relative w-[80vw] max-w-[550px] sm:w-[85vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw]">
            {/* Parent Container with Border */}
            <div className="relative w-full" style={{ aspectRatio: '564/800' }}>
                {/* Border Image */}
                <Image
                    src="/dashboard/profile_border.png"
                    alt="Profile Border"
                    fill
                    className="pointer-events-none absolute inset-0 z-10 object-contain"
                    priority
                />

                {/* Main Content Inside Border */}
                <div className="relative z-0 flex h-full w-full flex-col items-center justify-between px-8 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 lg:px-20 lg:py-24">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-9">
                        {/* Profile Image */}
                        <div className="relative h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] md:h-[180px] md:w-[180px]">
                            <Image
                                src={user?.imageUrl || "/Avatar.png"}
                                alt="Profile"
                                width={180}
                                height={180}
                                className="h-full w-full rounded-sm object-cover"
                            />

                            {/* Camera Icon Button */}
                            <button className="absolute bottom-[-6px] right-[-6px] flex h-[38px] w-[38px] items-center justify-center rounded-[9.73px] border border-white bg-[#061433]/20 backdrop-blur-[14.98px] transition-all hover:bg-[#061433]/40 sm:h-[42px] sm:w-[42px] md:bottom-[-8px] md:right-[-8px] md:h-[48px] md:w-[48px]">
                                <Camera className="h-4 w-4 text-white sm:h-5 sm:w-5 md:h-6 md:w-6" />
                            </button>
                        </div>

                        {/* Name and Username */}
                        <div className="flex w-full max-w-[221px] flex-col items-center gap-1 px-4">
                            <h2 className="flex w-full items-center justify-center text-center font-nyxerin text-[20px] leading-[24px] text-[#F2F2F2] sm:text-[28px] sm:leading-[31px] md:text-[30.55px] md:leading-[33px]">
                                {user?.firstName} {user?.middleName} {user?.lastName}
                            </h2>
                            <p className="flex w-full items-center justify-center text-center font-nyxerin text-[12px] leading-[13px] text-[#F2F2F2] sm:text-[16px] md:text-[17.48px]">
                                {user?.username}
                            </p>
                        </div>
                    </div>

                    {/* Details Section with Scroll */}
                    <div className="h-[180px] w-full max-w-[326px] overflow-x-hidden overflow-y-auto scrollbar-hide px-4 sm:h-[190px] md:h-[199.59px]">
                        <div className="flex w-full flex-col justify-center gap-4 py-4 pr-2 sm:gap-5 sm:py-5 md:gap-6 md:py-6">
                            {/* College */}
                            <div className="flex w-full items-start gap-2 sm:gap-2.5 md:gap-3">
                                <GraduationCap className="h-[20px] w-[20px] flex-shrink-0 text-[#F2F2F2] sm:h-[26px] sm:w-[26px] md:h-[29.47px] md:w-[29.47px]" />
                                <span className="min-w-0 flex-1 break-words font-bankGothik text-[14px] leading-[18px] text-[#F2F2F2] sm:text-[20px] sm:leading-[22px] md:text-[23.08px] md:leading-[24px]">
                                    {user?.collegeName || "National Institute of Technology, Silchar"}
                                </span>
                            </div>

                            {/* Phone */}
                            <div className="flex w-full items-start gap-2 sm:gap-2.5 md:gap-3">
                                <Phone className="h-[20px] w-[20px] flex-shrink-0 text-[#F2F2F2] sm:h-[26px] sm:w-[26px] md:h-[29.47px] md:w-[29.47px]" />
                                <span className="min-w-0 flex-1 break-words font-outfit text-[14px] leading-[20px] text-[#F2F2F2] sm:text-[20px] sm:leading-[26px] md:text-[23.08px] md:leading-[29px]">
                                    {user?.phoneNumber || "+91 6942069420"}
                                </span>
                            </div>

                            {/* Email */}
                            <div className="flex w-full items-start gap-2 sm:gap-2.5 md:gap-3">
                                <MapPin className="h-[20px] w-[20px] flex-shrink-0 text-[#F2F2F2] sm:h-[26px] sm:w-[26px] md:h-[29.47px] md:w-[29.47px]" />
                                <span className="min-w-0 flex-1 break-words font-bankGothik text-[14px] leading-[18px] text-[#F2F2F2] sm:text-[20px] sm:leading-[22px] md:text-[23.08px] md:leading-[24px]">
                                    {user?.email || "Address"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex w-full max-w-[338.77px] gap-4 px-4 sm:gap-6 md:gap-8">
                        {/* Go to Home Button */}
                        <button
                            onClick={() => router.push("/home")}
                            className="group relative h-auto w-full max-w-[165.01px] flex-1 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <Image
                                src="/dashboard/gotohome.png"
                                alt="Go to Home"
                                width={165}
                                height={35}
                                className="h-auto w-full drop-shadow-[0_0_8px_rgba(209,0,3,0.6)] transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(244,0,4,0.9)]"
                            />
                        </button>

                        {/* Log Out Button */}
                        <button
                            onClick={async () => {
                                await signOut();
                                router.push("/home");
                            }}
                            className="group relative h-auto w-full max-w-[165.01px] flex-1 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <Image
                                src="/dashboard/logout.png"
                                alt="Log Out"
                                width={165}
                                height={35}
                                className="h-auto w-full drop-shadow-[0_0_8px_rgba(86,0,0,0.6)] transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(107,0,0,0.9)]"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;