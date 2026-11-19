
"use client";

import { useEffect, useState } from "react";
import "./ProtfolioIntro.css";

interface PortfolioIntroProps {
  children: React.ReactNode;
}

export default function PortfolioIntro({
  children,
}: PortfolioIntroProps) {
  const [text, setText] = useState("");
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const messages = [
      "Hi there!",
    //   "Here's my portfolio.",
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const animateText = () => {
      const currentMessage = messages[messageIndex];

      if (!deleting) {
        // Type text
        charIndex++;
        setText(currentMessage.slice(0, charIndex));

        if (charIndex === currentMessage.length) {
          deleting = true;
          timeout = setTimeout(animateText, 900);
        } else {
          timeout = setTimeout(animateText, 100);
        }
      } else {
        // Delete text in reverse
        charIndex--;
        setText(currentMessage.slice(0, charIndex));

        if (charIndex === 0) {
          deleting = false;
          messageIndex++;

          if (messageIndex < messages.length) {
            timeout = setTimeout(animateText, 400);
          } else {
            timeout = setTimeout(() => {
              setShowCards(true);
            }, 300);
          }
        } else {
          timeout = setTimeout(animateText, 55);
        }
      }
    };

    timeout = setTimeout(animateText, 400);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {!showCards && (
        <div className="portfolio-intro-screen">
          <h1 className="text-center text-[32px] font-bold text-[#40513B] sm:text-[48px]">
            {text}
            <span className="typing-cursor">|</span>
          </h1>
        </div>
      )}

      {showCards && (
        <div className="portfolio-cards-enter">
          {children}
        </div>
      )}
    </div>
  );
}
