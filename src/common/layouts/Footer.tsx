import Link from "next/link";
import React from "react";
import {FaGithubAlt} from "react-icons/fa";
import {FaLinkedin} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="z-10 w-full min-h-[45px] bg-[var(--brown)] border-t-2 border-[var(--light-brown)]/25 flex justify-center items-center">
      <div className="max-w-[1200px] px-2 w-full flex h-full items-center justify-between flex-wrap gap-y-5 py-4">
        <div className="flex justify-center items-center flex-wrap gap-x-10 gap-y-5 ">
          <div className="flex justify-center items-center gap-2">
            <p className="text-green-400 font-semibold text-sm">
              Maeli Palharini - Backend
            </p>
            <div className="flex gap-2">
              {" "}
              <Link
                href="https://github.com/MaeliPalharini"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FaGithubAlt size={20} className="cursor-pointer text-white" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/maeli-palharini/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FaLinkedin
                  size={20}
                  className="text-blue-500 cursor-pointer rounded-xs bg-white"
                />
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2">
            <p className="text-rose-400 font-semibold text-sm">
              Stephanie Gurgel - Frontend
            </p>
            <div className="flex gap-2">
              <Link
                href="https://github.com/Steph7478"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FaGithubAlt size={20} className="cursor-pointer text-white" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/stephanie-gurgel-7998aa35b"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FaLinkedin
                  size={20}
                  className="text-blue-500 cursor-pointer rounded-xs bg-white"
                />
              </Link>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-300 flex-wrap">
          © 2025 Stephanie Gurgel e Maeli Palharini. Design inspirado no
          trabalho de{" "}
          <Link
            href="https://www.figma.com/@toskautd"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Toska
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
