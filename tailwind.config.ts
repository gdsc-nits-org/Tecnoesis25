import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        nyxerin: ["Nyxerin", "sans-serif"],
        bankgothic: ["BankGothic", "sans-serif"],
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
    },
  },
  plugins: [],
} satisfies Config;
