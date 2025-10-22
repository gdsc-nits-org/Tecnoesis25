"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';
import RegisterState1 from '../../public/RegisterState1.svg';
import arrowRight from '../../public/about/arrowR.png'

const Registration = () => {
  const fieldsWithEdit = ["member1", "member2", "member3"];
  const router = useRouter();

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-grid-pattern">
      <div className="absolute inset-0 z-0 fade-mask" />

      {/* Register Button Top Right */}
      <button className="absolute top-6 right-6 z-50"
        onClick={() => router.push('/teamDetails')}
      >
        <Image src={RegisterState1} alt="Register" width={250} height={80} />
      </button>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white space-y-4">
        <h1 className="text-6xl font-bankGothik uppercase tracking-widest font-weight: 700">
          Registration Form
        </h1>
        <h2 className="text-4xl font-bankGothik font-weight: 700">
          Event : <span className="text-red-600">ROBOTRON</span>
        </h2>

        <form className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault(); 
            router.push('/teamDetails'); 
          }}
        >
          {[
            { label: "Team Name", name: "teamName", type: "text" },
            { label: "Team Leader", name: "teamLeader", type: "text" },
            { label: "Phone Number", name: "phoneNumber", type: "tel" },
            { label: "Scholar ID", name: "scholarId", type: "text" },
            { label: "Member 1", name: "member1", type: "text" },
            { label: "Member 2", name: "member2", type: "text" },
            { label: "Member 3", name: "member3", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex items-center space-x-2 relative">
              <label
                htmlFor={name}
                className="bg-[#8B75D980] px-6 py-3 uppercase text-md tracking-wide font-semibold flex-shrink-0 w-60 font-bankGothik text-center"
              >
                {label}
              </label>

              <div className="absolute left-[calc(14.35rem)] top-1/2 transform -translate-y-1/2 pointer-events-none">
                <Image src={arrowRight} alt="Right Arrow" width={15} height={15} />
              </div>

              {fieldsWithEdit.includes(name) ? (
                <div className="relative flex-grow">
                  <input
                    id={name}
                    name={name}
                    type={type}
                    className="w-full bg-[#A4000040] bg-opacity-70 placeholder-red-400 text-white font-bankGothik py-3 px-4 pl-10 pr-20 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                    placeholder={label}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2  hover:bg-[#26232f] text-[#B5A2FF] px-3 py-1 font-bankGothik font-semibold"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  className="flex-grow bg-[#A4000040] bg-opacity-70 placeholder-red-400 text-white font-bankGothik py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                  placeholder={label}
                  required
                />
              )}
            </div>

          ))}
        </form>
      </div>
    </div>
  );
};

export default Registration;
