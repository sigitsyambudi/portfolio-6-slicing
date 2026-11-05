/* eslint-disable @next/next/no-img-element -- Exact Figma SVG root dimensions are intentionally preserved. */

import styles from "./career.module.css";
import { SectionHeaderReveal } from "@/components/motion-primitives";

const careerEntries = [
  { company: "Slack", icon: "/assets/career/slack-desktop.svg", iconWidth: 26, iconHeight: 26 },
  { company: "Telegram", icon: "/assets/career/telegram.svg", iconWidth: 28, iconHeight: 28 },
  { company: "Line", icon: "/assets/career/line-desktop.svg", iconWidth: 28, iconHeight: 27 },
  { company: "Skype", icon: "/assets/career/skype-desktop.svg", iconWidth: 28, iconHeight: 28 },
] as const;

const careerDescription =
  "Guided a team of developers in creating complex web applications. and Spearheaded the development , increasing customer retention by 30%.";

type CareerEntry = (typeof careerEntries)[number];

function CareerCard({ entry }: { entry: CareerEntry }) {
  return (
    <li className={styles.item}>
      <article className={styles.card}>
        <img
          className={styles.dateDecoration}
          src="/assets/career/date-decoration-desktop.svg"
          width="215"
          height="215"
          alt=""
          aria-hidden="true"
        />
        <div className={styles.cardContent}>
          <p className={styles.date}>2021 - 2024</p>
          <div className={styles.body}>
            <div className={styles.companyDetails}>
              <h3>Frontend Developers</h3>
              <p className={styles.company}>
                <span className={styles.iconSlot} aria-hidden="true">
                  <img
                    src={entry.icon}
                    width={entry.iconWidth}
                    height={entry.iconHeight}
                    alt=""
                  />
                </span>
                <span>{entry.company}</span>
              </p>
            </div>
            <p className={styles.description}>{careerDescription}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

export function Career() {
  return (
    <section className={styles.career} id="career" aria-labelledby="career-heading">
      <div className={styles.inner}>
        <SectionHeaderReveal className={styles.sectionHeader}>
          <p className={styles.eyebrow}>
            <span className={styles.desktopEyebrow}>WORK EXPERIENCE</span>
            <span className={styles.mobileEyebrow}>PORTOFOLIO</span>
          </p>
          <h2 id="career-heading">Profesional Career</h2>
        </SectionHeaderReveal>
        <ol className={styles.list}>
          {careerEntries.map((entry) => (
            <CareerCard entry={entry} key={entry.company} />
          ))}
        </ol>
      </div>
    </section>
  );
}
