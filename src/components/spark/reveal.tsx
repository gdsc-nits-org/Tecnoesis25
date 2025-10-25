import Image from "next/image";

export default function SparkReveal() {
  return (
    <div className="relative w-screen h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/overlay.png')" }}>

      <div className="absolute top-8 left-1/2  transform -translate-x-1/2 flex flex-col items-center">

        <div className="flex laptop:flex-row mobile:flex-col text-5xl tablet:text-7xl  laptop:text-6xl laptop:gap-6 mobile:gap-0 items-center justify-center">
          <p className="font-nyxerin bg-gradient-to-r from-[#520095] via-[#B46EFF] to-[#6200A9] bg-clip-text text-transparent mobile2:scale-110 ipadpro:scale-125 laptop:scale-100">
            OTHER
          </p>
          <p className="font-nyxerin bg-gradient-to-r from-[#520095] via-[#B46EFF] to-[#6200A9] bg-clip-text text-transparent mobile2:scale-110 ipadpro:scale-125 laptop:scale-100">
            ARTISTS
          </p>
        </div>

        <div className="flex laptop:flex-row mobile:flex-col text-4xl tablet:text-7xl ipadpro:pt-10 laptop:pt-2 laptop:text-6xl laptop:gap-6 mobile:gap-0 pt-4 items-center justify-center">
          <p className="font-nyxerin tracking-widest text-transparent  mobile2:scale-110 ipadpro:scale-125  laptop:scale-100 " style={{ WebkitTextStroke: "0.5px white", WebkitTextFillColor: "transparent" }}>
            REVEALING
          </p>
          <p className="font-nyxerin tracking-widest text-transparent  mobile2:scale-110 ipadpro:scale-125  laptop:scale-100 " style={{ WebkitTextStroke: "0.5px white", WebkitTextFillColor: "transparent" }}>
            SOON
          </p>
        </div>

        <div className="relative flex flex-col text-9xl tablet:text-[10rem] laptop:text-9xl  ipadpro:-mt-1 laptop:scale-100 items-center -mt-6">
          <p className="font-sefa rotate-[7.19deg] relative scale-[0.65] mobile2:scale-75 ipadpro:scale-105 left-[-10%] bakbak-one-regular text-white">
            स्पार्क
          </p>
          <p className="font-sefa relative left-[26%] scale-[0.65] mobile2:scale-75 ipadpro:scale-105 bg-gradient-to-r from-[#520095] via-[#B46EFF] to-[#6200A9] bg-clip-text text-transparent -mt-12">
            Night
          </p>
        </div>
      
      </div>

      
      <div className="absolute bottom-0 w-full h-[50vh] mobile1:h-[60vh] mobile2:h-[55vh] laptop:hidden">
        <Image
          src="/crowd.png"
          alt="crowd"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

     
      <div className="absolute bottom-0 w-full h-auto hidden laptop:block">
        <Image
          src="/crowd.png"
          alt="crowd"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>

    </div>
  );
}
