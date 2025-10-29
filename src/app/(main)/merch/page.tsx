"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import axios from "axios";
import { env } from "~/env";
import TecnoTshirt from "~/components/TecnoTshirt";
import MerchOptIn from "~/components/MerchOptIn";

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

  // Not authenticated - redirect to login/signup
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
          <button
            onClick={() => router.push("/userSignup")}
            className="font-bankGothik text-xl font-bold tracking-wide text-black transition-transform hover:scale-105 active:scale-95"
            style={{
              backgroundColor: "#8A6BE4",
              clipPath:
                "polygon(6% 0%, 38% 0%, 41% 14%, 68% 14%, 71% 0%, 94% 0%, 97% 15%, 100% 50%, 97% 85%, 94% 100%, 71% 100%, 68% 86%, 32% 86%, 29% 100%, 6% 100%, 3% 85%, 0% 50%, 3% 15%)",
              width: "220px",
              height: "60px",
            }}
          >
            SIGN IN
          </button>
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
