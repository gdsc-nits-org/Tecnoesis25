"use client";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import { auth } from "~/app/utils/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { env } from "~/env";

interface UserResponse {
    username: string;
    firstName: string;
    lastName: string;
}

const Login = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const [_user, _loading] = useAuthState(auth);
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        const checkUserFirstTime = async () => {
            if (!_user) return;
            try {
                const token = await _user.getIdToken();
                const res = await axios.get<{ msg: UserResponse }>(
                    `${env.NEXT_PUBLIC_API_URL}/api/user/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                setUserName(() => res.data.msg.username);
                setFirstName(() => res.data.msg.firstName);
                setLastName(() => res.data.msg.lastName);
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    if (e.status === 404) {
                        router.push("/userSignup");
                    }
                } else {
                    toast.error("Firebase Backend Auth Error");
                }
            }
        };
        void checkUserFirstTime();
    }, [_user, userName, setUserName, router, user]);

    if (error) {
        console.log("Firebase Error", error);
    }
    if (loading || _loading) {
        return (
            <div className="flex w-[12vw] items-center justify-center gap-3 bg-transparent backdrop-blur-lg">
                <LoaderCircle className="animate-spin" size={60} />
            </div>
        );
    }

    if (!_user) {
        return (
            <StyledButton
                onClick={async () => {
                    await signInWithGoogle();
                }}
                isLoggedIn={false}
            >
                Sign In
            </StyledButton>
        );
    }

    return (
        <ProfileCard
            photoURL={_user.photoURL}
            displayName={_user.displayName}
            userName={userName}
            firstName={firstName}
            lastName={lastName}
        />
    );
};

const StyledButton = ({
    onClick,
    children,
    isLoggedIn,
}: {
    onClick: () => void;
    children: React.ReactNode;
    isLoggedIn: boolean;
}) => {
    const [hovered, setHovered] = useState(false);

    if (isLoggedIn) {
        return (
            <button
                onClick={onClick}
                className="group relative flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-white"
            >
                {children}
            </button>
        );
    }

    return (
        <div
            className="group relative cursor-pointer overflow-hidden rounded-md px-4 py-1 font-semibold text-black"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            <div
                className={`absolute left-[18%] top-1 h-[80%] w-[0.25rem] bg-white transition-all duration-700 ease-in-out ${hovered ? "translate-x-[1500%]" : ""
                    }`}
                style={{
                    transform: hovered
                        ? "translateX(8.5rem) skewX(-23deg)"
                        : "skewX(-23deg)",
                    zIndex: 0,
                }}
            ></div>

            <div className="relative z-10">
                <Image
                    src={hovered ? "/LoginState2.svg" : "/LoginState1.svg"}
                    alt="Sign In"
                    width={200}
                    height={60}
                    className="transition-transform duration-300 group-hover:scale-105"
                />
            </div>
        </div>
    );
};

export default Login;
interface UserCred {
    photoURL: string | null | undefined;
    displayName: string | null | undefined;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    userName: string | null | undefined;
}
const ProfileCard: React.FC<UserCred> = ({
    photoURL,
    userName,
    firstName,
    lastName,
}) => {
    const router = useRouter();
    return (
        <section className="flex w-full justify-center">
            <section
                onClick={() => router.push("/dashboard")}
                className="mx-4 flex w-[250px] cursor-pointer items-center justify-start gap-3 rounded-2xl bg-black/40 px-4 py-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,123,126,0.2)]"
                style={{
                    background: "rgba(0, 0, 0, 0.7)",
                    border: "1px solid rgba(255, 123, 126, 0.3)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 0 20px rgba(255, 123, 126, 0.1)"
                }}
            >
                <div className="relative h-[40px] w-[40px] overflow-hidden rounded-full ring-2 ring-[#FF7B7E]/30">
                    {photoURL && (
                        <Image
                            src={photoURL}
                            layout="fill"
                            objectFit="cover"
                            alt="avatar"
                            className="rounded-full"
                        />
                    )}
                </div>
                <div className="flex flex-col gap-0.5">
                    <h3 className="font-orbitron text-base tracking-wide text-[#FF9595]">
                        {userName}
                    </h3>
                    <span className="font-mono text-sm text-gray-400">
                        {firstName} {lastName}
                    </span>
                </div>
            </section>
        </section>
    );
};