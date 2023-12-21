"use client";
import React, { useState } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import InstagramIcon from "../../../public/instagram-icon.svg"; // Añadido
import WhatsappIcon from "../../../public/whatsapp-icon.svg"; // Añadido
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const resData = await response.json();

    if (response.status === 200) {
      console.log("Message sent.");
      setEmailSubmitted(true);
    }
  };

  return (
    <section
    id="contact"
    className="grid grid-cols-1 md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
  >
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">Let&apos;s Connect</h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          {" "}
          I&apos;m currently looking for new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>
        <div className="socials flex flex-row gap-2">
  <Link href="https://github.com/hellwasbxring">
    <Image src={GithubIcon} alt="Github Icon" className="w-12 h-12" />
  </Link>
  <Link href="https://www.linkedin.com/in/eduardomillones/">
    <Image src={LinkedinIcon} alt="Linkedin Icon" className="w-12 h-12" />
  </Link>
  <Link href="https://www.instagram.com/edu.millones/">
    <Image src={InstagramIcon} alt="Instagram Icon" className="w-12 h-12" />
  </Link>
  <Link href="https://wa.me/51942538945">
    <Image src={WhatsappIcon} alt="WhatsApp Icon" className="w-12 h-12" />
  </Link>
</div>
      </div>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfOzrpbMkY_5KqK66HVl-fUrfweXX9JAJGp_L6xgFv0g2iZUA/viewform?embedded=true" width="100%" height="1300" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" border="0">Cargando…</iframe>
    </section>
  );
};

export default EmailSection;  