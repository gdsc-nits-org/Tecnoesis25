"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "~/app/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { env } from "~/env";
import Profile from "~/components/Dashboard/Profile";
import PendingInvitations from "~/components/Dashboard/PendingInvitations";
import CompletedEvents from "~/components/Dashboard/CompletedEvents";

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

export const runtime = "edge";

const DashBoard = () => {
  const [_user] = useAuthState(auth);
  const [pendinglist, setPendinglist] = useState<teamResponse[]>([]);
  const [allevents, setAllEvents] = useState<teamResponse[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const mytoken = await _user?.getIdToken();
        if (!mytoken) return;
        setToken(mytoken);
        const { data } = await axios.get<{ msg: teamResponse[] }>(
          `${env.NEXT_PUBLIC_API_URL}/api/user/me/my_teams`,
          {
            headers: {
              Authorization: `Bearer ${mytoken}`,
            },
          },
        );
        const pending = data.msg.filter((item) =>
          item.team.members.some(
            (member) =>
              member.id === item.id && member.registrationStatus === "PENDING",
          ),
        );
        setAllEvents(data.msg);
        setPendinglist(pending);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    void fetchTeam();
  }, [_user]);

  return (
    <div
      className="dashboardpage flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-cover bg-center bg-no-repeat pt-32 animate-fade-in"
      style={{ backgroundImage: "url('/dashboard/bg.png')" }}
    >
      <h1
        className="text-center font-nyxerin text-[36px] font-normal leading-[36px] tracking-[0.08em] uppercase sm:text-[48px] sm:leading-[40px] md:text-[56px] md:leading-[48px] lg:text-[64px] lg:leading-[52px] animate-slide-down"
        style={{
          background: 'linear-gradient(90deg, #950002 0%, #FF1D1D 44.31%, #A90003 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Dashboard
      </h1>
      <div className="mt-6 flex w-full max-w-[1400px] flex-col gap-6 px-4 sm:mt-8 sm:gap-8 md:mt-10 md:px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:px-8 lg:mt-16">
        <div className="flex w-full flex-row items-center justify-center lg:w-auto lg:justify-start animate-slide-right">
          <Profile />
        </div>
        <div className="flex w-full flex-col items-center gap-4 sm:gap-6 lg:w-auto lg:items-end animate-slide-left overflow-x-hidden">
          {!isLoading && token && <PendingInvitations data={pendinglist} token={token} />}
          {!isLoading && token && <CompletedEvents data={allevents} token={token} />}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;