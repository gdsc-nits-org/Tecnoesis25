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
    data[0] || { firstWord: "", secondWord: "", description: "" },
  );

  function handleNext() {
    setDataItem(
      data[index] || { firstWord: "", secondWord: "", description: "" },
    );
    setIndex(index ^ 1);
  }

  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-black bg-cover bg-center"
      style={{ backgroundImage: "url('/about/bg.png')" }}
    >
      <div
        className="relative flex h-full w-full items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/about/bg.png')" }}
      >
        <div className="relative h-[94%] w-[95%] sm:hidden">
          <Image
            className="absolute h-full w-full"
            src="/about/framemobile.png"
            alt="Frame"
            width={200}
            height={200}
          />
          <div className="border-opacity-1 absolute left-[50%] top-[54%] h-[74%] w-[70%] translate-x-[-50%] translate-y-[-50%] overflow-hidden  rounded-lg border-[0.3px] border-[#b0adad50] backdrop-blur-sm ">
            <div className="flex flex-col items-center justify-center gap-3 py-8 lg:py-12">
              <h1
                className="glitch-text text-center text-2xl font-bold text-white  "
                data-text={`${dataItem.firstWord} `}
              >
                {dataItem.firstWord}
              </h1>
              <h1
                className="glitch-text text-center text-2xl font-bold text-white  "
                data-text={`${dataItem.secondWord} `}
              >
                {dataItem.secondWord}
              </h1>
            </div>
            <p className="mx-auto px-6 pb-6 text-justify text-sm leading-relaxed text-white lg:px-8">
              {dataItem.description}
              {/* <DecryptedText text={dataItem.description} animateOn="view"  /> */}
            </p>
          </div>
        </div>
        <div
          className="relative hidden  sm:block sm:h-[94%] sm:w-[90%] md:w-[80%] lg:max-w-[70%]"
          //   style={{ backgroundImage: "url('/about/bg2.png')" }}
        >
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
              className="duration-120 active:scale-93 absolute left-[10%] top-[45%] h-[10%] cursor-pointer transition-transform"
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
          <div className="border-opacity-1 absolute left-[50%] top-[54%] h-[54%] w-[60%] translate-x-[-50%] translate-y-[-50%] overflow-hidden  rounded-lg border-[0.3px] border-[#b0adad50] backdrop-blur-sm ">
            <div className="flex flex-col items-center justify-center py-8 lg:py-12">
              <h1
                className="glitch-text text-center text-3xl font-bold text-white  lg:text-5xl"
                data-text={`${dataItem.firstWord}`}
              >
                {dataItem.firstWord}
              </h1>
              <h1
                className="glitch-text text-center text-3xl font-bold text-white  lg:text-5xl"
                data-text={`${dataItem.secondWord}`}
              >
                {dataItem.secondWord}
              </h1>
            </div>
            <p className="mx-auto px-6 pb-6 text-justify leading-relaxed text-white lg:px-8">
              {/* {dataItem.description} */}
              <DecryptedText text={dataItem.description} animateOn="view"  />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
