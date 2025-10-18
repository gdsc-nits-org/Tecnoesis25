"use client";

import Link from "next/link";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function SocialIcons() {
  return (
    <div className="fixed  left-3 top-[65%] z-50 flex scale-[.70] flex-col items-center space-y-6 md:left-6 md:top-[40%] md:scale-100">
      <Link
        href="https://www.instagram.com/tecnoesis.nits/"
        target="_blank"
        rel="noopener noreferrer"
        className="tron-icon"
      >
        <FaInstagram className="icon" />
      </Link>

      <Link
        href="https://www.facebook.com/tecnoesis.nits"
        target="_blank"
        rel="noopener noreferrer"
        className="tron-icon"
      >
        <FaFacebookF className="icon" />
      </Link>
    </div>
  );
}
