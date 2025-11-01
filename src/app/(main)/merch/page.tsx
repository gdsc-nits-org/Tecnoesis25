"use client";

import { useEffect, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import axios from "axios";
import { env } from "~/env";

import TecnoTshirt from "~/components/TecnoTshirt";
import MerchOptIn from "~/components/MerchOptIn";
import Login from "~/components/GoogleAuth";
import { toast } from "sonner";

export default function MerchPage() {
  const [user, loading] = useAuthState(auth);
  const [isCollegeMail, setIsCollegeMail] = useState(true);
  const [hasOptedIn, setHasOptedIn] = useState<boolean | null>(null);
  const [checkingOptIn, setCheckingOptIn] = useState(false);
  const [missingProfile, setMissingProfile] = useState(false);
  const router = useRouter();

  const [signOut] = useSignOut(auth);


  useEffect(() => {
    console.log("Has opted in:", hasOptedIn);
  }, [hasOptedIn]);

  // Check if user has opted in for merchandise
  useEffect(() => {
    const checkCollegeMail = () => {
      if (user?.email) {
        const emailDomain = user.email.split("@")[1] ?? "";
        // Match nits.ac.in and any subdomain like ec.nits.ac.in, ee.nits.ac.in, etc.
        // Regex: start or dot before 'nits.ac.in' at the end of the domain
        const nitsRegex = /(^|\.)nits\.ac\.in$/i;
        setIsCollegeMail(nitsRegex.test(emailDomain));
      }
    };

    const checkOptInStatus = async () => {
      if (!user) {
        setHasOptedIn(null);
        setCheckingOptIn(false);
        setMissingProfile(false);
        return;
      }
      setCheckingOptIn(true);
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
        setHasOptedIn(data.msg.hasOpted);
        setMissingProfile(false);
        setCheckingOptIn(false);
      } catch (error) {
        // If error is 404, user profile is missing (not signed up)
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setMissingProfile(true);
          setHasOptedIn(null);
        } else {
          toast.error("Error checking user status. Sign back in.");
          await signOut();
          setHasOptedIn(null);
        }
      }
      setCheckingOptIn(false);
    };

    // set college mail flag immediately
    void checkCollegeMail();
    void checkOptInStatus();
  }, [user]);
  // Loading state
  if (loading) {
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
            Please sign in using <span className="font-bold">college mail</span> to access the merchandise store.
          </p>
          <div className="flex items-center justify-center">
            <Login />
          </div>
        </div>
      </main>
    );
  }

  // Show loading spinner while checking opt-in status
  if (checkingOptIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
          <p className="font-bankGothik text-lg text-white">Checking your user status...</p>
        </div>
      </main>
    );
  }

  // Show opt-out form if user has opted in
  if (hasOptedIn === true) {
    return (
      <main className="min-h-screen bg-black">
        <MerchOptIn user={user} isCollegeMail={isCollegeMail} />
      </main>
    );
  }

  // If user is missing profile (not signed up), redirect to /userSignup
  if (missingProfile && user) {
    if (typeof window !== "undefined") {
      window.location.replace("/userSignup");
    }
    return null;
  }

  // Show merchandise ordering page if user has not opted in (i.e., can order)
  if (user && hasOptedIn === false) {
    return (
      <main className="min-h-screen bg-black text-white text-center font-orbitron px-6 pt-24 md:pt-32 text-2xl">
        Sorry, you have opted out for merchandise ordering!
      </main>
    );
  }

}
