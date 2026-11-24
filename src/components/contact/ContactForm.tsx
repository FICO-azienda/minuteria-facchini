"use client";

import Link from "next/link";
import { useId, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { site } from "@/lib/site";
import styles from "./ContactForm.module.css";

/** Endpoint che riceve il modulo (multipart/form-data). Vedi README → "Modulo contatti". */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

const MAX_FILES = 3;
const MAX_FILE_MB = 10;
const ACCEPTED_EXT = ["pdf", "dwg", "dxf", "step", "stp", "iges", "igs", "jpg", "jpeg", "png", "zip"];

const SECTORS = [
  "Subacquea",
  "Sport invernali",
  "Sicurezza e soccorso",
  "Difesa",
  "Cererie",
  "Altre industrie",
  "Altro / non so",
];

type Errors = Partial<Record<"name" | "email" | "message" | "files" | "privacy", string>>;
type Status = "idle" | "sending" | "sent" | "error" | "fallback";

const formatSize = (bytes: number) =>
  bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB` : `${Math.ceil(bytes / 1024)} KB`;

export function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pickRef = useRef<HTMLButtonElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [mailto, setMailto] = useState("");

  const id = (name: string) => `${uid}-${name}`;

  function checkFiles(list: File[]): string | undefined {
    if (list.length > MAX_FILES) return `Puoi allegare al massimo ${MAX_FILES} file.`;
    for (const f of list) {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ACCEPTED_EXT.includes(ext)) return `Il formato di “${f.name}” non è accettato.`;
      if (f.size > MAX_FILE_MB * 1024 * 1024) return `“${f.name}” supera i ${MAX_FILE_MB} MB.`;
    }
    return undefined;
  }

  function addFiles(incoming: FileList | null) {
    if (!incoming?.length) return;
    const next = [...files];
    for (const f of Array.from(incoming)) {
      if (!next.some((x) => x.name === f.name && x.size === f.size)) next.push(f);
    }
    const err = checkFiles(next);
    setErrors((e) => ({ ...e, files: err }));
    if (!err) setFiles(next);
  }

  function onFileInput(e: ChangeEvent<HTMLInputElement>) {
    addFiles(e.target.files);
    e.target.value = "";
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    setErrors((e) => ({ ...e, files: checkFiles(next) }));
    // Il pulsante premuto sparisce: il focus torna sul controllo per allegare.
    requestAnimationFrame(() => pickRef.current?.focus());
  }

  function validate(data: FormData): Errors {
    const errs: Errors = {};
    const name = String(data.get("nome") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("messaggio") ?? "").trim();
    if (name.length < 2) errs.name = "Scrivi il tuo nome e cognome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errs.email = "Inserisci un indirizzo email valido.";
    if (message.length < 20) errs.message = "Raccontaci qualcosa in più (almeno un paio di righe).";
    if (!data.get("privacy")) errs.privacy = "Serve il consenso per poterti ricontattare.";
    const fileErr = checkFiles(files);
    if (fileErr) errs.files = fileErr;
    return errs;
  }

  function focusFirstError(errs: Errors) {
    const order: (keyof Errors)[] = ["name", "email", "message", "files", "privacy"];
    const first = order.find((k) => errs[k]);
    if (!first) return;
    if (first === "files") {
      pickRef.current?.focus();
      return;
    }
    const map = { name: "nome", email: "email", message: "messaggio", files: "allegati", privacy: "privacy" };
    document.getElementById(id(map[first]))?.focus();
  }

  function buildMailto(data: FormData) {
    const lines = [
      `Nome: ${data.get("nome") ?? ""}`,
      `Azienda: ${data.get("azienda") || "—"}`,
      `Settore: ${data.get("settore") || "—"}`,
      `Email: ${data.get("email") ?? ""}`,
      `Telefono: ${data.get("telefono") || "—"}`,
      "",
      String(data.get("messaggio") ?? ""),
      "",
      files.length ? `(Allegare manualmente: ${files.map((f) => f.name).join(", ")})` : "",
    ];
    const subject = `Richiesta dal sito — ${data.get("azienda") || data.get("nome")}`;
    return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: un utente reale non compila questo campo nascosto.
    if (String(data.get("sito_web") ?? "")) return;

    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).some((k) => errs[k as keyof Errors])) {
      focusFirstError(errs);
      return;
    }

    data.delete("sito_web");
    data.delete("allegati");
    files.forEach((f) => data.append("allegati", f, f.name));
    data.set("_subject", `Nuova richiesta dal sito — ${data.get("azienda") || data.get("nome")}`);

    if (!ENDPOINT) {
      setMailto(buildMailto(data));
      setStatus("fallback");
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      setFiles([]);
    } catch {
      setMailto(buildMailto(data));
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status === "sent") {
    return (
      <div className={styles.done} ref={statusRef} tabIndex={-1} role="status">
        <p className="label">Richiesta ricevuta</p>
        <p className={styles.doneTitle}>
          Grazie. <em className="serif-accent">Ti rispondiamo noi.</em>
        </p>
        <p>
          Leggiamo ogni richiesta personalmente e ti rispondiamo all’indirizzo email che ci hai lasciato, o al
          telefono se l’hai indicato.
        </p>
        <button type="button" className={styles.again} onClick={() => setStatus("idle")}>
          Invia un’altra richiesta
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate aria-describedby={id("intro")}>
      <p id={id("intro")} className={styles.intro}>
        I campi con <span aria-hidden="true">*</span>
        <span className="visually-hidden">asterisco</span> sono obbligatori. Bastano poche righe: al resto pensiamo
        insieme.
      </p>

      <div className={styles.row}>
        <Field id={id("nome")} label="Nome e cognome" required error={errors.name}>
          <input id={id("nome")} name="nome" type="text" autoComplete="name" required aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id("nome")}-err` : undefined} />
        </Field>
        <Field id={id("azienda")} label="Azienda">
          <input id={id("azienda")} name="azienda" type="text" autoComplete="organization" />
        </Field>
      </div>

      <div className={styles.row}>
        <Field id={id("email")} label="Email" required error={errors.email}>
          <input id={id("email")} name="email" type="email" autoComplete="email" inputMode="email" required
            aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id("email")}-err` : undefined} />
        </Field>
        <Field id={id("telefono")} label="Telefono" hint="Se preferisci che ti chiamiamo.">
          <input id={id("telefono")} name="telefono" type="tel" autoComplete="tel" inputMode="tel"
            aria-describedby={`${id("telefono")}-hint`} />
        </Field>
      </div>

      <Field id={id("settore")} label="Settore di applicazione">
        <div className={styles.selectWrap}>
          <select id={id("settore")} name="settore" defaultValue="">
            <option value="">Seleziona…</option>
            {SECTORS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </Field>

      <Field
        id={id("messaggio")}
        label="La tua esigenza"
        required
        error={errors.message}
        hint="A cosa serve il componente, in che ambiente lavora, quantità indicative, tempi. Va bene anche un’idea ancora da definire."
      >
        <textarea id={id("messaggio")} name="messaggio" rows={6} required aria-invalid={!!errors.message}
          aria-describedby={`${id("messaggio")}-hint${errors.message ? ` ${id("messaggio")}-err` : ""}`} />
      </Field>

      <div className={styles.field}>
        <span className={styles.label} id={id("allegati-label")}>
          Disegno o documento <span className={styles.optional}>facoltativo</span>
        </span>
        <div
          className={styles.drop}
          data-dragging={dragging || undefined}
          data-invalid={errors.files ? true : undefined}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <svg className={styles.dropIcon} viewBox="0 0 48 48" aria-hidden="true">
            <rect x="9" y="5" width="30" height="38" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M15 33h18M15 13h8M28 13h5M15 19h18" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="24" cy="26" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <p>
            Trascina qui il tuo disegno tecnico, oppure{" "}
            <button ref={pickRef} type="button" className={styles.pick} onClick={() => fileInputRef.current?.click()}
              aria-describedby={`${id("allegati-label")} ${id("allegati")}-hint${errors.files ? ` ${id("allegati")}-err` : ""}`}>
              scegli un file
            </button>
          </p>
          <p id={`${id("allegati")}-hint`} className={styles.dropHint}>
            PDF, DWG, DXF, STEP, IGES, JPG, PNG o ZIP · fino a {MAX_FILES} file da {MAX_FILE_MB} MB
          </p>
          <input
            ref={fileInputRef}
            id={id("allegati")}
            name="allegati"
            type="file"
            multiple
            accept={ACCEPTED_EXT.map((e) => `.${e}`).join(",")}
            className="visually-hidden"
            tabIndex={-1}
            aria-labelledby={id("allegati-label")}
            onChange={onFileInput}
          />
        </div>
        {files.length > 0 && (
          <ul className={styles.files} role="list" aria-label="File allegati">
            {files.map((f, i) => (
              <li key={`${f.name}-${f.size}`}>
                <span className={styles.fileName}>{f.name}</span>
                <span className={styles.fileSize}>{formatSize(f.size)}</span>
                <button type="button" onClick={() => removeFile(i)} className={styles.remove}>
                  Rimuovi<span className="visually-hidden"> {f.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors.files && (
          <p className={styles.error} id={`${id("allegati")}-err`} role="alert">
            {errors.files}
          </p>
        )}
      </div>

      {/* Honeypot anti-spam: nascosto a persone e tecnologie assistive */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor={id("sito_web")}>Lascia vuoto questo campo</label>
        <input id={id("sito_web")} name="sito_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.consent}>
        <input id={id("privacy")} name="privacy" type="checkbox" value="accettato" required aria-invalid={!!errors.privacy}
          aria-describedby={errors.privacy ? `${id("privacy")}-err` : undefined} />
        <label htmlFor={id("privacy")}>
          Ho letto l’<Link href="/privacy/">informativa sulla privacy</Link> e acconsento al trattamento dei miei dati
          per ricevere una risposta a questa richiesta. <span aria-hidden="true">*</span>
        </label>
        {errors.privacy && (
          <p className={styles.error} id={`${id("privacy")}-err`}>
            {errors.privacy}
          </p>
        )}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={status === "sending"}>
          <span>{status === "sending" ? "Invio in corso…" : "Invia la richiesta"}</span>
          <span className={styles.submitArrow} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </span>
        </button>
        <p className={styles.response}>Ogni richiesta la legge una persona dell’azienda.</p>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className={styles.status}>
        {status === "fallback" && (
          <div className={styles.notice}>
            <p>
              <strong>Ancora un passaggio.</strong> Apri la mail già compilata e inviala dal tuo programma di posta
              {files.length ? ", ricordandoti di allegare il disegno" : ""}.
            </p>
            <a href={mailto} className={styles.mailBtn}>
              Apri la mail precompilata
            </a>
          </div>
        )}
        {status === "error" && (
          <div className={styles.notice} data-tone="error">
            <p>
              <strong>Non siamo riusciti a inviare la richiesta.</strong> Riprova tra poco, oppure inviala via email
              {site.contact.phone ? <> o chiamaci allo {site.contact.phone}</> : null}.
            </p>
            <a href={mailto} className={styles.mailBtn}>
              Invia via email
            </a>
          </div>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.field} data-invalid={error ? true : undefined}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : <span className={styles.optional}>facoltativo</span>}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
