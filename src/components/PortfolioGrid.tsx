"use client";

import { useState } from "react";

import Image from "next/image";
import { portfolioData } from "../data/portfolio";
import BrowserCard from "./BrowserCard";
import PortfolioIntro from "./PortfolioIntro";

import { Shapes, GitBranch, Code2 } from "lucide-react";
import { Copy, Check, Box, Mail } from "lucide-react";
import { FaLinkedinIn, FaBehance } from "react-icons/fa6";

import AboutModal from "./modals/AboutModal";
import { aboutDetails } from "../data/about";

import ExperienceModal from "./modals/ExperienceModal";
import KnowModal from "./modals/Knowmodal";

import ProjectModal from "./modals/ProjectModal";
import { projectDetails } from "../data/projects";
import { projectIcons, defaultProjectIcon } from "../data/projectIcons";

import ContactModal from "./modals/ContactModal";

const socialIcons: Record<string, React.ElementType> = {
  linkedin: FaLinkedinIn,
  behance: FaBehance,
  box: Box,
  mail: Mail,
};

const skillIcons = {
  figma: Shapes,
  "git-branch": GitBranch,
  code: Code2,
};

const skillColors = [
  "bg-[#9DBD8D] text-[#40513B]",
  "bg-white text-[#40513B] border-[#40513B]",
  "bg-[#60996A] text-white",
  "bg-white text-[#40513B] border-[#40513B]",
  "bg-[#40513B] text-white",
  "bg-white text-[#40513B] border-[#40513B]",
];

