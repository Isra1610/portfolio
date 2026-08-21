"use client";
// @flow strict
import Link from "next/link";
import LanguageSwitcher from "./i18n/language-switcher";
import { useLanguage } from "./i18n/language-provider";


function Navbar() {
  const { t } = useLanguage();

  const links = [
    { href: "/#about", label: t.nav.about },
    { href: "/#experience", label: t.nav.experience },
    { href: "/#skills", label: t.nav.skills },
    { href: "/#education", label: t.nav.education },
    { href: "/#gallery", label: t.nav.gallery },
    { href: "/#projects", label: t.nav.projects },
  ];

  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className=" text-[#16f2b3] text-3xl font-bold">
            IsraelR
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ul className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100" id="navbar-default">
            {links.map((link) => (
              <li key={link.href}>
                <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href={link.href}>
                  <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">{link.label}</div>
                </Link>
              </li>
            ))}
          </ul>

          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
