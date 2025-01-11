"use client"

import React from "react"
import GithubIcon from "../../../public/github-icon.svg"
import LinkedinIcon from "../../../public/linkedin-icon.svg"
import InstagramIcon from "../../../public/instagram-icon.svg"
import WhatsappIcon from "../../../public/whatsapp-icon.svg"
import Link from "next/link"
import Image from "next/image"
import { EnvelopeIcon } from "@heroicons/react/24/outline"

export default function EmailSection() {
  return (
    <section
      id="contact"
      className="grid grid-cols-1 md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="z-10 flex flex-col items-center md:items-start">
        <h5 className="text-xl font-bold text-white my-2">Let&apos;s Connect</h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md text-center md:text-left">
          I&apos;m currently looking for new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>
        <div className="socials flex flex-row gap-2 justify-center md:justify-start">
          <Link href="https://github.com/hellwasbxring">
            <Image src={GithubIcon} alt="Github Icon" className="w-12 h-12" />
          </Link>
          <Link href="https://www.linkedin.com/in/eduardomillones/">
            <Image src={LinkedinIcon} alt="Linkedin Icon" className="w-12 h-12" />
          </Link>
          <Link href="https://www.instagram.com/designify.pe/">
            <Image src={InstagramIcon} alt="Instagram Icon" className="w-12 h-12" />
          </Link>
          <Link href="https://wa.me/+777">
            <Image src={WhatsappIcon} alt="WhatsApp Icon" className="w-12 h-12" />
          </Link>
        </div>
      </div>
      <div className="z-10 flex flex-col items-center justify-center">
        <div className="text-white text-xl md:text-2xl mb-4 flex items-center">
          <EnvelopeIcon className="w-8 h-8 md:w-12 md:h-12 mr-2 md:mr-4" />
          <span>Contact me via email:</span>
        </div>
        <a
          href="mailto:eduardo.millones.v@gmail.com"
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600 hover:underline text-center"
        >
          eduardo.millones.v@gmail.com
        </a>
      </div>
    </section>
  )
}
