"use client";

import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="min-h-[600px] flex items-center pt-12 sm:pt-0 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="sm:col-span-8 text-center sm:text-left flex flex-col items-center sm:items-start"
          >
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-7xl font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
                Hello, I&apos;m{" "}
              </span>
              <br />
              <div className="h-[80px] sm:h-auto flex items-center justify-center sm:justify-start">
                <TypeAnimation
                  sequence={[
                    "Eduardo Millones",
                    1000,
                    "Web Developer",
                    1000,
                    "Mobile Developer",
                    1000,
                    "UI/UX Designer",
                    1000,
                    "Mechatronic Eng.",
                    1100,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="block text-4xl sm:text-5xl lg:text-8xl"
                />
              </div>
            </h1>
            <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
              Haz realidad tu visión.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3">
              <Link
                href="/#contact"
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white text-center"
              >
                Contáctame
              </Link>
              <Link
                href="https://designify-web.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-2 py-2 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white text-center"
              >
                <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-6 py-2">
                  Servicios
                </span>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="sm:col-span-4 flex justify-center items-center"
          >
            <div className="relative w-[250px] h-[250px] lg:w-[330px] lg:h-[330px]">
              <div className="absolute inset-0 rounded-full bg-[#181818]"></div>
              <Image
                src="/images/hero-image.png"
                alt="hero image"
                className="absolute inset-0 w-full h-full object-contain rounded-full"
                width={330}
                height={330}
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
