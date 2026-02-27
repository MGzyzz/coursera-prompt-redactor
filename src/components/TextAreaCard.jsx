function TextAreaCard({
  id,
  title,
  subtitle,
  value,
  onChange,
  placeholder,
  readOnly = false,
  rows = 12,
  headerAction = null,
  textareaAction = null,
  footerAction = null,
}) {
  return (
    <article className="group rounded-3xl border border-[var(--border-subtle)] bg-[var(--panel-bg)]/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold tracking-[0.08em] text-[var(--text-muted)] uppercase">
            {title}
          </h2>
          <p className="text-sm text-[var(--text-muted)]">{subtitle}</p>
        </div>
        {headerAction}
      </div>

      <div className="relative">
        <textarea
          id={id}
          value={value}
          rows={rows}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`w-full rounded-2xl border border-[var(--border-strong)] bg-[var(--panel-muted)] px-4 py-3 text-sm leading-6 text-[var(--color-text)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 ${
            readOnly ? 'cursor-default selection:bg-[var(--accent)]/30' : 'resize-y'
          } ${textareaAction ? 'pr-14 pb-14' : ''}`}
        />
        {textareaAction ? (
          <div className="pointer-events-none absolute right-3 bottom-3 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
            {textareaAction}
          </div>
        ) : null}
      </div>

      {footerAction ? <div className="mt-3">{footerAction}</div> : null}
    </article>
  )
}

export default TextAreaCard
