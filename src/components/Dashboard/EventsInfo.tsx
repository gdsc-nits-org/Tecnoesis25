"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "~/app/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { env } from "~/env";
import PendingInvitations from "./PendingInvitations";
import CompletedEvents from "./CompletedEvents";

interface teamResponse {
  id: string;
  role: string;
  registrationStatus: string;
  team: {
    id: string;
    registrationStatus: string;
    teamName: string;
    extraInformation: string[];
    members: [
      {
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
      },
    ];
  };
}

const EventsInfo = () => {
  const [_user] = useAuthState(auth);
  const [pendinglist, setPendinglist] = useState<teamResponse[]>([]);
  const [allevents, setAllEvents] = useState<teamResponse[]>([]);
  const [token, setToken] = useState<string | null>(null);

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
        const pending = data.msg.filter((item) => {
          const isCurrentUserPending = item.team.members.some(
            (member) =>
              member.id === item.id && member.registrationStatus === "PENDING",
          );
          return isCurrentUserPending;
        });
        setAllEvents(data.msg);
        setPendinglist(pending);
      } catch (err) {
        console.log(err);
      }
    }
    void fetchTeam();
  }, [_user]);

  return (
    <div className="flex w-[80vw] flex-col items-center justify-center gap-8 lg:w-[30vw]">
      {token && <PendingInvitations data={pendinglist} token={token} />}
      {token && <CompletedEvents data={allevents} token={token} />}
    </div>
  );
};

export default EventsInfo;