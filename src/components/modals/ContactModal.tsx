
"use client";

import { X, Mail, Copy, Check, ExternalLink } from "lucide-react";
import {
  FaLinkedinIn,
  FaGithub,
  FaBehance,
} from "react-icons/fa6";
import { useState } from "react";

import "./Contact-modal.css";
import "./modals.css";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const email = "sreelakshminjoshi@gmail.com";

const socialLinks = [
  {
    name: "LinkedIn",
    username: "https://in.linkedin.com/in/sreelakshmi-n-j",
    url: "https://in.linkedin.com/in/sreelakshmi-n-j",
    icon: FaLinkedinIn,
  },
  {
    name: "GitHub",
    username: "https://github.com/Je5514/",
    url: "https://github.com/Je5514/",
    icon: FaGithub,
  },
  {
    name: "Behance",
    username: "https://www.behance.net/sreelakshmid1",
    url: "https://www.behance.net/sreelakshmid1",
    icon: FaBehance,
  },
];

export default function ContactModal({
  isOpen,
  onClose,
}: ContactModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div
      className="contact-overlay fixed inset-0 z-[200] flex items-center justify-center bg-[#282828]/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="contact-modal relative max-h-[88dvh] w-full max-w-[650px] overflow-y-auto rounded-[36px] bg-[#F5F4E9] p-7 shadow-2xl sm:rounded-[42px] sm:p-9"
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
        <div className="contact-heading pr-10">
          <p className="text-xs font-bold tracking-[2px] text-[#609966]">
            GET IN TOUCH
          </p>

          <h2
            id="contact-title"
            className="mt-2 text-2xl font-bold text-[#40513B]"
          >
            Let's Connect
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#65715D]">
            Have a project, collaboration or opportunity in mind?
            I'd love to hear from you. Feel free to reach out!
          </p>
        </div>

        {/* Email */}
        <div className="contact-email mt-8 rounded-2xl border border-[#E0E6CE] bg-white/70 p-5">
          <div className="flex items-center gap-3">
            <div className="contact-email-icon flex h-10 w-10 items-center justify-center rounded-full bg-[#E6EBD3] text-[#43845F]">
              <Mail size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-[#68745E]">Email me</p>
              <p className="truncate text-sm font-semibold text-[#344330]">
                {email}
              </p>
            </div>

            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="contact-copy flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8ECD5] text-[#40513B] transition hover:bg-[#DCE6C4]"
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
            </button>
          </div>

          {copied && (
            <p className="mt-3 text-xs font-medium text-[#43845F]">
              Email address copied!
            </p>
          )}
        </div>

        {/* Social links */}
        <div className="contact-social mt-8">
          <h3 className="mb-4 text-sm font-bold tracking-[1.5px] text-[#52654D]">
            FIND ME ON
          </h3>

          <div className="space-y-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-item flex items-center gap-3 rounded-xl border border-[#E0E6CE] bg-white/70 p-4 transition hover:bg-[#E8ECD5]"
                  style={{
                    animationDelay: `${0.55 + index * 0.12}s`,
                  }}
                >
                  <div className="contact-social-icon flex h-9 w-9 items-center justify-center rounded-full bg-[#E6EBD3] text-[#43845F]">
                    <Icon size={18} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#344330]">
                      {social.name}
                    </p>
                    <p className="text-xs text-[#68745E]">
                      {social.username}
                    </p>
                  </div>

                  <ExternalLink
                    size={16}
                    className="contact-external text-[#609966]"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
