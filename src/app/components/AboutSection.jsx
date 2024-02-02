"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Desarrollo de aplicaciones para Windows, Web y móviles</li>
        <li>Python</li>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>Node.js</li>
        <li>Express</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>Equipado con habilidades en componentes de interfaz de usuario de escritorio (Winforms y WPF), API de archivos de Office y PDF, componentes de interfaz de usuario de JavaScript y herramientas de desarrollo de interfaz de usuario móvil para crear soluciones personalizadas y escalables.</li>
        <li>Especializado en HTML, CSS y JavaScript, así como en el desarrollo de aplicaciones web interactivas.</li>
        <li>Escuela de Gestión Vinculate. Habilidades para liderar proyectos de desarrollo de software de manera ágil y eficiente.</li>
        <li>Skill Centro de Capacitación, Curso de Actualización en Python Fundamentals.</li>
        </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.png" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-700 mb-4">About me</h2>
          <p className="text-base lg:text-lg">
            ¡Hola! Soy Eduardo Millones, un apasionado desarrollador con experiencia en la 
            creación de aplicaciones web y de escritorio. Cada proyecto que emprendo es único y 
            personalizado para satisfacer tus necesidades específicas. Mi compromiso es ofrecer
            soluciones atractivas y altamente funcionales que superen tus expectativas.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Featured{" "}
            </TabButton>
            <a
            href="public/Eduardo_Millones_Vasquez_CV.pdf"
            download="Eduardo_Millones_Vasquez_CV.pdf"
            className="ml-4 text-white bg-primary-500 py-2 px-4 rounded hover:bg-primary-700"
          >
            Download CV
          </a>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
  
};

export default AboutSection;
