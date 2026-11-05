import styles from "./footer.module.css";

const socialPlatforms = [
  {
    name: "Dribbble",
    desktopIcon: "/assets/footer/dribbble-desktop.svg",
    mobileIcon: "/assets/footer/dribbble-mobile.svg",
    desktopWidth: 36.0412,
    desktopHeight: 36.0412,
  },
  {
    name: "Instagram",
    desktopIcon: "/assets/footer/instagram-desktop.svg",
    mobileIcon: "/assets/footer/instagram-mobile.svg",
    desktopWidth: 30.0168,
    desktopHeight: 30.0267,
  },
  {
    name: "LinkedIn",
    desktopIcon: "/assets/footer/linkedin-desktop.svg",
    mobileIcon: "/assets/footer/linkedin-mobile.svg",
    desktopWidth: 25.1083,
    desktopHeight: 24.0213,
  },
] as const;

export function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site footer">
      <picture className={styles.transition}>
        <source media="(max-width: 900px)" srcSet="/assets/footer/transition-mobile.svg" />
        <img src="/assets/footer/transition-desktop.svg" width="1440" height="210" alt="" />
      </picture>

      <div className={styles.content}>
        <picture className={styles.background}>
          <source media="(max-width: 900px)" srcSet="/assets/footer/background-mobile.svg" />
          <img src="/assets/footer/background-desktop.svg" width="1440" height="1024" alt="" />
        </picture>

        <div className={styles.links}>
          <div className={styles.logo} aria-label="Your Logo">
            <picture className={styles.logoSymbol}>
              <source media="(max-width: 900px)" srcSet="/assets/footer/logo-mobile.svg" />
              <img src="/assets/footer/logo-desktop.svg" width="38.4241" height="42.1569" alt="" />
            </picture>
            <span>Your Logo</span>
          </div>

          <p className={styles.description}>
            Front-End Developer with a passion for clean code and intuitive design. Turning ideas into functional beauty
          </p>

          <ul className={styles.socials} aria-label="Social platforms shown in the design; profile destinations were not provided">
            {socialPlatforms.map((platform) => (
              <li className={styles.socialItem} key={platform.name} aria-label={platform.name}>
                <picture>
                  <source media="(max-width: 900px)" srcSet={platform.mobileIcon} />
                  <img
                    src={platform.desktopIcon}
                    width={platform.desktopWidth}
                    height={platform.desktopHeight}
                    alt=""
                  />
                </picture>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
