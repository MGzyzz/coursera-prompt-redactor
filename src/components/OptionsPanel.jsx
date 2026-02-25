function ToggleOption({ id, title, description, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--panel-muted)] p-3 transition hover:border-[var(--accent)]"
    >
      <div className="space-y-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-[var(--text-muted)]">{description}</p>
      </div>
      <span className="relative mt-0.5 inline-flex h-6 w-11 items-center rounded-full bg-[var(--switch-track)] p-1">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span className="h-4 w-4 rounded-full bg-[var(--switch-thumb)] transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  )
}

function OptionsPanel({
  caseSensitive,
  removeAllOccurrences,
  onCaseSensitiveChange,
  onRemoveAllChange,
}) {
  return (
    <article className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--panel-bg)]/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-5">
      <div className="mb-3 space-y-1">
        <h2 className="text-sm font-semibold tracking-[0.08em] text-[var(--text-muted)] uppercase">
          Параметры удаления
        </h2>
        <p className="text-sm text-[var(--text-muted)]">Настройте как именно удалять указанный фрагмент.</p>
      </div>

      <div className="space-y-2">
        <ToggleOption
          id="remove-all"
          title="Удалять все вхождения"
          description="Если выключено, удалится только первое найденное совпадение."
          checked={removeAllOccurrences}
          onChange={onRemoveAllChange}
        />
        <ToggleOption
          id="case-sensitive"
          title="Учитывать регистр"
          description="Если выключено, 'BOT' и 'bot' считаются одинаковыми."
          checked={caseSensitive}
          onChange={onCaseSensitiveChange}
        />
      </div>
    </article>
  )
}

export default OptionsPanel