export default function PortfolioGrid() {
  const { about, experience, skills, projects, contact } = portfolioData;
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showKnowModal, setShowKnowModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <>
      <PortfolioIntro>
        <main className="mx-auto flex min-h-screen w-full max-w-[1050px] items-center px-5 py-8">
          <div className="grid w-full grid-cols-1 gap-7 md:grid-cols-3">
            {/* WHO I AM */}
            <BrowserCard title={about.title} className="h-[312px]">
              <button
                type="button"
                onClick={() => setShowAboutModal(true)}
                aria-label="Read more about me"
                className="flex h-full w-full flex-1 flex-col items-center justify-between p-4 text-left"
              >
                <div className="relative h-[195px] w-[220px]">
                  <Image
                    src={about.image}
                    alt="My profile"
                    fill
                    sizes="220px"
                    className="profile-image-enter object-contain"
                  />

                  <span className="chip-float chip-enter chip-research absolute left-0 top-3 z-10 rounded-md bg-[#40513B] px-3 py-1.5 text-[12px] font-medium text-white shadow-sm">
                    RESEARCH
                  </span>

                  <span className="chip-float chip-enter chip-prototype absolute right-4 top-[110px] z-10 rounded-md bg-[#9DC08B] px-3 py-1.5 text-[12px] font-medium text-black shadow-sm">
                    PROTOTYPE
                  </span>

                  <span className="chip-float chip-enter chip-wireframe absolute bottom-2 left-0 z-10 rounded-md bg-[#609966] px-3 py-1.5 text-[12px] font-medium text-white shadow-sm">
                    WIREFRAME
                  </span>
                </div>

                <h2 className="font-bitcount mt-1 text-[20px] font-black text-[#40513B]">
                  {about.title}
                </h2>
              </button>
            </BrowserCard>

            {/* EXPERIENCE */}
            <BrowserCard title={experience.title} className="h-[312px]">
              <button
                type="button"
                onClick={() => setShowExperienceModal(true)}
                aria-label="Read more about me"
                className="flex h-full w-fulltext-left"
              >
                <div className="flex flex-1 flex-col justify-between px-7 py-4">
                  <div className="relative flex gap-5">
                    {/* Timeline line */}
                    <div className="experience-line absolute left-[8px] top-3 h-[140px] w-px bg-[#40513B]" />

                    {/* Timeline circles */}
                    <div className="relative z-10 flex flex-col gap-[42px]">
                      <span className="experience-node h-[16px] w-[16px] rounded-full bg-[#40513B]" />
                      <span className="experience-node h-[16px] w-[16px] rounded-full border-2 border-[#40513B] bg-white" />
                      <span className="experience-node h-[16px] w-[16px] rounded-full border-2 border-[#40513B] bg-white" />
                    </div>

                    {/* Experience details */}
                    <div className="flex-1 pt-0">
                      <h3 className="text-left experience-info text-[18px] font-medium text-[#40513B]">
                        {experience.company}
                      </h3>

                      <p className="text-left experience-date mt-1 text-[12px] text-[#60996A]">
                        {experience.period}
                      </p>

                      {/* Detail bars */}
                      <div className="mt-7 space-y-[14px]">
                        {experience.details.map((item, index) => (
                          <div
                            key={item}
                            className="experience-bar h-[12px] rounded-full bg-[#9DBD8D]"
                            style={{
                              width: ["100%", "58%", "88%"][index] ?? "100%",
                              animationDelay: `${0.5 + index * 0.3}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <h2 className="font-bitcount text-center text-[20px] font-black text-[#40513B]">
                    {experience.title}
                  </h2>
                </div>
              </button>
            </BrowserCard>

            {/* WHAT I KNOW */}
            <BrowserCard title={skills.title} className="h-full">
              <button
                type="button"
                onClick={() => setShowKnowModal(true)}
                aria-label="Read more about my skills"
                className="flex h-full w-full flex-col text-left"
              >
                <div className="flex h-full w-full flex-1 flex-col justify-between px-7 py-4">
                  {/* Skills grid */}
                  <div className="grid grid-cols-3 gap-5">
                    {[
                      { icon: Shapes, style: "bg-[#9DBD8D] text-black" },
                      { icon: null, style: "bg-white border-2 border-black" },
                      { icon: GitBranch, style: "bg-[#60996A] text-white" },
                      { icon: null, style: "bg-white border-2 border-black" },
                      { icon: Code2, style: "bg-[#40513B] text-white" },
                      { icon: null, style: "bg-white border-2 border-black" },
                    ].map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={index}
                          style={{ animationDelay: `${index * 0.15}s` }}
                          className={`skill-box group flex aspect-square items-center justify-center rounded-[18px] transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${item.style}`}
                        >
                          {Icon && (
                            <Icon
                              size={24}
                              strokeWidth={2}
                              className="transition-transform duration-300 group-hover:scale-110"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Title at bottom */}
                  <h2 className="text-center font-bitcount text-[20px] font-black text-[#40513B]">
                    {skills.title}
                  </h2>
                </div>
              </button>
            </BrowserCard>

            {/* PROJECT */}
            <BrowserCard
              title={projects.title}
              className="h-full md:h-[366px] md:col-span-2"
            >
              <button
                type="button"
                onClick={() => setShowProjectModal(true)}
                aria-label="View my projects"
                className="flex h-full w-full flex-col text-left"
              >
                <span className="flex h-full w-full flex-1 flex-col justify-between px-5 py-4">
                  {/* Project list: icon + title + one line */}
                  <span className="flex flex-col gap-2">
                    {projectDetails.map((project, index) => {
                      const Icon =
                        projectIcons[project.icon] ?? defaultProjectIcon;

                      return (
                        <span
                          key={project.title}
                          style={{ animationDelay: `${index * 0.2}s` }}
                          className="project-item group flex items-center gap-4 rounded-2xl px-3 py-3 transition-colors duration-300 hover:bg-[#F3F6E7]"
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#EDF1D6] text-[#40513B] transition-colors duration-300 group-hover:bg-[#DDE8C6]">
                            <Icon size={22} strokeWidth={1.8} />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[16px] font-semibold text-[#40513B]">
                              {project.title}
                            </span>
                            <span className="mt-0.5 block truncate text-[13px] text-[#65715D]">
                              {project.summary}
                            </span>
                          </span>
                        </span>
                      );
                    })}
                  </span>

                  <h2 className="font-bitcount pt-5 text-center text-[20px] font-black text-[#40513B]">
                    {projects.title}
                  </h2>
                </span>
              </button>
            </BrowserCard>

            {/* CONTACT */}
            <BrowserCard title={contact.title} className="h-[366px]">
              <div
                role="button"
                tabIndex={0}
                onClick={() => setShowContactModal(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setShowContactModal(true);
                  }
                }}
                aria-label="Open contact details"
                className="flex h-full w-full cursor-pointer flex-col"
              >
                <div className="flex h-full flex-1 flex-col justify-between px-6 py-5">
                  {/* Email */}
                  <div className="contact-email mb-4">
                    <a
                      href={`mailto:${contact.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="block truncate text-center text-[16px] font-medium text-[#40513B]"
                    >
                      {contact.email}
                    </a>
                  </div>

                  {/* Social grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {contact.socials.map((social, index) => {
                      const Icon = socialIcons[social.icon];

                      if (social.icon === "empty") {
                        return (
                          <div
                            key={index}
                            style={{ animationDelay: `${0.3 + index * 0.12}s` }}
                            className="contact-item aspect-square rounded-[20px] border-2 border-[#40513B] bg-white"
                          />
                        );
                      }

                      return (
                        <div
                          key={social.name}
                          style={{ animationDelay: `${0.3 + index * 0.12}s` }}
                          className="contact-item flex aspect-square items-center justify-center rounded-[20px] bg-[#40513B] text-white transition-all duration-300 hover:-translate-y-2"
                        >
                          {Icon && <Icon size={24} strokeWidth={2} />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Title at bottom */}
                  <h2 className="font-bitcount text-center text-[20px] font-black text-[#40513B]">
                    {contact.title}
                  </h2>
                </div>
              </div>
            </BrowserCard>
          </div>
        </main>
      </PortfolioIntro>

      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
        title={aboutDetails.name}
        description={aboutDetails.description}
        image={aboutDetails.image}
        details={aboutDetails.details}
        interests={aboutDetails.interests}
      />

      <ExperienceModal
        isOpen={showExperienceModal}
        onClose={() => setShowExperienceModal(false)}
      />

      <KnowModal
        isOpen={showKnowModal}
        onClose={() => setShowKnowModal(false)}
      />

      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        projects={projectDetails}
      />

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </>
  );
}