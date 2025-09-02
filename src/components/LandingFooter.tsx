"use client";

import Link from "next/link";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function SocialIcons() {

    return (

        <div className="fixed  left-3 md:left-6 top-[65%] md:top-[40%] scale-[.70] md:scale-100 flex flex-col items-center space-y-6 z-50">
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
