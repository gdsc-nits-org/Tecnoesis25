"use client";

import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { env } from "~/env";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
interface MerchOptInProps {
  user: User;
  isCollegeMail: boolean;
}

export default function MerchOptIn({ user, isCollegeMail }: MerchOptInProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const warningNotCOllegeMail = () => {
    toast.error("Only NIT Silchar college email addresses are allowed to opt out of merchandise ordering.Login with your college email to proceed.");
  }

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
      <div className="md:max-w-3xl max-w-[80vw] flex items-center justify-center flex-col gap-8 mb-10">
        {/* Main Container */}
        <div
          className="flex flex-col items-center justify-center gap-8 rounded-lg p-8 md:p-12 w-full"
          style={{
            background: "rgba(138, 107, 228, 0.08)",
            border: "1px solid rgba(138, 107, 228, 0.25)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
          }}
        >
          {/* Title */}
          <h1 className="text-center font-bankGothik text-2xl font-bold tracking-wider md:text-3xl lg:text-6xl">
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
              Click the opt out button if you no longer wish to order any of the tshirts by contributing money from BHM.
            </p>
          </div>
          {/* Divider */}
          <div className="w-full ">
            <img
              src="/merch/Partition.svg"
              alt="Partition"
              className="w-full"
            />
          </div>
        </div>
        {/* Pricing Info */}
        <div className="text-center text-lg md:text-xl font-orbitron text-gray-200">
          Each T-shirt is <span className="font-bold text-white">₹479</span>. Buy both for a special combo offer of <span className="font-bold text-white">₹899</span>!
        </div>
        <div className="flex gap-10 flex-col md:flex-row items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <img src="https://res.cloudinary.com/dgnlmdkyq/image/upload/v1761931282/1ffc66d3-a95a-4f7a-86ca-cd75465dc873.png"
              className="h-[15rem] w-[15rem] md:h-[20rem] md:w-[20rem] rounded-md" />
            <p className="text-nowrap text-white text-xl font-orbitron">Tecnoesis T-Shirt</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="https://res.cloudinary.com/dgnlmdkyq/image/upload/v1761931195/53092a19-31a5-4730-aa51-f30b82db75e0.png"
              className="h-[15rem] w-[15rem] md:h-[20rem] md:w-[20rem] rounded-md" />
            <p className="text-nowrap text-white text-xl font-orbitron">Spark T-Shirt</p>
          </div>
        </div>
        <div className="text-center text-xl md:text-2xl font-bankGothik text-gray-200">
          Don&apos;t opt out if you want to buy atleast one tshirt.
        </div>
        <div className="text-center text-xl md:text-2xl font-bankGothik text-gray-200">
          Don&apos;t want to buy merchandise?<br /> Opt out now!
        </div>

        {/* Opt-In Button */}
        <button
          type="button"
          onClick={isCollegeMail ? handleOptOut : warningNotCOllegeMail}
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
