"use client";

/* eslint-disable @next/next/no-img-element -- Exact Figma SVG root dimensions are intentionally preserved. */

import Image from "next/image";
import { useState } from "react";
import {
  MotionButton,
  SectionHeadingReveal,
} from "@/components/motion-primitives";
import styles from "./skillset.module.css";

const description =
  "Building the structure of web pages with semantic markup for accessibility .";

const skillGroups = [
  [
    { name: "HTML", icon: "/assets/skillset/html.png", iconClass: "html" },
    {
      name: "Javascript",
      icon: "/assets/skillset/javascript.png",
      iconClass: "javascript",
    },
    {
      name: "React JS",
      icon: "/assets/skillset/react.png",
      iconClass: "react",
    },
  ],
  [
    {
      name: "Mongo DB",
      icon: "/assets/skillset/mongodb.png",
      iconClass: "mongodb",
    },
    {
      name: "Docker",
      icon: "/assets/skillset/docker.png",
      iconClass: "docker",
    },
    {
      name: "Typescript",
      icon: "/assets/skillset/typescript.png",
      iconClass: "typescript",
    },
  ],
] as const;

type Skill = (typeof skillGroups)[number][number];

function SkillCard({ skill, hiddenOnMobile }: { skill: Skill; hiddenOnMobile: boolean }) {
  const hasBackdrop = skill.iconClass === "html" || skill.iconClass === "typescript";

  return (
    <article
      className={styles.skillCard}
      data-hidden-mobile={hiddenOnMobile || undefined}
    >
      <div className={styles.progress} aria-label="90 percent proficiency">
        <img
          className={styles.desktopProgress}
          src="/assets/skillset/progress-desktop.svg"
          width="120"
          height="120"
          alt=""
          aria-hidden="true"
        />
        <img
          className={styles.mobileProgress}
          src="/assets/skillset/progress-mobile.svg"
          width="98"
          height="98"
          alt=""
          aria-hidden="true"
        />
        <span>90%</span>
      </div>

      <div className={styles.skillContent}>
        <div className={styles.skillHeading}>
          <span className={styles.techIcon} aria-hidden="true">
            {hasBackdrop ? (
              <span
                className={`${styles.iconBackdrop} ${styles[`${skill.iconClass}Backdrop`]}`}
              />
            ) : null}
            <Image
              className={`${styles.skillIcon} ${styles[skill.iconClass]}`}
              src={skill.icon}
              width={32}
              height={32}
              sizes="32px"
              alt=""
            />
          </span>
          <h3>{skill.name}</h3>
        </div>
        <p>{description}</p>
      </div>
    </article>
  );
}

export function Skillset() {
  const [activeGroup, setActiveGroup] = useState(0);
  const secondaryGroup = activeGroup === 0 ? 1 : 0;
  const orderedSkills = skillGroups[activeGroup].flatMap((skill, index) => [
    skill,
    skillGroups[secondaryGroup][index],
  ]);
  const activeSkillNames = new Set(
    skillGroups[activeGroup].map((skill) => skill.name),
  );

  return (
    <section
      className={styles.skillset}
      id="skillset"
      aria-labelledby="skillset-heading"
    >
      <div className={styles.inner}>
        <SectionHeadingReveal className={styles.sectionHeader}>
          <p className={styles.eyebrow}>SKILL</p>
          <h2 id="skillset-heading">Skillset</h2>
        </SectionHeadingReveal>

        <div className={styles.skillList}>
          <div className={styles.skillGrid} id="skillset-items">
            {orderedSkills.map((skill) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                hiddenOnMobile={!activeSkillNames.has(skill.name)}
              />
            ))}
          </div>

          <div className={styles.navigation}>
            <MotionButton
              className={styles.navigationButton}
              type="button"
              onClick={() => setActiveGroup(0)}
              disabled={activeGroup === 0}
              aria-label="Show previous skill group"
              aria-controls="skillset-items"
            >
              <img
                className={styles.desktopArrow}
                src="/assets/skillset/arrow-left-desktop.svg"
                width="24"
                height="24"
                alt=""
                aria-hidden="true"
              />
              <img
                className={styles.mobileArrow}
                src="/assets/skillset/arrow-left-mobile.svg"
                width="18"
                height="18"
                alt=""
                aria-hidden="true"
              />
            </MotionButton>
            <MotionButton
              className={styles.navigationButton}
              type="button"
              onClick={() => setActiveGroup(1)}
              disabled={activeGroup === 1}
              aria-label="Show next skill group"
              aria-controls="skillset-items"
            >
              <img
                className={styles.desktopArrow}
                src="/assets/skillset/arrow-right-desktop.svg"
                width="24"
                height="24"
                alt=""
                aria-hidden="true"
              />
              <img
                className={styles.mobileArrow}
                src="/assets/skillset/arrow-right-mobile.svg"
                width="18"
                height="18"
                alt=""
                aria-hidden="true"
              />
            </MotionButton>
          </div>

          <p className={styles.status} aria-live="polite">
            Skill group {activeGroup + 1} of {skillGroups.length}
          </p>
        </div>
      </div>
    </section>
  );
}
