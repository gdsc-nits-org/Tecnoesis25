import Image from "next/image";
import Link from "next/link";
import Footer from "./footer";


export default function PhotoGallery() {
  return (
    <>
      <div
        className="relative min-h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/gallery.png')" }}
      >
        <div className="absolute top-[10%] mobile:text-[2.5rem] laptop:text-[4rem] left-1/2 -translate-x-1/2 space-y-0 text-center">
          <p className="font-nyxerin  leading-tight text-[#F40004]">Photo</p>
          <p className="font-nyxerin  leading-tight text-[#bb1315]">Gallery</p>
        </div>

        <div className="absolute top-[75%] left-1/2 flex mobile:h-20 tablet:h-28 mobile:w-44 tablet:w-56 laptop:h-28 laptop:w-60 -translate-x-1/2 items-center justify-center">
          <Image
            src="/view.png"
            alt="view details"
            layout="fill"
            objectFit="cover"
          />
          <Link href="">
           
            <p className="relative z-10 tracking-widest font-nyxerin cursor-pointer mobile:text-[0.8rem] tablet:text-[1.1rem] laptop:text-lg text-white">
              View  Details
            </p>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}