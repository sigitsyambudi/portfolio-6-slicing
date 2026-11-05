/* eslint-disable @next/next/no-img-element -- Exact Figma SVG root dimensions are intentionally preserved. */

import Image from "next/image";
import {
  HoverCard,
  SectionHeadingReveal,
} from "@/components/motion-primitives";
import styles from "./about.module.css";

const projects = [
  {
    title: "Landing Page",
    count: "5 Project",
    desktopIcon: "/assets/about/landing-page-desktop.svg",
    mobileIcon: "/assets/about/landing-page-mobile.svg",
    color: "blue",
  },
  {
    title: "Dashboard Saas",
    count: "7 Project",
    desktopIcon: "/assets/about/dashboard-desktop.svg",
    mobileIcon: "/assets/about/dashboard-mobile.svg",
    color: "purple",
  },
  {
    title: "Company Profile",
    count: "12 Project",
    desktopIcon: "/assets/about/company-desktop.svg",
    mobileIcon: "/assets/about/company-mobile.svg",
    color: "pink",
  },
] as const;

const avatars = [
  "/assets/about/avatar-man-1.png",
  "/assets/about/avatar-woman-1.png",
  "/assets/about/avatar-man-2.png",
  "/assets/about/avatar-woman-2.png",
];

type ProjectCardProps = (typeof projects)[number];

function ProjectCard({
  title,
  count,
  desktopIcon,
  mobileIcon,
  color,
}: ProjectCardProps) {
  return (
    <HoverCard className={styles.projectCard}>
      <span className={`${styles.projectIcon} ${styles[color]}`}>
        <img
          className={styles.desktopProjectIcon}
          src={desktopIcon}
          width="38.4"
          height="38.4"
          alt=""
          aria-hidden="true"
        />
        <img
          className={styles.mobileProjectIcon}
          src={mobileIcon}
          width="28.8"
          height="28.8"
          alt=""
          aria-hidden="true"
        />
      </span>
      <div className={styles.projectText}>
        <h3>{title}</h3>
        <p>{count}</p>
      </div>
    </HoverCard>
  );
}

function AvatarStack() {
  return (
    <div className={styles.avatarStack} aria-hidden="true">
      {avatars.map((src, index) => (
        <Image
          className={styles.avatar}
          src={src}
          width={2048}
          height={2048}
          sizes="52px"
          alt=""
          key={src}
          style={{ zIndex: index + 1 }}
        />
      ))}
    </div>
  );
}

export function About() {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-heading">
      <div className={styles.content}>
        <div className={styles.projectList}>
          {projects.map((project) => (
            <ProjectCard {...project} key={project.title} />
          ))}
        </div>

        <div className={styles.details}>
          <div className={styles.introduction}>
            <SectionHeadingReveal className={styles.headingGroup}>
              <p className={styles.eyebrow}>ABOUT ME</p>
              <h2 id="about-heading">What Do I Help?</h2>
            </SectionHeadingReveal>
            <p className={styles.description}>
              I am a Frontend Developer dedicated to solving problems and
              creating impactful digital experiences. By combining
              process-driven design and modern development practices, I build
              intuitive and responsive digital products that not only enhance
              user satisfaction but also drive business success. Let’s
              collaborate to bring your vision to life and elevate your digital
              presence
            </p>
          </div>

          <div className={styles.stats}>
            <div className={styles.statRow}>
              <div className={styles.projectIllustration}>
                <Image
                  src="/assets/about/project-completed.png"
                  width={92}
                  height={104}
                  alt=""
                  aria-hidden="true"
                />
              </div>
              <div className={styles.statText}>
                <strong>200+</strong>
                <span>Project Completed</span>
              </div>
            </div>

            <div className={styles.statRow}>
              <AvatarStack />
              <div className={styles.statText}>
                <strong>50+</strong>
                <span>Happy Clients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
