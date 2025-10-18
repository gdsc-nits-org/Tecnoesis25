import Image from "next/image";

const Loader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="relative w-[340px] sm:w-[400px] md:w-[460px] aspect-square">
                {/* Base SVG loader */}
                <Image
                    src="/Loader/loader.svg"
                    alt="Loading..."
                    fill
                    priority
                    className="animate-pulse object-contain"
                />

                {/* Center GIF inside the SVG's empty middle */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src="/Loader/loader.gif"
                        alt="Neon grid animation"
                        width={220}
                        height={220}
                        unoptimized
                        className="object-contain rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Loader;