
export interface Experience {
  id: number;
  company: string;
  period: string;
  duration?: string;
  role: string;
  type: "work" | "research";
  description: string;
  responsibilities: string[];
  title?: string;
}

export const experienceData: Experience[] = [
  {
    id: 1,
    company: "Bytestrone",
    title:"Bytestrone",
    period: "2023 – Present",
    role: "UI Engineer",
    type: "work",
    description:
      "Designing and developing intuitive digital experiences by combining UI/UX design with modern frontend technologies.",
    responsibilities: [
      "Design user interfaces and experiences using Figma.",
      "Develop responsive web interfaces using Next.js and React.js.",
      "Build reusable components and maintain consistent design systems using Storybook.",
      "Use AI-powered tools such as Claude and ChatGPT to improve design workflows, development efficiency and problem-solving.",
    ],
  },
  {
    id: 2,
    company: "White Rabbit Group",
    title:"WRG",
    period: "2022 – 2023",
    role: "Software Engineer",
    type: "work",
    description:
      "Focused on frontend development and creating responsive web interfaces from design concepts.",
    responsibilities: [
      "Developed user interfaces using Pug, SCSS and jQuery.",
      "Built and maintained responsive web interfaces.",
      "Collaborated with the team to translate design concepts into functional user interfaces.",
    ],
  },
  {
    id: 3,
    company: "Microsoftware Research",
    title:"Microsoftware",
    period: "2022 | 4 months",
    role: "Intern",
    type: "research",
    description:
      "Explored accessibility solutions for the Deaf community through Indian Sign Language (ISL), with an emphasis on visual communication.",
    responsibilities: [
      "Explored video-based communication using Indian Sign Language.",
      "Focused on making sign language resources more accessible.",
      "Explored ways to improve communication and accessibility through visual sign language resources.",
    ],
  },
];
