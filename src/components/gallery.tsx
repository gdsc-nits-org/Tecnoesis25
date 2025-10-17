import Image from "next/image";

export default function PhotoGallery() {
  return (
    <>
      <div
        className="relative min-h-screen w-full bg-center bg-cover xL:bg-contain"
        style={{ backgroundImage: "url('/tech.gif')" }}
      >
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 space-y-0 text-center mobile:text-[2.5rem] laptop:text-[4rem]">
          <p className="font-nyxerin leading-tight text-[#F40004]">Photo</p>
          <p className="font-nyxerin leading-tight text-[#bb1315]">Gallery</p>
        </div>

        
        <div
         
          tabIndex={0}
          className="group absolute cursor-pointer top-[75%] left-1/2 flex -translate-x-1/2 items-center justify-center mobile:h-20 mobile:w-44 tablet:h-28 tablet:w-56 laptop:h-24 laptop:w-58 transition-all duration-300 ease-in-out group-hover:brightness-125"
        >
          <Image
            src="/view1.png"
            alt="view details background"
            layout="fill"
            objectFit="cover"
     
            className="transition-opacity duration-3000 ease-in-out group-hover:opacity-0 group-focus:opacity-0"
          />

          <Image
            src="/view2.png"
            alt="view details background hovered"
            layout="fill"
            objectFit="cover"
       
            className="opacity-0 transition-all duration-3000 ease-in-out group-hover:opacity-100 group-hover:scale-[1.1] group-focus:opacity-100 group-focus:scale-[1.1]"
          />
         

          {/* <Link href="#" className="relative z-10">
            <p className="font-bank cursor-pointer tracking-widest text-white mobile:text-[0.8rem] tablet:text-[1.1rem] laptop:text-lg">
              View Details
            </p>
          </Link> */}
        </div>
      </div>
    </>
  );
}