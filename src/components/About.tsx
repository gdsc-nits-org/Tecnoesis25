"use client";

import Image from "next/image";
import data from "../../public/about/data.json";
import { useState } from "react";
import DecryptedText from "./DecryptedText";

interface DataItem {
  firstWord: string;
  secondWord: string;
  description: string;
}

export default function About() {
  const [index, setIndex] = useState(1);
  const [dataItem, setDataItem] = useState<DataItem>(
    data[0] ?? { firstWord: "", secondWord: "", description: "" },
  );

  function handleNext() {
    setDataItem(
      data[index] ?? { firstWord: "", secondWord: "", description: "" },
    );
    setIndex(index ^ 1);
  }

  return (
    <div
      className="flex h-full w-screen items-center justify-center bg-black bg-cover bg-center sm:h-screen"
      style={{ backgroundImage: "url('/about/bg.png')" }}
    >
      <div
        className="relative flex h-full w-full flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/about/bg.png')" }}
      >
        <div className="relative mb-8 h-screen max-h-[35rem] w-full max-w-[24rem] sm:hidden">
          <Image
            className="absolute h-full w-full"
            src="/about/framemobile.png"
            alt="Frame"
            width={200}
            height={200}
          />
          <div className="border-opacity-1 absolute left-[50%] top-[54%] h-auto w-[80%] translate-x-[-50%] translate-y-[-50%] overflow-hidden  rounded-lg border-[0.3px] border-[#b0adad50] backdrop-blur-sm ">
            <div className="flex flex-col items-center justify-center py-6 lg:py-12">
              <h1
                className="glitch-text py-0 text-center font-nyxerin text-2xl font-bold  text-white"
                data-text={`${data[0]?.firstWord} `}
              >
                {data[0]?.firstWord}
              </h1>
              <h1
                className="glitch-text py-0 text-center font-nyxerin text-2xl font-bold  text-white"
                data-text={`${data[0]?.secondWord} `}
              >
                {data[0]?.secondWord}
              </h1>
            </div>
            <p className="font-bankGothik mx-auto px-4 pb-6 text-justify text-xs leading-relaxed text-white lg:px-8">
              {data[0]?.description}
            </p>
          </div>
        </div>
        <div className="relative h-screen max-h-[35rem] w-full max-w-[24rem] sm:hidden">
          <Image
            className="absolute h-full w-full"
            src="/about/framemobile.png"
            alt="Frame"
            width={200}
            height={200}
          />
          <div className="border-opacity-1 absolute left-[50%] top-[54%] h-auto w-[80%] translate-x-[-50%] translate-y-[-50%] overflow-hidden  rounded-lg border-[0.3px] border-[#b0adad50] backdrop-blur-sm ">
            <div className="flex flex-col items-center justify-center py-6 lg:py-12">
              <h1
                className="glitch-text py-0 text-center font-nyxerin text-2xl font-bold  text-white"
                data-text={`${data[1]?.firstWord} `}
              >
                {data[1]?.firstWord}
              </h1>
              <h1
                className="glitch-text py-0 text-center font-nyxerin text-2xl font-bold  text-white"
                data-text={`${data[1]?.secondWord} `}
              >
                {data[1]?.secondWord}
              </h1>
            </div>
            <p className="font-bankGothik mx-auto px-4 pb-6 text-justify text-xs leading-relaxed text-white lg:px-8">
              {data[1]?.description}
            </p>
          </div>
        </div>
        <div className="relative hidden  sm:block sm:h-full sm:w-[90%] md:w-[80%] lg:max-w-[75%]">
          <Image
            className="absolute h-full w-full"
            src="/about/frame.png"
            alt="Frame"
            width={900}
            height={900}
          />

          <Image
            className="absolute left-[2%] top-[6%]  h-[50%]  w-[50%] opacity-25 md:w-[40%] "
            src="/about/framebg.png"
            alt="Frame"
            width={400}
            height={400}
          />
          <Image
            className="absolute right-[2%] top-[6%] h-[50%]  w-[50%] opacity-25 md:w-[40%] "
            src="/about/framebg.png"
            alt="Frame"
            width={400}
            height={400}
          />

          <div onClick={handleNext}>
            <Image
              className="duration-120 absolute left-[10%] top-[45%] h-[10%] cursor-pointer transition-transform active:scale-95"
              src="/about/arrowL.png"
              alt="Frame"
              width={40}
              height={40}
            />
          </div>
          <div onClick={handleNext}>
            <Image
              className="duration-120 absolute right-[10%] top-[45%] h-[10%] cursor-pointer transition-transform active:scale-95"
              src="/about/arrowR.png"
              alt="Frame"
              width={40}
              height={40}
            />
          </div>
          <div className="border-opacity-1 absolute left-[50%] top-[54%] h-auto w-[60%] translate-x-[-50%] translate-y-[-50%] overflow-hidden  rounded-lg border-[0.3px] border-[#b0adad50] backdrop-blur-sm ">
            <div className="flex flex-col items-center justify-center py-6 lg:py-8">
              <h1
                className="glitch-text text-center font-nyxerin text-3xl font-bold text-white  lg:text-5xl"
                data-text={`${dataItem.firstWord}`}
              >
                {dataItem.firstWord}
              </h1>
              <h1
                className="glitch-text text-center font-nyxerin text-3xl font-bold text-white  lg:text-5xl"
                data-text={`${dataItem.secondWord}`}
              >
                {dataItem.secondWord}
              </h1>
            </div>
            <p className="font-bankgothic mx-auto px-6 pb-6 text-justify text-sm leading-relaxed text-white lg:px-8">
              {/* {dataItem.description} */}
              <DecryptedText text={dataItem.description} animateOn="view" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
