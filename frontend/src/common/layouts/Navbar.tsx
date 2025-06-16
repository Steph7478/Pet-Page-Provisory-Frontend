"use client";

import AuthSwitch from "@/hooks/api/useAuthSwitch";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {MdLogout} from "react-icons/md";
import {HiMenuAlt3} from "react-icons/hi";
import {IoCloseSharp} from "react-icons/io5";
import {useLogout} from "@/hooks/api/useLogout";
import {useAuth} from "@/hooks/api/useIsAuth";

const Navbar = () => {
  const {data: user} = useAuth();
  const {mutate: logout} = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {name: "Home", href: "/"},
    {name: "Sobre nós", href: "/sobre"},
  ];

  const isLogout = [
    {name: "Cadastre-se", href: "/signup"},
    {name: "Entrar", href: "/login"},
  ];

  const isLogged = [
    {
      name: "Painel",
      href: user?.role === "adotante" ? `/adotante` : `/anunciante`,
    },
    {name: "Adotar", href: "/adotar"},
  ];

  useEffect(() => {
    document.body.classList.toggle("body-no-scroll", isOpen);
    return () => document.body.classList.remove("body-no-scroll");
  }, [isOpen]);

  return (
    <nav className="w-full absolute top-0 z-50 bg-[var(--brown)] h-[50px] flex justify-center">
      <ul className="flex w-full max-w-[90%] justify-center h-full items-center">
        <Link className="mr-auto text-white font-bold tracking-wide" href="/">
          Logo
        </Link>

        <div className="text-[var(--gray)] h-full uppercase font-semibold text-sm flex gap-5 items-center">
          <div className="flex gap-5 max-[600px]:hidden">
            {links.map((link, index) => (
              <li
                className="hover:brightness-150 h-full flex justify-center items-center"
                key={index}
              >
                <Link className="h-full py-4" href={link.href}>
                  {link.name}
                </Link>
              </li>
            ))}
          </div>

          <AuthSwitch
            fallback={isLogout.map((link) => (
              <div className="flex gap-5" key={link.name}>
                <li className="hover:brightness-150 h-full flex justify-center items-center max-[600px]:hidden">
                  <Link className="h-full py-4" href={link.href}>
                    {link.name}
                  </Link>
                </li>
              </div>
            ))}
          >
            <div className="flex gap-5">
              {isLogged.map((link) => (
                <li
                  key={link.name}
                  className="hover:brightness-150 h-full flex justify-center items-center max-[600px]:hidden"
                >
                  <Link className="h-full py-4" href={link.href}>
                    {link.name}
                  </Link>
                </li>
              ))}
              <li
                className="flex text-[var(--yellow)] justify-center items-center gap-1 py-4 cursor-pointer max-[600px]:hidden"
                onClick={() => logout()}
              >
                <span>Sair</span>
                <MdLogout className="hover:brightness-150" size={20} />
              </li>
            </div>
          </AuthSwitch>

          {isOpen ? (
            <IoCloseSharp
              size={30}
              className="cursor-pointer z-50 min-[600px]:hidden text-white"
              onClick={() => setIsOpen((prev) => !prev)}
            />
          ) : (
            <HiMenuAlt3
              size={30}
              className="cursor-pointer z-50 min-[600px]:hidden text-white"
              onClick={() => setIsOpen((prev) => !prev)}
            />
          )}
        </div>
      </ul>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-200 z-40 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 right-0 w-[75%] max-w-[250px] h-auto mt-[50px] bg-[var(--brown)] z-50 shadow-lg transform transition-transform duration-300 ease-in-out min-[600px]:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col text-white/90 py-6 px-4 gap-3">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-3 border-b border-[var(--gray)]/30 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <AuthSwitch
            fallback={isLogout.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 border-b border-[var(--gray)]/30 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          >
            <>
              {isLogged.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3 border-b border-[var(--gray)]/30 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div
                className="flex items-center justify-between py-3 border-b border-[var(--gray)]/30 text-[var(--yellow)] cursor-pointer hover:text-white transition-colors"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                <span>Sair</span>
                <MdLogout size={20} />
              </div>
            </>
          </AuthSwitch>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
