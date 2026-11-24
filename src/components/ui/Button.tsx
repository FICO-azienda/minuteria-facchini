import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "text";
  className?: string;
};

export function Button({ href, children, variant = "solid", className }: Props) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const cls = `${styles.btn} ${styles[variant]} ${className ?? ""}`;
  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>
    </>
  );
  return isExternal ? (
    <a href={href} className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
