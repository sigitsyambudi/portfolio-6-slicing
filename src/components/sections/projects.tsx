"use client";

/* eslint-disable @next/next/no-img-element -- Exact Figma SVG root dimensions are intentionally preserved. */

import Image from "next/image";
import { useState } from "react";
import {
  HoverCard,
  MotionButton,
  SectionHeaderReveal,
} from "@/components/motion-primitives";
import styles from "./projects.module.css";

const projectTags = ["React", "Tailwind", "Responsive"] as const;

const projects = [
  {
    title: "Vacation Landing Page",
    image: "/assets/projects/vacation.png",
    featured: true,
  },
  {
    title: "Digital Wallet",
    image: "/assets/projects/wallet.png",
    mobileDetails: true,
  },
  {
    title: "",
    image: "/assets/projects/vispoe.png",
  },
] as const;

type Project = (typeof projects)[number];

function ProjectDetails({ project }: { project: Project }) {
  if (!project.title) {
    return null;
  }

  return (
    <div
      className={`${styles.details} ${"featured" in project && project.featured ? styles.featuredDetails : ""} ${"mobileDetails" in project && project.mobileDetails ? styles.mobileDetails : ""}`}
    >
      <div className={styles.projectCopy}>
        <h3>{project.title}</h3>
        <ul className={styles.tags} aria-label={`${project.title} technologies`}>
          {projectTags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>

      {"featured" in project && project.featured ? (
        <span className={styles.openProject} aria-hidden="true">
          <img
            src="/assets/projects/open-project.svg"
            width="24"
            height="24"
            alt=""
          />
        </span>
      ) : null}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const hasDetails = Boolean(project.title);

  return (
    <HoverCard
      className={styles.card}
      data-project-index={index}
      aria-label={project.title || "Portfolio project preview"}
    >
      <Image
        className={styles.projectImage}
        src={project.image}
        fill
        sizes="(max-width: 900px) 361px, 580px"
        alt=""
      />
      {hasDetails ? <div className={styles.scrim} aria-hidden="true" /> : null}
      <ProjectDetails project={project} />
      {"featured" in project && project.featured ? (
        <img
          className={styles.cursor}
          src="/assets/projects/cursor.svg"
          width="24"
          height="24"
          alt=""
          aria-hidden="true"
        />
      ) : null}
    </HoverCard>
  );
}

export function Projects() {
  const [page, setPage] = useState(0);

  return (
    <section
      className={styles.projects}
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className={styles.inner}>
        <SectionHeaderReveal className={styles.sectionHeader}>
          <p className={styles.eyebrow}>
            <span className={styles.desktopEyebrow}>PORTFOLIO</span>
            <span className={styles.mobileEyebrow}>PORTOFOLIO</span>
          </p>
          <h2 id="projects-heading">Latest Project</h2>
        </SectionHeaderReveal>

        <div className={styles.gallery}>
          <div className={styles.track} id="project-cards" data-page={page}>
            {projects.map((project, index) => (
              <ProjectCard project={project} index={index} key={project.image} />
            ))}
          </div>

          <div className={styles.navigation}>
            <MotionButton
              className={styles.navigationButton}
              type="button"
              onClick={() => setPage(0)}
              disabled={page === 0}
              aria-label="Show previous projects"
              aria-controls="project-cards"
            >
              <img
                className={styles.desktopArrow}
                src="/assets/projects/arrow-left-desktop.svg"
                width="24"
                height="24"
                alt=""
              />
              <img
                className={styles.mobileArrow}
                src="/assets/projects/arrow-left-mobile.svg"
                width="18"
                height="18"
                alt=""
              />
            </MotionButton>
            <MotionButton
              className={styles.navigationButton}
              type="button"
              onClick={() => setPage(1)}
              disabled={page === 1}
              aria-label="Show next projects"
              aria-controls="project-cards"
            >
              <img
                className={styles.desktopArrow}
                src="/assets/projects/arrow-right-desktop.svg"
                width="24"
                height="24"
                alt=""
              />
              <img
                className={styles.mobileArrow}
                src="/assets/projects/arrow-right-mobile.svg"
                width="18"
                height="18"
                alt=""
              />
            </MotionButton>
          </div>

          <p className={styles.status} aria-live="polite">
            Project view {page + 1} of 2
          </p>
        </div>
      </div>
    </section>
  );
}
