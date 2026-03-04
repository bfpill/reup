"use client";

import { cn } from "@/lib/cn";

import { Link } from "next-view-transitions";

interface BreadcrumbProps {
  color?: 'light' | 'dark';
  text?: string;
}

export const Breadcrumb = ({ color = 'light', text = 'Home' }: BreadcrumbProps) => {
  const textColor = color === 'light' ? '#ffffff' : '#000000';
  
  return (
    <div className={cn("mt-0 mb-4 flex w-full items-center gap-1 align-middle backdrop-blur-sm rounded-md")}>
      <Link className="font-lora text-3xl tracking-tighter" style={{ color: textColor }} href="/">
        {text}
      </Link>
    </div>
  );
};
