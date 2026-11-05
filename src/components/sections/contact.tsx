"use client";

/* eslint-disable @next/next/no-img-element -- Exact Figma SVG root dimensions are intentionally preserved. */

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { SectionHeaderReveal } from "@/components/motion-primitives";
import styles from "./contact.module.css";

type DialogState = "success" | "failure" | null;
type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

function SendIcon() {
  return (
    <span className={styles.sendIcon} aria-hidden="true">
      <img className={styles.desktopAsset} src="/assets/contact/send-desktop.svg" width="20" height="20" alt="" />
      <img className={styles.mobileAsset} src="/assets/contact/send-mobile.svg" width="20" height="20" alt="" />
    </span>
  );
}

function SuccessArtwork() {
  return (
    <span className={styles.successArtwork} aria-hidden="true">
      <img className={styles.desktopAsset} src="/assets/contact/success-desktop.svg" width="160" height="160" alt="" />
      <img className={styles.mobileAsset} src="/assets/contact/success-mobile.svg" width="120" height="120" alt="" />
    </span>
  );
}

function FailureArtwork() {
  return (
    <span className={styles.failureArtwork} aria-hidden="true">
      <img className={`${styles.failureLayer} ${styles.failureBackground} ${styles.desktopAsset}`} src="/assets/contact/failure-background-desktop.svg" width="139.774" height="139.774" alt="" />
      <img className={`${styles.failureLayer} ${styles.failureRing} ${styles.desktopAsset}`} src="/assets/contact/failure-ring-desktop.svg" width="160" height="160" alt="" />
      <img className={`${styles.failureLayer} ${styles.failureEnvelope} ${styles.desktopAsset}`} src="/assets/contact/failure-envelope-desktop.svg" width="150.609" height="150.609" alt="" />
      <img className={`${styles.failureLayer} ${styles.failureStatus} ${styles.desktopAsset}`} src="/assets/contact/failure-status-desktop.svg" width="43" height="43" alt="" />
      <img className={`${styles.failureLayer} ${styles.failureX} ${styles.desktopAsset}`} src="/assets/contact/failure-x-desktop.svg" width="34.467" height="34.467" alt="" />
      <img className={`${styles.failureLayer} ${styles.failureBackground} ${styles.mobileAsset}`} src="/assets/contact/failure-background-mobile.svg" width="104.831" height="104.831" alt="" />
      <img className={`${styles.failureLayer} ${styles.failureRing} ${styles.mobileAsset}`} src="/assets/contact/failure-ring-mobile.svg" width="120" height="120" alt="" />
      <img className={`${styles.failureLayer} ${styles.failureEnvelope} ${styles.mobileAsset}`} src="/assets/contact/failure-envelope-mobile.svg" width="112.957" height="112.957" alt="" />
      <img className={`${styles.failureLayer} ${styles.failureStatus} ${styles.mobileAsset}`} src="/assets/contact/failure-status-mobile.svg" width="32" height="32" alt="" />
      <img className={`${styles.failureLayer} ${styles.failureX} ${styles.mobileAsset}`} src="/assets/contact/failure-x-mobile.svg" width="25.65" height="25.65" alt="" />
    </span>
  );
}

function FormField({
  id,
  label,
  error,
  textarea = false,
}: {
  id: FieldName;
  label: string;
  error?: string;
  textarea?: boolean;
}) {
  const describedBy = error ? `${id}-error` : undefined;
  const common = {
    id,
    name: id,
    required: true,
    placeholder: "Enter your name",
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
  } as const;

  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea {...common} className={styles.textarea} />
      ) : (
        <input {...common} type={id === "email" ? "email" : "text"} autoComplete={id === "email" ? "email" : "name"} />
      )}
      {error ? <p className={styles.error} id={describedBy}>{error}</p> : null}
    </div>
  );
}

