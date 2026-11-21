import type { Project } from "../components/modals/ProjectModal";

export const projectDetails: Project[] = [
  {
    title: "Furniture Website",
    category: "Website Design & Development",
    icon: "sofa",
    summary:
      "Elegant layouts and curated collections that make finding furniture simple.",
    description:
      "A modern furniture shopping experience featuring elegant layouts, curated collections and a user-friendly interface that makes finding the perfect furniture simple and enjoyable.",
    technologies: ["Figma", "Next.js", "Tailwind", "TypeScript", "Claude", "ChatGPT"],
    // TODO: this is the Skincare URL — replace with the Furniture site link
    link: "https://furniture-landing1.web.app/",
  },
  {
    title: "Skincare Website",
    category: "Development",
    icon: "sparkles",
    summary:
      "Modern layouts and easy navigation to explore beauty essentials.",
    description:
      "An elegant beauty and skincare shopping experience featuring modern layouts, curated product collections and intuitive navigation, making it easy for customers to explore beauty essentials and discover their skincare favourites.",
    technologies: ["HTML", "CSS", "JavaScript", "AOS"],
    link: "https://je5514.github.io/Skincare-html/",
  },
  {
    title: "Comic Reading Website",
    // TODO: set the category that fits this project
    category: "Website Design & Development",
    icon: "book",
    summary:
      "An organized library and seamless layouts for finding favourite stories.",
    description:
      "An interactive comic reading experience featuring an organized library, engaging layouts and seamless navigation, making it easy for readers to discover and enjoy their favourite stories.",
    // TODO: list the tools you used
    technologies: ["Pug", "SCSS", "JQuery"],
    // TODO: add the live site URL (leave "" for no link; the card then won't be clickable)
    link: "https://webmine3.netlify.app/",
  },
];