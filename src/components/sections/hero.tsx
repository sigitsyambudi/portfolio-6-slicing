/* eslint-disable @next/next/no-img-element -- Exact Figma SVG root dimensions are intentionally preserved. */

import Image from "next/image";
import { HeroIntro } from "@/components/motion-primitives";
import { SiteHeader } from "@/components/site-header";
import styles from "./hero.module.css";

const socialIcons = [
  {
    label: "Dribbble",
    desktop: "/assets/hero/dribbble-desktop.svg",
    mobile: "/assets/hero/dribbble-mobile.svg",
    desktopWidth: 36.0412,
    desktopHeight: 36.0412,
    mobileWidth: 24,
    mobileHeight: 24,
  },
  {
    label: "Instagram",
    desktop: "/assets/hero/instagram-desktop.svg",
    mobile: "/assets/hero/instagram-mobile.svg",
    desktopWidth: 30.0168,
    desktopHeight: 30.0267,
    mobileWidth: 24.0134,
    mobileHeight: 24.0213,
  },
  {
    label: "LinkedIn",
    desktop: "/assets/hero/linkedin-desktop.svg",
    mobile: "/assets/hero/linkedin-mobile.svg",
    desktopWidth: 25.1083,
    desktopHeight: 24.0213,
    mobileWidth: 24,
    mobileHeight: 23,
  },
];

function SocialIcons() {
  return (
    <div className={styles.socialIcons} aria-label="Social media">
      {socialIcons.map((icon) => (
        <span
          className={styles.socialIcon}
          key={icon.label}
          role="img"
          aria-label={icon.label}
        >
          <img
            className={styles.desktopSocialAsset}
            src={icon.desktop}
            width={icon.desktopWidth}
            height={icon.desktopHeight}
            alt=""
            aria-hidden="true"
          />
          <img
            className={styles.mobileSocialAsset}
            src={icon.mobile}
            width={icon.mobileWidth}
            height={icon.mobileHeight}
            alt=""
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-heading">
      <div className={styles.heroClip}>
        <img
          className={styles.desktopBackground}
          src="/assets/hero/background-desktop.svg"
          width="1440"
          height="1024"
          alt=""
          aria-hidden="true"
        />
        <img
          className={styles.mobileBackground}
          src="/assets/hero/background-mobile.svg"
          width="600.375"
          height="426.933"
          alt=""
          aria-hidden="true"
        />

        <HeroIntro className={styles.copy}>
          <h1 id="hero-heading">
            Hey There,
            <br />
            I’m Edwin Anderson
          </h1>
          <p>
            Front-End Developer with a passion for clean code and intuitive
            design. Turning ideas into functional beauty
          </p>
        </HeroIntro>

        <div className={styles.portrait}>
          <Image
            src="/assets/hero/portrait-desktop.png"
            width={2400}
            height={2400}
            sizes="(max-width: 900px) 100vw, 754px"
            alt="Portrait of Edwin Anderson"
            preload
          />
        </div>

        <div className={styles.actions}>
          <SocialIcons />
          <a className={styles.scrollButton} href="#about">
            <span>Scroll Down</span>
            <img
              src="/assets/hero/scroll-desktop.svg"
              width="20"
              height="20"
              alt=""
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <SiteHeader />

      <img
        className={styles.desktopTransition}
        src="/assets/hero/transition-desktop.svg"
        width="1440"
        height="390"
        alt=""
        aria-hidden="true"
      />
      <img
        className={styles.mobileTransition}
        src="/assets/hero/transition-mobile.svg"
        width="393"
        height="17"
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}
