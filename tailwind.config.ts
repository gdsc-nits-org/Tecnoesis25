import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        nyxerin: ["Nyxerin", "sans-serif"],
        bankGothik: ["BankGothic", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        sefa: ["sefa", "sans-serif"],              
        bakbak: ["Bakbak One", "sans-serif"],      
      },
      screens: {
        xs: "450px",
        xL: "1360px",
        "4k": "3840px",
        laptop: "1200px",
        mobile: "300px",
        mobile1: "375px",
        mobile2: "400px",
        mobile3: "500px",
        tablet: "750px",
        tablet2: "900px",
        ipadpro: "1000px",
        ipadair: "1180px",
        fourK: "2000px",
      },
      backgroundImage: {
        "red-grid": `
          radial-gradient(circle at 40% 40%, rgba(255, 0, 0, 0.2), transparent 60%),
          radial-gradient(circle at 70% 60%, rgba(255, 0, 0, 0.1), transparent 70%),
          radial-gradient(circle, rgba(255, 0, 0, 0.8) 2px, transparent 2px),
          linear-gradient(to right, rgba(255, 0, 0, 0.2) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 0, 0, 0.2) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        "red-grid": `
          100% 100%,
          100% 100%,
          50px 50px,
          50px 50px,
          50px 50px
        `,
      },
      backgroundPosition: {
        "red-grid": `
          0 0,
          0 0,
          25px 25px,
          0 0,
          0 0
        `,
      },
      keyframes: {
        glowMove: {
          "0%, 100%": {
            backgroundPosition: `
              0 0,
              0 0,
              25px 25px,
              0 0,
              0 0
            `,
          },
          "50%": {
            backgroundPosition: `
              10px 10px,
              -10px -10px,
              28px 28px,
              0 0,
              0 0
            `,
          },
        },
      },
      animation: {
        glowMove: "glowMove 10s ease-in-out infinite alternate",
      },
      clipPath: {
        angled: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
