
"use client";

import Image, { StaticImageData } from "next/image";
import { X, MapPin, GraduationCap, CircleDot } from "lucide-react";

import "./AboutModal-modal.css";

interface DetailItem {
  label: string;
  value: string;
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image?: string | StaticImageData;
  details?: DetailItem[];
  interests?: string[];
}

const detailIcons: Record<string, React.ElementType> = {
  "Based in": MapPin,
  Education: GraduationCap,
  Focus: CircleDot,
};

export default function DetailModal({
  isOpen,
  onClose,
  title,
  description,
  image,
  details = [],
  interests = [],
}: DetailModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="detail-overlay fixed inset-0 z-[200] flex items-center justify-center bg-[#282828]/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
        className="detail-modal relative max-h-[88dvh] w-full max-w-[1050px] overflow-y-auto rounded-[36px] bg-[#F5F4E9] p-7 shadow-2xl sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="detail-close absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-[#40513B] transition hover:bg-[#E5EBD3]"
        >
          <X size={20} />
        </button>

        {/* Profile introduction */}
        <div className="flex flex-col gap-6 pr-2 sm:flex-row items-start sm:gap-7">
          {image && (
            <div className="detail-image relative h-[125px] w-[125px] shrink-0 overflow-hidden rounded-[28px] bg-white">
              <Image
                src={image}
                alt={title}
                fill
                sizes="125px"
                className="object-cover"
              />
            </div>
          )}

          <div className="detail-intro flex-1">
            <h2
              id="detail-modal-title"
              className=" text-[23px] font-bold tracking-tight text-[#40513B] text-left"
            >
              {title}
            </h2>

            <p className="mt-3 text-[15px] font-medium leading-7 text-[#171717] text-left">
              {description}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="detail-divider my-8 h-px w-full bg-[#DDE4C7]" />

        {/* Profile details */}
        {details.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {details.map((item, index) => {
              const Icon = detailIcons[item.label] || CircleDot;

              return (
                <div
                  key={item.label}
                  className="detail-item flex items-start gap-3"
                  style={{
                    animationDelay: `${0.35 + index * 0.12}s`,
                  }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6EBD3] text-[#43845F]">
                    <Icon size={19} strokeWidth={2} />
                  </div>

                  <div>
                    <p className="text-[13px] font-medium text-[#68745E]">
                      {item.label}
                    </p>

                    <p className="mt-1 whitespace-pre-line text-[15px] font-semibold leading-6 text-[#344330]">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <div className="detail-interests mt-10">
            <h3 className="mb-6 text-[15px] font-bold tracking-[1.5px] text-[#52654D]">
              Role
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {interests.map((interest, index) => (
                <span
                  key={interest}
                  className="detail-interest rounded-full border border-[#D7E1BC] bg-[#E8ECD5] px-4 py-2 text-[13px] font-semibold text-[#344330] transition-colors hover:bg-[#DCE6C4]"
                  style={{
                    animationDelay: `${0.65 + index * 0.08}s`,
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