export function Contact() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogState, setDialogState] = useState<DialogState>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const submitLockRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (dialogState && !dialog.open) dialog.showModal();
    if (!dialogState && dialog.open) dialog.close();
  }, [dialogState]);

  function openFeedback(state: Exclude<DialogState, null>, trigger: HTMLElement) {
    returnFocusRef.current = trigger;
    setDialogState(state);
  }

  function closeFeedback(restoreFocus = true) {
    dialogRef.current?.close();
    setDialogState(null);
    if (restoreFocus) window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  }

  function validate(form: HTMLFormElement) {
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const nextErrors: FieldErrors = {};

    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your email.";
    else if (!form.elements.namedItem("email") || !(form.elements.namedItem("email") as HTMLInputElement).validity.valid) nextErrors.email = "Please enter a valid email address.";
    if (!message) nextErrors.message = "Please enter a message.";

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLockRef.current) return;

    const form = event.currentTarget;
    const submitButton = form.querySelector<HTMLButtonElement>("button[type='submit']")!;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
      window.setTimeout(() => document.getElementById(firstInvalid)?.focus(), 0);
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    setIsSubmitting(false);
    submitLockRef.current = false;
    openFeedback("success", submitButton);
  }

  const isSuccess = dialogState === "success";

  return (
    <section className={styles.contact} id="contact" aria-labelledby="contact-heading">
      <SectionHeaderReveal className={styles.sectionHeader}>
        <p className={styles.eyebrow}>CONTACT</p>
        <h2 id="contact-heading">Get in Touch</h2>
      </SectionHeaderReveal>

      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <FormField id="name" label="Name" error={errors.name} />
          <FormField id="email" label="Email" error={errors.email} />
          <FormField id="message" label="Message" error={errors.message} textarea />
        </div>
        <p className={styles.demoMode}>DEMO ONLY · NO MESSAGE DELIVERY</p>
        <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
          <SendIcon />
          {isSubmitting ? "Previewing…" : "Submit"}
        </button>
        <p className={styles.status} aria-live="polite">{isSubmitting ? "Preparing the success-dialog preview. No message is being sent." : ""}</p>
      </form>

      <div className={styles.previewControls} aria-label="Feedback dialog design previews">
        <span>Dialog previews:</span>
        <button type="button" onClick={(event) => openFeedback("success", event.currentTarget)}>Success</button>
        <button type="button" onClick={(event) => openFeedback("failure", event.currentTarget)}>Failure</button>
      </div>

      <dialog
        className={styles.dialogShell}
        ref={dialogRef}
        aria-labelledby="contact-dialog-title"
        aria-describedby="contact-dialog-description contact-dialog-preview"
        onCancel={(event) => {
          event.preventDefault();
          closeFeedback();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeFeedback();
        }}
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            event.preventDefault();
            event.currentTarget.querySelector<HTMLButtonElement>("article button")?.focus();
          }
        }}
      >
        <article className={styles.dialogCard} data-state={isSuccess ? "success" : "failure"}>
          {isSuccess ? <SuccessArtwork /> : <FailureArtwork />}
          <div className={styles.dialogCopy}>
            <h3 id="contact-dialog-title">{isSuccess ? "Message Sent Successfully!" : "Oops! Something went wrong."}</h3>
            <p id="contact-dialog-description">
              {isSuccess
                ? "Thank you for reaching out. I’ll get back to you as soon as possible"
                : "We couldn't send your message. Please try again later or contact us directly."}
            </p>
          </div>
          <button
            className={styles.dialogAction}
            type="button"
            autoFocus
            onClick={() => {
              closeFeedback(false);
              if (isSuccess) {
                const hero = document.getElementById("hero");
                window.history.replaceState(null, "", "#hero");
                hero?.scrollIntoView();
              } else window.setTimeout(() => document.getElementById("name")?.focus(), 0);
            }}
          >
            {isSuccess ? "Back to Home" : "Try Again"}
          </button>
        </article>
        <p className={styles.previewNotice} id="contact-dialog-preview">DEMO DIALOG PREVIEW · NO MESSAGE WAS SENT</p>
      </dialog>
    </section>
  );
}
