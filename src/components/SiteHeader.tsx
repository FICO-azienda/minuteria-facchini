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
      if (y < 320) {
        setHidden(false);
        lastY.current = y;
        return;
      }
      // Cambia stato solo oltre una soglia: niente sfarfallio con lo scroll lento.
      const dy = y - lastY.current;
      if (Math.abs(dy) < 8) return;
      setHidden(dy > 0);
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
    const toggle = toggleRef.current;
    // Ciclo del focus: pulsante Menu/Chiudi + voci del pannello.
    const items = [toggle, ...Array.from(panel?.querySelectorAll<HTMLElement>("a, button") ?? [])].filter(
      (el): el is HTMLElement => !!el,
    );
    items[1]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle?.focus();
        return;
      }
      if (e.key !== "Tab" || items.length < 2) return;
      const i = items.indexOf(document.activeElement as HTMLElement);
      if (i === -1) return;
      e.preventDefault();
      const next = (i + (e.shiftKey ? -1 : 1) + items.length) % items.length;
      items[next].focus();
    };
    // Se la finestra si allarga oltre il breakpoint il pannello sparisce: chiudiamo il menu.
    const mq = window.matchMedia("(min-width: 1081px)");
    const onMq = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
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
