import Link from "next/link";
import React from "react";

const Navbar = () => {
  const links = [
    {name: "Home", href: "/"},
    {name: "About", href: "/about"},
    {name: "Sign Up", href: "/signup"},
    {name: "Contact", href: "/contact"},
  ];

  return (
    <nav className="w-full bg-[var(--brown)] h-[50px] flex justify-center">
      <ul className=" flex w-full max-w-[90%] h-full items-center">
        <Link className="mr-auto" href={"/"}>
          Logo
        </Link>
        <div className="max-[600px]:hidden text-[var(--gray)] uppercase font-semibold text-sm flex gap-5">
          {links.map((link, index) => (
            <li className="hover:brightness-150" key={index}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
