
"use client";

import Image from "next/image";
import { X, ExternalLink } from "lucide-react";

import "./project-modal.css";
import "./modals.css";

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  contribution: string;
  technologies: string[];
  link?: string;
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
      className="project-overlay fixed inset-0 z-[200] flex items-center justify-center bg-[#282828]/30 p-3 backdrop-blur-sm sm:p-5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="project-modal-container flex h-[90dvh] max-h-[900px] w-full max-w-[1100px] flex-col overflow-hidden rounded-[36px] bg-[#F5F4E9] shadow-2xl sm:rounded-[48px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed modal header */}
        <div className="project-modal-header relative z-20 shrink-0 border-b border-[#DDE4C7] bg-[#F5F4E9] px-6 py-6 sm:px-10 sm:py-7">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="close absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-[#40513B] transition hover:bg-[#E5EBD3] sm:right-8 sm:top-7"
          >
            <X size={21} />
          </button>

          <div className="project-heading pr-12">
            <p className="text-xs font-bold tracking-[2px] text-[#609966]">
              MY WORK
            </p>

            <h2
              id="project-modal-title"
              className="mt-2 text-xl font-bold text-[#40513B] sm:text-2xl"
            >
              Selected Projects
            </h2>

            <p className="mt-2 max-w-[700px] text-sm leading-6 text-[#65715D]">
              A collection of projects where I explore design, creativity and
              frontend development.
            </p>
          </div>
        </div>

        {/* Scrollable project content */}
        <div className="project-modal-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-5 py-6 sm:px-10 sm:py-8">
          <div className="space-y-7">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="project-modal-item w-full min-w-0 overflow-hidden rounded-2xl border border-[#E0E6CE] bg-white/80"
                style={{
                  animationDelay: `${0.25 + index * 0.18}s`,
                }}
              >
                {/* Project image */}
                <div className="project-image relative aspect-[16/8] w-full overflow-hidden bg-[#E8ECD5]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 850px) 100vw, 1000px"
                    className="project-image-content object-cover"
                  />
                </div>

                {/* Project details */}
                <div className="min-w-0 p-5 sm:p-7">
                  <p className="text-xs font-semibold tracking-wide text-[#609966]">
                    {project.category}
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-3">
                    <h3 className="min-w-0 text-lg font-bold text-[#40513B]">
                      {project.title}
                    </h3>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title}`}
                        className="project-link flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8ECD5] text-[#40513B] transition hover:bg-[#DCE6C4]"
                      >
                        <ExternalLink size={17} />
                      </a>
                    )}
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[#65715D]">
                    {project.description}
                  </p>

                  <div className="project-info-block mt-4">
                    <h4 className="text-sm font-bold text-[#40513B]">
                      My Contribution
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-[#65715D]">
                      {project.contribution}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((technology, techIndex) => (
                      <span
                        key={technology}
                        className="project-tech rounded-full border border-[#D7E1BC] bg-[#E8ECD5] px-3 py-1.5 text-xs font-semibold text-[#344330]"
                        style={{
                          animationDelay: `${0.5 + index * 0.18 + techIndex * 0.055}s`,
                        }}
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
