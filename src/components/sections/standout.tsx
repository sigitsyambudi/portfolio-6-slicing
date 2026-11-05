/* eslint-disable @next/next/no-img-element -- Exact Figma SVG root dimensions are intentionally preserved. */

import Image from "next/image";
import { SectionHeaderReveal } from "@/components/motion-primitives";
import styles from "./standout.module.css";

const positiveItems = [
  "React Expert",
  "Precise Website Implementation",
  "TypeScript Proficiency",
  "Clean, Maintainable Code",
  "Responsive Website Development",
  "Performance Optimization",
  "UI Design Proficiency (Figma)",
] as const;

const negativeItems = [
  "Basic React Knowledge",
  "Inconsistent Design Translation",
  "Little to No TypeScript Knowledge",
  "Unstructured Code",
  "Inconsistent Responsiveness",
  "Slow and Heavy Websites",
  "No Design Skills",
] as const;

type ComparisonCardProps = {
  title: string;
  items: readonly string[];
  variant: "positive" | "negative";
};

function ComparisonAvatar({ variant }: Pick<ComparisonCardProps, "variant">) {
  if (variant === "positive") {
    return (
      <div className={`${styles.avatar} ${styles.portraitAvatar}`}>
        <Image
          className={styles.portrait}
          src="/assets/hero/portrait-desktop.png"
          width={2400}
          height={2400}
          sizes="(max-width: 900px) 72px, 90px"
          alt=""
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div className={`${styles.avatar} ${styles.genericAvatar}`} aria-hidden="true">
      <img
        className={styles.desktopProfile}
        src="/assets/standout/profile-desktop.svg"
        width="60"
        height="60"
        alt=""
      />
      <img
        className={styles.mobileProfile}
        src="/assets/standout/profile-mobile.svg"
        width="48"
        height="48"
        alt=""
      />
    </div>
  );
}

function ComparisonCard({ title, items, variant }: ComparisonCardProps) {
  const positive = variant === "positive";

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <header className={styles.cardHeader}>
        <h3>{title}</h3>
        <ComparisonAvatar variant={variant} />
      </header>

      <ul className={styles.details}>
        {items.map((item, index) => (
          <li
            className={`${styles.comparisonItem} ${positive && index === 0 ? styles.featuredItem : ""}`}
            key={item}
          >
            <img
              src={
                positive
                  ? "/assets/standout/check.svg"
                  : "/assets/standout/close.svg"
              }
              width="24"
              height="24"
              alt=""
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Standout() {
  return (
    <section
      className={styles.standout}
      id="standout"
      aria-labelledby="standout-heading"
    >
      <div className={styles.inner}>
        <SectionHeaderReveal className={styles.sectionHeader}>
          <p className={styles.eyebrow}>COMPARASION</p>
          <h2 id="standout-heading">Why I Stand Out</h2>
        </SectionHeaderReveal>

        <div className={styles.comparison}>
          <ComparisonCard
            title="With Me"
            items={positiveItems}
            variant="positive"
          />
          <ComparisonCard
            title="Another Talent"
            items={negativeItems}
            variant="negative"
          />
        </div>
      </div>
    </section>
  );
}
