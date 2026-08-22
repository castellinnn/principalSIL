import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClassName?: string;
  id?: string;
  chapter?: string;
  chapterLabel?: string;
  tone?: "blue" | "cyan" | "indigo" | "violet" | "slate";
}

export function Section({
  children,
  className,
  containerClassName,
  id,
  chapter,
  chapterLabel,
  tone = "blue",
  ...props
}: SectionProps) {
  return (
    <section 
      id={id}
      data-chapter={chapter}
      data-tone={chapter ? tone : undefined}
      className={cn(
        "py-14 sm:py-16 md:py-24 lg:py-28 relative isolate scroll-mt-20",
        chapter && "story-section",
        className
      )}
      {...props}
    >
      {chapter && (
        <>
          <div className="story-boundary" aria-hidden="true" />
          <div className="story-chapter" aria-hidden="true">
            <span className="story-chapter-index">{chapter}</span>
            <span className="story-chapter-label">{chapterLabel}</span>
          </div>
        </>
      )}
      <div className={cn("container max-w-7xl mx-auto px-4 sm:px-5 md:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
