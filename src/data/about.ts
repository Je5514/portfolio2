
export interface AboutData {
  name: string;
  description: string;
  image: string;
  details: {
    label: string;
    value: string;
  }[];
  interests: string[];
}

export const aboutDetails: AboutData = {
  name: "Sreelakshmi N J",

  description:
    `I am a Deaf UI Designer who loves creating intuitive, visually engaging digital experiences. I turn ideas into clean, thoughtful interfaces, with a strong focus on usability, creativity and attention to detail. I communicate through Indian Sign Language (ISL) and written English and I believe great design should work for everyone.`,

  image: "/sreelakshmi.jpeg",

  details: [
    {
      label: "Based in",
      value: "Kochi, Kerala, India",
    },
    {
      label: "Education",
      value: "BSc Computer Science",
    },
    {
      label: "Focus",
      value: "Design & Frontend Development",
    },
  ],

  interests: [
    "UI Desinger",
    "UI Engineer",
    "Frontend Developer",
    "UI Developer",
  ],
};
