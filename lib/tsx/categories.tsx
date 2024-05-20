import { Sparkles, LayoutTemplate, Component } from "lucide-react";
import { ReactNode } from "react";

interface iAppProps {
  name: string;
  title: string;
  image: ReactNode;
  id: number;
}

export const categories: iAppProps[] = [
  {
    id: 0,
    name: "template",
    title: "Template",
    image: <LayoutTemplate />,
  },
  {
    id: 1,
    name: "ui",
    title: "Ui Kit",
    image: <Sparkles />,
  },
  {
    id: 2,
    name: "icon",
    title: "Icon",
    image: <Component />,
  },
];