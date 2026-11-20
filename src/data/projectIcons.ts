import type { ElementType } from "react";
import { BookOpen, Folder, Sofa, Sparkles } from "lucide-react";

// Used by the Project card (PortfolioGrid) and ProjectModal.
// Set `icon` in data/projects.ts to one of these keys.
export const projectIcons: Record<string, ElementType> = {
  sofa: Sofa,
  sparkles: Sparkles,
  book: BookOpen,
};

export const defaultProjectIcon: ElementType = Folder;