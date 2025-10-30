"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import axios from "axios";
import { env } from "~/env";
import TecnoTshirt from "~/components/TecnoTshirt";
import MerchOptIn from "~/components/MerchOptIn";
import Login from "~/components/GoogleAuth";

export default function MerchPage() {
  const [user, loading] = useAuthState(auth);
  const [hasOptedIn, setHasOptedIn] = useState<boolean | null>(null);
  const [checkingOptIn, setCheckingOptIn] = useState(true);
  const router = useRouter();

  // Check if user has opted in for merchandise
  useEffect(() => {
    const checkOptInStatus = async () => {
      if (!user) {
        setCheckingOptIn(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        const { data } = await axios.get<{ msg: { hasOpted: boolean } }>(
          `${env.NEXT_PUBLIC_API_URL}/api/user/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Response structure is { msg: { hasOpted: boolean } }
        setHasOptedIn(data.msg.hasOpted);
      } catch (error) {
        console.error("Error checking opt-in status:", error);
        setHasOptedIn(false);
      } finally {
        setCheckingOptIn(false);
      }
    };

    void checkOptInStatus();
  }, [user]);

  // Loading state
  if (loading || checkingOptIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
          <p className="font-bankGothik text-lg text-white">Loading...</p>
        </div>
      </main>
    );
  }

  // Not authenticated - show sign-in component
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6">
        <div className="max-w-md text-center">
          <h1 className="mb-4 font-bankGothik text-3xl font-bold text-white">
            AUTHENTICATION REQUIRED
          </h1>
          <p className="mb-6 font-bankGothik text-lg text-gray-300">
            Please sign in to access the merchandise store.
          </p>
          <div className="flex items-center justify-center">
            <Login />
          </div>
        </div>
      </main>
    );
  }

  // Show opt-in form if user hasn't opted in yet
  if (!hasOptedIn) {
    return (
      <main className="min-h-screen bg-black">
        <MerchOptIn user={user} onOptInSuccess={() => setHasOptedIn(true)} />
      </main>
    );
  }

  // Show merchandise ordering page
  return (
    <main className="min-h-screen bg-black">
      <TecnoTshirt user={user} />
    </main>
  );
}
