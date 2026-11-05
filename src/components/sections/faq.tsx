"use client";

/* eslint-disable @next/next/no-img-element -- Exact Figma SVG dimensions are intentionally preserved. */

import { useState } from "react";
import { SectionHeaderReveal } from "@/components/motion-primitives";
import styles from "./faq.module.css";

const sharedAnswer =
  "I focus on clean, maintainable code and prioritize user experience. My approach involves close collaboration with designers to ensure exact implementation and seamless interactions across all devices.";

const faqs = [
  { question: "What’s your approach to front-end development?" },
  { question: "How do you ensure websites load quickly and efficiently?" },
  { question: "What kind of projects do you specialize in?" },
  { question: "How do you handle project deadlines?" },
  {
    question: "What technologies do you use?",
    mobileQuestion: "How do you handle project deadlines?",
  },
] as const;

function AccordionIcon({ expanded }: { expanded: boolean }) {
  const name = expanded ? "minus" : "plus";

  return (
    <span className={styles.icon} aria-hidden="true">
      <img className={styles.desktopIcon} src={`/assets/faq/${name}-desktop.svg`} width="24" height="24" alt="" />
      <img className={styles.mobileIcon} src={`/assets/faq/${name}-mobile.svg`} width="20" height="20" alt="" />
    </span>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.faq} id="faq" aria-labelledby="faq-heading">
      <div className={styles.inner}>
        <SectionHeaderReveal className={styles.sectionHeader}>
          <p className={styles.eyebrow}>QNA</p>
          <h2 id="faq-heading">Your Questions, Answered</h2>
        </SectionHeaderReveal>

        <ol className={styles.list}>
          {faqs.map((faq, index) => {
            const expanded = openIndex === index;
            const triggerId = `faq-trigger-${index + 1}`;
            const panelId = `faq-panel-${index + 1}`;

            return (
              <li className={styles.item} data-expanded={expanded} key={`${faq.question}-${index}`}>
                <img className={styles.accentDesktop} src={`/assets/faq/accent-${expanded ? "expanded" : "collapsed"}-desktop.svg`} alt="" aria-hidden="true" />
                <img className={styles.accentMobile} src={`/assets/faq/accent-${expanded ? "expanded" : "collapsed"}-mobile.svg`} alt="" aria-hidden="true" />

                <button
                  className={styles.trigger}
                  id={triggerId}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(expanded ? null : index)}
                >
                  <span className={styles.question}>
                    <span className={"mobileQuestion" in faq ? styles.desktopQuestion : undefined}>{faq.question}</span>
                    {"mobileQuestion" in faq ? <span className={styles.mobileQuestion}>{faq.mobileQuestion}</span> : null}
                  </span>
                  <AccordionIcon expanded={expanded} />
                </button>

                <div className={styles.panel} id={panelId} role="region" aria-labelledby={triggerId} hidden={!expanded}>
                  <p>{sharedAnswer}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
