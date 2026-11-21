
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
    `I am a Deaf UI Engineer passionate about creating intuitive, user-friendly, and visually engaging digital experiences. I enjoy transforming ideas and designs into functional, responsive interfaces, with a strong focus on usability, creativity, and attention to detail.
    As a Deaf individual, I communicate through Indian Sign Language (ISL) and written English. I believe in inclusive communication, accessibility, and creating digital experiences that are accessible to everyone.`,

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
