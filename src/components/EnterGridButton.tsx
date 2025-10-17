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
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      className={`
        ${tronFont.className}
        z-50
        w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36
        flex items-center justify-center
        text-sm sm:text-base md:text-lg lg:text-xl
        text-[#00e5ff] 
        bg-[rgba(0,229,255,0.05)]
        border-2 border-[#00e5ff]
        rounded-full
        shadow-[0_0_15px_#00e5ff,0_0_30px_rgba(0,229,255,0.4)]
        hover:shadow-[0_0_25px_#00e5ff,0_0_50px_rgba(0,229,255,0.7)]
        hover:scale-110
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-[#00e5ff] focus:ring-offset-2 focus:ring-offset-black
        transition-all duration-300 ease-in-out
        animate-fade-in
        cursor-pointer
        backdrop-blur-sm
      `}
    >
      Enter
    </button>
  );
}
