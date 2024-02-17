"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Proyectos",
    path: "#projects",
  },
  {
    title: "Contacto",
    path: "#contact",
  },
];
const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible]);

  return (
    <nav
      className={`fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-all duration-300`}
    >
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link href={"/"} className="flex items-center">
          <img
            src="/images/designify-image.png"
            alt="Designify Logo"
            className="w-12 h-12 md:w-16 md:h-16 rounded-full mr-2"
          />
          <span className="text-2xl md:text-5xl text-white font-semibold">
             
          </span>
        </Link>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  href={link.path}
                  title={link.title}
                  className="text-white hover:text-gray-300"
                />
              </li>
            ))}
          </ul>
        </div>
        {/* Botón de WhatsApp */}
        <a
  href="https://wa.me/+51942538945"
  target="_blank"
  rel="noopener noreferrer"
  className="text-white hover:text-gray-300 flex items-center"
>
  <img
    src="/whatsapp-icon.svg" // Ajusta la ruta según la ubicación de tu ícono
    alt="WhatsApp Icon"
    className="w-10 h-10 md:w-14 md:h-14 mr-2"
  />
  
</a>
        {/* Fin del botón de WhatsApp */}
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;
