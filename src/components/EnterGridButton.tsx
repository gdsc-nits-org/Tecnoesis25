import localFont from "next/font/local";

const tronFont = localFont({
  src: "../../public/tron.ttf",
  display: "swap",
});

interface EnterGridButtonProps {
  onClick: () => void;
  visible: boolean;
  position: { x: number; y: number };
}

export default function EnterGridButton({
  onClick,
  visible,
  position,
}: EnterGridButtonProps) {
  if (!visible) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label="Navigate to home page"
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      className={`
        ${tronFont.className}
        animate-fade-in
        z-50 flex h-24 w-24 cursor-pointer items-center justify-center rounded-full
        border-2 border-[#00e5ff] bg-[rgba(0,229,255,0.05)]
        text-sm text-[#00e5ff] shadow-[0_0_15px_#00e5ff,0_0_30px_rgba(0,229,255,0.4)] backdrop-blur-sm
        transition-all 
        duration-300
        ease-in-out hover:scale-110
        hover:shadow-[0_0_25px_#00e5ff,0_0_50px_rgba(0,229,255,0.7)]
        focus:outline-none
        focus:ring-2
        focus:ring-[#00e5ff]
        focus:ring-offset-2
        focus:ring-offset-black active:scale-95 sm:h-28 sm:w-28 sm:text-base
        md:h-32 md:w-32 md:text-lg
        lg:h-36
        lg:w-36
        lg:text-xl
      `}
    >
      Enter
    </button>
  );
}
