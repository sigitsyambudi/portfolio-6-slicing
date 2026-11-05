"use client";

/* eslint-disable @next/next/no-img-element -- Exact Figma SVG root dimensions are intentionally preserved. */

import { useEffect, useRef, useState } from "react";
import styles from "./site-header.module.css";

const navigation = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skill", href: "#skillset" },
  { label: "Projects", href: "#projects" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

type LogoProps = {
  dark?: boolean;
  onClick?: () => void;
};

function Logo({ dark = false, onClick }: LogoProps) {
  return (
    <a
      className={`${styles.logo} ${dark ? styles.mobileMenuLogo : ""}`}
      href="#hero"
      onClick={onClick}
    >
      <img
        src={dark ? "/assets/hero/logo-dark.svg" : "/assets/hero/logo-white-desktop.svg"}
        width="26.3"
        height="28.855"
        alt=""
        aria-hidden="true"
      />
      <span className={styles.logoText}>Your Logo</span>
    </a>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        openButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const menu = document.getElementById("mobile-navigation");
        const focusable = menu?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );

        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    requestAnimationFrame(() => openButtonRef.current?.focus());
  };

  return (
    <>
      <header className={styles.header}>
        <Logo />

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navigation.map((item) => (
            <a className={styles.navLink} href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className={styles.hireButton} href="#contact">
          <img
            src="/assets/hero/mail-desktop.svg"
            width="20"
            height="20"
            alt=""
            aria-hidden="true"
          />
          Hire Me
        </a>

        <button
          ref={openButtonRef}
          className={styles.mobileToggle}
          type="button"
          aria-label="Open navigation menu"
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <img
            src="/assets/hero/menu.svg"
            width="24"
            height="24"
            alt=""
            aria-hidden="true"
          />
        </button>
      </header>

      {menuOpen ? (
        <div
          className={styles.mobileMenu}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className={styles.mobileMenuHeader}>
            <Logo dark onClick={closeMenu} />
            <button
              ref={closeButtonRef}
              className={styles.closeButton}
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMenu}
            >
              <img
                src="/assets/hero/close.svg"
                width="24"
                height="24"
                alt=""
                aria-hidden="true"
              />
            </button>
          </div>

          <nav className={styles.mobileMenuNav} aria-label="Mobile navigation">
            {navigation.map((item) => (
              <a
                className={styles.mobileNavLink}
                href={item.href}
                key={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a
              className={styles.mobileHireButton}
              href="#contact"
              onClick={closeMenu}
            >
              <img
                src="/assets/hero/mail-mobile.svg"
                width="20"
                height="20"
                alt=""
                aria-hidden="true"
              />
              Hire Me
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
