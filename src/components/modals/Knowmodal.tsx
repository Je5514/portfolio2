
"use client";

import { X, Palette, Layers3, Code2 } from "lucide-react";
import "./Know-modal.css";
import "./modals.css";

interface KnowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const skillCategories = [
  {
    title: "UI Design",
    icon: Palette,
    description:
      "Designing intuitive and user-friendly interfaces with a focus on usability, layout and visual consistency.",
    skills: ["Wireframing", "Prototyping", "Figma", "Claude"],
  },
  {
    title: "Frontend Development",
    icon: Code2,
    description:
      "Turning designs into responsive, accessible and functional web interfaces.",
    skills: [
      "HTML",
      "SCSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Claude",
      "ChatGPT",
      "Pug",
      "jQuery",
      "AOS",
    ],
  },
];

export default function KnowModal({
  isOpen,
  onClose,
}: KnowModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="know-overlay fixed inset-0 z-[200] flex items-center justify-center bg-[#282828]/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="know-title"
        className="know-modal relative max-h-[88dvh] w-full max-w-[850px] overflow-y-auto rounded-[36px] bg-[#F5F4E9] p-7 shadow-2xl sm:rounded-[42px] sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="close absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-[#40513B] transition hover:bg-[#E5EBD3] sm:right-7 sm:top-7"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <div className="know-heading mb-8 pr-10">
          <p className="text-xs font-bold tracking-[2px] text-[#609966]">
            MY SKILLS
          </p>

          <h2
            id="know-title"
            className="mt-2 text-2xl font-bold text-[#40513B]"
          >
            What I Know
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#65715D]">
            A combination of design thinking and frontend development
            skills that help me create meaningful digital experiences.
          </p>
        </div>

        {/* Skill categories */}
        <div className="grid gap-4">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="know-skill-item rounded-2xl border border-[#E0E6CE] bg-white/70 p-5"
                style={{
                  animationDelay: `${0.3 + index * 0.18}s`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="know-skill-icon flex h-10 w-10 items-center justify-center rounded-full bg-[#E6EBD3] text-[#43845F]">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-base font-bold text-[#40513B]">
                    {category.title}
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#65715D]">
                  {category.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="know-skill-tag rounded-full border border-[#D7E1BC] bg-[#E8ECD5] px-3 py-1.5 text-xs font-semibold text-[#344330]"
                      style={{
                        animationDelay: `${0.5 + index * 0.18 + skillIndex * 0.055}s`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
