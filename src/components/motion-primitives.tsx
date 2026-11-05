"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion, type HTMLMotionProps } from "motion/react";

const revealTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
} as const;

const interactionTransition = {
  type: "spring",
  stiffness: 420,
  damping: 28,
} as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function HeroIntro(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      data-motion-reveal="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ...revealTransition, delay: 0.12 }}
      {...props}
    />
  );
}

export function SectionHeaderReveal(props: HTMLMotionProps<"header">) {
  return (
    <motion.header
      data-motion-reveal="section-heading"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={revealTransition}
      {...props}
    />
  );
}

export function SectionHeadingReveal(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      data-motion-reveal="section-heading"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={revealTransition}
      {...props}
    />
  );
}

export function HoverCard(props: HTMLMotionProps<"article">) {
  return (
    <motion.article
      data-motion-interactive="card"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={interactionTransition}
      {...props}
    />
  );
}

export function MotionButton(props: HTMLMotionProps<"button">) {
  return (
    <motion.button
      data-motion-interactive="control"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={interactionTransition}
      {...props}
    />
  );
}
