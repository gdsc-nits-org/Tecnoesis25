"use client";
import EventsInfo from "~/components/Dashboard/EventsInfo";
import Profile from "~/components/Dashboard/Profile";

export const runtime = "edge";
const DashBoard = () => {
  return (
    <div 
      className="dashboardpage flex min-h-screen w-[100%] flex-col items-center overflow-x-hidden bg-cover bg-center bg-no-repeat pt-32"
      style={{ backgroundImage: "url('/dashboard/bg.png')" }}
    >
      <div 
        className="text-center font-nyxerin text-[48px] font-normal leading-[40px] tracking-[0.08em] capitalize md:text-[56px] md:leading-[48px] lg:text-[64px] lg:leading-[52px]"
        style={{
          background: 'linear-gradient(90deg, #950002 0%, #FF1D1D 44.31%, #A90003 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Dashboard
      </div>
      <div className="mt-10 flex w-full flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-start lg:px-8">
        <div className="flex flex-row items-center justify-center lg:justify-start">
          <Profile />
        </div>
        <div className="w-100vw scrollbar-hide flex flex-col items-center justify-center lg:h-[65vh] lg:items-start lg:justify-start lg:overflow-y-auto">
          <EventsInfo />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;