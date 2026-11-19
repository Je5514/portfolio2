
"use client";

import { useEffect } from "react";
import { X, BriefcaseBusiness, FlaskConical } from "lucide-react";
import { experienceData } from "../../data/experience";
import "./ExperienceModal-modal.css";

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExperienceModal({
  isOpen,
  onClose,
}: ExperienceModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="experience-overlay"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="experience-heading"
        className="experience-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="experience-header">
          <div>
            <span className="experience-eyebrow">
              MY JOURNEY
            </span>

            <h2 id="experience-heading">
              Experience
            </h2>

            <p>
              A journey through my professional experience,
              creative work and research.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="experience-close"
          >
            <X size={21} />
          </button>
        </div>

        {/* Timeline */}
        <div className="experience-timeline">
          <div />

          {experienceData.map((item, index) => {
            const Icon =
              item.type === "work"
                ? BriefcaseBusiness
                : FlaskConical;

            return (
              <article
                key={item.id}
                className="timeline-item"
                style={{
                  animationDelay: `${0.25 + index * 0.2}s`,
                }}
              >
                {/* Timeline dot */}
                <div className="timeline-marker">
                  <div className="timeline-dot" />
                </div>

                {/* Experience card */}
                <div className="timeline-content">
                  <div className="timeline-meta">
                    <span className="timeline-period">
                      {item.period}
                    </span>

                    {item.duration && (
                      <span className="timeline-duration">
                        {item.duration}
                      </span>
                    )}
                  </div>

                  <div className="timeline-title-row">
                    <div>
                      <h3>{item.company}</h3>
                      <h4>{item.role}</h4>
                    </div>

                    <div className="timeline-icon">
                      <Icon size={19} strokeWidth={1.7} />
                    </div>
                  </div>

                  <p className="timeline-description">
                    {item.description}
                  </p>

                  {item.responsibilities.length > 0 && (
                    <ul className="timeline-list">
                      {item.responsibilities.map(
                        (responsibility, responsibilityIndex) => (
                          <li key={responsibilityIndex}>
                            {responsibility}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer */}
        <div className="experience-footer">
          <span>
            Always learning. Always creating.
          </span>
        </div>
      </div>
    </div>
  );
}
