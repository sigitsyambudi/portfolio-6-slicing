"use client";

/* eslint-disable @next/next/no-img-element -- Exact Figma SVG root dimensions are intentionally preserved. */

import Image from "next/image";
import { useState } from "react";
import {
  MotionButton,
  SectionHeaderReveal,
} from "@/components/motion-primitives";
import styles from "./testimonials.module.css";

const testimonials = [
  { company: "Adobe", logo: "/assets/testimonials/adobe.svg", quote: "They tailor their solutions to our specific needs and goals.", name: "Jack Grealish", role: "CEO Adobe", avatar: "/assets/testimonials/jack-grealish.png" },
  { company: "Airbnb", logo: "/assets/testimonials/airbnb.svg", mobileLogo: "/assets/testimonials/airbnb-mobile.svg", quote: "They organized their work and internal management was outstanding.", name: "Kevin De Bruyne", role: "Project Manager Air BNB", avatar: "/assets/testimonials/kevin-de-bruyne.png" },
  { company: "Loom", logo: "/assets/testimonials/loom.svg", quote: "Working with them was a great experience.", name: "Jeremy Doku", role: "Senior Developers Loom", avatar: "/assets/testimonials/jeremy-doku.png" },
  { company: "Spotify", logo: "/assets/testimonials/spotify.svg", quote: "They tailor their solutions to our specific needs and goals.", name: "Anatasha", role: "Produk Manegers", avatar: "/assets/testimonials/anatasha.png" },
] as const;

type Testimonial = (typeof testimonials)[number];

function CompanyLogo({ testimonial, mobile = false }: { testimonial: Testimonial; mobile?: boolean }) {
  if (mobile && "mobileLogo" in testimonial) {
    return <img className={styles.mobileLogoImage} src={testimonial.mobileLogo} width="66" height="24" alt="" />;
  }

  return <img className={mobile ? styles.scaledMobileLogo : styles.desktopLogoImage} src={testimonial.logo} width="133" height="48" alt="" />;
}

function TestimonialCard({ testimonial, featured = false, mobile = false }: { testimonial: Testimonial; featured?: boolean; mobile?: boolean }) {
  return (
    <article className={`${styles.card} ${featured ? styles.featuredCard : ""} ${mobile ? styles.mobileCard : ""}`} aria-label={`${testimonial.company} testimonial from ${testimonial.name}`}>
      <div className={mobile ? styles.mobileLogo : styles.desktopLogo} aria-hidden="true">
        <CompanyLogo testimonial={testimonial} mobile={mobile} />
      </div>
      {mobile && featured ? (
        <span className={styles.mobileQuoteFrame} aria-hidden="true">
          <img className={styles.scaledMobileQuote} src="/assets/testimonials/quote-white.svg" width="48" height="48" alt="" />
        </span>
      ) : (
        <img
          className={mobile ? styles.mobileQuote : styles.desktopQuote}
          src={mobile ? "/assets/testimonials/quote-mobile.svg" : featured ? "/assets/testimonials/quote-white.svg" : "/assets/testimonials/quote-gray.svg"}
          width={mobile ? 32 : 48}
          height={mobile ? 32 : 48}
          alt=""
          aria-hidden="true"
        />
      )}
      <blockquote className={styles.quoteText}>{testimonial.quote}</blockquote>
      <footer className={styles.client}>
        <Image className={styles.avatar} src={testimonial.avatar} width={60} height={60} alt={`Portrait of ${testimonial.name}`} />
        <div className={styles.clientDetails}>
          <cite>{testimonial.name}</cite>
          <p>{testimonial.role}</p>
        </div>
      </footer>
      {featured && !mobile ? <img className={styles.cursor} src="/assets/testimonials/cursor.svg" width="24" height="24" alt="" aria-hidden="true" /> : null}
    </article>
  );
}

function NavigationButton({ direction, disabled, onClick, controls }: { direction: "previous" | "next"; disabled: boolean; onClick: () => void; controls: string }) {
  const isPrevious = direction === "previous";
  return (
    <MotionButton className={styles.navigationButton} type="button" disabled={disabled} onClick={onClick} aria-label={`${isPrevious ? "Show previous" : "Show next"} testimonial`} aria-controls={controls}>
      <img className={styles.desktopArrow} src={`/assets/testimonials/arrow-${isPrevious ? "left" : "right"}-desktop.svg`} width="24" height="24" alt="" />
      <img className={styles.mobileArrow} src={`/assets/testimonials/arrow-${isPrevious ? "left" : "right"}-mobile.svg`} width="18" height="18" alt="" />
    </MotionButton>
  );
}

export function Testimonials() {
  const [desktopPage, setDesktopPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(1);
  const mobileTestimonial = testimonials[mobileIndex];

  return (
    <section className={styles.testimonials} id="testimonials" aria-labelledby="testimonials-heading">
      <div className={styles.inner}>
        <SectionHeaderReveal className={styles.sectionHeader}>
          <p className={styles.eyebrow}>TESTIMONIALS</p>
          <h2 id="testimonials-heading">What Our Clients Say</h2>
        </SectionHeaderReveal>

        <div className={styles.desktopCarousel}>
          <div className={styles.viewport}>
            <ol className={styles.track} id="testimonial-cards" data-page={desktopPage}>
              {testimonials.map((testimonial, index) => (
                <li key={testimonial.company}><TestimonialCard testimonial={testimonial} featured={index === 0} /></li>
              ))}
            </ol>
          </div>
          <div className={styles.navigation}>
            <NavigationButton direction="previous" disabled={desktopPage === 0} onClick={() => setDesktopPage(0)} controls="testimonial-cards" />
            <NavigationButton direction="next" disabled={desktopPage === 1} onClick={() => setDesktopPage(1)} controls="testimonial-cards" />
          </div>
          <p className={styles.status} aria-live="polite">Testimonial view {desktopPage + 1} of 2</p>
        </div>

        <div className={styles.mobileCarousel}>
          <div id="mobile-testimonial-card" aria-live="polite"><TestimonialCard testimonial={mobileTestimonial} featured={mobileIndex === 0} mobile /></div>
          <div className={styles.navigation}>
            <NavigationButton direction="previous" disabled={mobileIndex === 0} onClick={() => setMobileIndex((current) => Math.max(0, current - 1))} controls="mobile-testimonial-card" />
            <NavigationButton direction="next" disabled={mobileIndex === testimonials.length - 1} onClick={() => setMobileIndex((current) => Math.min(testimonials.length - 1, current + 1))} controls="mobile-testimonial-card" />
          </div>
          <p className={styles.status} aria-live="polite">Testimonial {mobileIndex + 1} of {testimonials.length}</p>
        </div>
      </div>
    </section>
  );
}
