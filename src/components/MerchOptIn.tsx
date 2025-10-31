"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { env } from "~/env";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
interface MerchOptInProps {
  user: User;
}

export default function MerchOptIn({ user }: MerchOptInProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  

  const handleOptOut = async () => {
    setIsSubmitting(true);

    toast.promise(
      (async () => {
        try {
          const token = await user.getIdToken();
          await axios.put(
            `${env.NEXT_PUBLIC_API_URL}/api/merch/opt-in`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          router.push('/home');
        } catch (err) {
          if (axios.isAxiosError(err)) {
            const responseData = err.response?.data as { msg?: string };
            throw new Error(
              responseData?.msg ?? "Failed to opt out for merchandise ordering"
            );
          }
          throw err;
        } finally {
          setIsSubmitting(false);
        }
      })(),
      {
        loading: "Opting out for merchandise...",
        success: "Successfully opted out! You cannot order merchandise now.",
        error: (err) => {
          if (err instanceof Error) {
            return err.message;
          }
          return "An error occurred while opting out.";
        },
      }
    );
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center justify-center bg-black px-6 pt-24 text-white md:pt-32"
      style={{
        backgroundImage: "url('/merch/merchbg.svg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-3xl">
        {/* Main Container */}
        <div
          className="flex flex-col items-center gap-8 rounded-lg p-8 md:p-12"
          style={{
            background: "rgba(138, 107, 228, 0.08)",
            border: "1px solid rgba(138, 107, 228, 0.25)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
          }}
        >
          {/* Title */}
          <h1 className="text-center font-bankGothik text-4xl font-bold tracking-wider md:text-5xl lg:text-6xl">
            MERCHANDISE OPT OUT
          </h1>

          {/* Divider */}
          <div className="w-full">
            <img
              src="/merch/Partition.svg"
              alt="Partition"
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="text-center">
            <p className="mb-4 font-bankGothik text-lg leading-relaxed text-gray-200 md:text-xl">
              Welcome to the Tecnoesis Merchandise Store!
            </p>
            <p className="mb-6 font-bankGothik text-base leading-relaxed text-gray-300 md:text-lg">
              Click the opt out button if you no longer wish to order our exclusive limited-edition merchandise by contributing money from BHM.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full">
          <img
            src="/merch/Partition.svg"
            alt="Partition"
            className="w-full"
          />
        </div>

        {/* Opt-In Button */}
        <button
          type="button"
          onClick={handleOptOut}
          disabled={isSubmitting}
          className="font-bankGothik text-xl font-bold tracking-wide text-black transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed md:text-2xl"
          style={{
            backgroundColor: "#8A6BE4",
            clipPath:
              "polygon(6% 0%, 38% 0%, 41% 14%, 68% 14%, 71% 0%, 94% 0%, 97% 15%, 100% 50%, 97% 85%, 94% 100%, 71% 100%, 68% 86%, 32% 86%, 29% 100%, 6% 100%, 3% 85%, 0% 50%, 3% 15%)",
            width: "280px",
            height: "70px",
          }}
        >
          {isSubmitting ? "OPTING OUT..." : "OPT OUT NOW"}
        </button>
      </div>
    </div>
  );
}
