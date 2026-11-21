"use client";

import { ArrowUpRight } from "lucide-react";

import { projectIcons, defaultProjectIcon } from "../../data/projectIcons";
import "./project-modal.css";
import "./modals.css";

export interface Project {
  title: string;
  category: string;
  summary: string;
  description: string;
  icon: string;
  technologies: string[];
  link: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
}

export default function ProjectModal({
  isOpen,
  onClose,
  projects,
}: ProjectModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="project-overlay fixed inset-0 z-[200] flex items-center justify-center bg-[#282828]/40 p-3 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="project-modal-container flex max-h-[88dvh] w-full max-w-[760px] flex-col overflow-hidden rounded-[28px] bg-[#F5F4E9] shadow-2xl sm:rounded-[40px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="project-modal-header relative z-20 shrink-0 border-b border-[#DDE4C7] bg-[#F5F4E9] px-6 py-6 sm:px-10 sm:py-7">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="project-close close absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-[#40513B] transition hover:bg-[#E5EBD3] sm:right-8 sm:top-7"
          >
            <span className="text-xl">×</span>
          </button>

          <div className="project-heading pr-12">
            <p className="text-xs font-bold tracking-[2px] text-[#609966]">
              MY WORK
            </p>

            <h2
              id="project-modal-title"
              className="mt-2 text-2xl font-bold text-[#40513B] sm:text-3xl"
            >
              Projects
            </h2>

            <p className="mt-2 max-w-[560px] text-sm leading-6 text-[#65715D]">
              A collection of simple personal projects where I explore design, creativity, and frontend development.
            </p>
          </div>
        </div>

        {/* Scrollable Projects */}
        <div className="project-modal-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-5 py-6 sm:px-10 sm:py-8">
          <div className="space-y-4">
            {projects.map((project, index) => {
              const Icon = projectIcons[project.icon] ?? defaultProjectIcon;

              const CardContent = (
                <div className="flex items-start gap-4 p-5 sm:gap-5 sm:p-6">
                  {/* Icon tile */}
                  <span className="project-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#EDF1D6] text-[#40513B] sm:h-14 sm:w-14 sm:rounded-2xl">
                    <Icon size={24} strokeWidth={1.8} />
                  </span>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#609966]">
                      {project.category}
                    </p>

                    <div className="mt-1.5 flex items-center justify-between gap-3">
                      <h3 className="min-w-0 text-xl font-bold text-[#40513B]">
                        {project.title}
                      </h3>

                      {project.link && (
                        <ArrowUpRight
                          size={20}
                          aria-hidden="true"
                          className="project-arrow shrink-0 text-[#609966] transition-transform duration-300"
                        />
                      )}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-[#65715D]">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="project-tech rounded-full border border-[#D7E1BC] bg-[#E8ECD5] px-3 py-1.5 text-xs font-semibold text-[#40513B]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );

              return (
                <article
                  key={project.title}
                  className="project-modal-item"
                  style={{
                    animationDelay: `${0.15 + index * 0.12}s`,
                  }}
                >
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} project`}
                      className="project-card group block w-full overflow-hidden rounded-2xl border border-[#E0E6CE] bg-white/80 transition-all duration-300 hover:border-[#A9BD91] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#609966]"
                    >
                      {CardContent}
                    </a>
                  ) : (
                    <div className="project-card block w-full overflow-hidden rounded-2xl border border-[#E0E6CE] bg-white/80">
                      {CardContent}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
