"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Header compatto dopo lo scroll, si nasconde scendendo e riappare risalendo.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 320) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Chiude il menu al cambio pagina (pattern "stato derivato", senza effetti).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Menu mobile: blocca lo scroll, Esc chiude, focus intrappolato nel pannello.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && focusables && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          toggleRef.current?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          toggleRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <header
      className={styles.header}
      data-scrolled={scrolled || undefined}
      data-hidden={(hidden && !open) || undefined}
      data-open={open || undefined}
    >
      <div className={`wrap ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="Minuteria Facchini — home">
          <Wordmark />
        </Link>

        <nav aria-label="Principale" className={styles.desktopNav}>
          <ul role="list">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.link}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <span className={styles.index}>{item.index}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/contatti/" className={styles.cta}>
          Parliamo del tuo progetto
          <span aria-hidden="true" className={styles.ctaArrow}>
            →
          </span>
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? "Chiudi il menu" : "Apri il menu"}</span>
          <span aria-hidden="true" className={styles.toggleLabel}>
            {open ? "Chiudi" : "Menu"}
          </span>
          <span aria-hidden="true" className={styles.toggleIcon} />
        </button>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        className={styles.panel}
        hidden={!open}
      >
        <nav aria-label="Principale (mobile)" className="wrap">
          <ul role="list" className={styles.panelList}>
            <li>
              <Link href="/" className={styles.panelLink} aria-current={pathname === "/" ? "page" : undefined}>
                <span className={styles.index}>00</span>Home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.panelLink}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <span className={styles.index}>{item.index}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contatti/" className={styles.panelCta}>
            Parliamo del tuo progetto <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
